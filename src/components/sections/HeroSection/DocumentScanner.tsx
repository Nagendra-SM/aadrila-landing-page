import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DocumentCard from "./DocumentCard";

type DocumentType = "license" | "invoice" | "doc";

interface Document {
  id: number;
  type: DocumentType;
}

// Three documents that will rotate through positions
const documents: Document[] = [
  { id: 1, type: "license" },
  { id: 2, type: "doc" },
  { id: 3, type: "invoice" },
];

// Position definitions: center, left, right
const POSITIONS = {
  center: { x: 0, y: 0, rotate: 0, scale: 1.5, zIndex: 10, blur: 0, opacity: 1 },
  left: { x: -250, y: 30, rotate: 0, scale: 0.9, zIndex: 1, blur: 2, opacity: 0.6 },
  right: { x: 250, y: 30, rotate: 0, scale: 0.9, zIndex: 1, blur: 2, opacity: 0.6 },
};

const DocumentScanner = () => {
  const [rotation, setRotation] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initTimer = setTimeout(() => {
      setIsInitialized(true);
    }, 500);

    // Rotate every 3 seconds
    const rotateInterval = setInterval(() => {
      setRotation((prev) => prev + 1);
    }, 3000);

    return () => {
      clearTimeout(initTimer);
      clearInterval(rotateInterval);
    };
  }, []);

  // Get position for each document based on rotation
  // Rotation: center -> left, left -> right (behind), right -> center
  const getPosition = (docIndex: number) => {
    if (!isInitialized) {
      // Initial positions
      if (docIndex === 0) return POSITIONS.center;
      if (docIndex === 1) return POSITIONS.left;
      return POSITIONS.right;
    }

    // Calculate which position this document should be in
    // Position order: 0=center, 1=left, 2=right
    const positionIndex = (docIndex - rotation % 3 + 3) % 3;
    
    if (positionIndex === 0) return POSITIONS.center;
    if (positionIndex === 1) return POSITIONS.left;
    return POSITIONS.right;
  };

  return (
    <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center">
      {/* Decorative glow */}
      <motion.div
        className="absolute w-80 h-80 rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, hsl(var(--wave-color)) 0%, transparent 70%)"
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Document container */}
      <div className="relative w-[600px] h-[350px] flex items-center justify-center">
        <AnimatePresence>
          {documents.map((doc, index) => {
            const position = getPosition(index);
            const isCenter = position === POSITIONS.center;
            
            return (
              <motion.div
                key={doc.id}
                className="absolute"
                style={{
                  zIndex: position.zIndex,
                }}
                initial={{ 
                  x: 0,
                  y: 100,
                  rotate: 0,
                  opacity: 0,
                  scale: 0.8
                }}
                animate={{ 
                  x: position.x,
                  y: position.y,
                  rotate: position.rotate,
                  opacity: position.opacity,
                  scale: position.scale,
                  filter: `blur(${position.blur}px)`,
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                <DocumentCard
                  type={doc.type}
                  isScanning={isCenter && isInitialized}
                  delay={index * 0.1}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DocumentScanner;
