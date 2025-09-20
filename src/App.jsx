import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import Hero from "./components/hero";
import About from "./components/about";
import Skills from "./components/skills";
import Projects from "./components/projects";
import Contact from "./components/contact";
import Footer from "./components/footer";
import InfiniteScroll from "./components/infinitescroll";

const items = [
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
    <main className="bg-gray-900">
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
