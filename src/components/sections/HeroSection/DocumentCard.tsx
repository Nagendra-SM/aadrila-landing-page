import { motion } from "framer-motion";
import LicenseImg from "../../../assets/License.png";
import InvoiceImg from "../../../assets/Invoice.png";
import DocImg from "../../../assets/Doc.png";

type DocumentType = "license" | "invoice" | "doc";

interface DocumentCardProps {
  type: DocumentType;
  isScanning: boolean;
  delay?: number;
}

const documentImages: Record<DocumentType, string> = {
  license: LicenseImg,
  invoice: InvoiceImg,
  doc: DocImg,
};

const DocumentCard = ({ type, isScanning, delay = 0 }: DocumentCardProps) => {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      <motion.div
        className="w-40 h-52 sm:w-48 sm:h-64 md:w-56 md:h-72 rounded-xl sm:rounded-2xl relative overflow-hidden"
        style={{
          filter: isScanning 
            ? `drop-shadow(0 15px 15px hsl(var(--scan-line) / ${window.innerWidth < 1024 ? '0.2' : '0.3'}))`
            : `drop-shadow(0 10px 10px hsl(var(--document-shadow) / ${window.innerWidth < 1024 ? '0.15' : '0.2'}))`
        }}
        animate={isScanning 
          ? { scale: [1, 1.02, 1] } 
          : window.innerWidth < 1024 
            ? { y: [0, -3, 0] } 
            : { y: [0, -6, 0] }
        }
        transition={{ 
          duration: isScanning ? 2 : (window.innerWidth < 1024 ? 3 : 4),
          repeat: Infinity, 
          ease: "easeInOut",
          delay: delay * 0.5
        }}
      >
        <img 
          src={documentImages[type]} 
          alt={`${type} document`}
          className="w-full h-full object-contain"
        />
        
        {/* Scanning line overlay - only show on desktop for better mobile performance */}
        {isScanning && window.innerWidth >= 1024 && (
          <motion.div
            className="absolute left-0 right-0 h-1 sm:h-1.5 bg-gradient-to-r from-transparent via-scan to-transparent"
            style={{
              boxShadow: "0 0 15px 4px hsl(var(--scan-line) / 0.6)"
            }}
            initial={{ top: "0%" }}
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        )}
        
      </motion.div>
      
      {/* Card shadow - only show on desktop for better mobile performance */}
      {window.innerWidth >= 768 && (
        <motion.div 
          className="absolute -bottom-4 left-8 right-8 h-4 sm:h-6 md:h-8 rounded-full blur-xl"
          style={{ background: "hsl(var(--document-shadow) / 0.15)" }}
          animate={isScanning ? { opacity: [0.1, 0.2, 0.1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
};

export default DocumentCard;
