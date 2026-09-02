import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const loadingMessages = [
    "Initializing Numan OS...",
    "Loading Projects...",
    "Connecting GitHub...",
    "Fetching Skills...",
    "AI Modules Activated...",
    "Welcome, Numan Nadaf"
  ];

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < loadingMessages.length) {
        setLines((prev) => [...prev, loadingMessages[currentLine]]);
        setProgress(((currentLine + 1) / loadingMessages.length) * 100);
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
          setIsFinished(true);
        }, 1000);
      }
    }, 600);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="w-full max-w-md p-8 glass-panel rounded-xl glow-border">
            <div className="mb-8 font-mono text-sm sm:text-base text-primary space-y-2 h-48 overflow-hidden flex flex-col justify-end">
              {lines.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={index === loadingMessages.length - 1 ? "text-secondary font-bold text-lg mt-4" : ""}
                >
                  <span className="opacity-50 mr-2">{">"}</span>
                  {line}
                </motion.div>
              ))}
              <motion.div 
                animate={{ opacity: [1, 0] }} 
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="w-2 h-4 bg-primary mt-1"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-muted-foreground">
                <span>SYSTEM BOOT</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-1 bg-muted" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
