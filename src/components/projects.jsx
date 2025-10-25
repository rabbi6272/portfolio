import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Ruet CSE Archive",
    desc: "A website for the CSE department.",
    image: "/projects/csearchive.png",
    link: "https://ruetcsearchive.app/",
  },
  {
    title: "Shoppify App",
    desc: "A modern shopping platform.",
    image: "/projects/shoppify.png",
    link: "https://next-shoppify.vercel.app/",
  },
  {
    title: "MovieHub App",
    desc: "Browse and save your favorite movies.",
    image: "/projects/movieshub.png",
    link: "https://next-movieshub.vercel.app/",
  },
  {
    title: "Todo App",
    desc: "Personal task manager.",
    image: "/projects/todolist.png",
    link: "https://next-to-do-list-self.vercel.app/",
  },
  {
    title: "Guess Game",
    desc: "A game to guess the number.",
    image: "/projects/guessgame.png",
    link: "https://the-guess-game.vercel.app/",
  },
];

export default function Projects() {
  const containerRef = useRef();
  const wrapperRef = useRef();
  const textRef = useRef();
  const textContainerRef = useRef();

  // Scroll text reveal
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

  // Horizontal Scroll
  useEffect(() => {
    const el = containerRef.current;

    // Set initial position
    gsap.set(el, { xPercent: 0 });

    const animation = gsap.to(el, {
      xPercent: -100,
      ease: "none",
      scrollTrigger: {
        trigger: wrapperRef.current,
        pin: true,
        scrub: 2,
        snap: 1 / (projects.length - 1),
        start: "top top",
        end: () => `+=${window.innerWidth * 4}`,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      animation.kill();
    };
  }, []);

  return (
    <section id="projects" ref={textContainerRef} className="text-gray-100">
      <h1
        ref={textRef}
        className="text-5xl md:text-7xl text-[#EDEDE8] font-medium leading-[0.9] overflow-hidden mb-12 text-center "
      >
        My works
      </h1>

      <div ref={wrapperRef} className="wrapper overflow-hidden">
        {/* wrapper is trigger */}
        <div
          ref={containerRef}
          className="flex w-[400vw] h-auto"
          id="horizontal-container"
        >
          {/* container is scrollable */}
          {projects.map((proj, i) => (
            <div
              key={i}
              className="project-card h-screen w-screen flex-shrink-0 grid place-items-center"
            >
              <div className="w-[95vw] md:w-[70vw] h-[50vh] md:h-[70vh] xl:h-[90vh] bg-gray-900 border border-gray-700 rounded-lg flex flex-col items-center justify-center ">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="aspect-[4/3] w-full p-2 object-cover object-top overflow-hidden rounded-xl"
                />
                <div className="w-full flex flex-col items-center p-4 md:p-6 lg:p-8">
                  <h3 className="text-3xl font-medium font-sans mb-2">
                    <a href={proj.link}>{proj.title}</a>
                  </h3>
                  <p className="max-w-md">{proj.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
