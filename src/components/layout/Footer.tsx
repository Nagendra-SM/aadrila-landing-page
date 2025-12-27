import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-[hsl(205,70%,45%)] text-white py-10"
    >
      <div className="container px-6 md:px-8 lg:px-12">
        <p className="text-sm mb-4">
          © 2025 by Aadrila Technologies Private Limited CIN U74999UP2017PTC094688
        </p>
        <p className="text-sm opacity-90">
          Registered Address: B-1, 127/K, Sector-K Aliganj, Lucknow, Lucknow,<br />
          Uttar Pradesh, India, 226024
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
