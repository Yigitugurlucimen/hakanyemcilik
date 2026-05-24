import { Route, Routes } from "react-router-dom";
import AdminLayout from "./components/admin/AdminLayout";
import ProtectedAdminRoute from "./components/admin/ProtectedAdminRoute";
import Footer from "./components/Footer";
import FloatingWhatsAppButton from "./components/FloatingWhatsAppButton";
import Header from "./components/Header";
import Seo from "./components/Seo";
import AboutPage from "./pages/AboutPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminProductFormPage from "./pages/admin/AdminProductFormPage";
import AdminProductsPage from "./pages/admin/AdminProductsPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import BlogListPage from "./pages/BlogListPage";
import CampaignDetailPage from "./pages/CampaignDetailPage";
import CampaignsPage from "./pages/CampaignsPage";
import CartPage from "./pages/CartPage.jsx";
import FaqPage from "./pages/FaqPage";
import HomePage from "./pages/HomePage";
import KvkkPage from "./pages/KvkkPage";
import NotFoundPage from "./pages/NotFoundPage";
import PrivacyPage from "./pages/PrivacyPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ShippingReturnsPage from "./pages/ShippingReturnsPage";
import TermsPage from "./pages/TermsPage";

const StorefrontApp = () => (
  <div className="min-h-screen bg-white">
    <Seo description="Hakan Yemcilik bilgi bankasinda guvercin takviyeleri, kullanim amaci, dozaj ve urun detaylarini inceleyin." />
    <Header />
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/urun/:slug" element={<ProductDetailPage />} />
        <Route path="/sepet" element={<CartPage />} />
        <Route path="/kampanyalar" element={<CampaignsPage />} />
        <Route path="/kampanya/:slug" element={<CampaignDetailPage />} />
        <Route path="/blog" element={<BlogListPage />} />
        <Route path="/blog/:slug" element={<BlogDetailPage />} />
        <Route path="/hakkimizda" element={<AboutPage />} />
        <Route path="/sss" element={<FaqPage />} />
        <Route path="/teslimat-iade" element={<ShippingReturnsPage />} />
        <Route path="/kvkk" element={<KvkkPage />} />
        <Route path="/gizlilik" element={<PrivacyPage />} />
        <Route path="/kullanim-kosullari" element={<TermsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
    <FloatingWhatsAppButton />
    <Footer />
  </div>
);

const App = () => (
  <Routes>
    <Route path="/panel/login" element={<AdminLoginPage />} />
    <Route path="/panel" element={<ProtectedAdminRoute />}>
      <Route element={<AdminLayout />}>
        <Route index element={<AdminProductsPage />} />
        <Route path="urun/yeni" element={<AdminProductFormPage />} />
        <Route path="urun/:slug" element={<AdminProductFormPage />} />
      </Route>
    </Route>
    <Route path="/*" element={<StorefrontApp />} />
  </Routes>
);

export default App;
