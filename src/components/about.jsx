import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function About() {
  const aboutRef = useRef();

  useEffect(() => {
    const letters = aboutRef.current.querySelectorAll("span");
    gsap.fromTo(
      letters,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.05, duration: 0.8, ease: "back.out" }
    );
  }, []);

  const text = "I’m a passionate developer building smooth and modern apps.";

  return (
    <section
      ref={aboutRef}
      className="min-h-screen flex items-center justify-center bg-gray-800 text-white px-8"
    >
      <h2 className="text-3xl font-semibold max-w-2xl text-center">
        {text.split("").map((char, i) => (
          <span key={i} className="inline-block">
            {char}
          </span>
        ))}
      </h2>
    </section>
  );
}
