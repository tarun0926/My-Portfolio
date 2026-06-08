import { motion } from "framer-motion";
import { FaGraduationCap, FaBrain, FaServer, FaLaptopCode } from "react-icons/fa";

const timelineData = [
  {
    icon: <FaGraduationCap />,
    title: "B.Tech IT Academic Stream",
    subtitle: "University Engineering Stream",
    description: "Deepened core computer science foundations, covering object-oriented programming (OOP), relational databases (MySQL), operating systems, and computer networks.",
    duration: "Present",
  },
  {
    icon: <FaBrain />,
    title: "Algorithmic Skill Training",
    subtitle: "LeetCode & 30-Day Challenge",
    description: "Undertook a rigorous 30-day DSA training challenge to write optimized structures. Solved 80+ LeetCode problems, focusing on arrays, sliding windows, hashing, stacks, and binary trees.",
    duration: "Daily Practice",
  },
  {
    icon: <FaServer />,
    title: "Backend API Engineering",
    subtitle: "Node.js & Express.js Servers",
    description: "Designed secure JSON REST APIs. Integrated JSON Web Tokens (JWT) for session authentication, MongoDB mongoose schemas, and router middleware workflows.",
    duration: "Backend Focus",
  },
  {
    icon: <FaLaptopCode />,
    title: "Client-Side Integration",
    subtitle: "React.js & CSS Layouts",
    description: "Bridges REST API servers with modern React single-page layouts. Engineered sleek UI animations using Framer Motion, and mobile styles with Tailwind CSS.",
    duration: "Web Development",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-28 px-6 md:px-12 bg-[#0B1120]/90 overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent font-space"
          >
            Learning Journey
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-[3px] bg-cyan-400 mx-auto mt-4 rounded-full shadow-[0_0_8px_#00E5FF]"
          />
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l border-cyan-500/20 ml-4 md:ml-32 py-4 space-y-12">
          {timelineData.map((item, idx) => (
            <div key={idx} className="relative">
              {/* Timeline Dot with Icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 150, delay: idx * 0.1 }}
                className="absolute -left-[24px] top-1.5 w-12 h-12 bg-slate-900 border-2 border-cyan-500/40 rounded-full flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.15)] z-10"
              >
                {item.icon}
              </motion.div>

              {/* Time stamp on the left (visible on md screens and above) */}
              <div className="hidden md:block absolute -left-[140px] top-4 w-24 text-right text-xs font-bold text-cyan-400/80 uppercase tracking-widest font-space">
                {item.duration}
              </div>

              {/* Timeline Content Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative ml-10 p-[1.5px] rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-500/10 to-sky-500/10 hover:from-cyan-400 hover:to-sky-400 transition-all duration-500 group shadow-xl hover:shadow-[0_0_25px_rgba(0,229,255,0.2)]"
              >
                {/* Glowing Back Effect */}
                <div className="absolute -inset-0 bg-gradient-to-br from-cyan-500 to-sky-400 rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none -z-10" />

                {/* Main Card Content */}
                <div className="h-full w-full bg-[#0B1120]/90 backdrop-blur-sm p-6 md:p-8 rounded-[15px]">
                  <span className="inline-block md:hidden mb-2 text-[10px] font-extrabold text-cyan-400 uppercase tracking-widest bg-cyan-950/40 border border-cyan-500/10 px-2.5 py-1 rounded font-space">
                    {item.duration}
                  </span>

                  <h3 className="text-lg md:text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors font-space">
                    {item.title}
                  </h3>
                  <h4 className="text-xs md:text-sm font-semibold text-cyan-400/90 mb-4 uppercase tracking-wider font-space">
                    {item.subtitle}
                  </h4>
                  <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
