import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DotGrid from "../../common/DotGrid";
import circleImage from "../../../assets/circle.png";

gsap.registerPlugin(ScrollTrigger);

interface ProductCardProps {
  badge: string;
  badgeColor: "orange" | "blue" | "brown";
  title: string;
  features: string[];
  benefits: string[];
  image: string;
  imageAlt: string;
  reversed?: boolean;
}

const ProductCard = ({
  badge,
  title,
  features,
  benefits,
  image,
  imageAlt,
  reversed = false,
}: ProductCardProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { x: reversed ? 100 : -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { x: reversed ? -100 : 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [reversed]);

  const Content = (
    <div ref={contentRef} className="opacity-0">
      <DotGrid rows={3} cols={8} className="mb-6" />
      
      <motion.span
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className={`inline-block rounded-full leading-5 font-manrope font-bold tracking-normal text-xl bg-gradient-badge mb-6`}
      >
        {badge}
      </motion.span>

      <h3 className="text-2xl font-raleway leading-12 md:text-3xl lg:text-4xl font-bold text-hero-subtitle mb-8">
        {title}
      </h3>

      <div className="mb-6">
        <h4 className="font-bold font-raleway text-xl tracking-normal text-foreground mb-3">Features:</h4>
        <ul className="space-y-2 text-muted-foreground">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-foreground mt-1 text-md leading-8 tracking-normal font-manrope font-normal">•</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <h4 className="font-bold font-raleway text-xl tracking-normal text-foreground mb-3">Benefits:</h4>
        <ul className="space-y-2 text-muted-foreground">
          {benefits.map((benefit, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-foreground mt-1 text-md leading-8 tracking-normal font-manrope font-normal">•</span>
              {benefit}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap gap-8">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`px-8 py-3 rounded-full font-medium bg-hero-title text-white transition-all`}
        >
          Learn More
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-8 py-3 rounded-full font-medium bg-hero-title text-white transition-all"
        >
          Schedule a Demo
        </motion.button>
      </div>
    </div>
  );

  const ImageBlock = (
    <div ref={imageRef} className="relative opacity-0">
      {/* Background circle */}
      <div className={`absolute ${reversed ? "-left-20" : "-right-20"} top-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none opacity-30`}>
        <img src={circleImage} alt="" className="w-full h-full object-contain" aria-hidden="true" />
      </div>
      
      <motion.div
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 rounded-2xl overflow-hidden"
      >
        <img
          src={image}
          alt={imageAlt}
          className="w-full h-auto max-w-xl mx-auto"
        />
      </motion.div>
      
      {/* Dot grid decoration */}
      <div className={`absolute ${reversed ? "-left-8" : "-right-8"} top-8`}>
        <DotGrid rows={4} cols={4} />
      </div>
    </div>
  );

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-80 items-center py-16 lg:py-24 ${reversed ? "lg:flex-row-reverse" : ""}`}>
      {reversed ? (
        <>
          <div className="order-2 lg:order-1">{ImageBlock}</div>
          <div className="order-1 lg:order-2">{Content}</div>
        </>
      ) : (
        <>
          {Content}
          {ImageBlock}
        </>
      )}
    </div>
  );
};

export default ProductCard;
