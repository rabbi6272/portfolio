import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const textRef = useRef();
  const textContainerRef = useRef();
  useEffect(() => {
    if (!textRef.current) return;

    let split = SplitText.create(textRef.current, {
      type: "chars",
    });
    gsap.from(split.chars, {
      y: -70,
      duration: 0.5,
      ease: "linear",
      stagger: 0.1,
      scrollTrigger: {
        trigger: textContainerRef.current,
        start: "top 50%",
        end: "top top",
        once: true,
        scrub: true,
      },
    });
    return () => {
      split.revert();
    };
  }, []);

  useEffect(() => {
    gsap.fromTo(
      textContainerRef.current.querySelectorAll("input, textarea, button"),
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        stagger: 0.2,
        duration: 1.5,
        ease: "back.out",
        scrollTrigger: {
          trigger: textContainerRef.current,
          start: "top 15%",
        },
      }
    );
  }, []);

  return (
    <section
      ref={textContainerRef}
      id="contact"
      className="contact h-screen flex flex-col items-center justify-center px-8"
    >
      <h3
        ref={textRef}
        className="text-5xl md:text-7xl text-[#EDEDE8] font-medium leading-[0.9] overflow-hidden mb-12"
      >
        Contact me
      </h3>

      <p className="text-center text-[#B9B9B1] text-lg md:text-xl max-w-2xl mb-8">
        Got a project in mind or just want to chat about web development? I'm
        always open to discussing new opportunities, collaborations, or simply
        connecting with fellow developers.
      </p>

      <form className="w-full max-w-md flex flex-col gap-4">
        <input
          type="text"
          placeholder="Your Name"
          required
          className="p-4 rounded-lg bg-gray-800 text-[#EDEDE8] outline-none focus:ring-2 focus:ring-blue-500 transition placeholder:text-gray-400"
        />
        <input
          type="email"
          placeholder="Your Email"
          required
          className="p-4 rounded-lg bg-gray-800 text-[#EDEDE8] outline-none focus:ring-2 focus:ring-blue-500 transition placeholder:text-gray-400"
        />
        <textarea
          rows="5"
          placeholder="Your Message"
          required
          className="p-4 rounded-lg bg-gray-800 text-[#EDEDE8] outline-none focus:ring-2 focus:ring-blue-500 transition placeholder:text-gray-400 resize-none"
        />
        <button
          type="submit"
          className="text-[#EDEDE8] bg-blue-600 hover:bg-blue-700 py-3 px-6 rounded-lg font-semibold transition duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Send Message
        </button>
      </form>

      <div className="mt-12 flex flex-col items-center gap-4">
        <p className="text-[#B9B9B1] text-sm">Or reach out directly</p>
        <div className="flex gap-6 text-[#EDEDE8]">
          <a
            href="https://facebook.com/frabbi6272"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition duration-300 text-lg"
          >
            Facebook
          </a>
          <a
            href="mailto:mmrabbi625442@gmail.com" // Replace with your email.email@google.com"
            className="hover:text-blue-500 transition duration-300 text-lg"
          >
            Email
          </a>
          <a
            href="https://github.com/rabbi6272"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition duration-300 text-lg"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/fazle-rabbi-b48a722a2/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition duration-300 text-lg"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
