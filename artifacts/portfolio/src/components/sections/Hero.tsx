import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTypingEffect } from "@/hooks/use-typing-effect";
import numanPhoto from "@assets/image_1777899267067.png";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const roles = [
    "Full Stack Developer",
    "Salesforce Developer",
    "Tech Entrepreneur",
    "Future AI Builder"
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
            className="flex flex-wrap gap-4"
          >
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white glow-border-intense rounded-none heading-font tracking-widest h-14 px-8"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              View Projects
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary/50 text-primary hover:bg-primary/10 hover:text-primary glow-border rounded-none heading-font tracking-widest h-14 px-8"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Contact Me
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
            <a href="mailto:numan.nedaf06@gmail.com" className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform interactive">
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
            onMouseLeave={handleMouseLeave}
            className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 transition-transform duration-200 ease-out preserve-3d"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-full blur-xl opacity-30 animate-pulse" />
            <div className="absolute inset-0 rounded-full border-2 border-primary/50 p-2 glow-border animate-[spin_10s_linear_infinite]" style={{ borderStyle: 'dashed' }} />
            <div className="absolute inset-4 rounded-full border border-secondary/50 p-2 animate-[spin_15s_linear_infinite_reverse]" style={{ borderStyle: 'dotted' }} />
            
            <div className="absolute inset-2 rounded-full overflow-hidden border border-white/10 bg-card z-10">
              <img 
                src={numanPhoto} 
                alt="Numan Nadaf" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
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
