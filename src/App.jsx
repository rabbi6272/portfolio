import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import Hero from "./components/hero";
import About from "./components/about";
import Projects from "./components/projects";
import Contact from "./components/contact";
import Footer from "./components/footer";
import InfiniteScroll from "./components/infinitescroll";

const items = [
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

function App() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <main className="bg-[#080807]">
      <Hero />
      <About />
      {/* <Skills /> */}
      <div style={{ height: "100vh", position: "relative" }}>
        <InfiniteScroll
          items={items}
          width="400px"
          isTilted={true}
          tiltDirection="left"
          autoplay={true}
          autoplayDirection="up"
          pauseOnHover={false}
        />
      </div>
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}

export default App;
