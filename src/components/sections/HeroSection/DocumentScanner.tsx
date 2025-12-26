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
  center: { x: 0, y: 0, rotate: 0, scale: 1.05, zIndex: 10, blur: 0, opacity: 1 },
  left: { x: -200, y: 30, rotate: -12, scale: 0.75, zIndex: 1, blur: 2, opacity: 0.6 },
  right: { x: 200, y: 30, rotate: 12, scale: 0.75, zIndex: 1, blur: 2, opacity: 0.6 },
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
      
      {/* Status indicator */}
      <motion.div
        className="absolute top-0 right-0 md:top-4 md:right-4 flex items-center gap-2 bg-card/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-border/50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          className="w-2.5 h-2.5 rounded-full bg-green-500"
          animate={{ scale: [1, 1.4, 1], opacity: [1, 0.7, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <span className="text-sm font-medium text-foreground">AI Scanning</span>
      </motion.div>

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

      {/* Processing indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-accent"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ 
                duration: 1, 
                repeat: Infinity, 
                delay: i * 0.2 
              }}
            />
          ))}
        </motion.div>
        <span>Processing documents...</span>
      </motion.div>
    </div>
  );
};

export default DocumentScanner;
