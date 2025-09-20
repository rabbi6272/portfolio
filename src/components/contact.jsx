import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Contact() {
  const contactRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      contactRef.current.querySelectorAll("input, textarea, button"),
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        stagger: 0.2,
        duration: 0.6,
        ease: "back.out",
      }
    );
  }, []);

  return (
    <section
      ref={contactRef}
      className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-8"
    >
      <h2 className="text-4xl font-bold mb-6">Contact</h2>
      <form className="w-full max-w-md flex flex-col gap-4">
        <input
          type="text"
          placeholder="Name"
          className="p-3 rounded bg-gray-800 outline-none"
        />
        <input
          type="email"
          placeholder="Email"
          className="p-3 rounded bg-gray-800 outline-none"
        />
        <textarea
          rows="4"
          placeholder="Message"
          className="p-3 rounded bg-gray-800 outline-none"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 py-2 rounded font-semibold"
        >
          Send
        </button>
      </form>
    </section>
  );
}
