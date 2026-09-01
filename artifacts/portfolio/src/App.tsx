import { useEffect, useRef, useState, type FormEvent, type MouseEvent as ReactMouseEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Route, Router as WouterRouter, Switch, Link, useLocation, useParams } from "wouter";
import { ArrowDownRight, ArrowLeft, ArrowUpRight, Bot, CalendarDays, Check, ChevronRight, CircleDot, Code2, Download, Github, Globe2, Layers3, Linkedin, Mail, Menu, MessageCircle, Play, Send, X, Zap } from "lucide-react";
import numanPhoto from "@assets/image_1777899267067.png";
import { ChatBot } from "@/components/ChatBot";
import { ResumePdf } from "@/components/ResumePdf";
import { useResumePdf } from "@/hooks/use-resume-pdf";
import NotFound from "@/pages/not-found";
import "@/index.css";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  slug: string;
  number: string;
  name: string;
  kicker: string;
  description: string;
  impact: string;
  stack: string[];
  features: string[];
  color: string;
  visual: "dashboard" | "crm" | "fashion" | "analytics" | "workflow" | "agency";
};

const projects: Project[] = [
  {
    slug: "omnifuze", number: "01", name: "OmniFuze", kicker: "AI venture studio", impact: "Turn repetitive work into an unfair advantage.",
    description: "A practical AI automation studio for startups and growing teams. OmniFuze connects the tools people already use and makes the busywork disappear.",
    stack: ["React", "TypeScript", "Node.js", "OpenAI", "PostgreSQL"],
    features: ["AI workflow design", "Multi-channel agents", "Human-in-the-loop controls", "Live operational dashboards"],
    color: "#cff62a", visual: "workflow",
  },
  {
    slug: "influencer-buzz", number: "02", name: "Influencer Buzz", kicker: "Campaign intelligence",
    impact: "Make creator partnerships easier to measure.",
    description: "A campaign workspace that helps brands discover creators, coordinate deliverables, and see what actually moved the needle.",
    stack: ["React", "Node.js", "MongoDB", "REST APIs"],
    features: ["Creator discovery", "Campaign workspaces", "Deliverable tracking", "Performance reporting"],
    color: "#f36b4a", visual: "agency",
  },
  {
    slug: "salesforce-crm-automation", number: "03", name: "Salesforce CRM Automation", kicker: "Enterprise workflows",
    impact: "Less admin. More customer momentum.",
    description: "Custom CRM automation built at Arlig Technologies — connecting Apex logic, Lightning components, and REST integrations into one calmer workflow.",
    stack: ["Salesforce", "Apex", "LWC", "SOQL", "REST"],
    features: ["Apex triggers", "Lightning Web Components", "REST callouts", "Opportunity automation"],
    color: "#f0b44e", visual: "crm",
  },
  {
    slug: "ai-automation-dashboard", number: "04", name: "AI Automation Dashboard", kicker: "Operational command center",
    impact: "See every workflow while it works.",
    description: "A real-time control surface for automations, schedules, and AI agents — built for teams that need clarity, not another black box.",
    stack: ["React", "TypeScript", "WebSockets", "Cron", "Node.js"],
    features: ["Visual workflow builder", "Real-time events", "Cron scheduling", "Run history"],
    color: "#a9b7ff", visual: "dashboard",
  },
  {
    slug: "fashion-flick", number: "05", name: "Fashion Flick", kicker: "D2C commerce",
    impact: "A sharper way to shop independent fashion.",
    description: "A D2C fashion concept bringing editorial energy to the storefront, with a checkout flow designed for speed and trust.",
    stack: ["React", "Node.js", "PostgreSQL", "Razorpay"],
    features: ["Editorial storefront", "Product collections", "Razorpay payments", "Order management"],
    color: "#ef8cbb", visual: "fashion",
  },
  {
    slug: "social-media-analytics", number: "06", name: "Social Media Analytics", kicker: "Growth signals",
    impact: "Turn scattered metrics into a clear next move.",
    description: "A multi-platform brand performance aggregator for teams who care about meaningful growth, not vanity metrics.",
    stack: ["React", "Node.js", "REST APIs", "Recharts"],
    features: ["Cross-platform data", "Trend detection", "Audience snapshots", "Shareable reports"],
    color: "#7de0c1", visual: "analytics",
  },
];

const experience = [
  { date: "2023 — 2024", role: "Salesforce Developer", company: "Arlig Technologies", detail: "Built Apex automations, LWC components, and REST integrations that made enterprise CRM work less manual." },
  { date: "2023 — 2024", role: "Frontend Developer", company: "Arlig Technologies", detail: "Translated complex product requirements into responsive interfaces with React, JavaScript, and a serious eye for detail." },
  { date: "2022 — now", role: "AI Automation Builder", company: "Independent practice", detail: "Designing agentic workflows, chatbots, voice interfaces, and practical automations for ambitious teams." },
  { date: "Current", role: "Founder", company: "OmniFuze", detail: "Building the studio where AI, automation, and full-stack craft become products people can rely on." },
];

