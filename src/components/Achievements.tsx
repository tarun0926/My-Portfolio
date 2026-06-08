import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { FaAward, FaCrown, FaCheck, FaStar, FaCertificate } from "react-icons/fa";
import { SiLeetcode, SiHackerrank } from "react-icons/si";

const achievements = [
  {
    icon: <SiLeetcode className="text-yellow-500" />,
    title: "80+ LeetCode Solved",
    subtitle: "Problem Solving Mastery",
    desc: "Maintained consistent coding routines, solving algorithmic problems covering Dynamic Programming, Strings, Arrays, Hashing, and Trees.",
    badge: "Milestone",
  },
  {
    icon: <FaAward className="text-orange-500" />,
    title: "30-Day DSA Challenge",
    subtitle: "Dedication & Focus",
    desc: "Successfully finished a consecutive 30-Day DSA challenge, developing structured logical optimization patterns and clean solutions.",
    badge: "Achievement",
  },
  {
    icon: <FaCrown className="text-cyan-400" />,
    title: "Multiple Web Project Builds",
    subtitle: "Practical Engineering",
    desc: "Built and integrated client frontends with Node/Express RESTful backend APIs, establishing session validation and token routing.",
    badge: "Deployed",
  },
  {
    icon: <FaCertificate className="text-emerald-400" />,
    title: "Infosys Springboard",
    subtitle: "Front End Web Developer",
    desc: "Earned professional certification in Front End Web Development, verifying proficiency in HTML, CSS, JavaScript, and user interface design.",
    badge: "Certified",
  },
  {
    icon: <SiHackerrank className="text-green-500" />,
    title: "HackerRank JavaScript",
    subtitle: "JavaScript (Basic)",
    desc: "Passed the HackerRank certification test for JavaScript fundamentals, verifying proficiency in logic flows, scope, closure concepts, and basic data handling.",
    badge: "Certified",
  },
];

export default function Achievements() {
  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.8 },
      colors: ["#00E5FF", "#38BDF8", "#0EA5E9"], // Theme matching: Electric Cyan, Soft Blue, Sky Blue
    });
  };

  return (
    <section className="relative py-28 px-6 md:px-12 bg-transparent overflow-hidden">
      {/* Background glow highlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-950/5 rounded-full blur-[120px] pointer-events-none" />

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
            Key Achievements
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-[3px] bg-cyan-400 mx-auto mt-4 rounded-full shadow-[0_0_8px_#00E5FF]"
          />
          <p className="mt-4 text-xs md:text-sm text-slate-400 font-semibold uppercase tracking-wider font-space">
            Hover or click to celebrate the milestones!
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{
                y: -8,
              }}
              onMouseEnter={triggerConfetti}
              onClick={triggerConfetti}
              className="relative p-[1.5px] rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-500/10 to-sky-500/10 hover:from-cyan-400 hover:to-sky-400 transition-all duration-500 group shadow-xl hover:shadow-[0_0_25px_rgba(0,229,255,0.2)] cursor-pointer"
            >
              {/* Glowing Back Effect */}
              <div className="absolute -inset-0 bg-gradient-to-br from-cyan-500 to-sky-400 rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none -z-10" />

              {/* Main Card Content */}
              <div className="h-full w-full bg-[#0B1120]/90 backdrop-blur-sm p-6 md:p-8 rounded-[15px] flex flex-col justify-between overflow-hidden relative">
                {/* Star Background Icon */}
                <div className="absolute -right-8 -bottom-8 text-8xl text-cyan-500/5 group-hover:text-cyan-500/10 transition-colors duration-300 pointer-events-none">
                  <FaStar />
                </div>

                <div>
                  {/* Header elements */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-[#0B1120]/60 border border-cyan-500/20 rounded-xl flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <span className="px-2.5 py-0.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-bold rounded-full uppercase tracking-wider font-space">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors font-space">
                    {item.title}
                  </h3>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 font-space">
                    {item.subtitle}
                  </h4>
                  <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Action check indicator */}
                <div className="mt-8 flex items-center gap-2 text-xs font-bold text-cyan-400 font-space">
                  <span className="p-1 bg-cyan-950/50 border border-cyan-500/20 rounded-full">
                    <FaCheck size={8} />
                  </span>
                  Verified Milestone
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
