import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const aboutRef = useRef();

  // Staggered reveal + counters on scroll
  useEffect(() => {
    const section = aboutRef?.current;
    if (!section) return;

    const revealEls = section.querySelectorAll(".about-stagger");
    gsap.set(revealEls, { y: 24, opacity: 0 });
    gsap.to(revealEls, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.12,
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        once: true,
      },
    });

    // Counters
    const counters = section.querySelectorAll("[data-counter]");
    counters.forEach((el) => {
      const end = parseInt(el.getAttribute("data-counter") || "0", 10);
      const obj = { val: 0 };
      gsap.to(obj, {
        val: end,
        duration: 1.2,
        ease: "power1.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
        onUpdate: () => {
          el.textContent = Math.round(obj.val).toString();
        },
      });
    });
  }, [aboutRef]);

  return (
    <section
      id="about"
      ref={aboutRef}
      className="relative min-h-screen bg-[#0B0B0A] text-[#E8E8E3] px-6 md:px-10 py-24 flex items-center"
    >
      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute -top-10 -left-10 w-72 h-72 bg-gradient-to-br from-purple-600/20 to-blue-500/10 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-emerald-500/10 to-cyan-500/10 blur-3xl rounded-full" />

      <div className="relative mx-auto w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
        {/* Left column */}
        <div>
          <h2 className="about-stagger text-4xl md:text-6xl font-semibold leading-tight text-[#EDEDE8]">
            Undergraduate CSE Student at RUET
          </h2>
          <p className="about-stagger mt-4 text-base md:text-lg text-[#B9B9B1] max-w-prose">
            I’m <span className="font-semibold text-white">Fazle Rabbi</span>, a
            full-stack developer from Bangladesh. I love building fast,
            accessible web experiences with React, Tailwind, and GSAP—especially
            micro-interactions and motion that bring interfaces to life.
          </p>

          <div className="about-stagger mt-6 text-2xl md:text-3xl font-medium">
            I am a{" "}
            <RotatingText
              texts={[
                "UG CSE @ RUET",
                "Developer",
                "Creative Coder",
                "Tech Enthusiast",
              ]}
              splitBy="characters"
            />
          </div>

          {/* Chips */}
          {/* <div className="about-stagger mt-6 flex flex-wrap gap-2">
            {[
              "React",
              "GSAP",
              "Tailwind",
              "UI Animation",
              "Algorithms",
              "Open Source",
            ].map((chip) => (
              <span
                key={chip}
                className="px-3 py-1 rounded-full text-sm bg-white/5 border border-white/10 text-[#D9D9D2] backdrop-blur"
              >
                {chip}
              </span>
            ))}
          </div> */}

          {/* CTAs */}
          <div className="about-stagger mt-8 flex gap-3">
            <a
              href="#projects"
              className="px-5 py-2.5 rounded-lg bg-emerald-500 text-[#0A0A09] font-semibold hover:bg-emerald-400 transition-colors"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-lg border border-white/10 text-[#EDEDE8] hover:border-white/30 transition-colors"
            >
              Contact Me
            </a>
          </div>
        </div>

        {/* Right column */}
        <div className="grid gap-6">
          {/* Education - Timeline */}
          <div className="about-stagger rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h3 className="text-2xl font-medium text-[#EDEDE8]">Education</h3>

            <div className="about-timeline relative mt-5 pl-6">
              {/* Vertical bar we can animate */}
              <span className="timeline-bar absolute left-2 top-0 w-[2px] h-[85%] rounded-full bg-gradient-to-b from-gray-400 to-gray-700 origin-top" />

              <ol className="space-y-6">
                <li className="timeline-item relative">
                  <span className="absolute -left-[9px] top-1 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-emerald-400/20" />
                  <time className="pl-2 block text-xs uppercase tracking-wide text-[#AFAFA8]">
                    2025 — Present
                  </time>
                  <p className="text-sm text-[#C9C9C1]">B.Sc. in CSE</p>
                  <p className=" text-[#AFAFA8] font-medium">
                    Rajshahi University of Engineering & Technology
                  </p>
                </li>

                <li className="timeline-item relative">
                  <span className="absolute -left-[9px] top-1 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-emerald-400/20" />
                  <time className="pl-2 block text-xs uppercase tracking-wide text-[#AFAFA8]">
                    2024
                  </time>
                  <p className="text-[#C9C9C1] text-sm">
                    HSC — Higher Secondary Certificate
                  </p>
                  <p className="text-[#C9C9C1] font-medium">
                    Govt. Sundarban Adarsha College, Khulna
                  </p>
                </li>

                <li className="timeline-item relative">
                  {/* Dot */}
                  <span className="absolute -left-[9px] top-1 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-emerald-400/20" />
                  <time className="pl-2 block text-xs uppercase tracking-wide text-[#AFAFA8]">
                    2022
                  </time>
                  <p className="text-[#C9C9C1] text-sm">
                    SSC — Secondary School Certificate
                  </p>
                  <p className="text-[#C9C9C1] font-medium">
                    Paikgacha Govt High School, Khulna
                  </p>
                </li>
              </ol>
            </div>
          </div>

          {/* Current Focus */}
          <div className="about-stagger rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h3 className="text-2xl font-medium text-[#EDEDE8]">
              Current Focus
            </h3>
            <ul className="mt-2 space-y-1 text-[#C9C9C1] list-disc list-inside">
              <li>Advanced Programming Concepts</li>
              <li>Full-Stack Web Development</li>
              <li>Learning through Open Source</li>
            </ul>
          </div>

          {/* Stats */}
          {/* <div className="about-stagger rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-extrabold text-[#EDEDE8]">
                  <span data-counter="12">0</span>
                </div>
                <p className="text-xs uppercase tracking-wide text-[#AFAFA8] mt-1">
                  Projects
                </p>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-[#EDEDE8]">
                  <span data-counter="25">0</span>
                </div>
                <p className="text-xs uppercase tracking-wide text-[#AFAFA8] mt-1">
                  UI Animations
                </p>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-[#EDEDE8]">
                  <span data-counter="3">0</span>
                </div>
                <p className="text-xs uppercase tracking-wide text-[#AFAFA8] mt-1">
                  Hackathons
                </p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const RotatingText = forwardRef((props, ref) => {
  const {
    texts,
    transition = { type: "spring", damping: 25, stiffness: 200 },
    initial = { y: "100%", opacity: 0 },
    animate = { y: 0, opacity: 1 },
    exit = { y: "-120%", opacity: 0 },
    rotationInterval = 1500,
    staggerDuration = 0.025,
    staggerFrom = "first",
    loop = true,
    auto = true,
    splitBy = "characters",
    onNext,
    mainClassName,
    splitLevelClassName,
    elementLevelClassName,
    ...rest
  } = props;

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const containerRef = useRef(null);

  const splitIntoCharacters = (text) => {
    if (typeof Intl !== "undefined" && Intl.Segmenter) {
      const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
      return Array.from(segmenter.segment(text), (segment) => segment.segment);
    }
    return Array.from(text);
  };

  const elements = useMemo(() => {
    const currentText = texts[currentTextIndex];
    if (splitBy === "characters") {
      const words = currentText.split(" ");
      return words.map((word, i) => ({
        characters: splitIntoCharacters(word),
        needsSpace: i !== words.length - 1,
      }));
    }
    if (splitBy === "words") {
      return currentText.split(" ").map((word, i, arr) => ({
        characters: [word],
        needsSpace: i !== arr.length - 1,
      }));
    }
    if (splitBy === "lines") {
      return currentText.split("\n").map((line, i, arr) => ({
        characters: [line],
        needsSpace: i !== arr.length - 1,
      }));
    }

    return currentText.split(splitBy).map((part, i, arr) => ({
      characters: [part],
      needsSpace: i !== arr.length - 1,
    }));
  }, [texts, currentTextIndex, splitBy]);

  const getStaggerDelay = useCallback(
    (index, total) => {
      if (staggerFrom === "first" || staggerFrom === "start")
        return index * staggerDuration;
      if (staggerFrom === "last" || staggerFrom === "end")
        return (total - 1 - index) * staggerDuration;
      if (staggerFrom === "center") {
        const center = Math.floor((total - 1) / 2);
        return Math.abs(center - index) * staggerDuration;
      }
      if (staggerFrom === "random") {
        const randomIndex = Math.floor(Math.random() * total);
        return Math.abs(randomIndex - index) * staggerDuration;
      }
      return Math.abs(staggerFrom - index) * staggerDuration;
    },
    [staggerFrom, staggerDuration]
  );

  const getGSAPVars = (vars) => ({
    yPercent: parseFloat(vars.y) || vars.y,
    opacity: vars.opacity,
  });

  const getEase = () => {
    if (transition.type === "spring") {
      return "elastic.out(1, 0.75)"; // Approximate spring effect
    }
    return "power1.inOut";
  };

  const animationDuration = 0.8; // Hardcoded duration; adjust as needed to match spring feel

  const handleIndexChange = useCallback(
    (newIndex) => {
      if (newIndex === currentTextIndex) return;

      const chars = containerRef.current.querySelectorAll(".rotating-element");
      if (chars.length === 0) {
        setCurrentTextIndex(newIndex);
        if (onNext) onNext(newIndex);
        return;
      }

      const totalChars = chars.length;
      gsap.to(chars, {
        ...getGSAPVars(exit),
        duration: animationDuration,
        ease: getEase(),
        stagger: (i) => getStaggerDelay(i, totalChars),
        onComplete: () => {
          setCurrentTextIndex(newIndex);
          if (onNext) onNext(newIndex);
        },
      });
    },
    [
      currentTextIndex,
      exit,
      animationDuration,
      getEase,
      getStaggerDelay,
      onNext,
    ]
  );

  const next = useCallback(() => {
    const nextIndex =
      currentTextIndex === texts.length - 1
        ? loop
          ? 0
          : currentTextIndex
        : currentTextIndex + 1;
    handleIndexChange(nextIndex);
  }, [currentTextIndex, texts.length, loop, handleIndexChange]);

  const previous = useCallback(() => {
    const prevIndex =
      currentTextIndex === 0
        ? loop
          ? texts.length - 1
          : currentTextIndex
        : currentTextIndex - 1;
    handleIndexChange(prevIndex);
  }, [currentTextIndex, texts.length, loop, handleIndexChange]);

  const jumpTo = useCallback(
    (index) => {
      const validIndex = Math.max(0, Math.min(index, texts.length - 1));
      handleIndexChange(validIndex);
    },
    [texts.length, handleIndexChange]
  );

  const reset = useCallback(() => {
    handleIndexChange(0);
  }, [handleIndexChange]);

  useImperativeHandle(
    ref,
    () => ({
      next,
      previous,
      jumpTo,
      reset,
    }),
    [next, previous, jumpTo, reset]
  );

  useEffect(() => {
    if (!auto) return;
    const intervalId = setInterval(next, rotationInterval);
    return () => clearInterval(intervalId);
  }, [next, rotationInterval, auto]);

  useLayoutEffect(() => {
    const chars = containerRef.current.querySelectorAll(".rotating-element");
    if (chars.length === 0) return;

    const totalChars = chars.length;
    gsap.fromTo(chars, getGSAPVars(initial), {
      ...getGSAPVars(animate),
      duration: animationDuration,
      ease: getEase(),
      stagger: (i) => getStaggerDelay(i, totalChars),
    });
  }, [
    currentTextIndex,
    initial,
    animate,
    animationDuration,
    getEase,
    getStaggerDelay,
  ]);

  return (
    <span
      ref={containerRef}
      className={cn(
        " flex flex-wrap whitespace-pre-wrap relative overflow-hidden",
        mainClassName
      )}
      {...rest}
    >
      <span className="sr-only">{texts[currentTextIndex]}</span>
      <span
        className={cn(
          splitBy === "lines"
            ? "flex flex-col w-full"
            : "flex flex-wrap whitespace-pre-wrap relative"
        )}
        aria-hidden="true"
      >
        {elements.map((wordObj, wordIndex, array) => {
          return (
            <span
              key={wordIndex}
              className={cn("inline-flex", splitLevelClassName)}
            >
              {wordObj.characters.map((char, charIndex) => (
                <span
                  key={charIndex}
                  className={cn(
                    "inline-block rotating-element",
                    elementLevelClassName
                  )}
                >
                  {char}
                </span>
              ))}
              {wordObj.needsSpace && <span className="whitespace-pre"> </span>}
            </span>
          );
        })}
      </span>
    </span>
  );
});
