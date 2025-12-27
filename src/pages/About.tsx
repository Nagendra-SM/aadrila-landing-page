import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import circleImage from "../assets/circle.png";
import dotGroup from "../assets/dot-group.png";
import dotGroup2 from "../assets/dot-group2.png";

const strategyHighlights = [
  {
    title: "Our Vision",
    description:
      "To redefine document management with cutting-edge technology that ensures accuracy, efficiency, and trust.",
    iconLabel: "Vision",
  },
  {
    title: "Our Mission",
    description:
      "To deliver document automation with cutting-edge technology that ensures accuracy, efficiency, and trust.",
    iconLabel: "Mission",
  },
];

const teamMembers = [
  {
    name: "Ethan Rivera",
    role: "CTO, Aadrila",
    quote:
      "We reimagine automation so our partners can focus on solving human problems—not paperwork.",
    image:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=facearea&facepad=4&w=320&h=320&q=80",
  },
  {
    name: "Mansi Shukla",
    role: "CEO, FutureSphere",
    quote:
      "For this time-constrained generation, we want to play our part by making onboarding feel effortless.",
    image:
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=facearea&facepad=4&w=320&h=320&q=80",
  },
  {
    name: "Jordan Parker",
    role: "Head of Experience",
    quote:
      "Document automation is no longer a luxury—it is how modern teams unlock momentum.",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=facearea&facepad=4&w=320&h=320&q=80",
  },
];

