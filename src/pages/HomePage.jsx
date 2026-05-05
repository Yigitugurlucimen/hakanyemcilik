import BrandStrip from "../components/BrandStrip";
import BlogShowcase from "../components/BlogShowcase";
import CampaignShowcase from "../components/CampaignShowcase";
import ContactSection from "../components/ContactSection";
import Hero from "../components/Hero";
import InfoSection from "../components/InfoSection";
import ProductShowcase from "../components/ProductShowcase";
import TrustSection from "../components/TrustSection";

const HomePage = () => {
  return (
    <>
      <Hero />
      <BrandStrip />
      <CampaignShowcase />
      <ProductShowcase />
      <BlogShowcase />
      <InfoSection />
      <TrustSection />
      <ContactSection />
    </>
  );
};

export default HomePage;
