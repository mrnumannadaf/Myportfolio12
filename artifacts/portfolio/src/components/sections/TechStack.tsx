import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  SiReact, SiHtml5, SiJavascript, SiNodedotjs,
  SiExpress, SiGithub, SiSalesforce,
  SiTypescript, SiTailwindcss, SiPostgresql
} from "react-icons/si";
import { Code2 } from "lucide-react";

const techCategories = [
  {
    label: "Frontend",
    color: "#8B5CF6",
    techs: [
      { name: "React", Icon: SiReact, desc: "Building dynamic UIs and SPAs with component-driven architecture." },
      { name: "JavaScript", Icon: SiJavascript, desc: "Core language for web interactivity, async logic, and APIs." },
      { name: "TypeScript", Icon: SiTypescript, desc: "Type-safe JavaScript for scalable, maintainable codebases." },
      { name: "HTML5", Icon: SiHtml5, desc: "Semantic markup and modern web standards." },
      { name: "CSS3", Icon: Code2, desc: "Styling, animations, and responsive layouts." },
      { name: "Tailwind CSS", Icon: SiTailwindcss, desc: "Utility-first CSS framework for rapid UI development." },
    ],
  },
  {
    label: "Backend & DB",
    color: "#3B82F6",
    techs: [
      { name: "Node.js", Icon: SiNodedotjs, desc: "Server-side JavaScript runtime for scalable backend services." },
      { name: "Express", Icon: SiExpress, desc: "Fast, minimalist web framework for Node.js REST APIs." },
      { name: "PostgreSQL", Icon: SiPostgresql, desc: "Advanced relational database for structured data storage." },
    ],
  },
  {
    label: "Tools & Platforms",
    color: "#0D9488",
    techs: [
      { name: "Salesforce", Icon: SiSalesforce, desc: "CRM platform — Apex, SOQL, Lightning Web Components, automation." },
      { name: "GitHub", Icon: SiGithub, desc: "Version control, CI/CD, and collaborative development workflows." },
      { name: "VS Code", Icon: SiGithub, desc: "Primary IDE with extensions for full-stack productivity." },
    ],
  },
];

export function TechStack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  return (
    <section id="skills" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <div className="w-12 h-1 bg-primary" />
          <h2 className="heading-font text-3xl md:text-4xl font-bold tracking-wider">
            SYS.STACK <span className="text-muted-foreground font-normal text-xl">// TECH SKILLS</span>
          </h2>
        </motion.div>

        <div className="space-y-12">
          {techCategories.map((cat, catIndex) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: catIndex * 0.15 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color, boxShadow: `0 0 8px ${cat.color}` }} />
                <h3 className="font-mono text-sm uppercase tracking-widest text-muted-foreground">{cat.label}</h3>
                <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {cat.techs.map((tech, techIndex) => {
                  const Icon = tech.Icon;
                  const isHovered = hoveredTech === tech.name;

                  return (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: catIndex * 0.15 + techIndex * 0.07 }}
                      whileHover={{ scale: 1.08, y: -4 }}
                      onHoverStart={() => setHoveredTech(tech.name)}
                      onHoverEnd={() => setHoveredTech(null)}
                      className="relative glass-panel rounded-xl p-4 flex flex-col items-center gap-3 cursor-default group transition-all duration-200"
                      style={{
                        boxShadow: isHovered ? `0 0 20px ${cat.color}55` : "none",
                        borderColor: isHovered ? `${cat.color}50` : undefined,
                      }}
                      data-testid={`tech-${tech.name.toLowerCase().replace(/\s/g, "-")}`}
                    >
                      <Icon
                        size={32}
                        style={{ color: isHovered ? cat.color : undefined }}
                        className="text-muted-foreground transition-colors duration-200"
                      />
                      <span className="text-xs font-mono text-center text-muted-foreground group-hover:text-foreground transition-colors">
                        {tech.name}
                      </span>

                      {/* Tooltip */}
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 glass-panel rounded-lg p-3 text-xs text-muted-foreground z-50 pointer-events-none"
                          style={{ boxShadow: `0 0 15px ${cat.color}44` }}
                        >
                          {tech.desc}
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
