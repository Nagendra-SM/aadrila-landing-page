import { motion } from "framer-motion";

interface IndustryCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const IndustryCard = ({ icon, title, description, delay = 0 }: IndustryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
      className="industry-card px-6 py-16" 
    >
      <div className="industry-icon">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold font-raleway text-hero-subtitle text-center mb-3">
        {title}
      </h3>
      <p className="text-center font-manrope font-medium text-md text-[#696969]">
        {description}
      </p>
    </motion.div>
  );
};

export default IndustryCard;
