import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Ruet CSE Archive",
    desc: "A website for the CSE department.",
    image: "/projects/csearchive.png",
  },
  {
    title: "Shoppify App",
    desc: "A modern shopping platform.",
    image: "/projects/shoppify.png",
  },
  {
    title: "MovieHub App",
    desc: "Browse and save your favorite movies.",
    image: "/projects/movieshub.png",
  },
  {
    title: "Todo App",
    desc: "Personal task manager.",
    image: "/projects/todolist.png",
  },
  {
    title: "Guess Game",
    desc: "A game to guess the number.",
    image: "/projects/guessgame.png",
  },
];

export default function Projects() {
  const containerRef = useRef();
  const wrapperRef = useRef();

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
    <>
      <h1 className="text-6xl font-bold my-6 text-center">My Works</h1>
      <section
        ref={wrapperRef}
        className="wrapper text-white overflow-hidden"
        id="projects  "
      >
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
                  <h3 className="text-3xl font-bold font-sans mb-2">
                    {proj.title}
                  </h3>
                  <p className="max-w-md">{proj.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
