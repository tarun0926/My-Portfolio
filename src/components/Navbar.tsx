import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

const navLinks = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "dsa", label: "DSA Journey" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Journey" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress bar percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      // Navbar glassmorphism trigger
      setScrolled(window.scrollY > 20);

      // Section tracker (scroll spy)
      const currentScroll = window.scrollY + 100;
      for (const link of navLinks) {
        const element = document.getElementById(link.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (currentScroll >= top && currentScroll < top + height) {
            setActiveSection(link.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-[#0B1120] z-[1000]">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-500 shadow-[0_0_10px_rgba(0,229,255,0.4)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-7xl py-3 px-6 z-[99] rounded-full border border-cyan-500/10 bg-slate-900/45 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 ${
          scrolled
            ? "border-cyan-500/20 bg-slate-900/80 shadow-[0_10px_30px_rgba(0,229,255,0.08)]"
            : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-black cursor-pointer tracking-widest flex items-center gap-1 font-orbitron uppercase"
            onClick={() => scrollTo("hero")}
          >
            <span className="text-cyan-400 font-sans">&lt;</span>
            <span className="bg-gradient-to-r from-cyan-400 to-sky-400 bg-clip-text text-transparent">
              Tarun
            </span>
            <span className="text-cyan-400 font-sans">/&gt;</span>
          </motion.div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, idx) => (
              <motion.button
                key={link.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                onClick={() => scrollTo(link.id)}
                className={`relative font-semibold text-xs uppercase tracking-wider transition-colors duration-200 font-space ${
                  activeSection === link.id
                    ? "text-cyan-400"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-0 w-full h-[2px] bg-cyan-400 shadow-[0_0_8px_rgba(0,229,255,0.6)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-200 hover:text-cyan-400 transition-colors p-1"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay & Sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Background Dimming Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[98] md:hidden"
            />

            {/* Slide-in Sidebar Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0.05, duration: 0.45 }}
              className="fixed right-0 top-0 h-screen w-[280px] sm:w-[320px] bg-slate-950/95 backdrop-blur-xl border-l border-cyan-500/20 z-[99] p-8 flex flex-col gap-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] md:hidden"
            >
              {/* Header inside Panel */}
              <div className="flex justify-between items-center pb-4 border-b border-cyan-500/10">
                <span className="text-lg font-black font-orbitron uppercase text-white tracking-widest">Menu</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-slate-400 hover:text-cyan-400 transition-colors p-1"
                  aria-label="Close Menu"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              {/* Navigation Links inside Panel */}
              <div className="flex flex-col gap-6">
                {navLinks.map((link, idx) => (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    onClick={() => scrollTo(link.id)}
                    className={`text-left text-base font-bold tracking-widest uppercase transition-all duration-200 font-space flex items-center justify-between group ${
                      activeSection === link.id
                        ? "text-cyan-400"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    <span>{link.label}</span>
                    <span className={`w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00E5FF] transition-opacity duration-200 ${
                      activeSection === link.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`} />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
