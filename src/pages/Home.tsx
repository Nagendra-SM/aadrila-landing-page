import { Helmet } from "react-helmet-async";
import HeroSection from "../components/sections/HeroSection/HeroSection";
import IndustrySection from "../components/sections/IndustrySection/IndustriesSection";
import ProductsSection from "../components/sections/ProductSection/ProductsSection";
import BlogsSection from "../components/sections/BlogSection/BlogsSection";
import ContactSection from "../components/layout/ContactSection";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>AI Document Automation & Fraud Detection | Smart Document Processing</title>
        <meta 
          name="description" 
          content="Enhance security, accuracy, and efficiency with cutting-edge AI solutions for seamless document processing and fraud prevention." 
        />
      </Helmet>
      <main className="w-full h-full">
        <HeroSection />
        <IndustrySection />
        <ProductsSection />
        <BlogsSection />
        <ContactSection />
      </main>
    </>
  );
};

export default Home;
