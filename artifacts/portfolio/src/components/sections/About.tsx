import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Terminal } from "lucide-react";

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-12">
            <div className="w-12 h-1 bg-primary" />
            <h2 className="heading-font text-3xl md:text-4xl font-bold tracking-wider">
              SYS.INFO <span className="text-muted-foreground font-normal text-xl">// ABOUT_ME</span>
            </h2>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-panel p-1 rounded-xl glow-border">
            <div className="bg-black/60 rounded-lg p-6 md:p-10 font-mono relative overflow-hidden">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/10 text-muted-foreground">
                <Terminal size={16} className="text-primary" />
                <span className="text-sm">numan@admin:~/about$ cat profile.txt</span>
              </div>
              
              <p className="text-lg md:text-xl text-foreground leading-relaxed">
                "I'm a Computer Science Engineering student passionate about building real-world digital solutions. I have worked as a Salesforce Developer at Arlig Technologies, where I gained experience in CRM systems and business automation. I also have experience as a Frontend and Web Developer, and I actively work in Social Media Marketing, helping brands grow through influencer strategies. My goal is to combine technology, business, and AI to build scalable digital products and startups."
              </p>
              
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-8">
                <div>
                  <h4 className="text-primary text-sm mb-1 uppercase tracking-widest">Education</h4>
                  <p className="text-foreground font-sans">4th Semester CSE Student</p>
                </div>
                <div>
                  <h4 className="text-secondary text-sm mb-1 uppercase tracking-widest">Focus</h4>
                  <p className="text-foreground font-sans">Full Stack / Salesforce / AI</p>
                </div>
                <div>
                  <h4 className="text-accent text-sm mb-1 uppercase tracking-widest">Goal</h4>
                  <p className="text-foreground font-sans">Scalable Digital Products</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