const skillGroups = [
  { label: "Frontend", items: ["React", "Next.js", "JavaScript", "TypeScript", "HTML", "CSS", "Tailwind CSS"] },
  { label: "Backend", items: ["Node.js", "Express", "FastAPI", "Python"] },
  { label: "Database", items: ["MongoDB", "PostgreSQL", "Firebase"] },
  { label: "AI", items: ["OpenAI", "Gemini", "LangChain", "AI Agents", "Prompt Engineering", "Automation", "Webhooks"] },
  { label: "Cloud & Tools", items: ["GitHub", "Vercel", "Replit", "Salesforce", "Zapier", "Make", "Google Workspace"] },
];

const services = [
  { title: "AI Chatbots", note: "Helpful interfaces that understand context and move conversations forward.", icon: Bot },
  { title: "AI Receptionists", note: "Always-on first response for the calls and questions that matter.", icon: MessageCircle },
  { title: "WhatsApp Automation", note: "Follow-ups, reminders, and support flows where customers already are.", icon: Send },
  { title: "CRM Automation", note: "Connect lead capture, enrichment, and next actions without the spreadsheet shuffle.", icon: Layers3 },
  { title: "AI Voice Agents", note: "Natural voice flows for qualification, booking, and customer care.", icon: CircleDot },
  { title: "Website Development", note: "Fast, expressive product surfaces built to earn trust and convert.", icon: Globe2 },
  { title: "Workflow Automation", note: "Make your best process repeatable, observable, and easier to improve.", icon: Zap },
  { title: "AI Dashboards", note: "Operational visibility for teams making decisions at speed.", icon: Code2 },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function SectionLabel({ children, inverse = false }: { children: ReactNode; inverse?: boolean }) {
  return <div className={`eyebrow flex items-center gap-3 ${inverse ? "text-primary" : "text-muted-foreground"}`}><span className="lime-rule" />{children}</div>;
}

function ButtonLink({ children, href, onClick, inverse = false, className = "" }: { children: ReactNode; href?: string; onClick?: () => void; inverse?: boolean; className?: string }) {
  const classes = `${inverse ? "btn-primary" : "btn-ink"} ${className}`;
  if (href?.startsWith("#")) return <button type="button" onClick={() => scrollToId(href.slice(1))} className={classes} data-testid={`button-${href.slice(1)}`}>{children}</button>;
  return <a href={href ?? "#"} onClick={onClick} className={classes} data-testid="link-action">{children}</a>;
}

function AppShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [spot, setSpot] = useState({ x: -500, y: -500 });
  const [location, setLocation] = useLocation();
  const { downloadPdf, generating } = useResumePdf();

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    const onMove = (event: MouseEvent) => setSpot({ x: event.clientX, y: event.clientY });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("mousemove", onMove); };
  }, []);

  useEffect(() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior }); }, [location]);

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".section-shell").forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0.82, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 88%", once: true },
          },
        );
      });

      const orbs = gsap.utils.toArray<HTMLElement>(".gradient-orb");
      if (orbs.length) {
        gsap.to(orbs, {
          y: -24,
          duration: 5.5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: 0.7,
        });
      }
    });

    return () => context.revert();
  }, []);

  const navItems = [["About", "about"], ["Work", "projects"], ["Approach", "services"], ["Contact", "contact"]];
  return (
    <div className="noise min-h-[100dvh] overflow-x-hidden">
      <div className="cursor-spotlight" style={{ left: spot.x, top: spot.y }} />
      <div className="fixed left-0 top-0 z-[100] h-[3px] bg-primary progress-line" style={{ width: `${progress * 100}%` }} />
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
        <nav className="mx-auto flex max-w-[1240px] items-center justify-between rounded-2xl border border-foreground/10 bg-background/80 px-4 py-3 shadow-[0_14px_45px_rgba(26,35,54,.08)] backdrop-blur-xl sm:px-5">
          <Link href="/" className="flex items-center gap-3" data-testid="link-home">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary font-heading text-sm font-bold text-primary">N</span>
            <span className="font-heading text-sm font-bold tracking-tight">NUMAN NADAF<span className="text-accent">.</span></span>
          </Link>
          <div className="hidden items-center gap-7 md:flex">
            {navItems.map(([label, id]) => <button type="button" key={id} onClick={() => scrollToId(id)} className="text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground" data-testid={`button-nav-${id}`}>{label}</button>)}
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <button type="button" onClick={downloadPdf} className="btn-ghost min-h-9 border-foreground/15 px-3 text-[.68rem]" data-testid="button-download-resume">{generating ? "Preparing..." : "Download Resume"} <Download size={13} /></button>
            <button type="button" onClick={() => location === "/" ? scrollToId("booking") : setLocation("/#booking")} className="btn-primary min-h-9 px-3 text-[.68rem]" data-testid="button-book-nav">Book a call <ArrowUpRight size={13} /></button>
          </div>
          <button type="button" className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-primary sm:hidden" onClick={() => setMenuOpen(!menuOpen)} data-testid="button-toggle-menu">{menuOpen ? <X size={17} /> : <Menu size={17} />}</button>
        </nav>
        <AnimatePresence>
          {menuOpen && <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mx-auto mt-2 max-w-[1240px] rounded-2xl border border-foreground/10 bg-background/95 p-3 shadow-xl backdrop-blur-xl sm:hidden">
            {navItems.map(([label, id]) => <button type="button" key={id} onClick={() => { scrollToId(id); setMenuOpen(false); }} className="block w-full rounded-xl px-3 py-3 text-left text-sm font-semibold hover:bg-muted" data-testid={`button-mobile-nav-${id}`}>{label}</button>)}
            <button type="button" onClick={downloadPdf} className="mt-1 flex w-full items-center justify-between rounded-xl bg-secondary px-3 py-3 text-sm font-semibold text-primary" data-testid="button-mobile-resume">Download Resume <Download size={15} /></button>
          </motion.div>}
        </AnimatePresence>
      </header>
      {children}
      <ResumePdf />
      <ChatBot />
    </div>
  );
}

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => { const timer = window.setTimeout(onComplete, 1050); return () => window.clearTimeout(timer); }, [onComplete]);
  return <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-secondary text-secondary-foreground">
    <div className="mb-8 flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary font-heading text-xl font-bold text-secondary">N</span><span className="font-heading text-xl font-bold tracking-tight">NUMAN NADAF<span className="text-accent">.</span></span></div>
    <div className="w-48"><div className="mb-3 flex justify-between font-mono text-[10px] uppercase tracking-[.18em] text-secondary-foreground/50"><span>Loading studio</span><span>01</span></div><div className="h-px overflow-hidden bg-secondary-foreground/15"><motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: .9, ease: "easeInOut" }} className="h-full origin-left bg-primary" /></div></div>
  </motion.div>;
}

