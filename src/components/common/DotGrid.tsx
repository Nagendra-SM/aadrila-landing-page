import { motion } from "framer-motion";

interface DotGridProps {
  rows?: number;
  cols?: number;
  className?: string;
}

const DotGrid = ({ rows = 4, cols = 8, className = "" }: DotGridProps) => {
  return (
    <div className={`grid gap-3 ${className}`} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {Array.from({ length: rows * cols }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.02, duration: 0.3 }}
          className="w-2 h-2 rounded-full bg-dot"
        />
      ))}
    </div>
  );
};

export default DotGrid;
