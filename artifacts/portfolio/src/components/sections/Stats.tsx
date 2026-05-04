import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 5, suffix: "+", label: "Projects Built", sublabel: "From Salesforce to React apps" },
  { value: 3, suffix: "+", label: "Work Experiences", sublabel: "Across dev and marketing" },
  { value: 1, suffix: "", label: "Startup Running", sublabel: "Influencer Buzz Agency" },
  { value: 100, suffix: "%", label: "Learning Mode", sublabel: "Always evolving" },
];

function CountUp({ value, suffix, isInView }: { value: number; suffix: string; isInView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const step = Math.ceil(value / (duration / 16));

    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span className="heading-font text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
      {count}{suffix}
    </span>
  );
}

export function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <div className="w-12 h-1 bg-primary" />
          <h2 className="heading-font text-3xl md:text-4xl font-bold tracking-wider">
            METRICS.SYS <span className="text-muted-foreground font-normal text-xl">// BY THE NUMBERS</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-panel rounded-xl p-8 text-center group relative overflow-hidden"
              whileHover={{ y: -4 }}
              data-testid={`stat-${index}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                <CountUp value={stat.value} suffix={stat.suffix} isInView={isInView} />
                <div className="mt-3 mb-1 font-semibold text-foreground text-sm uppercase tracking-widest">{stat.label}</div>
                <div className="text-xs text-muted-foreground font-mono">{stat.sublabel}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
