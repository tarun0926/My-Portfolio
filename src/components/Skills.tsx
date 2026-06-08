import { motion, type Variants } from "framer-motion";
import { FaJava, FaBrain, FaLaptopCode } from "react-icons/fa";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiGit,
  SiGithub,
  SiPostman,
  SiCplusplus,
} from "react-icons/si";

export const skillCategories = [
  {
    title: "Programming & Foundations",
    skills: [
      { name: "C++", level: 80, icon: <SiCplusplus className="text-blue-600" /> },
      { name: "Java", level: 85, icon: <FaJava className="text-red-500" /> },
      { name: "Data Structures & Algorithms", level: 80, icon: <FaBrain className="text-pink-500" /> },
    ],
  },
  {
    title: "Frontend Web Development",
    skills: [
      { name: "HTML5", level: 90, icon: <SiHtml5 className="text-orange-500" /> },
      { name: "CSS3", level: 85, icon: <SiCss className="text-blue-500" /> },
      { name: "JavaScript", level: 85, icon: <SiJavascript className="text-yellow-500" /> },
      { name: "React.js", level: 80, icon: <SiReact className="text-cyan-400" /> },
      { name: "Tailwind CSS", level: 85, icon: <SiTailwindcss className="text-teal-400" /> },
    ],
  },
  {
    title: "Backend & Databases",
    skills: [
      { name: "Node.js", level: 75, icon: <SiNodedotjs className="text-green-500" /> },
      { name: "Express.js", level: 75, icon: <SiExpress className="text-slate-200" /> },
      { name: "MongoDB", level: 70, icon: <SiMongodb className="text-green-400" /> },
      { name: "MySQL", level: 80, icon: <SiMysql className="text-blue-400" /> },
    ],
  },
  {
    title: "Developer Tools",
    skills: [
      { name: "Git", level: 85, icon: <SiGit className="text-orange-600" /> },
      { name: "GitHub", level: 80, icon: <SiGithub className="text-white" /> },
      { name: "VS Code", level: 85, icon: <FaLaptopCode className="text-blue-500" /> },
      { name: "Postman", level: 75, icon: <SiPostman className="text-orange-500" /> },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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
      stiffness: 80,
      damping: 15,
    },
  },
};

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 px-6 md:px-12 bg-transparent overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-950/5 rounded-full blur-[120px] pointer-events-none z-[1]" />

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
            My Tech Stack
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-[3px] bg-cyan-400 mx-auto mt-4 rounded-full shadow-[0_0_8px_#00E5FF]"
          />
        </div>

        {/* Skill Groups Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={catIdx}
              variants={cardVariants}
              className="relative p-[1.5px] rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-500/10 to-sky-500/10 hover:from-cyan-400 hover:to-sky-400 transition-all duration-500 group shadow-xl hover:shadow-[0_0_25px_rgba(0,229,255,0.2)]"
            >
              {/* Glowing Back Effect */}
              <div className="absolute -inset-0 bg-gradient-to-br from-cyan-500 to-sky-400 rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none -z-10" />

              {/* Main Card Content */}
              <div className="h-full w-full bg-[#0B1120]/90 backdrop-blur-sm p-6 md:p-8 rounded-[15px]">
                <h3 className="text-lg md:text-xl font-bold text-white mb-6 border-b border-cyan-500/20 pb-3 flex items-center gap-3 font-space">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00E5FF]" />
                  {category.title}
                </h3>

                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, skillIdx) => (
                    <motion.div
                      key={skillIdx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: skillIdx * 0.05 }}
                      whileHover={{ scale: 1.03, borderColor: "rgba(0, 229, 255, 0.3)", backgroundColor: "rgba(15, 23, 42, 0.6)" }}
                      className="flex items-center gap-2.5 px-4 py-2 border border-cyan-500/10 bg-slate-950/40 rounded-xl text-xs sm:text-sm font-medium text-slate-200 transition-all duration-300 shadow-sm font-space"
                    >
                      <span className="text-base sm:text-lg">{skill.icon}</span>
                      {skill.name}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
