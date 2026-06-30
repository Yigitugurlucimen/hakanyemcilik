import { Route, Routes } from "react-router-dom";
import AdminLayout from "./components/admin/AdminLayout";
import ProtectedAdminRoute from "./components/admin/ProtectedAdminRoute";
import CookieConsent from "./components/CookieConsent.jsx";
import Footer from "./components/Footer";
import FloatingWhatsAppButton from "./components/FloatingWhatsAppButton";
import Header from "./components/Header";
import ProductsLoadBanner from "./components/ProductsLoadBanner";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Seo from "./components/Seo";
import { defaultSeoDescription } from "./lib/siteConfig.js";
import AboutPage from "./pages/AboutPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminOrderDetailPage from "./pages/admin/AdminOrderDetailPage";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
import AdminProductFormPage from "./pages/admin/AdminProductFormPage";
import AdminBlogFormPage from "./pages/admin/AdminBlogFormPage";
import AdminBlogsPage from "./pages/admin/AdminBlogsPage";
import AdminCampaignFormPage from "./pages/admin/AdminCampaignFormPage";
import AdminCampaignsPage from "./pages/admin/AdminCampaignsPage";
import AdminProductsPage from "./pages/admin/AdminProductsPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import BlogListPage from "./pages/BlogListPage";
import CampaignDetailPage from "./pages/CampaignDetailPage";
import CampaignsPage from "./pages/CampaignsPage";
import CartPage from "./pages/CartPage.jsx";
import DistanceSalesPage from "./pages/DistanceSalesPage";
import FaqPage from "./pages/FaqPage";
import HomePage from "./pages/HomePage";
import KvkkPage from "./pages/KvkkPage";
import NotFoundPage from "./pages/NotFoundPage";
import PreInformationPage from "./pages/PreInformationPage";
import PrivacyPage from "./pages/PrivacyPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ShippingReturnsPage from "./pages/ShippingReturnsPage";
import TermsPage from "./pages/TermsPage";

const StorefrontApp = () => (
  <div className="min-h-screen w-full overflow-x-hidden bg-white">
    <Seo description={defaultSeoDescription} />
    <Header />
    <ProductsLoadBanner />
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
        <Route path="/mesafeli-satis" element={<DistanceSalesPage />} />
        <Route path="/on-bilgilendirme" element={<PreInformationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
    <FloatingWhatsAppButton />
    <CookieConsent />
    <Footer />
  </div>
);

const App = () => (
  <>
    <ScrollToTop />
    <Routes>
    <Route path="/panel/login" element={<AdminLoginPage />} />
    <Route path="/panel" element={<ProtectedAdminRoute />}>
      <Route element={<AdminLayout />}>
        <Route index element={<AdminProductsPage />} />
        <Route path="urun/yeni" element={<AdminProductFormPage />} />
        <Route path="urun/:slug" element={<AdminProductFormPage />} />
        <Route path="kampanyalar" element={<AdminCampaignsPage />} />
        <Route path="kampanya/yeni" element={<AdminCampaignFormPage />} />
        <Route path="kampanya/:slug" element={<AdminCampaignFormPage />} />
        <Route path="blog" element={<AdminBlogsPage />} />
        <Route path="blog/yeni" element={<AdminBlogFormPage />} />
        <Route path="blog/:slug" element={<AdminBlogFormPage />} />
        <Route path="siparisler" element={<AdminOrdersPage />} />
        <Route path="siparis/:id" element={<AdminOrderDetailPage />} />
      </Route>
    </Route>
    <Route path="/*" element={<StorefrontApp />} />
  </Routes>
  </>
);

export default App;
