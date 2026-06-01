import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CampaignForm from "../../components/admin/CampaignForm";
import { useContent } from "../../context/ContentContext";
import { createEmptyCampaign } from "../../lib/emptyContent";
import {
  createCampaign,
  deleteCampaign,
  fetchCampaignDefinitionBySlug,
  updateCampaign
} from "../../services/campaignService";

const AdminCampaignFormPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { refreshContent } = useContent();
  const isNew = slug === "yeni";

  const [campaign, setCampaign] = useState(createEmptyCampaign());
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isNew) return;

    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const existing = await fetchCampaignDefinitionBySlug(slug);
        if (!existing) {
          setError("Kampanya bulunamadı.");
          return;
        }
        setCampaign(existing);
      } catch (loadError) {
        setError(loadError.message || "Kampanya yüklenemedi.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [isNew, slug]);

  const handleDelete = async () => {
    if (!campaign.id) return;
    if (!window.confirm(`"${campaign.name}" kampanyasını silmek istediğinize emin misiniz?`)) {
      return;
    }

    setDeleting(true);
    try {
      await deleteCampaign(campaign.id);
      await refreshContent();
      navigate("/panel/kampanyalar");
    } catch (deleteError) {
      setError(deleteError.message || "Kampanya silinemedi.");
    } finally {
      setDeleting(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      if (isNew) {
        await createCampaign(campaign);
      } else {
        await updateCampaign(campaign.id, campaign);
      }
      await refreshContent();
      navigate("/panel/kampanyalar");
    } catch (saveError) {
      setError(saveError.message || "Kayıt başarısız.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-sm text-gray-600">Kampanya yükleniyor…</p>;
  }

  return (
    <section>
      <Link to="/panel/kampanyalar" className="text-sm font-semibold text-emeraldDark underline">
        Kampanya listesine dön
      </Link>
      <h2 className="mt-4 text-2xl font-black text-emeraldDark">
        {isNew ? "Yeni Kampanya" : "Kampanyayı Düzenle"}
      </h2>
      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
      <div className="mt-6">
        <CampaignForm
          campaign={campaign}
          onChange={setCampaign}
          onSubmit={handleSubmit}
          saving={saving}
          submitLabel={isNew ? "Kampanyayı Kaydet" : "Değişiklikleri Kaydet"}
        />
        {!isNew && campaign.id ? (
          <button
            type="button"
            disabled={deleting || saving}
            onClick={handleDelete}
            className="mt-6 rounded-full border border-red-200 px-5 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
          >
            {deleting ? "Siliniyor…" : "Kampanyayı Sil"}
          </button>
        ) : null}
      </div>
    </section>
  );
};

export default AdminCampaignFormPage;
