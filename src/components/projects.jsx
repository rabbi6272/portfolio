import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Ruet CSE Archive",
    desc: "A versatile archival portal for RUET CSE—centralizes course notes, events, and alumni resources. Built with Next.js and Tailwind, it features responsive design, client-side search, and serverless endpoints for content management.",
    image: "/projects/csearchive.png",
    link: "https://ruetcsearchive.app/",
  },
  {
    title: "Shoppify App",
    desc: "A modern e-commerce storefront with product browsing, cart and checkout flows. Implemented using Next.js and Tailwind, with Stripe-ready payment hooks and performance optimizations for fast UX.",
    image: "/projects/shoppify.png",
    link: "https://next-shoppify.vercel.app/",
  },
  {
    title: "MovieHub App",
    desc: "Movie discovery app that lets users browse, search and save favorites. Integrates a public movie API, client-side caching and responsive image loading to deliver a smooth, mobile-first experience.",
    image: "/projects/movieshub.png",
    link: "https://next-movieshub.vercel.app/",
  },
  {
    title: "Todo App",
    desc: "A focused task manager with create/read/update/delete, filtering and local persistence. Demonstrates solid state management patterns and accessible, responsive UI components.",
    image: "/projects/todolist.png",
    link: "https://next-to-do-list-self.vercel.app/",
  },
  {
    title: "Guess Game",
    desc: "An interactive number-guessing game showcasing game logic, stateful UI and score tracking. Lightweight and accessible, built for quick play across devices.",
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
      y: -20,
      opacity: 0,
      duration: 0.5,
      ease: "linear",
      stagger: 0.1,
      scrollTrigger: {
        trigger: textContainerRef.current,
        start: "top 60%",
        end: "top 30%",
        once: true,
        scrub: 2,
      },
    });
    return () => {
      split.revert();
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(
        ".project-card-from-right, .project-card-from-left",
      );

      cards.forEach((card) => {
        gsap.to(card, {
          x: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "top 20%",
            scrub: 1,
            once: true,
            invalidateOnRefresh: true,
          },
        });
      });
    }, textContainerRef);

    return () => ctx.revert();
  }, []);

  const handleClass = (index) => {
    return index % 2 === 0
      ? "project-card-from-right"
      : "project-card-from-left";
  };

  return (
    <section id="projects" ref={textContainerRef} className="text-gray-100">
      <h1
        ref={textRef}
        className="text-5xl md:text-7xl text-[#EDEDE8] font-medium leading-[0.9] overflow-hidden mb-12 text-center "
      >
        My Works
      </h1>

      <div ref={wrapperRef} className="wrapper h-[500vh] overflow-hidden">
        {/* wrapper is trigger */}
        <div ref={containerRef} className="h-auto" id="horizontal-container">
          {/* container is scrollable */}
          {projects.map((proj, i) => (
            <div
              key={i}
              className={`${handleClass(i)} h-screen w-screen flex-shrink-0 grid place-items-center`}
            >
              <div className="w-[95vw] md:w-[85vw] xl:w-[80vw] h-[70vh] md:h-[80vh] xl:h-[90vh] bg-gray-900 border border-gray-700 rounded-lg flex flex-col items-center justify-center p-2">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="aspect-[4/3] w-full object-cover object-top overflow-hidden rounded"
                />
                <div className="w-full flex flex-col items-center p-4 md:p-6 lg:p-8">
                  <h2 className="text-4xl font-medium font-sans mb-2">
                    <a href={proj.link}>{proj.title}</a>
                  </h2>
                  <p className="max-w-full md:max-w-[80%] xl:max-w-[60%] text-gray-300 text-justify">
                    {proj.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
