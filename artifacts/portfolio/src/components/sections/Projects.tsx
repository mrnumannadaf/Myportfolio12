import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "InfluencerBuzz Platform",
    description: "A SaaS dashboard for managing influencer marketing campaigns — brand tracking, influencer discovery, ROI analytics, and campaign automation.",
    longDescription: "Built a full-stack influencer marketing management platform from scratch. Features include influencer discovery with filters, campaign creation and tracking, automated reporting, and ROI analytics dashboard. Integrated social media APIs for real-time metrics.",
    tags: ["React", "Node.js", "Express", "MongoDB", "REST APIs"],
    github: "https://github.com/numan-nadaf",
    live: null,
    gradient: "from-primary/20 to-secondary/10",
    accent: "#8B5CF6",
  },
  {
    title: "Fashion Flick E-commerce",
    description: "Modern fashion e-commerce platform with product catalog, cart management, user authentication, and Razorpay payment integration.",
    longDescription: "A complete e-commerce solution for the Fashion Flick brand. Built with React frontend and Node.js backend. Features product catalog, advanced filtering, shopping cart, wishlist, user auth, order tracking, and payment gateway integration.",
    tags: ["React", "Node.js", "PostgreSQL", "Stripe", "Tailwind CSS"],
    github: "https://github.com/numan-nadaf",
    live: null,
    gradient: "from-secondary/20 to-primary/10",
    accent: "#3B82F6",
  },
  {
    title: "Salesforce CRM Automation",
    description: "Custom Salesforce implementation with Apex triggers, automation workflows, and custom Lightning Web Components for enterprise business processes.",
    longDescription: "Developed end-to-end Salesforce customizations at Arlig Technologies including Apex triggers for business logic, custom LWC components, Process Builder automations, and integration with external APIs via REST callouts.",
    tags: ["Salesforce", "Apex", "LWC", "SOQL", "REST APIs"],
    github: "https://github.com/numan-nadaf",
    live: null,
    gradient: "from-purple-500/20 to-blue-500/10",
    accent: "#7C3AED",
  },
  {
    title: "AI Automation Dashboard",
    description: "A web-based dashboard to monitor and control automation pipelines — task scheduling, webhook triggers, and visual workflow builder.",
    longDescription: "Built a comprehensive automation management dashboard that allows users to create, schedule, and monitor automation workflows. Features drag-and-drop workflow builder, webhook integration, real-time execution logs, and email notifications.",
    tags: ["React", "TypeScript", "Node.js", "WebSockets", "Cron"],
    github: "https://github.com/numan-nadaf",
    live: null,
    gradient: "from-blue-500/20 to-purple-500/10",
    accent: "#2563EB",
  },
  {
    title: "Social Media Analytics Tool",
    description: "Track brand mentions, engagement rates, follower growth, and campaign performance across multiple social platforms in one unified view.",
    longDescription: "A social media analytics aggregator that connects to multiple platform APIs (Instagram, Twitter, YouTube) to track brand performance. Features include sentiment analysis, competitor tracking, automated weekly reports, and growth forecasting.",
    tags: ["React", "Python", "FastAPI", "PostgreSQL", "Chart.js"],
    github: "https://github.com/numan-nadaf",
    live: null,
    gradient: "from-teal-500/20 to-primary/10",
    accent: "#0D9488",
  },
];

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);

  return (
    <section id="projects" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <div className="w-12 h-1 bg-primary" />
          <h2 className="heading-font text-3xl md:text-4xl font-bold tracking-wider">
            BUILD.LOG <span className="text-muted-foreground font-normal text-xl">// PROJECTS</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass-panel rounded-xl p-6 cursor-pointer group relative overflow-hidden"
              style={{ boxShadow: `0 4px 30px ${project.accent}22` }}
              onClick={() => setSelectedProject(project)}
              data-testid={`card-project-${index}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl`} />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded border border-primary/30 bg-primary/10 flex items-center justify-center">
                    <span className="font-mono text-primary text-xs font-bold">0{index + 1}</span>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-8 h-8 rounded border border-white/10 bg-white/5 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                      data-testid={`link-github-${index}`}
                    >
                      <Github size={14} />
                    </a>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-8 h-8 rounded border border-white/10 bg-white/5 flex items-center justify-center text-muted-foreground hover:text-secondary hover:border-secondary/50 transition-colors"
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-sm bg-muted text-muted-foreground font-mono border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-4 text-xs text-primary/60 font-mono group-hover:text-primary transition-colors">
                  Click to view details →
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-6"
            onClick={() => setSelectedProject(null)}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative glass-panel rounded-xl p-8 max-w-lg w-full glow-border z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setSelectedProject(null)}
                data-testid="button-close-modal"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <Github size={18} className="text-primary" />
                </div>
                <h3 className="heading-font font-bold text-xl tracking-wide">{selectedProject.title}</h3>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">{selectedProject.longDescription}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tags.map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1 rounded-sm bg-primary/10 text-primary border border-primary/20 font-mono">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-white gap-2"
                  onClick={() => window.open(selectedProject.github, "_blank")}
                  data-testid="button-view-github"
                >
                  <Github size={14} />
                  View on GitHub
                </Button>
                {selectedProject.live && (
                  <Button size="sm" variant="outline" className="border-secondary/50 text-secondary gap-2">
                    <ExternalLink size={14} />
                    Live Preview
                  </Button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
