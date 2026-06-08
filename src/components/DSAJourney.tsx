import { motion } from "framer-motion";
import { FaCode, FaFire, FaCheckCircle } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const stats = [
  {
    icon: <SiLeetcode className="text-3xl text-yellow-500" />,
    value: "80+",
    label: "LeetCode Solved",
    color: "from-yellow-500/10 to-yellow-600/5",
    border: "border-yellow-500/20",
  },
  {
    icon: <FaFire className="text-3xl text-orange-500" />,
    value: "45+",
    label: "Day Max Streak",
    color: "from-orange-500/10 to-orange-600/5",
    border: "border-orange-500/20",
  },
  {
    icon: <FaCheckCircle className="text-3xl text-green-500" />,
    value: "100%",
    label: "Commitment",
    color: "from-green-500/10 to-green-600/5",
    border: "border-green-500/20",
  },
];

const topics = [
  { name: "Arrays & Hashing", level: 90 },
  { name: "Two Pointers / Sliding Window", level: 80 },
  { name: "Stack / Queue / Linked List", level: 85 },
  { name: "Trees & Binary Search", level: 70 },
  { name: "Recursion & Backtracking", level: 75 },
];

export default function DSAJourney() {
  return (
    <section id="dsa" className="relative py-28 px-6 md:px-12 bg-transparent overflow-hidden">
      {/* Glow backgrounds */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-sky-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent font-space"
          >
            DSA Journey
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-[3px] bg-cyan-400 mx-auto mt-4 rounded-full shadow-[0_0_8px_#00E5FF]"
          />
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Side: Stats and breakdown */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            {/* Intro text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-6 md:p-8 rounded-2xl border border-cyan-500/10 bg-slate-900/40 backdrop-blur-sm"
            >
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center gap-3 font-space">
                <FaCode className="text-cyan-400" />
                Problem Solving Mindset
              </h3>
              <p className="text-slate-300 leading-relaxed mb-4 text-sm md:text-base">
                I believe that clean development requires a robust grasp of computer science fundamentals. To train my problem-solving ability, I practice Data Structures & Algorithms (DSA) on LeetCode and other platforms.
              </p>
              <p className="text-slate-400 text-xs md:text-sm">
                Focusing on logic analysis, time/space complexity evaluation (Big O notation), and optimal structure choice has allowed me to design highly reliable backend systems and clean APIs.
              </p>
            </motion.div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  whileHover={{ y: -4, borderColor: "rgba(0, 229, 255, 0.3)" }}
                  className={`p-6 border ${stat.border} bg-gradient-to-br ${stat.color} rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-300 backdrop-blur-sm`}
                >
                  <div className="mb-3">{stat.icon}</div>
                  <span className="text-3xl font-extrabold text-white tracking-tight font-space">{stat.value}</span>
                  <span className="text-xs text-slate-400 font-semibold mt-1 font-space">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side: Circular progress chart mock & Topics list */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 p-6 md:p-8 rounded-2xl border border-cyan-500/10 bg-slate-900/30 backdrop-blur-sm flex flex-col justify-between"
          >
            {/* LeetCode Difficulty breakdown mock */}
            <div>
              <h3 className="text-lg font-bold text-white mb-6 flex items-center justify-between font-space">
                <span>Algorithmic Topics</span>
                <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider font-space">Target Skills</span>
              </h3>

              <div className="space-y-3.5 font-space">
                {topics.map((topic, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 border border-cyan-500/5 bg-slate-950/40 rounded-xl text-xs sm:text-sm font-semibold text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00E5FF]" />
                    {topic.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Circular representation */}
            <div className="mt-8 border-t border-cyan-500/10 pt-6 flex items-center justify-between gap-4 font-space">
              <div className="space-y-1.5">
                <h4 className="text-sm font-bold text-white font-space">LeetCode Stats</h4>
                <p className="text-xs text-slate-400">Solved: 82 Problems</p>
                <div className="flex gap-2 text-[10px] font-semibold pt-1">
                  <span className="px-1.5 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/20">42 Easy</span>
                  <span className="px-1.5 py-0.5 rounded bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">35 Med</span>
                  <span className="px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20">5 Hard</span>
                </div>
              </div>

              {/* Custom SVG Circular chart */}
              <div className="relative w-20 h-20 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  {/* Track */}
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="rgba(0, 229, 255, 0.08)" strokeWidth="3.5" />
                  {/* Progress (80%) */}
                  <motion.circle
                    cx="18"
                    cy="18"
                    r="15.915"
                    fill="none"
                    stroke="#00E5FF"
                    strokeDasharray="80 100"
                    strokeDashoffset="0"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: "0 100" }}
                    whileInView={{ strokeDasharray: "80 100" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center font-space">
                  <span className="text-sm font-extrabold text-white leading-none">82</span>
                  <span className="text-[8px] text-cyan-400 font-bold uppercase mt-0.5">Solved</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
