import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaCode } from "react-icons/fa";

const categories = ["All", "Frontend Website", "Backend"];

const projectsData = [
  {
    id: 1,
    title: "Movie Explorer",
    category: "Frontend Website",
    description: "A dynamic web application that allows users to search, explore, and filter movies based on ratings, trending status, and custom user favorites.",
    tech: ["React.js", "Tailwind CSS", "TMDB API", "Framer Motion"],
    features: [
      "Search & Explore Movies",
      "Latest & Trending Movie Feeds",
      "Rating-based Filtering System",
      "Add to Favorites (Local Storage)",
    ],
    github: "https://github.com/tarun0926/Movie-Explorer",
    live: "https://movie-explorer-one-black.vercel.app/",
    bgGradient: "from-cyan-950/40 via-sky-950/20 to-slate-950",
  },
  {
    id: 2,
    title: "Hackathon Website",
    category: "Frontend Website",
    description: "A comprehensive event platform designed for modern hackathons, complete with seamless interactive prizes, schedules, and HTML/CSS structure.",
    tech: ["React.js", "Tailwind CSS", "Framer Motion", "Vite"],
    features: [
      "Dynamic Hackathon Prize Showcase",
      "Interactive Event Schedule & Timeline",
      "Responsive Fluid Navigation Gates",
      "Glassmorphic Dark-Mode UI Components",
    ],
    github: "https://github.com/tarun0926/Hackthon-webapp",
    live: "https://hackthon-webapp.vercel.app/#prizes",
    bgGradient: "from-cyan-900/30 via-slate-900/20 to-slate-950",
  },
  {
    id: 3,
    title: "Hostel Maintenance Tracker",
    category: "Frontend Website",
    description: "An integrated portal designed to streamline hostel complaints, track maintenance requests, and monitor repair jobs in real-time.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB"],
    features: [
      "Complaint Logging & Status Tracking",
      "Interactive Maintenance Dashboard",
      "Admin/Warden Action Controls",
      "Real-time Service Request Updates",
    ],
    github: "https://github.com/tarun0926/Hostel-complaint-and-maintenance-tracker",
    live: "https://hostel-complaint-and-maintenance-tr.vercel.app/",
    bgGradient: "from-sky-900/30 via-slate-900/20 to-slate-950",
  },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = projectsData.filter((project) => {
    if (activeFilter === "All") return true;
    return project.category === activeFilter;
  });

  return (
    <section id="projects" className="relative py-28 px-6 md:px-12 bg-[#0B1120]/85 overflow-hidden">
      {/* Background neon lights */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-sky-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent font-space"
          >
            My Work & Projects
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-[3px] bg-cyan-400 mx-auto mt-4 rounded-full shadow-[0_0_8px_#00E5FF]"
          />
        </div>

        {/* Filter Navigation */}
        <div className="flex justify-center items-center gap-4 mb-16 font-space">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`relative px-6 py-2 rounded-full text-sm font-bold tracking-wider transition-all duration-300 ${
                activeFilter === cat
                  ? "text-[#0B1120]"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <span className="relative z-10">{cat}</span>
              {activeFilter === cat && (
                <motion.div
                  layoutId="activeFilterBg"
                  className="absolute inset-0 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(0,229,255,0.4)]"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Dynamic Project Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={project.id}
                className="relative p-[1.5px] rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-500/10 to-sky-500/10 hover:from-cyan-400 hover:to-sky-400 transition-all duration-500 group shadow-xl hover:shadow-[0_0_25px_rgba(0,229,255,0.2)] flex flex-col justify-between min-h-[480px] md:h-[480px] h-auto"
              >
                {/* Glowing Back Effect */}
                <div className="absolute -inset-0 bg-gradient-to-br from-cyan-500 to-sky-400 rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none -z-10" />

                {/* Main Card Content */}
                <div className="w-full bg-[#0B1120]/90 backdrop-blur-sm rounded-[15px] flex flex-col justify-between flex-1 overflow-hidden relative">
                  {/* Custom Gradient Background Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-b ${project.bgGradient} opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none`} />

                  {/* Card Header & Content */}
                  <div className="p-6 relative z-10">
                    <div className="flex justify-between items-center mb-4">
                      <span className="px-3 py-1 border border-cyan-500/20 bg-cyan-950/30 text-cyan-400 text-xs font-bold rounded-full uppercase tracking-wider font-space">
                        {project.category}
                      </span>
                      <span className="text-slate-500 group-hover:text-cyan-400 transition-colors">
                        <FaCode size={18} />
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors font-space">
                      {project.title}
                    </h3>

                    <p className="text-slate-400 text-xs leading-relaxed mb-6">
                      {project.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <span className="text-xs font-bold text-slate-300">Key Features:</span>
                      <ul className="list-disc list-inside text-[11px] text-slate-400 space-y-1">
                        {project.features.map((feat, idx) => (
                          <li key={idx} className="truncate">{feat}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-6 pt-0 relative z-10">
                    {/* Tech Stack Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tech.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-slate-950 text-[10px] text-slate-400 font-semibold border border-cyan-500/5 rounded font-space"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-4 border-t border-cyan-500/10 pt-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2 border border-cyan-500/20 hover:border-cyan-500/40 bg-cyan-950/10 hover:bg-cyan-950/30 text-cyan-300 hover:text-white rounded-lg text-xs font-semibold tracking-wide font-space transition-all duration-200"
                      >
                        <FaGithub size={14} />
                        Source
                      </a>
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2 bg-cyan-500 hover:bg-cyan-600 text-[#0B1120] font-bold rounded-lg text-xs tracking-wide font-space shadow-[0_0_10px_rgba(0,229,255,0.2)] hover:shadow-[0_0_15px_rgba(0,229,255,0.4)] transition-all duration-200"
                      >
                        <FaExternalLinkAlt size={12} />
                        Live Demo
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
