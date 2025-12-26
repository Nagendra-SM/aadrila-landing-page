import HeroSection from "../components/sections/HeroSection/HeroSection";
import { Helmet } from "react-helmet-async";

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
      <main className="w-full h-full md:h-[100vh]">
        <HeroSection />
      </main>
    </>
  );
};

export default Home;
