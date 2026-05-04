import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Code2, Globe, TrendingUp } from "lucide-react";

const experiences = [
  {
    title: "Salesforce Developer",
    company: "Arlig Technologies",
    period: "2023 – 2024",
    description: "Built and customized Salesforce CRM solutions, implemented business automation workflows, and integrated third-party APIs to streamline enterprise operations.",
    tags: ["Salesforce", "Apex", "SOQL", "CRM", "Automation"],
    icon: Globe,
    color: "from-primary to-primary/50",
    glow: "rgba(139, 92, 246, 0.4)",
  },
  {
    title: "Frontend Developer",
    company: "Arlig Technologies",
    period: "2023 – 2024",
    description: "Developed responsive user interfaces using React and modern CSS. Collaborated with backend teams to integrate APIs and improve user experience.",
    tags: ["React", "JavaScript", "CSS", "REST APIs", "UI/UX"],
    icon: Code2,
    color: "from-secondary to-secondary/50",
    glow: "rgba(59, 130, 246, 0.4)",
  },
  {
    title: "Web Developer",
    company: "Arlig Technologies",
    period: "2023",
    description: "Designed and built full web applications from scratch, handling both client-side and server-side development for multiple business projects.",
    tags: ["HTML", "CSS", "JavaScript", "Node.js", "Express"],
    icon: Briefcase,
    color: "from-primary/80 to-secondary/80",
    glow: "rgba(100, 100, 246, 0.4)",
  },
  {
    title: "Social Media Marketing Freelancer",
    company: "Self-Employed",
    period: "2022 – Present",
    description: "Managing influencer campaigns, brand strategy, and digital marketing for clients. Built a client base and generated measurable ROI through data-driven campaigns.",
    tags: ["Brand Strategy", "Influencer Marketing", "Content", "Analytics", "Growth"],
    icon: TrendingUp,
    color: "from-secondary/80 to-primary/80",
    glow: "rgba(59, 130, 246, 0.4)",
  },
];

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <div className="w-12 h-1 bg-primary" />
          <h2 className="heading-font text-3xl md:text-4xl font-bold tracking-wider">
            CAREER.LOG <span className="text-muted-foreground font-normal text-xl">// EXPERIENCE</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-transparent opacity-50 hidden sm:block" />

          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const Icon = exp.icon;
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className={`relative flex flex-col sm:flex-row items-start gap-6 ${isLeft ? "sm:flex-row" : "sm:flex-row-reverse"}`}
                >
                  {/* Timeline dot */}
                  <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-background border-2 border-primary items-center justify-center z-10"
                    style={{ boxShadow: `0 0 20px ${exp.glow}` }}>
                    <Icon size={16} className="text-primary" />
                  </div>

                  {/* Card */}
                  <div className={`w-full sm:w-[45%] ${isLeft ? "sm:ml-0 sm:mr-auto" : "sm:ml-auto sm:mr-0"}`}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -4 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="glass-panel rounded-xl p-6 cursor-default"
                      style={{ boxShadow: `0 4px 30px ${exp.glow}` }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-8 h-8 rounded flex items-center justify-center bg-gradient-to-br ${exp.color} sm:hidden`}>
                          <Icon size={14} className="text-white" />
                        </div>
                        <div>
                          <h3 className="heading-font font-bold text-lg text-foreground tracking-wide">{exp.title}</h3>
                          <p className="text-primary text-sm font-mono">{exp.company} <span className="text-muted-foreground">| {exp.period}</span></p>
                        </div>
                      </div>

                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{exp.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map((tag) => (
                          <span key={tag} className="text-xs px-2 py-1 rounded-sm bg-primary/10 text-primary border border-primary/20 font-mono">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Spacer for the other side */}
                  <div className="hidden sm:block w-[45%]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
