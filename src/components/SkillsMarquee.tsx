import { skillCategories } from "./Skills";

export default function SkillsMarquee() {
  const allSkills = skillCategories.flatMap(category => category.skills);
  const allSkillsRow1 = allSkills.filter((_, idx) => idx % 2 === 0);
  const allSkillsRow2 = allSkills.filter((_, idx) => idx % 2 !== 0);

  return (
    <div className="relative w-full overflow-hidden bg-[#0B1120] py-6 border-t border-b border-cyan-500/5">
      {/* Edge Gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#0B1120] to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#0B1120] to-transparent z-20 pointer-events-none" />

      {/* Row 1 */}
      <div className="flex mb-3 overflow-hidden">
        <div className="animate-marquee-left flex gap-3 pr-3">
          {allSkillsRow1.map((skill, idx) => (
            <div
              key={`marquee-r1-${skill.name}-${idx}`}
              className="flex items-center gap-2.5 px-4 py-2 border border-cyan-500/10 bg-slate-950/45 backdrop-blur-md rounded-xl text-xs font-medium text-slate-300 shadow-sm font-space whitespace-nowrap hover:border-cyan-400/50 hover:bg-slate-900/60 hover:shadow-[0_0_12px_rgba(0,229,255,0.15)] transition-all duration-300 cursor-pointer"
            >
              <span className="text-base sm:text-lg">{skill.icon}</span>
              <span>{skill.name}</span>
            </div>
          ))}
          {allSkillsRow1.map((skill, idx) => (
            <div
              key={`marquee-r1-dup-${skill.name}-${idx}`}
              className="flex items-center gap-2.5 px-4 py-2 border border-cyan-500/10 bg-slate-950/45 backdrop-blur-md rounded-xl text-xs font-medium text-slate-300 shadow-sm font-space whitespace-nowrap hover:border-cyan-400/50 hover:bg-slate-900/60 hover:shadow-[0_0_12px_rgba(0,229,255,0.15)] transition-all duration-300 cursor-pointer"
            >
              <span className="text-base sm:text-lg">{skill.icon}</span>
              <span>{skill.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 */}
      <div className="flex overflow-hidden">
        <div className="animate-marquee-right flex gap-3 pr-3">
          {allSkillsRow2.map((skill, idx) => (
            <div
              key={`marquee-r2-${skill.name}-${idx}`}
              className="flex items-center gap-2.5 px-4 py-2 border border-cyan-500/10 bg-slate-950/45 backdrop-blur-md rounded-xl text-xs font-medium text-slate-300 shadow-sm font-space whitespace-nowrap hover:border-cyan-400/50 hover:bg-slate-900/60 hover:shadow-[0_0_12px_rgba(0,229,255,0.15)] transition-all duration-300 cursor-pointer"
            >
              <span className="text-base sm:text-lg">{skill.icon}</span>
              <span>{skill.name}</span>
            </div>
          ))}
          {allSkillsRow2.map((skill, idx) => (
            <div
              key={`marquee-r2-dup-${skill.name}-${idx}`}
              className="flex items-center gap-2.5 px-4 py-2 border border-cyan-500/10 bg-slate-950/45 backdrop-blur-md rounded-xl text-xs font-medium text-slate-300 shadow-sm font-space whitespace-nowrap hover:border-cyan-400/50 hover:bg-slate-900/60 hover:shadow-[0_0_12px_rgba(0,229,255,0.15)] transition-all duration-300 cursor-pointer"
            >
              <span className="text-base sm:text-lg">{skill.icon}</span>
              <span>{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
