import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const words = ["Web Developer", "React Enthusiast", "Creative Coder"];

export default function Hero() {
  const heroRef = useRef();
  const avatarRef = useRef();
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

    const tl = gsap.timeline({ delay: 2 });
    tl.fromTo(
      chars,
      { y: "1.1em", opacity: 0, willChange: "transform" },
      {
        y: "0em",
        opacity: 1,
        duration: 1,
        stagger: { each: 0.05, from: 0 },
        force3D: true,
        autoRound: false,
      }
    );
    tl.fromTo(
      avatarRef.current,
      { y: "-100%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 1.5,
      }
    );
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
      className="min-h-screen bg-[#080807] overflow-hidden"
    >
      <div className="bg-container bg-[#E8E8E3] w-[100vw] h-[100vh]">
        <nav className="navbar-container text-[#6B645C] h-[70px] flex items-center justify-between px-4 md:px-6 xl:px-8 leading-none overflow-hidden">
          <p className="text-xl font-normal">Web Developer & Creative Coder</p>
          <div className="hidden lg:flex gap-4">
            <a className="nav-links font-medium">About</a>
            <a className="nav-links font-medium">Works</a>
            <a className="nav-links font-medium">Contact</a>
          </div>
        </nav>
        <div className="name-container relative flex items-center justify-center z-10">
          <h1
            ref={headingRef}
            className="text-[100px] md:text-[120px] lg:text-[150px] xl:text-[200px] leading-none text-[#080807] font-medium mb-4 text-center whitespace-pre"
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
          {/* <p className="text-2xl">I am a {text}|</p> */}
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden lg:block lg:w-[320px] xl:w-[360px] z-5 overflow-hidden">
          <img
            ref={avatarRef}
            src="avatar.jpg"
            alt="avatar"
            className=" rounded-2xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}
