import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContent } from "../../context/ContentContext";
import { deleteBlogPost, fetchAllBlogPosts } from "../../services/blogService";

const AdminBlogsPage = () => {
  const { refreshContent } = useContent();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const items = await fetchAllBlogPosts();
      setPosts(items || []);
    } catch (loadError) {
      setError(loadError.message || "Blog yazıları yüklenemedi.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleDelete = async (post) => {
    if (!window.confirm(`"${post.title}" yazısını silmek istediğinize emin misiniz?`)) {
      return;
    }

    setDeletingId(post.id);
    try {
      await deleteBlogPost(post.id);
      await load();
      await refreshContent();
    } catch (deleteError) {
      setError(deleteError.message || "Yazı silinemedi.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section>
      <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-emeraldDark">Blog</h2>
          <p className="mt-1 text-sm text-gray-600">Toplam {posts.length} yazı</p>
        </div>
        <Link
          to="/panel/blog/yeni"
          className="rounded-full bg-pistachio px-5 py-2 text-sm font-bold uppercase text-white"
        >
          Yeni Yazı
        </Link>
      </header>

      {loading ? <p className="text-sm text-gray-600">Yükleniyor…</p> : null}
      {error ? <p className="mb-4 text-sm text-red-600">{error}</p> : null}

      <div className="overflow-x-auto rounded-2xl border border-emeraldDark/10 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-emeraldDark/10 bg-emeraldDark/5 text-xs uppercase text-emeraldDark/80">
            <tr>
              <th className="px-4 py-3">Başlık</th>
              <th className="px-4 py-3">Kampanya</th>
              <th className="px-4 py-3">Durum</th>
              <th className="px-4 py-3">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id || post.slug} className="border-b border-gray-100">
                <td className="px-4 py-3 font-semibold text-emeraldDark">{post.title}</td>
                <td className="px-4 py-3">{post.campaignSlug || "—"}</td>
                <td className="px-4 py-3">{post.isActive ? "Yayında" : "Pasif"}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-3">
                    <Link
                      to={`/panel/blog/${post.slug}`}
                      className="font-semibold text-emeraldDark underline"
                    >
                      Düzenle
                    </Link>
                    <button
                      type="button"
                      disabled={deletingId === post.id}
                      onClick={() => handleDelete(post)}
                      className="text-xs font-semibold text-red-600 underline disabled:opacity-50"
                    >
                      Sil
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminBlogsPage;
