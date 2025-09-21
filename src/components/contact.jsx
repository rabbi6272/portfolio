import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Contact() {
  const contactRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      contactRef.current.querySelectorAll("input, textarea, button"),
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        stagger: 0.2,
        duration: 1.5,
        ease: "back.out",
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top 15%",
        },
      }
    );
  }, []);

  return (
    <section
      ref={contactRef}
      className="contact min-h-screen flex flex-col items-center justify-center px-8"
    >
      <h2 className="text-4xl font-bold mb-6">Contact</h2>
      <form className="w-full max-w-md flex flex-col gap-4 ">
        <input
          type="text"
          placeholder="Name"
          className="p-3 rounded bg-gray-800 outline-none placeholder:text-gray-300 *:"
        />
        <input
          type="email"
          placeholder="Email"
          className="p-3 rounded bg-gray-800 outline-none placeholder:text-gray-300 *:"
        />
        <textarea
          rows="4"
          placeholder="Message"
          className="p-3 rounded bg-gray-800 outline-none placeholder:text-gray-300 *:"
        />
        <button
          type="submit"
          className="text-white bg-blue-500 hover:bg-blue-600 py-2 rounded font-semibold"
        >
          Send
        </button>
      </form>
    </section>
  );
}
