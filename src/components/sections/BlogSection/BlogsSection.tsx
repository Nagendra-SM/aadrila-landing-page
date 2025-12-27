import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "../../common/SectionHeading";
import BlogCard from "./BlogCard";
import DotGrid from "../../common/DotGrid";

const blogs = [
  {
    title: "How AI is Revolutionizing Document Management for Enterprises",
    date: "24 July, 2023",
    excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and...",
  },
  {
    title: "Top 5 Fraud Prevention Strategies for Financial Institutions",
    date: "24 July, 2023",
    excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and...",
  },
  {
    title: "The Future of OCR: From Basic Extraction to AI-Driven Intelligence",
    date: "24 July, 2023",
    excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and...",
  },
  {
    title: "Automating Compliance: How AI Helps Financial Services Stay Ahead",
    date: "20 July, 2023",
    excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and...",
  },
  {
    title: "Machine Learning in Healthcare: Document Processing Revolution",
    date: "18 July, 2023",
    excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and...",
  },
];

const BlogsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsToShow = 3;
  const maxIndex = Math.max(0, blogs.length - cardsToShow);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Dot grid decorations */}
      <div className="absolute left-8 top-8">
        <DotGrid rows={6} cols={8} />
      </div>
      <div className="absolute right-8 top-1/3">
        <DotGrid rows={6} cols={4} />
      </div>

      <div className="container relative z-10 px-6 md:px-8 lg:px-12">
        <SectionHeading
          tagline="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard."
          heading="Blogs"
          centered
          className="mb-16 max-w-4xl mx-auto"
        />

        {/* Blog Cards Carousel */}
        <div className="relative overflow-hidden">
          <motion.div
            animate={{ x: `-${currentIndex * (100 / cardsToShow)}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex gap-6"
          >
            {blogs.map((blog, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <BlogCard {...blog} delay={index * 0.1} />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center gap-3 mt-12">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="w-12 h-12 rounded-full bg-[hsl(205,80%,45%)] text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className="w-12 h-12 rounded-full bg-[hsl(205,80%,45%)] text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;
