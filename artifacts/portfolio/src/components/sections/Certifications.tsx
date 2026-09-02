import { Award, ExternalLink, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const badges = [
  { title: "Salesforce Developer", issuer: "Credly certification", detail: "CRM development, Apex, and automation" },
  { title: "AI & Automation", issuer: "Credly badge collection", detail: "Applied AI workflows and intelligent systems" },
  { title: "Full Stack Development", issuer: "Credly badge collection", detail: "Product interfaces, APIs, and data" },
];

export function Certifications() {
  return (
    <section id="certifications" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 h-80 w-80 -translate-y-1/2 rounded-full bg-primary/5 blur-[130px] pointer-events-none" />
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14 flex items-center gap-4">
          <div className="h-1 w-12 bg-primary" />
          <h2 className="heading-font text-3xl font-bold tracking-wider">CREDLY.BADGES <span className="text-muted-foreground font-normal text-xl">// CERTIFICATIONS</span></h2>
        </motion.div>
        <div className="grid gap-5 md:grid-cols-3">
          {badges.map((badge, index) => (
            <motion.a key={badge.title} href="https://www.credly.com/" target="_blank" rel="noreferrer" initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .1 }} whileHover={{ y: -5 }} className="glass-panel group rounded-xl p-6" data-testid={`link-credly-badge-${index}`}>
              <div className="mb-8 flex items-center justify-between"><span className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary glow-border"><Award size={22} /></span><ExternalLink size={16} className="text-muted-foreground transition-colors group-hover:text-primary" /></div>
              <h3 className="heading-font text-lg font-bold">{badge.title}</h3>
              <p className="mt-2 text-xs font-mono uppercase tracking-widest text-primary">{badge.issuer}</p>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{badge.detail}</p>
              <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground"><ShieldCheck size={14} className="text-secondary" /> Verify on Credly</div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}