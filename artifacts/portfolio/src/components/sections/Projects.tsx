import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { useLocation } from "wouter";
import { portfolioProjects, type PortfolioProject } from "@/data/projects";

export function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [, setLocation] = useLocation();

  const openProject = (project: PortfolioProject) => setLocation(`/projects/${project.slug}`);

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
          {portfolioProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass-panel rounded-xl p-6 cursor-pointer group relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary"
              style={{ boxShadow: `0 4px 30px ${project.accent}22` }}
              onClick={() => openProject(project)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") openProject(project);
              }}
              tabIndex={0}
              role="link"
              data-testid={`card-project-${project.slug}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl`} />

              <div className="relative z-10">
                {project.image && (
                  <div className="relative mb-5 -mx-2 -mt-2 aspect-video overflow-hidden rounded-lg border border-primary/20">
                    <img src={project.image} alt={`${project.title} preview`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-primary/10" />
                  </div>
                )}
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded border border-primary/30 bg-primary/10 flex items-center justify-center">
                    <span className="font-mono text-primary text-xs font-bold">0{index + 1}</span>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(event) => event.stopPropagation()}
                      className="w-8 h-8 rounded border border-white/10 bg-white/5 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                      aria-label={`GitHub for ${project.title}`}
                      data-testid={`link-github-${project.slug}`}
                    >
                      <Github size={14} />
                    </a>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(event) => event.stopPropagation()}
                        className="w-8 h-8 rounded border border-white/10 bg-white/5 flex items-center justify-center text-muted-foreground hover:text-secondary hover:border-secondary/50 transition-colors"
                        aria-label={`Live demo for ${project.title}`}
                        data-testid={`link-live-${project.slug}`}
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
    </section>
  );
}