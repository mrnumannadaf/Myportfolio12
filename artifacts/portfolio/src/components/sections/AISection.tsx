import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Brain, Zap, Rocket } from "lucide-react";

const aiCards = [
  {
    icon: Brain,
    title: "AI Automation Vision",
    description: "Building intelligent pipelines that automate repetitive digital tasks — from content generation and scheduling to lead nurturing and CRM data enrichment.",
    tags: ["GPT-4", "LangChain", "Automation", "AI Agents"],
    color: "from-primary/30 to-primary/5",
    glow: "rgba(139, 92, 246, 0.4)",
    border: "border-primary/30",
  },
  {
    icon: Zap,
    title: "Marketing Automation",
    description: "Creating automated marketing funnels powered by AI — personalized outreach, influencer matching algorithms, and real-time campaign optimization.",
    tags: ["No-Code", "Zapier", "Webhooks", "Analytics"],
    color: "from-secondary/30 to-secondary/5",
    glow: "rgba(59, 130, 246, 0.4)",
    border: "border-secondary/30",
  },
  {
    icon: Rocket,
    title: "Future AI Agency",
    description: "The long-term vision: building an AI-first digital agency that delivers full-stack automation, AI-powered content, and intelligent business tools to startups.",
    tags: ["Startup", "Consulting", "AI Tools", "Scale"],
    color: "from-teal-500/30 to-teal-500/5",
    glow: "rgba(13, 148, 136, 0.4)",
    border: "border-teal-500/30",
  },
];

export function AISection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="ai" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-4"
        >
          <div className="w-12 h-1 bg-primary" />
          <h2 className="heading-font text-3xl md:text-4xl font-bold tracking-wider">
            AI.MODULE <span className="text-muted-foreground font-normal text-xl">// INTELLIGENT SYSTEMS</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-muted-foreground font-mono text-sm mb-16 ml-16"
        >
          Building Intelligent Systems — Where Technology Meets Ambition
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {aiCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ scale: 1.03, y: -6 }}
                className={`glass-panel rounded-xl p-8 border ${card.border} relative overflow-hidden group cursor-default`}
                style={{ boxShadow: `0 4px 40px ${card.glow}` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl`} />

                <div className="relative z-10">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                    className="w-14 h-14 rounded-xl bg-background/50 border border-white/10 flex items-center justify-center mb-6"
                    style={{ boxShadow: `0 0 20px ${card.glow}` }}
                  >
                    <Icon size={24} className="text-primary" />
                  </motion.div>

                  <h3 className="heading-font font-bold text-xl tracking-wide mb-4">{card.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">{card.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {card.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 rounded-sm bg-white/5 text-muted-foreground border border-white/10 font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
