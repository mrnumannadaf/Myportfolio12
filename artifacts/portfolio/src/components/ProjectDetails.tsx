import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, Layers3 } from "lucide-react";
import { Link, useParams } from "wouter";
import { ChatBot } from "@/components/ChatBot";
import { CustomCursor } from "@/components/CustomCursor";
import { ResumePdf } from "@/components/ResumePdf";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { portfolioProjects } from "@/data/projects";

function ProjectScreenshot({ accent }: { accent: string }) {
  return (
    <div className="relative h-72 overflow-hidden rounded-xl border border-primary/20 bg-[#080611] shadow-[0_0_35px_rgba(139,92,246,.16)] sm:h-[440px]">
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(rgba(139,92,246,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,.35) 1px, transparent 1px)", backgroundSize: "34px 34px" }} />
      <div className="absolute inset-x-[8%] top-[12%] overflow-hidden rounded-lg border border-white/10 bg-[#11101c] shadow-2xl">
        <div className="flex h-8 items-center gap-1.5 border-b border-white/10 px-3">
          <span className="h-2 w-2 rounded-full bg-red-400" />
          <span className="h-2 w-2 rounded-full bg-yellow-300" />
          <span className="h-2 w-2 rounded-full bg-green-400" />
          <span className="ml-auto h-2 w-16 rounded bg-white/10" />
        </div>
        <div className="grid grid-cols-[.25fr_1fr] gap-4 p-4 sm:gap-8 sm:p-8">
          <div className="space-y-3 border-r border-white/10 pr-3">
            <div className="h-2 w-12 rounded" style={{ backgroundColor: accent }} />
            {[1, 2, 3, 4, 5, 6].map((item) => <div key={item} className="h-2 rounded bg-white/10" />)}
          </div>
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div><div className="h-3 w-28 rounded bg-white/70" /><div className="mt-2 h-2 w-16 rounded bg-white/20" /></div>
              <div className="h-8 w-20 rounded border" style={{ borderColor: `${accent}99`, backgroundColor: `${accent}22` }} />
            </div>
            <div className="grid grid-cols-3 gap-3">{[1, 2, 3].map((item) => <div key={item} className="h-20 rounded border border-white/10 bg-white/[.04]" />)}</div>
            <div className="flex h-24 items-end gap-2 border-b border-white/10">{[35, 55, 42, 76, 58, 88, 66, 94].map((height, index) => <div key={index} className="flex-1 rounded-t" style={{ height: `${height}%`, backgroundColor: index % 3 === 0 ? accent : "rgba(255,255,255,.16)" }} />)}</div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-5 left-5 font-mono text-[10px] uppercase tracking-widest text-primary/60">Project preview</div>
    </div>
  );
}

export function ProjectDetails() {
  const { slug } = useParams<{ slug: string }>();
  const project = portfolioProjects.find((item) => item.slug === slug);

  if (!project) {
    return <div className="min-h-screen bg-background p-8 text-foreground">Project not found.</div>;
  }

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="min-h-screen overflow-hidden pt-20">
        <section className="relative py-20 sm:py-28">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent pointer-events-none" />
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <Link href="/" className="mb-12 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft size={14} /> Back to portfolio
            </Link>
            <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-end">
              <div>
                <div className="mb-5 font-mono text-xs uppercase tracking-[.22em] text-primary">Project / {project.slug}</div>
                <h1 className="heading-font text-4xl font-black leading-tight tracking-tight sm:text-6xl md:text-7xl">{project.title}</h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{project.longDescription}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href={project.live} target="_blank" rel="noreferrer" className="flex min-h-12 w-full items-center justify-center gap-2 rounded-none bg-primary px-6 font-mono text-xs uppercase tracking-widest text-white glow-border-intense hover:bg-primary/90 sm:w-auto">
                    Visit Website <ExternalLink size={15} />
                  </a>
                  <a href={project.github} target="_blank" rel="noreferrer" className="flex min-h-12 w-full items-center justify-center gap-2 rounded-none border border-primary/50 px-6 font-mono text-xs uppercase tracking-widest text-primary hover:bg-primary/10 sm:w-auto">
                    GitHub <Github size={15} />
                  </a>
                </div>
              </div>
              <div className="glass-panel rounded-xl p-5">
                <div className="mb-4 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground"><Layers3 size={15} className="text-primary" /> Build profile</div>
                <div className="flex flex-wrap gap-2">{project.tags.map((tag) => <span key={tag} className="rounded-sm border border-primary/20 bg-primary/10 px-3 py-2 text-xs font-mono text-primary">{tag}</span>)}</div>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 pb-24 md:px-12">
          <ProjectScreenshot accent={project.accent} />
          <div className="mt-16 grid gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-4 flex items-center gap-4"><div className="h-1 w-12 bg-primary" /><h2 className="heading-font text-2xl font-bold tracking-wider">FEATURES</h2></div>
              <div className="grid gap-3">{project.features.map((feature, index) => <motion.div key={feature} initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }} className="glass-panel flex items-center gap-4 rounded-lg p-4"><span className="font-mono text-xs text-primary">0{index + 1}</span><span className="text-sm">{feature}</span></motion.div>)}</div>
            </div>
            <div>
              <div className="mb-4 flex items-center gap-4"><div className="h-1 w-12 bg-secondary" /><h2 className="heading-font text-2xl font-bold tracking-wider">ARCHITECTURE</h2></div>
              <div className="glass-panel rounded-xl p-6">
                <div className="mb-7 grid grid-cols-2 gap-3 sm:grid-cols-4">{["Input", "Logic", "Action", "Insight"].map((item, index) => <div key={item} className="text-center"><div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full border border-secondary/40 bg-secondary/10 font-mono text-xs text-secondary">{index + 1}</div><span className="text-xs text-muted-foreground">{item}</span></div>)}</div>
                <p className="text-sm leading-7 text-muted-foreground">{project.architecture}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ResumePdf />
      <ChatBot />
    </>
  );
}