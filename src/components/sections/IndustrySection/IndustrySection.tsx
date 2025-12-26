import { motion, type Variants } from "framer-motion";

type Industry = {
  title: string;
  description: string;
};

const industries: Industry[] = [
  {
    title: "Insurance",
    description:
      "Automate claims processing with precise document validation and fraud checks.",
  },
  {
    title: "Lending",
    description:
      "Accelerate loan approvals through intelligent verification and risk scoring.",
  },
  {
    title: "Healthcare",
    description:
      "Streamline patient onboarding while safeguarding sensitive medical records.",
  },
];

const textVariants: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0 },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: index * 0.15,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const IndustrySection = () => {
  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="/images/circle.png"
          alt="Decorative circle"
          className="absolute -left-40 top-10 w-[520px] max-w-[85vw] opacity-30"
        />
        <img
          src="/images/dot-group3.png"
          alt="Decorative dot group"
          className="absolute right-6 top-8 w-32 opacity-70"
        />
        <img
          src="/images/dot-group.png"
          alt="Decorative dot group"
          className="absolute bottom-10 right-6 w-36 opacity-60"
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 md:flex-row md:items-center md:gap-16">
        <motion.div
          className="max-w-xl space-y-6"
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.6, ease: "easeOut" }}
          variants={textVariants}
          viewport={{ once: true, amount: 0.6 }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary/80">
            AI-driven innovation for growth
          </p>
          <h2 className="text-3xl font-bold text-slate-900 md:text-5xl">
            Industries We Empower
          </h2>
          <p className="text-base leading-relaxed text-slate-600 md:text-lg">
            From underwriting to care management, our AI orchestration platform
            adapts to the regulatory rigor and operational nuance of every
            industry we serve.
          </p>
        </motion.div>

        <motion.div
          className="grid flex-1 gap-6 md:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          {industries.map((industry, index) => (
            <motion.article
              key={industry.title}
              className="group relative rounded-3xl border border-slate-200/70 bg-white p-8 shadow-[0_25px_50px_-30px_rgba(59,130,246,0.35)] transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_28px_60px_-24px_rgba(148,163,184,0.45)] first:md:-mt-6 last:md:translate-y-6"
              custom={index}
              variants={cardVariants}
            >
              <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-linear-to-br from-sky-100 via-white to-sky-200 text-primary shadow-inner">
                <span className="text-xl font-semibold text-primary">{index + 1}</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900">
                {industry.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
                {industry.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default IndustrySection;
