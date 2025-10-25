import { useEffect } from "react";

import Lenis from "@studio-freight/lenis";

import Hero from "./components/hero";
import About from "./components/about";
import Skills from "./components/skills";
import Projects from "./components/projects";
import Contact from "./components/contact";
import Footer from "./components/footer";

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="bg-[#080807]">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}

export default App;
