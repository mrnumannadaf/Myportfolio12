import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-12 border-t border-white/10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <div className="heading-font text-2xl font-black tracking-wider mb-1">
              NUMAN<span className="text-primary">.OS</span>
            </div>
            <p className="text-muted-foreground text-sm font-mono">
              Full Stack Developer | Tech Entrepreneur | Future AI Builder
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/numan-nadaf"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all"
              data-testid="footer-link-github"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/numan-nadaf/"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-muted-foreground hover:text-secondary hover:border-secondary/50 hover:bg-secondary/10 transition-all"
              data-testid="footer-link-linkedin"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:numan.nadaf06@gmail.com"
              className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all"
              data-testid="footer-link-email"
            >
              <Mail size={18} />
            </a>
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full border border-primary/50 bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-all glow-border"
            data-testid="button-scroll-top"
          >
            <ArrowUp size={16} />
          </motion.button>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 text-center">
          <p className="text-muted-foreground text-xs font-mono">
            Designed & Built by Numan Nadaf — {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
