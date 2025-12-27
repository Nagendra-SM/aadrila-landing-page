import { motion } from "framer-motion";
import DocumentScanner from "./DocumentScanner";
import { ThemedButton } from '../../common/ThemedButton'

const HeroSection = () => {
  return (
    <section 
      className="relative min-h-screen overflow-hidden flex justify-center items-center"
      style={{
        backgroundImage: "url('/hero-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundBlendMode: "overlay"
      }}
    >
      {/* Background overlay for better text readability */}
      <div className="absolute inset-0" />
      
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[80vh]">
          {/* Left Content */}
          <motion.div
            className="space-y-7"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="space-y-4">
              <motion.p
                className="text-gradient-custom font-bold font-display text-xl md:text-5xl leading-16 font-raleway"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                AI-Powered
              </motion.p>
              <motion.p
                className="text-hero-subtitle font-bold font-display text-xl md:text-5xl leading-16 font-raleway tracking-normal"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Document Automation
                <br />
                <span>& Fraud Detection</span>
              </motion.p>
            </div>
            <motion.p
              className="text-xl text-hero-description max-w-lg leading-7 font-manrope tracking-normal font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Enhance security, accuracy, and efficiency with our cutting-edge AI solutions 
              for seamless document processing and fraud prevention.
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <ThemedButton>
                Get a Demo
              </ThemedButton>
              <ThemedButton>
                Explore Solutions
              </ThemedButton>
            </motion.div>
          </motion.div>
          {/* Right Content - Document Scanner */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <DocumentScanner />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
