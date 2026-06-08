import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-[#0B1120] py-12 px-6 md:px-12 border-t border-cyan-500/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left Side: Branding */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <div
            className="text-xl font-black cursor-pointer tracking-widest flex items-center gap-1 font-orbitron uppercase"
            onClick={() => scrollTo("hero")}
          >
            <span className="text-cyan-400 font-sans">&lt;</span>
            <span className="bg-gradient-to-r from-cyan-400 to-sky-400 bg-clip-text text-transparent">
              Tarun
            </span>
            <span className="text-cyan-400 font-sans">/&gt;</span>
          </div>
          <p className="text-[10px] text-slate-500 font-space">B.Tech IT Student & Software Developer</p>
        </div>

        {/* Middle: Credits */}
        <p className="text-xs text-slate-500 text-center md:text-left font-space">
          &copy; {new Date().getFullYear()} Tarun Kotiya. All rights reserved. Deployed via Vercel.
        </p>

        {/* Right Side: Quick Links */}
        <div className="flex gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 border border-cyan-500/15 hover:border-cyan-500/40 bg-cyan-950/10 hover:bg-cyan-950/30 text-slate-400 hover:text-cyan-400 rounded-lg text-sm transition-all duration-300"
            aria-label="GitHub"
          >
            <FaGithub size={16} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 border border-cyan-500/15 hover:border-cyan-500/40 bg-cyan-950/10 hover:bg-cyan-950/30 text-slate-400 hover:text-cyan-400 rounded-lg text-sm transition-all duration-300"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={16} />
          </a>
          <a
            href="mailto:kotiyatarun639@gmail.com"
            className="p-2 border border-cyan-500/15 hover:border-cyan-500/40 bg-cyan-950/10 hover:bg-cyan-950/30 text-slate-400 hover:text-cyan-400 rounded-lg text-sm transition-all duration-300"
            aria-label="Email"
          >
            <FaEnvelope size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
