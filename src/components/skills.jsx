import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);
const skills = [
  {
    name: "React",
    icon: "/skills/reactjs.svg", // Component
    color: "#61DAFB",
  },
  {
    name: "Next.js",
    icon: "/skills/nextjs.svg", // Public folder path
    color: "#000000",
  },
  {
    name: "Node.js",
    icon: "/skills/nodejs.svg",
    color: "#339933",
  },
  {
    name: "Express.js",
    icon: "/skills/expressjs.svg",
    color: "#000000",
  },
  {
    name: "Tailwind",
    icon: "/skills/tailwindcss.svg",
    color: "#06B6D4",
  },
  {
    name: "JavaScript",
    icon: "/skills/javascript.svg",
    color: "#F7DF1E",
  },
  {
    name: "MongoDB",
    icon: "/skills/mongodb.svg",
    color: "#47A248",
  },
  {
    name: "Firebase",
    icon: "/skills/firebase.svg",
    color: "#FFCA28",
  },
  {
    name: "Python",
    icon: "/skills/python.svg",
    color: "#3776AB",
  },
  {
    name: "C",
    icon: "/skills/c.svg",
    color: "#A8B9CC",
  },
  {
    name: "C++",
    icon: "/skills/cpp.svg",
    color: "#00599C",
  },
];

export default function Skills() {
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
        start: "top 10%",
        end: "20% 10%",
        once: true,
        scrub: true,
      },
    });
    return () => {
      split.revert();
    };
  }, []);

  return (
    <section
      id="skills"
      ref={textContainerRef}
      className="min-h-screen px-1 flex flex-col items-center justify-center text-gray-100 overflow-hidden"
    >
      <h3
        ref={textRef}
        className="text-5xl md:text-7xl text-[#EDEDE8] font-medium leading-[0.9] overflow-hidden mb-12"
      >
        Skills
      </h3>

      {/* Infinite scroll container */}
      <div className="w-full md:w-[90%] overflow-hidden mask-gradient">
        <div className="skill-section flex gap-8 w-max text-gray-300 text-lg md:text-md font-normal">
          {/* First set of skills */}
          {skills.map((skill, i) => (
            <div
              key={`first-${i}`}
              className="flex-shrink-0 flex flex-col items-center justify-center gap-4 bg-gray-800 border rounded-xl shadow-lg whitespace-nowrap w-[200px] md:w-[190px] h-[220px] md:[210px]"
              style={{
                borderColor: skill.color + "40", // 30% opacity
                boxShadow: `0 4px 20px ${skill.color}30`, // Subtle glow
              }}
            >
              <img
                src={skill.icon}
                alt={skill.name}
                className="w-20 md:w-20 h-20 md:h-20 object-cover"
              />

              {/* Skill Name */}
              <span>{skill.name}</span>
            </div>
          ))}

          {/* Duplicate set for seamless loop */}
          {skills.map((skill, i) => (
            <div
              key={`second-${i}`}
              className="flex-shrink-0 flex flex-col items-center justify-center gap-4 bg-gray-800 border rounded-xl shadow-lg whitespace-nowrap w-[200px] h-[220px]"
              style={{
                borderColor: skill.color + "40",
                boxShadow: `0 4px 20px ${skill.color}30`,
              }}
            >
              <img
                src={skill.icon}
                alt={skill.name}
                className="w-20 md:w-20 h-20 md:h-20 object-cover"
              />

              <span>{skill.name}</span>
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
