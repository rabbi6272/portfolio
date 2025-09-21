import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const words = ["Web Developer", "React Enthusiast", "Creative Coder"];

export default function Hero() {
  const heroRef = useRef();
  const headingRef = useRef();
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (!headingRef.current) return;
    const chars = headingRef.current.querySelectorAll(".char-inner");

    // Respect reduced motion preference
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      gsap.set(chars, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(chars, { y: "1.1em", opacity: 0, willChange: "transform" });
    gsap.to(chars, {
      y: "0em",
      opacity: 1,
      duration: 1.5,
      delay: 0.5,
      ease: "power3.out",
      stagger: { each: 0.08, from: 0 },
      force3D: true,
      autoRound: false,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (charIndex < words[wordIndex].length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + words[wordIndex][charIndex]);
        setCharIndex(charIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => {
        setText("");
        setCharIndex(0);
        setWordIndex((prev) => (prev + 1) % words.length);
      }, 2000);
    }
  }, [charIndex, wordIndex]);

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex flex-col justify-center items-center bg-[#080807] overflow-hidden"
    >
      <h1
        ref={headingRef}
        className="text-[100px] md:text-[200px] leading-none text-[#D1D1C7] mb-4 whitespace-pre"
        aria-label="FAZLE RABBI"
      >
        {"FAZLE RABBI".split("").map((ch, i) =>
          ch === " " ? (
            <>
              {/* Mobile: break line */}
              <br key={`br-${i}`} className="block sm:hidden" />
              {/* Desktop/tablet: show non-breaking space but keep char structure for animation (hidden on mobile) */}
              <span
                key={`space-${i}`}
                className="char-wrapper hidden sm:inline overflow-hidden align-baseline"
              >
                <span className="char-inner inline-block will-change-transform">
                  {"\u00A0"}
                </span>
              </span>
            </>
          ) : (
            <span
              key={i}
              className="char-wrapper inline-block overflow-hidden align-baseline"
            >
              <span className="char-inner inline-block will-change-transform">
                {ch}
              </span>
            </span>
          )
        )}
      </h1>
      <p className="text-2xl">I am a {text}|</p>
    </section>
  );
}
