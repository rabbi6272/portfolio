import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef();
  const helloTextRef = useRef();
  const avatarRef = useRef();
  const headingRef = useRef();
  const bgContainerRef = useRef();
  const bottomRef = useRef();

  //  bg-container and hello text animation on page load
  useEffect(() => {
    if (!bgContainerRef.current || !helloTextRef.current) return;

    const tl = gsap.timeline();

    tl.fromTo(
      bgContainerRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        ease: "linear",
      },
    );
    tl.to(helloTextRef.current, {
      opacity: 0,
      duration: 1,
      ease: "linear",
    });
    tl.set(helloTextRef.current, { display: "none" });

    tl.to(bgContainerRef.current, {
      width: "100%",
      height: "100%",
      borderRadius: "0px",
      duration: 1,
      ease: "linear",
    });
  }, []);

  // Heading animation on page load
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

    const tl = gsap.timeline({ delay: 3.2 }); // Start after bg and hello text animations
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
      },
    );
    tl.fromTo(
      avatarRef.current,
      { y: "-100%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 1.2,
      },
    );
  }, []);

  // Scroll-triggered fade out of hero section
  useEffect(() => {
    if (!heroRef.current || !bottomRef.current) return;

    gsap.set(heroRef.current, {
      position: "fixed",
      top: 0,
      height: "100vh",
      width: "100%",
    });

    gsap.to(heroRef.current, {
      opacity: 0,
      backgroundColor: "#080807",
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
      <section ref={heroRef} className="h-auto bg-[#080807] overflow-hidden">
        <div
          ref={bgContainerRef}
          className="bg-[#E8E8E3] w-[40%] lg:w-[30%] 2xl:w-[20%] h-[20vh] xl:h-[30vh] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl"
        >
          {/* Hello Text */}
          <div
            ref={helloTextRef}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
          >
            <h2 className="text-[30px] md:text-[40px] lg:text-[50px] font-medium text-[#080807] m-0 text-center">
              Hello, There!
            </h2>
          </div>

          {/* Navigation bar*/}
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
          <div className="name-container relative flex flex-col items-center justify-center z-100">
            <h1
              ref={headingRef}
              className="hero-name text-[120px] md:text-[140px] lg:text-[160px] xl:text-[240px] font-semibold leading-[.8] lg:leading-none text-[#080807] mb-0 lg:mb-4 text-center whitespace-pre"
              aria-label="FAZLE RABBI"
            >
              {"FAZLE RABBI".split("").map((ch, i) =>
                ch === " " ? (
                  <span key={i} className="space-wrapper">
                    <br className="block sm:hidden" />
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
                ),
              )}
            </h1>
            <div className="w-full px-4 md:px-6 lg:px-10 flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-0">
              <div className="flex-1" id="hero-text-left">
                <p className="text-lg lg:text-xl font-normal lg:font-medium text-[#6B645C] w-full md:max-w-[300px] lg:max-w-[350px] text-justify">
                  Open to job opportunities worldwide. Passionate about creating
                  visually stunning and user-friendly web experiences that leave
                  a mark.
                </p>
                <a href="#contact">
                  <button className="px-8 py-3 bg-[#6B645C] hover:bg-[#080807] text-[#E8E8E3] text-xl rounded-full mt-4 transition duration-300">
                    Get in Touch
                  </button>
                </a>
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
                  <h1 className="text-right text-[60px] lg:text-[100px] font-medium text-[#080807] leading-20 m-0">
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
              className="rounded-2xl object-cover"
            />
          </div>
        </div>
      </section>
      <div className="h-0" ref={bottomRef}></div>
    </>
  );
}
