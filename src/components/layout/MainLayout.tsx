import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import ContactSection from "./ContactSection";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <ContactSection/>
      <Footer />
    </>
  );
};

export default MainLayout;