function Hero() {
  const [role, setRole] = useState(0);
  const { downloadPdf, generating } = useResumePdf();
  const roles = ["AI Founder", "Full Stack Developer", "AI Automation Engineer", "Startup Builder"];
  useEffect(() => { const timer = window.setInterval(() => setRole((value) => (value + 1) % roles.length), 2400); return () => window.clearInterval(timer); }, [roles.length]);
  return <section className="dark-panel relative min-h-[100dvh] overflow-hidden pt-28">
    <div className="hero-stars absolute inset-0" /><div className="gradient-orb lime -right-24 top-40 h-72 w-72 rounded-full blur-3xl" /><div className="gradient-orb coral bottom-16 left-1/3 h-80 w-80 rounded-full blur-3xl" />
    <div className="section-shell relative flex min-h-[calc(100dvh-7rem)] flex-col justify-center pb-20 lg:flex-row lg:items-center lg:gap-12">
      <div className="relative z-10 max-w-3xl lg:w-[65%]">
        <div className="reveal flex items-center gap-3 text-primary"><span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_0_6px_rgba(207,246,42,.14)]" /><span className="eyebrow">Founder · Builder · Operator</span></div>
        <h1 className="reveal reveal-delay-1 font-heading text-[clamp(4.25rem,13vw,10.6rem)] font-bold uppercase text-secondary-foreground display-tight mt-7">NUMAN<br /><span className="text-primary">NADAF</span><span className="text-accent">.</span></h1>
        <div className="reveal reveal-delay-2 mt-8 flex min-h-10 items-center gap-3"><span className="eyebrow text-secondary-foreground/45">Currently building as</span><AnimatePresence mode="wait"><motion.span key={roles[role]} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="font-heading text-xl font-semibold text-primary sm:text-2xl">{roles[role]}</motion.span></AnimatePresence></div>
        <p className="reveal reveal-delay-3 mt-7 max-w-xl text-base leading-7 text-secondary-foreground/65 sm:text-lg">I turn AI, automation, and full-stack craft into practical products for startups and growing businesses.</p>
        <div className="reveal reveal-delay-4 mt-9 flex flex-wrap gap-3"><ButtonLink href="/projects/omnifuze" inverse>Explore OmniFuze <ArrowUpRight size={16} /></ButtonLink><ButtonLink href="#projects" inverse={false} className="border border-secondary-foreground/25 bg-transparent text-secondary-foreground">View Projects <ArrowDownRight size={16} /></ButtonLink><button type="button" onClick={() => scrollToId("booking")} className="btn-ghost border-secondary-foreground/25 text-secondary-foreground" data-testid="button-hero-book">Book Discovery Call <CalendarDays size={15} /></button><button type="button" onClick={downloadPdf} className="btn-ghost border-secondary-foreground/25 text-secondary-foreground" data-testid="button-hero-resume">{generating ? "Preparing..." : "Download Resume"} <Download size={15} /></button></div>
        <div className="mt-16 flex items-center gap-8 text-secondary-foreground/40"><span className="eyebrow">Based in India</span><span className="h-px w-16 bg-secondary-foreground/20" /><span className="eyebrow">Working globally</span></div>
      </div>
      <div className="relative z-10 mt-14 flex justify-center lg:mt-0 lg:w-[35%] lg:justify-end">
        <div className="group relative h-[350px] w-[270px] rotate-2 sm:h-[465px] sm:w-[350px]">
          <div className="absolute -inset-6 rounded-[2.5rem] border border-primary/20 transition-transform duration-700 group-hover:rotate-[-8deg] group-hover:scale-105" /><div className="absolute -inset-3 rounded-[2rem] bg-primary/10 blur-xl transition-opacity group-hover:opacity-80" />
          <div className="relative h-full w-full overflow-hidden rounded-[1.7rem] border border-secondary-foreground/15 bg-[#34415b] shadow-2xl">
            <img src={numanPhoto} alt="Numan Nadaf" className="h-full w-full object-cover grayscale-[.35] contrast-110 saturate-75 transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0 group-hover:saturate-125" />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-primary/10 mix-blend-multiply opacity-70" /><div className="absolute bottom-5 left-5 right-5 flex items-end justify-between"><span className="font-mono text-[10px] uppercase tracking-[.18em] text-secondary-foreground/60">Human in the loop</span><span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-secondary"><ArrowUpRight size={15} /></span></div>
          </div>
        </div>
      </div>
    </div>
    <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-secondary-foreground/35 sm:flex"><span className="eyebrow">Scroll to explore</span><ArrowDownRight size={15} /></div>
  </section>;
}

