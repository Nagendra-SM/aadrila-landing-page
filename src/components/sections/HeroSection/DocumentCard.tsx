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
        className="w-72 h-96 rounded-2xl shadow-2xl relative overflow-hidden"
        style={{
          boxShadow: isScanning 
            ? "0 25px 50px -12px hsl(var(--scan-line) / 0.3), 0 12px 24px -8px hsl(var(--document-shadow) / 0.15)"
            : "0 25px 50px -12px hsl(var(--document-shadow) / 0.25), 0 12px 24px -8px hsl(var(--document-shadow) / 0.1)"
        }}
        animate={isScanning ? { scale: [1, 1.02, 1] } : { y: [0, -6, 0] }}
        transition={{ 
          duration: isScanning ? 2 : 4, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: delay * 0.5
        }}
      >
        <img 
          src={documentImages[type]} 
          alt={`${type} document`}
          className="w-full h-full object-contain mix-blend-multiply"
        />
        
        {/* Scanning line overlay */}
        {isScanning && (
          <motion.div
            className="absolute left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-scan to-transparent"
            style={{
              boxShadow: "0 0 25px 6px hsl(var(--scan-line) / 0.6)"
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
        
        {/* Scanning corner indicators */}
        {isScanning && (
          <>
            <motion.div
              className="absolute top-2 left-2 w-5 h-5 border-l-2 border-t-2 border-scan rounded-tl"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <motion.div
              className="absolute top-2 right-2 w-5 h-5 border-r-2 border-t-2 border-scan rounded-tr"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.25 }}
            />
            <motion.div
              className="absolute bottom-2 left-2 w-5 h-5 border-l-2 border-b-2 border-scan rounded-bl"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
            />
            <motion.div
              className="absolute bottom-2 right-2 w-5 h-5 border-r-2 border-b-2 border-scan rounded-br"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.75 }}
            />
          </>
        )}
      </motion.div>
      
      {/* Card shadow */}
      <motion.div 
        className="absolute -bottom-4 left-8 right-8 h-8 rounded-full blur-xl"
        style={{ background: "hsl(var(--document-shadow) / 0.15)" }}
        animate={isScanning ? { opacity: [0.15, 0.25, 0.15] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
};

export default DocumentCard;
