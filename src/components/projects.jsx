import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { title: "Ruet CSE Archive", desc: "A website for the CSE department." },
  { title: "E-commerce App", desc: "A modern shopping platform." },
  { title: "MovieHub", desc: "Browse and save your favorite movies." },
  { title: "Portfolio", desc: "Personal portfolio with GSAP." },
];

export default function Projects() {
  const containerRef = useRef();
  const wrapperRef = useRef();

  useEffect(() => {
    const el = containerRef.current;

    // Set initial position
    gsap.set(el, { xPercent: 0 });

    const animation = gsap.to(el, {
      xPercent: -75,
      ease: "none",
      scrollTrigger: {
        trigger: wrapperRef.current,
        pin: true,
        scrub: 2,
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
    <section
      ref={wrapperRef}
      className=" text-white overflow-hidden"
      id="wrapper"
    >
      {/* wrapper is trigger */}
      <div
        ref={containerRef}
        className="flex w-[400vw] h-auto"
        id="horizontal-container"
      >
        {projects.map((proj, i) => (
          <div
            key={i}
            className="project-card h-screen w-screen flex-shrink-0 grid place-items-center"
          >
            <div className="w-[80vw] h-[80%] bg-slate-700 rounded-lg flex flex-col items-center justify-center shadow-lg">
              <h3 className="text-3xl font-bold mb-2">{proj.title}</h3>
              <p className="max-w-md text-center">{proj.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
