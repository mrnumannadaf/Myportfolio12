import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, Mail, ArrowDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTypingEffect } from "@/hooks/use-typing-effect";
import { useResumePdf } from "@/hooks/use-resume-pdf";
import numanPhoto from "@assets/image_1777899267067.png";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const [photoActive, setPhotoActive] = useState(false);
  const { downloadPdf, generating } = useResumePdf();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const roles = [
    "Full Stack Developer",
    "AI Automation Engineer",
    "Startup Founder",
    "Salesforce Developer",
  ];
  const typedRole = useTypingEffect(roles, 100, 50, 2000);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!photoRef.current) return;
    const { left, top, width, height } = photoRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    const tiltX = (y - 0.5) * -20;
    const tiltY = (x - 0.5) * 20;
    
    photoRef.current.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!photoRef.current) return;
    photoRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    setPhotoActive(false);
  };

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ 
             backgroundImage: 'radial-gradient(circle at center, var(--primary) 1px, transparent 1px)',
             backgroundSize: '40px 40px' 
           }} 
      />
      
      {/* Background Gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        className="container mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        style={{ y, opacity }}
      >
        <div className="flex flex-col items-start text-left order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono mb-6 tracking-widest uppercase"
          >
            SYSTEM.STATUS: ONLINE
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="heading-font text-5xl sm:text-6xl md:text-7xl font-black mb-4 tracking-tight leading-tight"
          >
            HI, I'M <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary glow-text">
              NUMAN NADAF
            </span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl sm:text-2xl text-muted-foreground font-mono h-12 mb-8"
          >
            <span className="opacity-50">{"> "}</span>
            <span className="text-foreground">{typedRole}</span>
            <span className="animate-pulse text-primary">_</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
             className="portfolio-action-group flex w-full flex-wrap gap-4 sm:w-auto"
          >
            <Button 
              size="lg" 
               className="w-full bg-primary hover:bg-primary/90 text-white glow-border-intense rounded-none heading-font tracking-widest h-14 px-8 sm:w-auto"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              View Projects
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
               className="w-full border-primary/50 text-primary hover:bg-primary/10 hover:text-primary glow-border rounded-none heading-font tracking-widest h-14 px-8 sm:w-auto"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Contact Me
            </Button>
            <Button
              size="lg"
              variant="outline"
              disabled={generating}
              onClick={downloadPdf}
               className="w-full border-secondary/50 text-secondary hover:bg-secondary/10 hover:text-secondary glow-border rounded-none heading-font tracking-widest h-14 px-8 gap-2 sm:w-auto disabled:opacity-60"
              data-testid="button-download-resume"
            >
              {generating ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-secondary/30 border-t-secondary rounded-full"
                  />
                  Generating...
                </>
              ) : (
                <>
                  <Download size={16} />
                  Resume
                </>
              )}
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-12 flex items-center gap-6"
          >
            <a href="https://github.com/numan-nadaf" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform interactive">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/numan-nadaf/" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform interactive">
              <Linkedin size={24} />
            </a>
            <a href="mailto:numan.nadaf06@gmail.com" className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform interactive">
              <Mail size={24} />
            </a>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
          className="relative order-1 lg:order-2 flex justify-center lg:justify-end perspective-1000"
        >
          <div 
            ref={photoRef}
            onMouseMove={handleMouseMove}
             onMouseEnter={() => setPhotoActive(true)}
            onMouseLeave={handleMouseLeave}
             onTouchStart={() => setPhotoActive(true)}
             onTouchEnd={() => setPhotoActive(false)}
            className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 transition-transform duration-200 ease-out preserve-3d"
          >
             <div className={`absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-full blur-xl animate-pulse transition-opacity duration-500 ${photoActive ? "opacity-70" : "opacity-30"}`} />
             <div className={`absolute inset-0 rounded-full border-2 border-primary/50 p-2 glow-border animate-[spin_10s_linear_infinite] transition-all duration-500 ${photoActive ? "scale-105 opacity-100" : "opacity-80"}`} style={{ borderStyle: 'dashed' }} />
            <div className="absolute inset-4 rounded-full border border-secondary/50 p-2 animate-[spin_15s_linear_infinite_reverse]" style={{ borderStyle: 'dotted' }} />
            
            <div className="absolute inset-2 rounded-full overflow-hidden border border-white/10 bg-card z-10">
              <img 
                src={numanPhoto} 
                alt="Numan Nadaf" 
                 className={`w-full h-full object-cover transition-all duration-500 ${photoActive ? "grayscale-0 brightness-110 scale-105" : "grayscale"}`}
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay pointer-events-none" />
            </div>
            
            {/* Tech badges floating */}
            <motion.div 
              animate={{ y: [0, -10, 0] }} 
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-4 top-10 glass-panel px-3 py-2 text-xs font-mono text-primary rounded-sm border-l-2 border-l-primary z-20"
            >
              React / Vite
            </motion.div>
            <motion.div 
              animate={{ y: [0, 15, 0] }} 
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -left-8 bottom-20 glass-panel px-3 py-2 text-xs font-mono text-secondary rounded-sm border-r-2 border-r-secondary z-20"
            >
              Salesforce
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground cursor-pointer"
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
      >
        <span className="font-mono text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
