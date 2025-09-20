import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    name: "React",
    icon: "/reactjs.svg", // Component
    color: "#61DAFB",
  },
  {
    name: "Next.js",
    icon: "/nextjs.svg", // Public folder path
    color: "#000000",
  },
  {
    name: "Node.js",
    icon: "/nodejs.svg",
    color: "#339933",
  },
  {
    name: "Express.js",
    icon: "/expressjs.svg",
    color: "#000000",
  },
  {
    name: "Tailwind",
    icon: "/tailwindcss.svg",
    color: "#06B6D4",
  },
  {
    name: "JavaScript",
    icon: "/javascript.svg",
    color: "#F7DF1E",
  },
  {
    name: "MongoDB",
    icon: "/mongodb.svg",
    color: "#47A248",
  },
  {
    name: "Firebase",
    icon: "/firebase.svg",
    color: "#FFCA28",
  },
  {
    name: "Python",
    icon: "/python.svg",
    color: "#3776AB",
  },
  {
    name: "C",
    icon: "/c.svg",
    color: "#A8B9CC",
  },
  {
    name: "C++",
    icon: "/cpp.svg",
    color: "#00599C",
  },
];

export default function Skills() {
  const containerRef = useRef();
  const scrollRef = useRef();
  const sectionRef = useRef();

  useEffect(() => {
    const container = containerRef.current;
    const scrollElement = scrollRef.current;
    const section = sectionRef.current;

    if (!container || !scrollElement || !section) return;

    // Get the width of the scrolling content
    const scrollWidth = scrollElement.scrollWidth;

    // Initially pause the animation
    const animation = gsap.to(scrollElement, {
      x: -scrollWidth / 2, // Move by half the width (since we duplicate the content)
      duration: 50, // Adjust speed here (lower = faster)
      ease: "none",
      repeat: -1, // Infinite repeat
      paused: true, // Start paused
    });

    // Create ScrollTrigger to start animation when section enters viewport
    ScrollTrigger.create({
      trigger: section,
      start: "top 80%", // Start when section is 80% visible
      end: "bottom 20%", // Stop when section is 20% from leaving viewport
      onEnter: () => {
        animation.play();
      },
      onLeave: () => {
        animation.pause();
      },
      onEnterBack: () => {
        animation.play();
      },
      onLeaveBack: () => {
        animation.pause();
      },
      // markers: true, // Uncomment for debugging
    });

    // Pause animation on hover
    const handleMouseEnter = () => animation.pause();
    const handleMouseLeave = () => {
      // Only resume if section is in viewport
      const trigger = ScrollTrigger.getById(section);
      if (ScrollTrigger.isInViewport(section)) {
        animation.play();
      }
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup
    return () => {
      animation.kill();
      ScrollTrigger.killAll();
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-2 overflow-hidden"
    >
      <h2 className="text-4xl font-bold mb-12">Skills</h2>

      {/* Infinite scroll container */}
      <div
        ref={containerRef}
        className="w-full lg:w-[80%] overflow-hidden mask-gradient"
      >
        <div ref={scrollRef} className="flex gap-6 w-max">
          {/* First set of skills */}
          {skills.map((skill, i) => (
            <div
              key={`first-${i}`}
              className="flex-shrink-0 flex flex-col items-center gap-3 px-10 py-6 text-lg bg-gray-800 border rounded-xl shadow-lg whitespace-nowrap min-w-[120px]"
              style={{
                borderColor: skill.color + "40", // 30% opacity
                boxShadow: `0 4px 20px ${skill.color}30`, // Subtle glow
              }}
            >
              <img
                src={skill.icon}
                alt={skill.name}
                className="w-20 h-20 object-cover"
              />

              {/* Skill Name */}
              <span className="text-gray-200">{skill.name}</span>
            </div>
          ))}

          {/* Duplicate set for seamless loop */}
          {skills.map((skill, i) => (
            <div
              key={`second-${i}`}
              className="flex-shrink-0 flex flex-col items-center gap-3 px-10 py-6 text-lg bg-gray-800 border rounded-xl shadow-lg whitespace-nowrap min-w-[120px]"
              style={{
                borderColor: skill.color + "40",
                boxShadow: `0 4px 20px ${skill.color}30`,
              }}
            >
              <img
                src={skill.icon}
                alt={skill.name}
                className="w-20 h-20 object-cover"
              />

              <span className="text-gray-200">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-8 text-gray-400 text-center max-w-2xl">
        Hover over the skills to pause the animation
      </p>
    </section>
  );
}
