import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { isSupabaseConfigured } from "../../lib/supabase";

const ProtectedAdminRoute = () => {
  const { isAuthenticated, loading } = useAuth();

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

  return <Outlet />;
};

export default ProtectedAdminRoute;