const About = () => {
  const [selectedIndex, setSelectedIndex] = useState(1);

  const selectedMember = useMemo(
    () => teamMembers[selectedIndex],
    [selectedIndex]
  );

  const handleNavigate = (direction: "next" | "prev") => {
    setSelectedIndex((prev) => {
      if (direction === "next") {
        return (prev + 1) % teamMembers.length;
      }
      return (prev - 1 + teamMembers.length) % teamMembers.length;
    });
  };

  return (
    <>
      <Helmet>
        <title>About Aadrila | Meet the Minds Behind Document Automation</title>
        <meta
          name="description"
          content="Get to know the team powering Aadrila's document automation platform and discover the vision guiding our innovation."
        />
      </Helmet>

      <section className="relative overflow-hidden bg-[#f8fbff] pb-32 pt-36">
        <div className="pointer-events-none absolute -left-24 top-16 hidden h-[820px] w-[820px] opacity-70 lg:block">
          <img src={circleImage} alt="" className="h-full w-full object-contain" aria-hidden />
        </div>
        <div className="pointer-events-none absolute right-20 top-10 hidden w-48 opacity-60 md:block">
          <img src={dotGroup2} alt="" className="h-auto w-full" aria-hidden />
        </div>

        <div className="container relative z-10 px-6 md:px-10 lg:px-16">
          <div className="max-w-3xl">
            <p className="font-raleway text-2xl font-semibold uppercase tracking-[0.45em] text-[#487ce8]">
              About Us
            </p>
            <h1 className="mt-4 font-raleway text-4xl font-bold text-[#1f2b4a] md:text-[3.2rem]">
              Meet the minds shaping document automation.
            </h1>
            <p className="mt-6 max-w-2xl font-manrope text-lg text-[#4a5876] md:text-xl">
              We engineer human-centered AI that makes complex verification effortless. Behind every workflow we deliver is a team focused on clarity, trust, and a seamless experience for your customers.
            </p>
          </div>

          <div className="relative mt-16 flex flex-col gap-10">
            <span className="absolute left-6 top-0 bottom-0 hidden w-1 rounded-full bg-linear-to-b from-[#f0b37a] via-[#de6f45] to-[#487ce8] md:block" />
            {strategyHighlights.map((item, index) => (
              <div
                key={item.title}
                className="relative flex flex-col gap-6 rounded-[28px] bg-white/80 p-8 shadow-[0_16px_40px_rgba(37,71,125,0.15)] transition-transform duration-300 hover:-translate-y-1 md:flex-row md:items-center md:justify-between md:px-12 md:py-10"
              >
                <div className="flex-1">
                  <span className="mb-4 inline-flex items-center gap-3 font-manrope text-sm font-semibold uppercase tracking-[0.4em] text-[#f07f4a]">
                    <span className="inline-block h-1 w-8 rounded-full bg-[#f07f4a]" />
                    {item.title}
                  </span>
                  <p className="max-w-xl font-manrope text-lg font-medium text-[#304166]">
                    {item.description}
                  </p>
                </div>
                <div className="relative flex w-full items-center justify-center md:w-auto">
                  <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-linear-to-br from-[#487ce8] to-[#274db8] text-center text-white shadow-[0_16px_35px_rgba(55,104,180,0.25)]">
                    <span className="text-lg font-semibold">Our</span>
                    <span className="text-xl font-bold">{item.iconLabel}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="mt-2 h-8 w-8"
                      aria-hidden
                    >
                      <path
                        fill="currentColor"
                        d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm1 15h-2v-2h2Zm0-4h-2V7h2Z"
                      />
                    </svg>
                  </div>
                  {index === 0 && (
                    <span className="absolute -bottom-10 hidden h-12 w-1 rounded-full bg-linear-to-b from-transparent via-[#d0dcff] to-[#487ce8]/60 md:block" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white pb-32 pt-24">
        <div className="pointer-events-none absolute -bottom-32 left-8 hidden w-[520px] opacity-60 lg:block">
          <img src={circleImage} alt="" className="h-auto w-full" aria-hidden />
        </div>
        <div className="pointer-events-none absolute right-16 top-16 w-32 opacity-70">
          <img src={dotGroup} alt="" className="h-auto w-full" aria-hidden />
        </div>

        <div className="container relative z-10 px-6 text-center md:px-10 lg:px-16">
          <h2 className="font-raleway text-4xl font-bold text-[#1f2b4a] md:text-[3rem]">
            Meet our team
          </h2>
          <p className="mx-auto mt-4 max-w-3xl font-manrope text-lg text-[#4a5876] md:text-xl">
            Meet our passionate and talented team, committed to delivering exceptional results, driving innovation, and transforming your vision into reality.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => handleNavigate("prev")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d9e4ff] bg-white text-[#487ce8] shadow-sm transition hover:bg-[#487ce8] hover:text-white"
              aria-label="Previous team member"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="m15 6-6 6 6 6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => handleNavigate("next")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d9e4ff] bg-white text-[#487ce8] shadow-sm transition hover:bg-[#487ce8] hover:text-white"
              aria-label="Next team member"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="m9 6 6 6-6 6" />
              </svg>
            </button>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-8">
            {teamMembers.map((member, index) => {
              const isActive = index === selectedIndex;
              return (
                <button
                  key={member.name}
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  className={`group relative flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-white shadow-xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl md:h-32 md:w-32 ${
                    isActive ? "ring-4 ring-[#487ce8] ring-offset-2" : "ring-0"
                  }`}
                  aria-pressed={isActive}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-[90%] w-[90%] rounded-full object-cover"
                  />
                </button>
              );
            })}
          </div>

          <div className="relative mx-auto mt-16 max-w-3xl rounded-[32px] bg-linear-to-r from-[#2f4ca7] to-[#2a64d6] p-12 text-white shadow-[0_30px_80px_rgba(42,81,172,0.35)]">
            <div className="absolute -top-5 left-1/2 h-10 w-10 -translate-x-1/2 rotate-45 rounded-sm bg-linear-to-br from-[#2f4ca7] to-[#2a64d6]" />
            <div className="relative">
              <p className="font-raleway text-2xl font-semibold uppercase tracking-[0.35em] text-white/70">
                {selectedMember.name}
              </p>
              <p className="mt-2 font-manrope text-lg font-medium text-white/90">
                {selectedMember.role}
              </p>
              <p className="mt-6 font-manrope text-base text-white/85 md:text-lg">
                {selectedMember.quote}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
