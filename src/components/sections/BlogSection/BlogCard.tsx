import { motion } from "framer-motion";

interface BlogCardProps {
  title: string;
  date: string;
  excerpt: string;
  delay?: number;
}

const BlogCard = ({ title, date, excerpt, delay = 0 }: BlogCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="bg-card rounded-xl p-6 shadow-sm border border-border/50 cursor-pointer group flex flex-col h-full"
    >
      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors leading-tight">
        {title}
      </h3>
      <p className="text-primary text-sm mb-4">{date}</p>
      <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
        {excerpt}
      </p>
      
      {/* Gradient bottom border */}
      <div className="mt-6 h-1 w-full rounded-full bg-gradient-to-r from-primary/20 via-[hsl(280,70%,80%)] to-[hsl(200,80%,80%)]" />
    </motion.article>
  );
};

export default BlogCard;
