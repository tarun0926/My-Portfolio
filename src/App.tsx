import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import DSAJourney from "./components/DSAJourney";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import SkillsMarquee from "./components/SkillsMarquee";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/ui/CustomCursor";
import { WebGLShader } from "./components/ui/web-gl-shader";

function App() {
  return (
    <div className="relative w-full min-h-screen bg-transparent text-slate-100 overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-300">
      {/* Background WebGL Shader */}
      <WebGLShader />

      {/* Interactive Custom Pointer */}
      <CustomCursor />

      {/* Floating Header */}
      <Navbar />

      {/* Sections */}
      <main className="relative w-full z-10">
        <Hero />
        <About />
        <Skills />
        <DSAJourney />
        <Projects />
        <Experience />
        <SkillsMarquee />
        <Achievements />
        <Contact />
      </main>

      {/* Site Footer */}
      <Footer />
    </div>
  );
}

export default App;
