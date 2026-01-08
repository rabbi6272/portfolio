import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Hero({ aboutRef }) {
  const avatarRef = useRef();
  const headingRef = useRef();
  const heroRef = useRef();
  const bgContainerRef = useRef();
  const bottomRef = useRef();

  // Animate bg-container with GSAP to prevent CSS animation from running twice
  useEffect(() => {
    if (!bgContainerRef.current) return;

    gsap.fromTo(
      bgContainerRef.current,
      { y: "-100%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 1.5, ease: "power2.out" }
    );
  }, []);

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

    const tl = gsap.timeline({ delay: 1.5 });
    tl.fromTo(
      chars,
      { y: "1.1em", opacity: 0, willChange: "transform" },
      {
        y: "0em",
        opacity: 1,
        duration: 0.8,
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
        duration: 1,
      }
    );
  }, []);

  // Fade out the entire Hero while keeping it pinned as the next section scrolls
  // useEffect(() => {
  //   if (!heroRef.current) return;
  //   const el = heroRef.current;

  //   const fade = gsap.to(el, {
  //     opacity: 0,

  //     ease: "none",
  //     scrollTrigger: {
  //       trigger: el,
  //       start: "top top",
  //       end: "+=30%", // fade out 20% before next section
  //       scrub: true,
  //       pin: true,
  //       pinSpacing: true, // keeps layout space so next section scrolls up
  //     },
  //   });

  //   return () => {
  //     fade.kill();
  //   };
  // }, []);

  useEffect(() => {
    if (!heroRef.current || !bottomRef.current) return;

    gsap.set(heroRef.current, { position: "fixed", top: 0 });

    gsap.to(heroRef.current, {
      opacity: 0,
      scrollTrigger: {
        trigger: bottomRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        pin: false,
      },
    });
  }, []);

  const handleMenuToggle = () => {
    // Implement menu toggle functionality for mobile view
    alert("Menu toggle clicked!");
  };

  return (
    <>
      <section
        ref={heroRef}
        className="h-screen border bg-[#080807] overflow-hidden"
      >
        <div ref={bgContainerRef} className="bg-[#E8E8E3] w-[100vw] h-[100vh]">
          {/* Navigation bar */}
          <nav className="navbar-container text-[#6B645C] h-[70px] flex items-center justify-between px-4 md:px-6 xl:px-8 leading-none overflow-hidden">
            <p className="hidden lg:block text-xl font-normal">
              Web Developer & Creative Coder
            </p>
            <p className="block lg:hidden text-xl font-normal">
              Web Developer & <br />
              Creative Coder
            </p>

            <div className="hidden lg:flex gap-4">
              <a
                href="#about"
                className="font-medium text-xl hover:text-black transition-colors duration-300"
              >
                About
              </a>
              <a
                href="#projects"
                className="font-medium text-xl hover:text-black transition-colors duration-300"
              >
                Works
              </a>
              <a
                href="#contact"
                className="font-medium text-xl hover:text-black transition-colors duration-300"
              >
                Contact
              </a>
            </div>
            <div className="block lg:hidden">
              <button className="cursor-pointer" onClick={handleMenuToggle}>
                <img src="menu.svg" alt="menu" />
              </button>
            </div>
          </nav>

          {/* Main body content */}
          <div className="name-container relative flex flex-col items-center justify-center z-10">
            <h1
              ref={headingRef}
              className="hero-name text-[120px] md:text-[140px] lg:text-[160px] xl:text-[240px] font-semibold leading-[.8] lg:leading-none text-[#080807] mb-0 lg:mb-4 text-center whitespace-pre"
              aria-label="FAZLE RABBI"
            >
              {"FAZLE RABBI".split("").map((ch, i) =>
                ch === " " ? (
                  <span key={i} className="space-wrapper">
                    {/* Mobile: break line */}
                    <br className="block sm:hidden" />
                    {/* Desktop/tablet: show non-breaking space but keep char structure for animation (hidden on mobile) */}
                    <span className="char-wrapper hidden sm:inline overflow-hidden align-baseline">
                      <span className="char-inner inline-block will-change-transform">
                        {"\u00A0"}
                      </span>
                    </span>
                  </span>
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
            <div className="w-full px-4 md:px-6 lg:px-10 flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-0">
              <div className="flex-1" id="hero-text-left">
                <p className="text-lg lg:text-xl font-normal lg:font-medium text-[#6B645C] w-full md:max-w-[300px] lg:max-w-[350px] text-justify">
                  Open to job opportunities worldwide. Passionate about creating
                  visually stunning and user-friendly web experiences that leave
                  a mark.
                </p>
                <button className="px-10 py-3 bg-[#6B645C] hover:bg-[#080807] text-[#E8E8E3] text-xl rounded-full mt-4 transition duration-300">
                  Contact
                </button>
              </div>
              <div
                className="flex-1 w-full flex items-center justify-between lg:justify-end"
                id="hero-text-right"
              >
                <div className="block lg:hidden max-h-full w-[100px] ">
                  <img
                    src="avatar_b&w.jpg"
                    alt="avatar"
                    className=" rounded-2xl object-cover"
                  />
                </div>
                <div>
                  <p className="text-lg lg:text-2xl font-normal lg:font-medium text-[#6B645C] m-0">
                    Available for work?
                  </p>
                  <h1 className="text-right text-[60px] lg:text-[100px] font-medium text-[#080807] m-0">
                    Yes
                  </h1>
                </div>
              </div>
            </div>
          </div>

          {/* Full Avatar in background */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden lg:block lg:w-[320px] xl:w-[360px] z-5 overflow-hidden">
            <img
              ref={avatarRef}
              src="avatar_b&w.jpg"
              alt="avatar"
              className=" rounded-2xl object-cover"
            />
          </div>
        </div>
      </section>
      <div className="h-0" ref={bottomRef}></div>
    </>
  );
}
