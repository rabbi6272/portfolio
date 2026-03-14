import { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const heroRef = useRef();
  const helloTextRef = useRef();
  const avatarRef = useRef();
  const headingRef = useRef();
  const bgContainerRef = useRef();
  const bottomRef = useRef();
  const menuButtonRef = useRef();
  const mobileOverlayRef = useRef();
  const mobileLinkRefs = useRef([]);
  const menuOriginRef = useRef({ x: 0, y: 0 });

  const mobileLinks = [
    { label: "About", href: "#about" },
    { label: "Works", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  //  bg-container and hello text animation on page load
  useEffect(() => {
    if (!bgContainerRef.current || !helloTextRef.current) return;

    const tl = gsap.timeline();

    tl.fromTo(
      bgContainerRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.8,
        ease: "linear",
      },
    );
    tl.to(helloTextRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: "linear",
    });
    tl.set(helloTextRef.current, { display: "none" });

    tl.to(bgContainerRef.current, {
      width: "100%",
      height: "100%",
      borderRadius: "0px",
      duration: 1.4,
      ease: "power3.inOut",
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

    const tl = gsap.timeline({ delay: 3 });
    tl.fromTo(
      chars,
      { y: "0.8em", opacity: 0, willChange: "transform" },
      {
        y: "0em",
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
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
        ease: "power3.out",
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
        onLeave: () => {
          gsap.set(heroRef.current, { pointerEvents: "none" });
        },
        onEnterBack: () => {
          gsap.set(heroRef.current, { pointerEvents: "auto" });
        },
      },
    });
  }, []);

  const openMobileMenu = () => {
    if (!mobileOverlayRef.current || !menuButtonRef.current) return;

    const buttonRect = menuButtonRef.current.getBoundingClientRect();
    const originX = buttonRect.left + buttonRect.width / 2;
    const originY = buttonRect.top + buttonRect.height / 2;
    menuOriginRef.current = { x: originX, y: originY };

    gsap.set(mobileOverlayRef.current, {
      display: "flex",
      pointerEvents: "auto",
      clipPath: `circle(0px at ${originX}px ${originY}px)`,
    });
    gsap.set(mobileLinkRefs.current, {
      opacity: 0,
      y: 20,
    });

    gsap
      .timeline({
        onStart: () => setIsMenuOpen(true),
      })
      .to(mobileOverlayRef.current, {
        clipPath: `circle(150vmax at ${originX}px ${originY}px)`,
        duration: 0.9,
        ease: "power3.inOut",
      })
      .to(
        mobileLinkRefs.current,
        {
          delay: 0.3,
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out",
        },
        "<0.25",
      );
  };

  const closeMobileMenu = () => {
    if (!mobileOverlayRef.current) return;
    const { x, y } = menuOriginRef.current;

    gsap
      .timeline({
        onComplete: () => {
          gsap.set(mobileOverlayRef.current, {
            display: "none",
            pointerEvents: "none",
          });
          setIsMenuOpen(false);
        },
      })
      .to(mobileLinkRefs.current, {
        opacity: 0,
        y: 20,
        duration: 0.2,
        stagger: 0.05,
        ease: "power2.in",
      })
      .to(
        mobileOverlayRef.current,
        {
          clipPath: `circle(0px at ${x}px ${y}px)`,
          duration: 0.55,
          ease: "power3.inOut",
        },
        "<",
      );
  };

  const handleMenuToggle = () => {
    if (isMenuOpen) {
      closeMobileMenu();
      return;
    }
    openMobileMenu();
  };

  return (
    <>
      {/* Hello Text */}
      <div
        ref={helloTextRef}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
      >
        <h2 className="text-[30px] md:text-[40px] font-medium text-[#080807] m-0 text-center">
          Hello, There!
        </h2>
      </div>

      {/* Mobile menu overlay */}
      <div
        ref={mobileOverlayRef}
        className="fixed inset-0 z-[200] hidden items-center justify-center bg-[#080807] lg:hidden"
      >
        <span
          className="absolute top-4 right-4 cursor-pointer"
          onClick={closeMobileMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 15 15"
          >
            <path
              fill="#e8e8e3"
              d="M3.64 2.27L7.5 6.13l3.84-3.84A.92.92 0 0 1 12 2a1 1 0 0 1 1 1a.9.9 0 0 1-.27.66L8.84 7.5l3.89 3.89A.9.9 0 0 1 13 12a1 1 0 0 1-1 1a.92.92 0 0 1-.69-.27L7.5 8.87l-3.85 3.85A.92.92 0 0 1 3 13a1 1 0 0 1-1-1a.9.9 0 0 1 .27-.66L6.16 7.5L2.27 3.61A.9.9 0 0 1 2 3a1 1 0 0 1 1-1c.24.003.47.1.64.27"
            />
          </svg>
        </span>

        <div className="flex flex-col items-center gap-8">
          {mobileLinks.map((link, index) => (
            <a
              key={link.href}
              ref={(element) => {
                mobileLinkRefs.current[index] = element;
              }}
              href={link.href}
              onClick={closeMobileMenu}
              className="text-[#e8e8e3] text-4xl font-medium leading-none"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <section ref={heroRef} className="h-auto bg-[#080807] overflow-hidden">
        <div
          ref={bgContainerRef}
          className="bg-[#E8E8E3] w-[40%] lg:w-[30%] 2xl:w-[20%] h-[20vh] xl:h-[30vh] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl"
        >
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
              <button
                ref={menuButtonRef}
                className="cursor-pointer"
                onClick={handleMenuToggle}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                <img src="menu.svg" alt="menu" />
              </button>
            </div>
          </nav>

          {/* Main body content */}
          <div className="name-container relative flex flex-col items-center justify-center z-100">
            <h1
              ref={headingRef}
              className="hero-name text-[120px] md:text-[140px] lg:text-[160px] xl:text-[240px] font-semibold leading-[.8] text-[#080807] pb-10 sm:pb-0 lg:mb-4 text-center whitespace-pre"
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
