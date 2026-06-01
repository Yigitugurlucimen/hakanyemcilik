import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { isSupabaseConfigured } from "../../lib/supabase";

const ProtectedAdminRoute = () => {
  const { isAuthenticated, isAdmin, loading, user } = useAuth();

  if (!isSupabaseConfigured) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="text-2xl font-black text-emeraldDark">Panel yapilandirilmadi</h1>
        <p className="mt-3 text-sm text-gray-600">
          `.env` dosyasina Supabase bilgilerini ekleyin ve projeyi yeniden baslatin.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="grid min-h-screen place-content-center text-sm text-gray-600">
        Panel yukleniyor...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/panel/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="text-2xl font-black text-emeraldDark">Yetkisiz erişim</h1>
        <p className="mt-3 text-sm text-gray-600">
          <strong>{user?.email}</strong> hesabının panel yetkisi yok. Supabase&apos;de{" "}
          <code className="rounded bg-gray-100 px-1">app_metadata.role = admin</code> veya{" "}
          <code className="rounded bg-gray-100 px-1">admin_allowlist</code> tablosuna e-posta
          ekleyin.
        </p>
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedAdminRoute;