function About() {
  return <section id="about" className="relative overflow-hidden py-28 lg:py-40"><div className="section-shell grid gap-14 lg:grid-cols-[.75fr_1.25fr] lg:gap-24"><div><SectionLabel>01 / The person behind the product</SectionLabel><h2 className="mt-7 max-w-md font-heading text-5xl font-bold leading-[.95] tracking-[-.055em] sm:text-7xl">Curious by default. <span className="text-accent">Useful</span> on purpose.</h2></div><div className="max-w-2xl"><p className="text-2xl font-medium leading-[1.2] tracking-[-.03em] sm:text-4xl">I am a Computer Science Engineering student, Salesforce Developer, frontend and full-stack developer, and founder building at the intersection of <span className="text-accent">technology and momentum.</span></p><div className="mt-9 grid gap-7 border-t border-foreground/15 pt-7 sm:grid-cols-2"><p className="text-sm leading-7 text-muted-foreground">I have built AI products and business automation systems from the interface down to the data layer. My favorite work is where a messy process becomes a calm, well-designed tool people actually want to use.</p><p className="text-sm leading-7 text-muted-foreground">As Founder of OmniFuze, I am exploring what a small, sharp AI studio can ship for startups — with less theatre, more working software, and a close eye on the humans inside every workflow.</p></div><button type="button" onClick={() => scrollToId("experience")} className="mt-9 flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[.13em] text-foreground hover:text-accent" data-testid="button-read-story">Read the story <ArrowDownRight size={16} /></button></div></div></section>;
}

