import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Ventures", href: "#ventures" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-[9999]"
        style={{ scaleX }}
      />
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "py-4 glass-panel border-b border-white/10" : "py-6 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer interactive" onClick={() => scrollTo("#home")}>
            <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center glow-border">
              <span className="heading-font font-bold text-lg text-primary glow-text">N</span>
            </div>
            <span className="heading-font font-bold text-xl tracking-wider hidden sm:block">
              NUMAN<span className="text-primary">.LAB</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.href)}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors interactive tracking-wider uppercase"
                data-testid={`nav-link-${link.name.toLowerCase()}`}
              >
                {link.name}
              </button>
            ))}
            <Button 
              variant="outline" 
              className="border-primary/50 text-primary hover:bg-primary/10 hover:text-primary transition-all glow-border rounded-none heading-font tracking-widest uppercase text-xs"
              onClick={() => scrollTo("#contact")}
            >
              Initiate Contact
            </Button>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-foreground interactive"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 glass-panel border-b border-white/10 py-6 px-6 flex flex-col gap-6 md:hidden shadow-2xl"
          >
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.href)}
                className="text-lg font-medium text-foreground hover:text-primary text-left tracking-wider uppercase"
              >
                {link.name}
              </button>
            ))}
            <Button 
              className="bg-primary/20 text-primary border border-primary/50 glow-border w-full mt-4"
              onClick={() => scrollTo("#contact")}
            >
              Initiate Contact
            </Button>
          </motion.div>
        )}
      </header>
    </>
  );
}
