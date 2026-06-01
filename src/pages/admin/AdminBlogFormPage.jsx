import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BlogForm from "../../components/admin/BlogForm";
import { useContent } from "../../context/ContentContext";
import { createEmptyBlogPost } from "../../lib/emptyContent";
import {
  createBlogPost,
  deleteBlogPost,
  fetchBlogPostBySlug,
  updateBlogPost
} from "../../services/blogService";
import { fetchAllCampaignDefinitions } from "../../services/campaignService";

const AdminBlogFormPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { refreshContent } = useContent();
  const isNew = slug === "yeni";

  const [post, setPost] = useState(createEmptyBlogPost());
  const [campaignOptions, setCampaignOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMeta = async () => {
      try {
        const campaigns = await fetchAllCampaignDefinitions();
        setCampaignOptions(campaigns || []);
      } catch {
        setCampaignOptions([]);
      }
    };

    loadMeta();
  }, []);

  useEffect(() => {
    if (isNew) {
      setLoading(false);
      return;
    }

    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const existing = await fetchBlogPostBySlug(slug);
        if (!existing) {
          setError("Blog yazısı bulunamadı.");
          return;
        }
        setPost(existing);
      } catch (loadError) {
        setError(loadError.message || "Yazı yüklenemedi.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [isNew, slug]);

  const handleDelete = async () => {
    if (!post.id) return;
    if (!window.confirm(`"${post.title}" yazısını silmek istediğinize emin misiniz?`)) {
      return;
    }

    setDeleting(true);
    try {
      await deleteBlogPost(post.id);
      await refreshContent();
      navigate("/panel/blog");
    } catch (deleteError) {
      setError(deleteError.message || "Yazı silinemedi.");
    } finally {
      setDeleting(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    if (!Array.isArray(post.sections)) {
      setError("Bölümler geçerli bir JSON dizisi olmalı.");
      setSaving(false);
      return;
    }

    try {
      if (isNew) {
        await createBlogPost(post);
      } else {
        await updateBlogPost(post.id, post);
      }
      await refreshContent();
      navigate("/panel/blog");
    } catch (saveError) {
      setError(saveError.message || "Kayıt başarısız.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-sm text-gray-600">Yazı yükleniyor…</p>;
  }

  return (
    <section>
      <Link to="/panel/blog" className="text-sm font-semibold text-emeraldDark underline">
        Blog listesine dön
      </Link>
      <h2 className="mt-4 text-2xl font-black text-emeraldDark">
        {isNew ? "Yeni Blog Yazısı" : "Yazıyı Düzenle"}
      </h2>
      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
      <div className="mt-6">
        <BlogForm
          post={post}
          onChange={setPost}
          onSubmit={handleSubmit}
          saving={saving}
          submitLabel={isNew ? "Yazıyı Kaydet" : "Değişiklikleri Kaydet"}
          campaignOptions={campaignOptions}
        />
        {!isNew && post.id ? (
          <button
            type="button"
            disabled={deleting || saving}
            onClick={handleDelete}
            className="mt-6 rounded-full border border-red-200 px-5 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
          >
            {deleting ? "Siliniyor…" : "Yazıyı Sil"}
          </button>
        ) : null}
      </div>
    </section>
  );
};

export default AdminBlogFormPage;
