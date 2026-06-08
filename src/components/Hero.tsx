import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LampContainer } from "./ui/lamp";
import { FaDownload, FaArrowRight } from "react-icons/fa";

const roles = ["Web Developer", "Software Developer", "Problem Solver"];

export default function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const activeRole = roles[currentRoleIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing characters
        setCurrentText(activeRole.substring(0, currentText.length + 1));
        if (currentText === activeRole) {
          setIsDeleting(true);
          setTypingSpeed(1500); // Wait at the end of typing
        } else {
          setTypingSpeed(100);
        }
      } else {
        // Deleting characters
        setCurrentText(activeRole.substring(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          setTypingSpeed(300); // Wait briefly before starting next role
        } else {
          setTypingSpeed(50);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex, typingSpeed]);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative w-full overflow-hidden bg-[#0B1120]">
      <LampContainer className="min-h-screen">
        <div className="flex flex-col items-center justify-center pt-0 sm:pt-36 md:pt-44 lg:pt-48 w-full">
          {/* Intro Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="px-4 py-1.5 border border-cyan-500/20 bg-cyan-950/20 backdrop-blur-md rounded-full text-[10px] sm:text-xs font-bold text-cyan-400 tracking-widest uppercase mb-4 md:mb-6 shadow-[0_0_15px_rgba(0,229,255,0.05)] font-space"
          >
            Welcome to my Portfolio
          </motion.div>

          {/* Big Name Title */}
          <motion.h1
            initial={{ opacity: 0.3, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="bg-gradient-to-r from-cyan-400 via-sky-300 to-white py-2 bg-clip-text text-center text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-wider text-transparent leading-none font-orbitron"
          >
            Tarun Kotiya
          </motion.h1>

          {/* Animated Subtitle / Roles */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-4 md:mt-6 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-slate-300 min-h-[32px] sm:min-h-[40px] py-1 flex items-center justify-center text-center w-full font-space"
          >
            <span>
              Aspiring{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-sky-400 bg-clip-text text-transparent font-extrabold">
                {currentText}
              </span>
            </span>
            <span className="animate-pulse text-cyan-400 font-normal ml-1">|</span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-4 md:mt-6 max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl text-center text-xs sm:text-sm md:text-base lg:text-lg text-slate-400 leading-relaxed px-4 md:px-8"
          >
            B.Tech Information Technology student passionate about building responsive web applications and solving algorithmic problems.
          </motion.p>

          {/* Call-to-Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center w-full px-4"
          >
            {/* Work Button */}
            <button
              onClick={() => handleScrollTo("projects")}
              className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-cyan-500 hover:bg-cyan-600 text-slate-950 rounded-full font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:shadow-[0_0_30px_rgba(0,229,255,0.5)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer font-space tracking-wider"
            >
              View Projects
              <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
            </button>

            {/* Contact Button */}
            <button
              onClick={() => handleScrollTo("contact")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-cyan-500/20 bg-cyan-950/10 hover:bg-cyan-950/30 text-cyan-300 hover:text-white rounded-full font-bold text-xs sm:text-sm hover:-translate-y-0.5 backdrop-blur-md transition-all duration-200 cursor-pointer font-space tracking-wider"
            >
              <FaDownload className="text-xs" />
              Get in Touch
            </button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 cursor-pointer hidden md:flex flex-col items-center gap-2"
          onClick={() => handleScrollTo("about")}
        >
          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold hover:text-cyan-400 transition-colors font-space">
            Scroll Down
          </span>
          <div className="w-[20px] h-[34px] rounded-2xl border-2 border-slate-500/50 flex justify-center p-1">
            <motion.div
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-[4px] h-[4px] rounded-full bg-cyan-400 shadow-[0_0_6px_#00E5FF]"
            />
          </div>
        </motion.div>
      </LampContainer>
    </section>
  );
}
