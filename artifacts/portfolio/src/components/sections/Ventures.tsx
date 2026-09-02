import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, ArrowRight, Bot, Github } from "lucide-react";

const ventures = [
  {
    name: "OmniFuze",
    tagline: "AI Automation Agency",
    description: "Building AI-powered websites, agents, workflows, and business systems that help startups and local businesses respond faster and grow with less repetitive work.",
    highlights: [
      "AI Agents & Chatbots",
      "Lead and Appointment Automation",
      "CRM & WhatsApp Workflows",
      "AI-Powered Business Systems",
    ],
    icon: Bot,
    gradient: "from-primary via-purple-600 to-secondary",
    glow: "rgba(139, 92, 246, 0.55)",
    badge: "BUILDING",
    badgeColor: "bg-primary/20 text-primary border-primary/30",
    status: "AI Automation Agency",
    github: "https://github.com/numan-nadaf",
    href: "/projects/omnifuze",
  },
  {
    name: "Influencer Buzz",
    tagline: "Influencer Marketing Agency",
    description: "A full-service influencer marketing agency connecting brands with the right content creators. Managing end-to-end campaigns — from influencer discovery and negotiation to content strategy, execution, and ROI reporting.",
    highlights: [
      "Brand-Influencer Matchmaking",
      "Campaign Strategy & Execution",
      "Performance Analytics",
      "Content Amplification",
    ],
    icon: TrendingUp,
    gradient: "from-primary via-purple-600 to-indigo-600",
    glow: "rgba(139, 92, 246, 0.5)",
    badge: "LIVE",
    badgeColor: "bg-green-500/20 text-green-400 border-green-500/30",
    status: "Active & Growing",
  },
];

export function Ventures() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="ventures" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-primary/10 rounded-full blur-[100px]" />
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
            VENTURES.DB <span className="text-muted-foreground font-normal text-xl">// MY STARTUPS</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {ventures.map((venture, index) => {
            const Icon = venture.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                whileHover={{ y: -8 }}
                className="relative group rounded-2xl overflow-hidden cursor-default"
                style={{ boxShadow: `0 8px 50px ${venture.glow}` }}
                data-testid={`card-venture-${index}`}
              >
                {/* Gradient Header */}
                <div className={`bg-gradient-to-r ${venture.gradient} p-8 relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: "radial-gradient(circle at center, rgba(255,255,255,0.1) 1px, transparent 1px)",
                    backgroundSize: "20px 20px"
                  }} />

                  <div className="relative z-10 flex justify-between items-start">
                    <div>
                      <span className={`inline-block text-xs font-mono px-3 py-1 rounded-full border ${venture.badgeColor} mb-4`}>
                        {venture.badge}
                      </span>
                      <h3 className="heading-font text-3xl font-black text-white tracking-wider">{venture.name}</h3>
                      <p className="text-white/70 text-sm font-mono mt-1">{venture.tagline}</p>
                    </div>
                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                      <Icon size={28} className="text-white" />
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="glass-panel p-8 rounded-none border-t-0">
                  <p className="text-muted-foreground leading-relaxed mb-6 text-sm">{venture.description}</p>

                  <div className="space-y-2 mb-6">
                    {venture.highlights.map((highlight) => (
                      <div key={highlight} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        <span className="text-foreground/80">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-muted-foreground">{venture.status}</span>
                     <div className="flex items-center gap-3">
                       {venture.github && (
                         <a href={venture.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-muted-foreground text-xs font-mono hover:text-primary transition-colors" onClick={(event) => event.stopPropagation()}>
                           <Github size={13} /> GitHub
                         </a>
                       )}
                       {venture.href ? (
                         <a href={venture.href} className="flex items-center gap-2 text-primary text-sm font-mono hover:gap-3 transition-all group/btn">
                           Learn More <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                         </a>
                       ) : (
                         <button className="flex items-center gap-2 text-primary text-sm font-mono hover:gap-3 transition-all group/btn">
                           Learn More <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                         </button>
                       )}
                     </div>
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
