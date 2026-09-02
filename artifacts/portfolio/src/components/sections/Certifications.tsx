import { useEffect, useState } from "react";
import { Award, ChevronLeft, ChevronRight, ExternalLink, Maximize2, ShieldCheck, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import arligCertificate from "@assets/Screenshot_2026-09-02-21-08-15-76_254de13a4bc8758c9908fff1f73e_1788366821473.jpg";
import ciscoCertificate from "@assets/Screenshot_2026-09-02-21-53-07-80_254de13a4bc8758c9908fff1f73e_1788366821644.jpg";
import deloitteCertificate from "@assets/Screenshot_2026-09-02-21-53-40-83_254de13a4bc8758c9908fff1f73e_1788366821705.jpg";

const credlyUrl = "https://www.credly.com/badges/0cefcda2-aa6a-43aa-94ac-2f074fb7ab9c/linked_in?t=te95kj";

const certificates = [
  {
    title: "Frontend Development – ReactJS",
    issuer: "Arlig Technologies",
    date: "20 May – 28 Jun 2024",
    detail: "240-hour internship program focused on building practical frontend development skills with ReactJS.",
    image: arligCertificate,
  },
  {
    title: "Data Science Essentials with Python",
    issuer: "Cisco Networking Academy",
    date: "29 Apr 2026",
    detail: "Completed foundational data science training with Python through the Cisco Networking Academy program.",
    image: ciscoCertificate,
    verifyUrl: credlyUrl,
  },
  {
    title: "Data Analytics Job Simulation",
    issuer: "Deloitte · Forage",
    date: "24 Oct 2025",
    detail: "Completed practical data analysis and forensic technology tasks in Deloitte's job simulation.",
    image: deloitteCertificate,
  },
];

export function Certifications() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);
  const activeCertificate = certificates[activeIndex];

  useEffect(() => {
    if (viewerOpen) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % certificates.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [viewerOpen]);

  const move = (direction: number) => {
    setActiveIndex((current) => (current + direction + certificates.length) % certificates.length);
  };

  return (
    <section id="certifications" className="relative overflow-hidden py-24" data-testid="section-certifications">
      <div className="pointer-events-none absolute left-0 top-1/3 h-96 w-96 rounded-full bg-secondary/5 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-primary/10 blur-[130px]" />
      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="h-1 w-12 bg-primary" />
            <div>
              <h2 className="heading-font text-3xl font-bold tracking-wider sm:text-4xl">
                CREDENTIALS.DB <span className="text-xl font-normal text-muted-foreground">// CERTIFICATIONS</span>
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                Verified milestones from internships, data science, and analytics work.
              </p>
            </div>
          </div>
          <a
            href={credlyUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 self-start font-mono text-xs uppercase tracking-widest text-primary transition-colors hover:text-secondary sm:self-auto"
            data-testid="link-credly-profile"
          >
            View Credly badge <ExternalLink size={13} />
          </a>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,.85fr)] lg:items-start">
          <AnimatePresence mode="wait">
            <motion.button
              key={activeCertificate.title}
              type="button"
              initial={{ opacity: 0, scale: 0.97, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 1.03, x: -20 }}
              transition={{ duration: 0.35 }}
              onClick={() => setViewerOpen(true)}
              className="group relative overflow-hidden rounded-2xl border border-primary/30 bg-[#0b0a16] p-2 text-left shadow-[0_0_45px_rgba(139,92,246,.18)] focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label={`Open full certificate: ${activeCertificate.title}`}
              data-testid={`button-certificate-preview-${activeIndex}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/10 opacity-80" />
              <div className="relative aspect-[1.42/1] overflow-hidden rounded-xl bg-white">
                <img
                  src={activeCertificate.image}
                  alt={`${activeCertificate.title} certificate`}
                  className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <span className="font-mono text-[10px] uppercase tracking-[.2em]">Active credential</span>
                  <span className="flex items-center gap-2 rounded-full border border-white/30 bg-black/30 px-3 py-2 text-[10px] font-mono uppercase tracking-widest backdrop-blur-sm">
                    <Maximize2 size={12} /> Tap to enlarge
                  </span>
                </div>
              </div>
            </motion.button>
          </AnimatePresence>

          <div className="space-y-3">
            {certificates.map((certificate, index) => {
              const isActive = index === activeIndex;
              return (
                <motion.button
                  key={certificate.title}
                  type="button"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => setActiveIndex(index)}
                  className={`group flex w-full items-center gap-4 rounded-xl border p-3 text-left transition-all ${
                    isActive
                      ? "border-primary/60 bg-primary/10 shadow-[0_0_25px_rgba(139,92,246,.14)]"
                      : "border-white/10 bg-white/[.03] hover:border-primary/30"
                  }`}
                  aria-pressed={isActive}
                  data-testid={`button-certificate-${index}`}
                >
                  <div className="h-20 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-white/15 bg-white">
                    <img src={certificate.image} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-start justify-between gap-2">
                      <h3 className={`heading-font text-sm font-bold leading-5 ${isActive ? "text-primary" : "text-foreground"}`}>
                        {certificate.title}
                      </h3>
                      <Award size={16} className={isActive ? "flex-shrink-0 text-primary" : "flex-shrink-0 text-muted-foreground"} />
                    </div>
                    <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{certificate.issuer}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{certificate.date}</p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-5 rounded-xl border border-white/10 bg-white/[.025] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex items-start gap-3">
            <ShieldCheck size={18} className="mt-0.5 flex-shrink-0 text-secondary" />
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-foreground">{activeCertificate.issuer}</p>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">{activeCertificate.detail}</p>
            </div>
          </div>
          <div className="flex flex-shrink-0 items-center gap-2">
            <button type="button" onClick={() => move(-1)} className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary" aria-label="Previous certificate" data-testid="button-previous-certificate">
              <ChevronLeft size={17} />
            </button>
            <span className="min-w-16 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {String(activeIndex + 1).padStart(2, "0")} / {String(certificates.length).padStart(2, "0")}
            </span>
            <button type="button" onClick={() => move(1)} className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary" aria-label="Next certificate" data-testid="button-next-certificate">
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {viewerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9500] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={`${activeCertificate.title} certificate viewer`}
            onClick={() => setViewerOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              className="relative max-h-full max-w-5xl rounded-2xl border border-primary/40 bg-[#0b0a16] p-2 shadow-[0_0_60px_rgba(139,92,246,.35)]"
              onClick={(event) => event.stopPropagation()}
            >
              <button type="button" onClick={() => setViewerOpen(false)} className="absolute -right-2 -top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-primary/50 bg-background text-primary shadow-lg transition-colors hover:bg-primary hover:text-white" aria-label="Close certificate viewer" data-testid="button-close-certificate-viewer">
                <X size={16} />
              </button>
              <img src={activeCertificate.image} alt={`${activeCertificate.title} certificate full view`} className="max-h-[82vh] w-auto max-w-[calc(100vw-2rem)] rounded-xl object-contain sm:max-w-[calc(100vw-4rem)]" />
              <div className="px-3 pb-2 pt-3">
                <p className="font-mono text-xs uppercase tracking-widest text-primary">{activeCertificate.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{activeCertificate.issuer} · {activeCertificate.date}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}