function Experience() {
  return <section id="experience" className="dark-panel py-28 lg:py-36"><div className="section-shell"><SectionLabel inverse>02 / Experience</SectionLabel><div className="mt-14 grid gap-12 lg:grid-cols-[.7fr_1.3fr]"><div><h2 className="font-heading text-5xl font-bold leading-[.95] tracking-[-.06em] sm:text-7xl">A timeline of <span className="text-primary">building</span>.</h2><p className="mt-7 max-w-sm text-sm leading-7 text-secondary-foreground/55">Every role sharpened the same instinct: understand the real constraint, then build the shortest path through it.</p></div><div className="relative border-l border-secondary-foreground/15">{experience.map((item, index) => <motion.div initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-70px" }} transition={{ delay: index * .08 }} key={item.role} className="relative pb-12 pl-8 last:pb-0 sm:pl-12"><span className="absolute -left-[5px] top-1 h-2 w-2 rounded-full bg-primary ring-8 ring-secondary" /><div className="flex flex-wrap items-baseline justify-between gap-3"><h3 className="font-heading text-2xl font-semibold">{item.role}</h3><span className="font-mono text-[10px] uppercase tracking-[.14em] text-primary">{item.date}</span></div><p className="mt-2 text-sm font-semibold text-accent">{item.company}</p><p className="mt-3 max-w-xl text-sm leading-7 text-secondary-foreground/55">{item.detail}</p></motion.div>)}</div></div></div></section>;
}

function ProjectVisual({ project, large = false }: { project: Project; large?: boolean }) {
  return <div className={`project-visual relative overflow-hidden rounded-[1.25rem] ${large ? "h-[350px] sm:h-[470px]" : "h-56"}`} style={{ background: `linear-gradient(140deg, #25304a 0%, #172238 52%, ${project.color}a8 170%)` }}>
    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
    <div className={`absolute ${large ? "left-[11%] top-[15%] w-[78%]" : "left-[10%] top-[18%] w-[80%]"} overflow-hidden rounded-lg border border-white/20 bg-[#111a2b]/90 shadow-2xl`}>
      <div className="flex h-7 items-center gap-1.5 border-b border-white/10 px-3"><span className="h-1.5 w-1.5 rounded-full bg-[#ef5a3c]" /><span className="h-1.5 w-1.5 rounded-full bg-[#f0b44e]" /><span className="h-1.5 w-1.5 rounded-full bg-primary" /><span className="ml-auto h-1.5 w-10 rounded bg-white/10" /></div>
      <div className="grid grid-cols-[.22fr_1fr] gap-3 p-3 sm:gap-5 sm:p-5"><div className="space-y-2 border-r border-white/10 pr-2 sm:pr-4"><div className="h-2 w-8 rounded bg-primary/70" />{[1,2,3,4,5].map((n) => <div key={n} className="h-1.5 w-full rounded bg-white/10" />)}</div><div className="space-y-3"><div className="flex items-end justify-between"><div><div className="h-2 w-20 rounded bg-white/65" /><div className="mt-2 h-1.5 w-12 rounded bg-white/20" /></div><div className="h-5 w-16 rounded border border-primary/50 bg-primary/20" /></div><div className="grid grid-cols-3 gap-2">{[1,2,3].map((n) => <div key={n} className="h-14 rounded border border-white/10 bg-white/[.04] p-2"><div className="h-1.5 w-8 rounded bg-white/20" /><div className="mt-3 h-2 w-12 rounded" style={{ backgroundColor: project.color }} /></div>)}</div><div className="flex h-16 items-end gap-1.5 border-b border-white/10 px-2">{[34,52,42,75,55,88,70,96,78].map((height, index) => <div key={index} className="flex-1 rounded-t-sm opacity-80" style={{ height: `${height}%`, backgroundColor: index % 3 === 0 ? project.color : "rgba(255,255,255,.25)" }} />)}</div></div></div>
    </div>
    <div className="absolute bottom-5 left-5 font-mono text-[9px] uppercase tracking-[.16em] text-white/50">{project.kicker}</div><div className="absolute bottom-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white"><ArrowUpRight size={14} /></div>
  </div>;
}

function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const tilt = (event: ReactMouseEvent<HTMLAnchorElement>) => { const el = ref.current; if (!el) return; const rect = el.getBoundingClientRect(); const x = event.clientX - rect.left; const y = event.clientY - rect.top; el.style.transform = `perspective(1000px) rotateX(${(y / rect.height - .5) * -3}deg) rotateY(${(x / rect.width - .5) * 4}deg) translateY(-4px)`; };
  const reset = () => { if (ref.current) ref.current.style.transform = ""; };
  return <Link href={`/projects/${project.slug}`} ref={ref} onMouseMove={tilt} onMouseLeave={reset} className={`tilt-card group block rounded-[1.35rem] border border-foreground/10 bg-card p-3 ${featured ? "lg:col-span-2" : ""}`} data-testid={`link-project-${project.slug}`}>
    <ProjectVisual project={project} large={featured} /><div className="flex items-start justify-between gap-4 px-2 pb-2 pt-6"><div><div className="eyebrow text-muted-foreground">{project.number} / {project.kicker}</div><h3 className={`mt-3 font-heading font-bold tracking-[-.04em] ${featured ? "text-4xl sm:text-6xl" : "text-2xl"}`}>{project.name}</h3><p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">{project.description}</p></div><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-foreground/15 transition-colors group-hover:border-primary group-hover:bg-primary"><ArrowUpRight size={16} /></span></div>
  </Link>;
}

function Projects() {
  const featured = projects[0]; const rest = projects.slice(1);
  return <section id="projects" className="hairline-grid py-28 lg:py-40"><div className="section-shell"><div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><SectionLabel>03 / Selected work</SectionLabel><h2 className="mt-7 max-w-3xl font-heading text-5xl font-bold leading-[.92] tracking-[-.06em] sm:text-8xl">Products with a <span className="text-accent">point of view.</span></h2></div><p className="max-w-xs text-sm leading-6 text-muted-foreground">Some shipped. Some in the studio. All built around a real person, a real constraint, and a better next step.</p></div><div className="mt-14 grid gap-5 md:grid-cols-2"><ProjectCard project={featured} featured />{rest.map((project) => <ProjectCard key={project.slug} project={project} />)}</div></div></section>;
}

function Skills() {
  return <section id="skills" className="py-28 lg:py-36"><div className="section-shell grid gap-12 lg:grid-cols-[.75fr_1.25fr]"><div><SectionLabel>04 / Toolkit</SectionLabel><h2 className="mt-7 font-heading text-5xl font-bold leading-[.95] tracking-[-.06em] sm:text-7xl">The stack is a <span className="text-accent">means</span>, not the message.</h2></div><div className="grid gap-9 sm:grid-cols-2">{skillGroups.map((group, index) => <div key={group.label} className="border-t border-foreground/15 pt-4"><div className="flex items-center justify-between"><h3 className="font-heading text-lg font-bold">{group.label}</h3><span className="font-mono text-[10px] text-muted-foreground">0{index + 1}</span></div><div className="mt-5 flex flex-wrap gap-2">{group.items.map((item) => <span key={item} className="rounded-md border border-foreground/12 bg-card px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-foreground">{item}</span>)}</div></div>)}</div></div></section>;
}

function Services() {
  const [active, setActive] = useState<string | null>(null);
  return <section id="services" className="dark-panel py-28 lg:py-36"><div className="section-shell"><div className="grid gap-10 lg:grid-cols-[.65fr_1.35fr]"><div><SectionLabel inverse>05 / What I build</SectionLabel><h2 className="mt-7 font-heading text-5xl font-bold leading-[.95] tracking-[-.06em] sm:text-7xl">Useful AI for the <span className="text-primary">actual</span> work.</h2><p className="mt-7 max-w-sm text-sm leading-7 text-secondary-foreground/55">Pick the bottleneck. We will find the smallest intelligent system that makes it lighter.</p></div><div className="grid gap-px overflow-hidden rounded-2xl border border-secondary-foreground/10 bg-secondary-foreground/10 sm:grid-cols-2">{services.map((service, index) => { const Icon = service.icon; const isActive = active === service.title; return <div key={service.title} className={`bg-secondary p-5 transition-colors ${isActive ? "bg-[#293653]" : "hover:bg-[#222e49]"}`}><button type="button" onClick={() => setActive(isActive ? null : service.title)} className="flex w-full items-start justify-between gap-4 text-left" data-testid={`button-service-${index}`}><div><span className="mb-5 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon size={17} /></span><h3 className="font-heading text-lg font-semibold">{service.title}</h3></div><ChevronRight size={16} className={`mt-1 text-secondary-foreground/40 transition-transform ${isActive ? "rotate-90 text-primary" : ""}`} /></button><AnimatePresence>{isActive && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="pt-4 text-sm leading-6 text-secondary-foreground/60">{service.note}<br /><button type="button" onClick={() => scrollToId("booking")} className="mt-3 font-mono text-[10px] uppercase tracking-[.12em] text-primary" data-testid={`button-service-cta-${index}`}>Learn more <ArrowUpRight className="ml-1 inline" size={13} /></button></motion.p>}</AnimatePresence></div>; })}</div></div></div></section>;
}

function Ventures() {
  return <section id="ventures" className="py-28 lg:py-40"><div className="section-shell"><SectionLabel>06 / Startups I'm building</SectionLabel><div className="mt-12 grid gap-5 lg:grid-cols-[1.55fr_.85fr]"><div className="group relative min-h-[450px] overflow-hidden rounded-[1.5rem] bg-secondary p-7 text-secondary-foreground sm:p-10" data-testid="card-venture-omnifuze"><div className="gradient-orb lime right-0 top-0 h-72 w-72 blur-3xl" /><div className="relative flex h-full flex-col justify-between"><div className="flex items-start justify-between"><span className="rounded-full border border-primary/30 px-3 py-2 font-mono text-[10px] uppercase tracking-[.15em] text-primary">Flagship venture · Current</span><ArrowUpRight className="text-primary transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></div><div><div className="mb-5 flex items-center gap-3"><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary font-heading text-xl font-bold text-secondary">O</span><span className="font-heading text-2xl font-bold">OmniFuze<span className="text-accent">.</span></span></div><h3 className="max-w-xl font-heading text-5xl font-bold leading-[.92] tracking-[-.06em] sm:text-7xl">Small team.<br /><span className="text-primary">Big leverage.</span></h3><p className="mt-6 max-w-xl text-sm leading-6 text-secondary-foreground/60">OmniFuze is an AI-powered business automation platform helping startups, clinics, restaurants, cafes, creators, local businesses, e-commerce brands, and companies automate customer support, lead generation, appointments, CRM workflows, WhatsApp automation, websites, AI voice agents, and AI dashboards.</p><div className="mt-7 flex flex-wrap gap-3"><a href="https://omnifuze.com" target="_blank" rel="noreferrer" className="btn-primary" data-testid="link-omnifuze-website">Visit OmniFuze Website <ArrowUpRight size={15} /></a><Link href="/projects/omnifuze" className="btn-ghost border-secondary-foreground/25" data-testid="link-omnifuze-project">View OmniFuze Project <ArrowUpRight size={15} /></Link></div></div></div></div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1"><VentureMini project={projects[1]} /><VentureMini project={projects[4]} /></div></div></div></section>;
}

function VentureMini({ project }: { project: Project }) {
  return <Link href={`/projects/${project.slug}`} className="group flex min-h-[212px] flex-col justify-between rounded-[1.5rem] border border-foreground/10 bg-card p-6 transition-transform hover:-translate-y-1" data-testid={`link-venture-${project.slug}`}><div className="flex justify-between"><span className="eyebrow text-muted-foreground">{project.kicker}</span><ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></div><div><h3 className="font-heading text-3xl font-bold tracking-[-.05em]">{project.name}</h3><p className="mt-2 text-sm text-muted-foreground">{project.impact}</p></div></Link>;
}

function Counter({ value, label }: { value: string; label: string }) {
  const [shown, setShown] = useState(0); const numeric = Number.parseInt(value, 10);
  useEffect(() => { let frame = 0; const start = performance.now(); const tick = (now: number) => { const ratio = Math.min((now - start) / 1100, 1); setShown(Math.floor(ratio * numeric)); if (ratio < 1) frame = requestAnimationFrame(tick); }; frame = requestAnimationFrame(tick); return () => cancelAnimationFrame(frame); }, [numeric]);
  return <div><div className="font-heading text-5xl font-bold tracking-[-.06em] text-primary">{shown}{value.includes("+") ? "+" : ""}</div><div className="mt-2 max-w-[110px] font-mono text-[10px] uppercase leading-4 tracking-[.14em] text-secondary-foreground/45">{label}</div></div>;
}

function Stats() {
  return <section className="dark-panel border-y border-secondary-foreground/10 py-20"><div className="section-shell grid grid-cols-2 gap-y-12 sm:grid-cols-4"><Counter value="6" label="products in the portfolio" /><Counter value="4" label="ways to build with AI" /><Counter value="3" label="roles across product & code" /><Counter value="100" label="percent human curiosity" /></div></section>;
}

function Booking() {
  const [date, setDate] = useState(""); const [format, setFormat] = useState("Google Meet"); const [sent, setSent] = useState(false);
  const submit = (event: FormEvent) => { event.preventDefault(); setSent(true); };
  return <section id="booking" className="hairline-grid py-28 lg:py-40"><div className="section-shell grid gap-12 lg:grid-cols-[1fr_.85fr] lg:items-center"><div><SectionLabel>07 / Let's talk</SectionLabel><h2 className="mt-7 max-w-2xl font-heading text-6xl font-bold leading-[.9] tracking-[-.065em] sm:text-8xl">Bring the messy <span className="text-accent">brief.</span></h2><p className="mt-7 max-w-md text-base leading-7 text-muted-foreground">A 30-minute discovery call to map the problem, the people involved, and the fastest useful first version.</p><div className="mt-9 flex flex-wrap gap-2">{["Calendly", "Google Meet", "Zoom", "WhatsApp"].map((item) => <span key={item} className="rounded-full border border-foreground/12 bg-card px-3 py-2 font-mono text-[10px] uppercase tracking-[.12em] text-muted-foreground">{item}</span>)}</div></div><form onSubmit={submit} className="rounded-[1.5rem] border border-foreground/10 bg-card p-6 shadow-[0_20px_70px_rgba(26,35,54,.08)] sm:p-8"><div className="mb-7 flex items-center justify-between"><div><div className="font-heading text-xl font-bold">Pick a starting point</div><div className="mt-1 text-sm text-muted-foreground">No sales theatre. Just a useful conversation.</div></div><CalendarDays className="text-accent" size={22} /></div><label className="eyebrow text-muted-foreground">Preferred date<input required type="date" min={new Date().toISOString().split("T")[0]} value={date} onChange={(e) => setDate(e.target.value)} className="mt-3 block w-full rounded-lg border border-foreground/15 bg-background px-4 py-3 font-mono text-sm outline-none focus:border-accent" data-testid="input-booking-date" /></label><div className="mt-6"><div className="eyebrow text-muted-foreground">Call format</div><div className="mt-3 grid grid-cols-2 gap-2">{["Google Meet", "Zoom", "WhatsApp", "Calendly"].map((item) => <button type="button" key={item} onClick={() => setFormat(item)} className={`rounded-lg border px-3 py-3 text-left text-sm transition-colors ${format === item ? "border-accent bg-accent/10 font-semibold" : "border-foreground/12 text-muted-foreground hover:border-foreground/30"}`} data-testid={`button-format-${item.toLowerCase().replace(" ", "-")}`}>{item}{format === item && <Check size={14} className="float-right mt-0.5 text-accent" />}</button>)}</div></div><button type="submit" className="btn-primary mt-7 w-full" data-testid="button-submit-booking">{sent ? "Request noted — I’ll be in touch" : "Book Discovery Call"} <ArrowUpRight size={16} /></button><p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[.12em] text-muted-foreground">Placeholder booking flow · Links ready to connect</p></form></div></section>;
}

function Contact() {
  const contacts = [{ label: "Email", value: "numan.nedaf06@gmail.com", href: "mailto:numan.nedaf06@gmail.com", icon: Mail }, { label: "WhatsApp", value: "+91 7349212006", href: "https://wa.me/917349212006", icon: MessageCircle }, { label: "LinkedIn", value: "linkedin.com/in/numan-nadaf", href: "https://www.linkedin.com/in/numan-nadaf", icon: Linkedin }, { label: "GitHub", value: "github.com/numan-nadaf", href: "https://github.com/numan-nadaf", icon: Github }, { label: "Threads", value: "@numan.nadaf", href: "#", icon: MessageCircle }, { label: "Instagram", value: "@numan.nadaf", href: "#", icon: Globe2 }];
  return <section id="contact" className="dark-panel py-24 lg:py-32"><div className="section-shell"><div className="grid gap-12 lg:grid-cols-[1fr_1fr]"><div><SectionLabel inverse>08 / Contact</SectionLabel><h2 className="mt-7 max-w-xl font-heading text-6xl font-bold leading-[.9] tracking-[-.065em] sm:text-8xl">Good work starts with a <span className="text-primary">hello.</span></h2><p className="mt-7 max-w-sm text-sm leading-7 text-secondary-foreground/55">For a product build, an automation audit, or a thoughtful hello, find me here.</p></div><div className="grid content-start gap-3 sm:grid-cols-2">{contacts.map(({ label, value, href, icon: Icon }) => <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="group rounded-xl border border-secondary-foreground/10 bg-secondary-foreground/[.04] p-4 transition-colors hover:border-primary/50 hover:bg-secondary-foreground/[.08]" data-testid={`link-contact-${label.toLowerCase()}`}><div className="flex items-center justify-between"><Icon size={17} className="text-primary" /><ArrowUpRight size={14} className="text-secondary-foreground/35 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></div><div className="mt-8 font-mono text-[10px] uppercase tracking-[.14em] text-secondary-foreground/40">{label}</div><div className="mt-1 truncate text-sm font-semibold">{value}</div></a>)}</div></div><div className="mt-24 flex flex-col justify-between gap-5 border-t border-secondary-foreground/10 pt-6 text-secondary-foreground/35 sm:flex-row sm:items-center"><div className="font-heading text-sm font-bold tracking-tight text-secondary-foreground/65">NUMAN NADAF<span className="text-accent">.</span></div><div className="font-mono text-[10px] uppercase tracking-[.15em]">Built with curiosity · 2025</div><button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.15em] hover:text-primary" data-testid="button-back-top">Back to top <ArrowUpRight size={13} /></button></div></div></section>;
}

function HomePage() {
  const [loaded, setLoaded] = useState(() => typeof window !== "undefined" && sessionStorage.getItem("numan-loaded") === "true");
  const complete = () => { sessionStorage.setItem("numan-loaded", "true"); setLoaded(true); };
  return <AnimatePresence mode="wait">{loaded ? <AppShell key="app"><main><Hero /><About /><Experience /><Projects /><Skills /><Services /><Ventures /><Stats /><Booking /><Contact /></main></AppShell> : <LoadingScreen key="loading" onComplete={complete} />}</AnimatePresence>;
}

function Architecture({ project }: { project: Project }) {
  return <div className="rounded-2xl border border-foreground/10 bg-card p-5 sm:p-7"><div className="eyebrow text-muted-foreground">Architecture narrative</div><div className="mt-6 flex flex-wrap items-center gap-2">{["Signal", "Logic", "Action", "Feedback"].map((item, i) => <div key={item} className="flex items-center gap-2"><span className="rounded-lg bg-secondary px-3 py-3 font-mono text-xs text-secondary-foreground">{item}</span>{i < 3 && <ChevronRight size={14} className="text-accent" />}</div>)}</div><p className="mt-6 max-w-2xl text-sm leading-7 text-muted-foreground">The build starts with a clear signal from the user or the business. {project.name} then applies focused {project.stack[0]} logic, keeps the next action visible, and feeds useful feedback back into the workflow. The result is a product that feels understandable even when the machinery underneath is sophisticated.</p></div>;
}

function ProjectPage() {
  const { id } = useParams<{ id: string }>(); const project = projects.find((item) => item.slug === id);
  if (!project) return <NotFound />;
  return <AppShell><main><section className="dark-panel relative overflow-hidden pt-36 pb-20 lg:pt-48 lg:pb-28"><div className="hero-stars absolute inset-0" /><div className="section-shell relative"><Link href="/" className="mb-14 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.15em] text-secondary-foreground/50 hover:text-primary" data-testid="link-back-home"><ArrowLeft size={14} /> Back to portfolio</Link><div className="max-w-4xl"><div className="eyebrow text-primary">{project.number} / {project.kicker}</div><h1 className="mt-7 font-heading text-6xl font-bold leading-[.9] tracking-[-.07em] sm:text-9xl">{project.name}<span className="text-primary">.</span></h1><p className="mt-8 max-w-2xl text-lg leading-8 text-secondary-foreground/60">{project.description}</p><div className="mt-9 flex flex-wrap gap-3"><a href="#" onClick={(e) => e.preventDefault()} className="btn-primary" data-testid="button-live-demo">Live demo <Play size={15} /></a><a href="https://github.com/numan-nadaf" target="_blank" rel="noreferrer" className="btn-ghost border-secondary-foreground/25" data-testid="button-github-project"><Github size={15} /> View on GitHub</a></div></div></div></section><section className="section-shell -mt-2 py-16 lg:py-24"><ProjectVisual project={project} large /><div className="mt-16 grid gap-12 lg:grid-cols-[1.2fr_.8fr]"><div><SectionLabel>What it does</SectionLabel><h2 className="mt-6 font-heading text-4xl font-bold tracking-[-.05em] sm:text-6xl">{project.impact}</h2><div className="mt-8 grid gap-3 sm:grid-cols-2">{project.features.map((feature, index) => <div key={feature} className="flex items-start gap-3 rounded-xl border border-foreground/10 bg-card p-4"><span className="font-mono text-xs text-accent">0{index + 1}</span><span className="text-sm font-semibold">{feature}</span></div>)}</div></div><div><SectionLabel>Built with</SectionLabel><div className="mt-6 flex flex-wrap gap-2">{project.stack.map((tech) => <span key={tech} className="rounded-lg bg-secondary px-3 py-2 font-mono text-xs text-secondary-foreground">{tech}</span>)}</div><div className="mt-10 rounded-2xl border border-accent/30 bg-accent/10 p-5"><div className="font-heading text-lg font-bold">A better default</div><p className="mt-2 text-sm leading-6 text-muted-foreground">Good software should make the next decision more obvious. That is the bar for every screen in this project.</p></div></div></div><div className="mt-16"><Architecture project={project} /></div><div className="mt-24 flex flex-col items-start justify-between gap-7 border-t border-foreground/10 pt-7 sm:flex-row sm:items-center"><div><div className="eyebrow text-muted-foreground">Have a similar problem?</div><div className="mt-2 font-heading text-3xl font-bold tracking-[-.04em]">Let’s build the useful version.</div></div><a href="/#booking" className="btn-ink" data-testid="link-project-book">Start a conversation <ArrowUpRight size={15} /></a></div></section></main></AppShell>;
}

function Router() {
  return <Switch><Route path="/" component={HomePage} /><Route path="/projects/:id" component={ProjectPage} /><Route component={NotFound} /></Switch>;
}

export default function App() {
  return <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}><Router /></WouterRouter>;
}