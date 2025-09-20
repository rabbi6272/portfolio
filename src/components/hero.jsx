import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const words = ["Web Developer", "React Enthusiast", "Creative Coder"];

export default function Hero() {
  const heroRef = useRef();
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

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

  // Zoom-in effect
  useEffect(() => {
    gsap.fromTo(
      heroRef.current.querySelector("h1"),
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5, ease: "power4.out" }
    );
  }, []);

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white"
    >
      <h1 className="text-7xl font-bold mb-4">Hi, I’m Rabbi 👋</h1>
      <p className="text-2xl text-blue-400">I am a {text}|</p>
    </section>
  );
}
