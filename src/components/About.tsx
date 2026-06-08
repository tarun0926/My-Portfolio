import { motion, type Variants } from "framer-motion";
import { FaGraduationCap, FaCode, FaServer, FaLightbulb } from "react-icons/fa";

const cards = [
  {
    icon: <FaGraduationCap className="text-2xl text-cyan-400" />,
    title: "Education",
    description: "B.Tech Student in Information Technology. Strong engineering fundamentals and academic focus.",
  },
  {
    icon: <FaCode className="text-2xl text-cyan-400" />,
    title: "Software & Web Dev",
    description: "Passionate about creating highly responsive, interactive, and user-centric web applications.",
  },
  {
    icon: <FaServer className="text-2xl text-cyan-400" />,
    title: "Java & Backend",
    description: "Strong foundation in Java programming, REST APIs, and database engineering.",
  },
  {
    icon: <FaLightbulb className="text-2xl text-cyan-400" />,
    title: "Problem Solving",
    description: "Consistently practicing Data Structures and Algorithms to design optimized software solutions.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function About() {
  return (
    <section id="about" className="relative py-28 px-6 md:px-12 bg-transparent overflow-hidden">
      {/* Decorative Glow Elements */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none z-[2]" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-sky-500/5 rounded-full blur-[100px] pointer-events-none z-[2]" />

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
            About Me
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-[3px] bg-cyan-400 mx-auto mt-4 rounded-full shadow-[0_0_8px_#00E5FF]"
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Brief Bio and Profile Mock */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col items-center justify-center lg:items-start"
          >
            {/* Glowing Tech Card Mock for Profile Image */}
            <div className="relative group w-full max-w-[280px] sm:max-w-sm h-auto py-8 rounded-2xl overflow-hidden border border-cyan-500/20 bg-slate-900/60 flex items-center justify-center px-4 sm:px-8 shadow-2xl backdrop-blur-sm md:w-80 md:h-80 md:py-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-sky-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-sky-400 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 pointer-events-none" />
              
              {/* Profile Graphic */}
              <div className="relative flex flex-col items-center text-center">
                <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-cyan-400/50 shadow-xl mb-4 group-hover:scale-105 transition-all duration-300 group-hover:border-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.15)] group-hover:shadow-[0_0_25px_rgba(0,229,255,0.3)]">
                  <img src="./profile.jpg" alt="Tarun Kotiya" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1 font-space">Tarun Kotiya</h3>
                <p className="text-xs text-cyan-400 font-semibold tracking-wider uppercase mb-3 font-space">Java & Web Developer</p>
                <p className="text-xs text-slate-400 italic">"Turning ideas into elegant, reliable, and high-performance code."</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Key Details & Skill Cards */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h3 className="text-xl md:text-2xl font-bold text-cyan-400 mb-4 font-space">
                B.Tech Student in Information Technology
              </h3>
              <p className="text-slate-300 leading-relaxed mb-4">
                I’m a B.Tech (IT) student passionate about learning and building projects in web development and programming. I have a good understanding of HTML, CSS, MySQL, and Java, and I’m currently focusing on improving my Data Structures and Algorithms (DSA) skills in Java.
              </p>
              <p className="text-slate-300 leading-relaxed mb-6">
                I enjoy exploring new technologies and applying what I learn through small projects and practical applications. My goal is to grow as a developer, gain hands-on experience through internships, and contribute to real-world projects.
              </p>
              <p className="text-cyan-400 font-bold leading-relaxed font-space">
                Always open to learning, collaborating, and connecting with like-minded tech enthusiasts! 🚀
              </p>
            </motion.div>

            {/* Core Values Cards */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {cards.map((card, idx) => (
                <motion.div
                  key={idx}
                  variants={cardVariants}
                  whileHover={{ y: -5 }}
                  className="relative p-[1.5px] rounded-xl overflow-hidden bg-gradient-to-br from-cyan-500/10 to-sky-500/10 hover:from-cyan-400 hover:to-sky-400 transition-all duration-500 group shadow-md hover:shadow-[0_0_20px_rgba(0,229,255,0.25)]"
                >
                  {/* Glowing Back Effect */}
                  <div className="absolute -inset-0 bg-gradient-to-br from-cyan-500 to-sky-400 rounded-xl blur-md opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none -z-10" />
                  
                  {/* Main Card Content */}
                  <div className="h-full w-full bg-[#0B1120]/90 backdrop-blur-sm p-5 rounded-[10px] flex flex-col justify-between">
                    <div>
                      <div className="mb-3 flex items-center justify-between">
                        <span className="p-2 bg-cyan-950/40 rounded-lg">{card.icon}</span>
                      </div>
                      <h4 className="text-base font-bold text-white mb-2 font-space">{card.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{card.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
