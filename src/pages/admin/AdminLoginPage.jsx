import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { isSupabaseConfigured } from "../../lib/supabase";

const AdminLoginPage = () => {
  const { signIn, isAuthenticated, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!isSupabaseConfigured) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="text-2xl font-black text-emeraldDark">Supabase baglantisi yok</h1>
        <p className="mt-3 text-sm text-gray-600">
          Proje kokunde `.env` dosyasi olusturup `VITE_SUPABASE_URL` ve
          `VITE_SUPABASE_ANON_KEY` degerlerini ekleyin.
        </p>
      </div>
    );
  }

  if (!loading && isAuthenticated) {
    return <Navigate to="/panel" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await signIn(email.trim(), password);
    } catch (signInError) {
      setError(signInError.message || "Giris basarisiz.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid min-h-screen place-content-center bg-slate-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border border-emeraldDark/10 bg-white p-6 shadow-sm"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emeraldDark/70">
          Yonetim Paneli
        </p>
        <h1 className="mt-2 text-2xl font-black text-emeraldDark">Giris Yap</h1>

        <label className="mt-6 block text-xs font-semibold uppercase text-emeraldDark/80">
          E-posta
          <input
            type="email"
            className="mt-1 w-full rounded-xl border border-emeraldDark/20 px-3 py-2 text-sm"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>

        <label className="mt-4 block text-xs font-semibold uppercase text-emeraldDark/80">
          Sifre
          <input
            type="password"
            className="mt-1 w-full rounded-xl border border-emeraldDark/20 px-3 py-2 text-sm"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>

        {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 w-full rounded-full bg-emeraldDark py-3 text-sm font-bold uppercase text-white disabled:opacity-60"
        >
          {submitting ? "Giris yapiliyor..." : "Panele Gir"}
        </button>

        <Link to="/" className="mt-4 block text-center text-sm text-emeraldDark underline">
          Ana siteye don
        </Link>
      </form>
    </div>
  );
};

export default AdminLoginPage;
