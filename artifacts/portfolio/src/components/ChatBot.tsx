import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User, Minimize2, Maximize2, Sparkles } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_PROMPT = `You are Numan's AI assistant embedded in his personal portfolio website. You represent Numan Nadaf professionally and helpfully.

About Numan Nadaf:
- Computer Science Engineering student, certified full-stack developer, AI automation builder, and freelancer
- Completed a Web Development Intern role at Arlig Technologies in 2024
- Experienced in React.js, JavaScript, Python, REST API integration, software testing, debugging, QA documentation, and AI output evaluation
- Freelances across full-stack development, AI-powered experiences, automation, and social media marketing
- Building OmniFuze, an AI automation agency for startups and growing businesses
- Passionate about useful digital products, responsive experiences, and practical AI systems

Skills:
- Programming: Python, JavaScript (ES6+), HTML5, CSS3
- Frameworks & Tools: React.js, Node.js, Git, GitHub, Postman, VS Code, REST APIs
- Testing & QA: Functional Testing, Test Case Design, Debugging, Bug Documentation, Software QA
- AI Evaluation: Model Output Assessment, Prompt Analysis, Structured Rubric Design, Data Annotation
- Concepts: Agile Development, Responsive Design, Basic CI/CD, Social Media Marketing

Current Projects:
- OmniFuze: AI automation agency for agents, workflows, CRM, WhatsApp, websites, and business systems
- MediQuickAI: AI wellness and care discovery experience designed for students
- Hackathon Connectr: Platform for discovering hackathons and building teams
- AI Grow Automations: AI automation agency experience for business growth
- Vijayapur HomeVerse: Real estate discovery and virtual/3D-inspired viewing for Vijayapura, Karnataka
- Connect Locally: Mobile-first local community and discovery experience

Contact:
- Email: numan.nadaf06@gmail.com
- Phone: +91 7349212006
- GitHub: github.com/numan-nadaf
- LinkedIn: linkedin.com/in/numan-nadaf

Guidelines:
- Be professional, concise, and enthusiastic about Numan's work
- Answer questions about his skills, experience, projects, and ventures
- If asked about hiring or collaboration, encourage reaching out via email or LinkedIn
- Keep answers focused and helpful — not too long
- If asked something unrelated to Numan or tech, politely redirect
- Speak in first person as his assistant ("Numan has..." or "He built...")`;

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const QUICK_QUESTIONS = [
  "What are Numan's skills?",
  "Tell me about his projects",
  "Tell me about OmniFuze",
  "How to hire Numan?",
];

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-primary"
          animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm Numan's AI assistant. Ask me anything about his skills, projects, experience, or how to work with him.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streamedText, setStreamedText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamedText, loading]);

  useEffect(() => {
    if (open && !minimized) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open, minimized]);

  const sendMessage = async (text?: string) => {
    const msgText = (text ?? input).trim();
    if (!msgText || loading) return;

    const userMessage: Message = { role: "user", content: msgText, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setStreamedText("");

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) throw new Error("VITE_GEMINI_API_KEY not configured");

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: SYSTEM_PROMPT,
      });

      const history = messages.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

      const chat = model.startChat({ history });
      const result = await chat.sendMessageStream(msgText);

      let full = "";
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        full += chunkText;
        setStreamedText(full);
      }

      setStreamedText("");
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: full, timestamp: new Date() },
      ]);
    } catch (err) {
      const errorMsg = err instanceof Error && err.message.includes("not configured")
        ? "VITE_GEMINI_API_KEY is not set. Please add it to your environment secrets."
        : "Something went wrong. Please try again.";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: errorMsg, timestamp: new Date() },
      ]);
      setStreamedText("");
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-[9000] w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-2xl"
            style={{ boxShadow: "0 0 30px rgba(139,92,246,0.8), 0 0 60px rgba(139,92,246,0.3)" }}
            data-testid="button-open-chat"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Bot size={26} className="text-white" />
            </motion.div>
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed bottom-6 right-6 z-[9000] w-[370px] max-w-[calc(100vw-24px)] rounded-2xl overflow-hidden flex flex-col"
            style={{
              height: minimized ? "auto" : "520px",
              boxShadow: "0 0 0 1px rgba(139,92,246,0.3), 0 20px 60px rgba(0,0,0,0.8), 0 0 40px rgba(139,92,246,0.2)",
              background: "rgba(10, 13, 26, 0.97)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3 border-b border-primary/20 flex-shrink-0"
              style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(59,130,246,0.08))" }}
            >
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center"
                  style={{ boxShadow: "0 0 12px rgba(139,92,246,0.5)" }}>
                  <Bot size={18} className="text-primary" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-background animate-pulse" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-foreground tracking-wide flex items-center gap-1.5">
                  Numan's AI Assistant
                  <Sparkles size={12} className="text-primary" />
                </div>
                <div className="text-xs text-muted-foreground font-mono">
                  {loading ? "Thinking..." : "Online · Powered by Gemini"}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setMinimized(!minimized)}
                  className="w-7 h-7 rounded flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
                  data-testid="button-minimize-chat"
                >
                  {minimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="w-7 h-7 rounded flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
                  data-testid="button-close-chat"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {!minimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 min-h-0">
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                    >
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        msg.role === "assistant"
                          ? "bg-primary/20 border border-primary/30"
                          : "bg-secondary/20 border border-secondary/30"
                      }`}>
                        {msg.role === "assistant"
                          ? <Bot size={14} className="text-primary" />
                          : <User size={14} className="text-secondary" />
                        }
                      </div>
                      <div
                        className={`max-w-[78%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                          msg.role === "assistant"
                            ? "bg-white/5 border border-white/10 text-foreground rounded-tl-none"
                            : "bg-primary/20 border border-primary/30 text-foreground rounded-tr-none"
                        }`}
                      >
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}

                  {/* Streaming assistant message */}
                  {streamedText && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-2 flex-row"
                    >
                      <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Bot size={14} className="text-primary" />
                      </div>
                      <div className="max-w-[78%] px-3 py-2 rounded-xl rounded-tl-none text-sm leading-relaxed bg-white/5 border border-white/10 text-foreground">
                        {streamedText}
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                          className="inline-block w-0.5 h-4 bg-primary ml-0.5 align-middle"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Loading dots (before first chunk) */}
                  {loading && !streamedText && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-2 flex-row"
                    >
                      <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Bot size={14} className="text-primary" />
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-xl rounded-tl-none">
                        <TypingDots />
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick questions */}
                {messages.length <= 1 && (
                  <div className="px-3 pb-2 flex flex-wrap gap-1.5 flex-shrink-0">
                    {QUICK_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        className="text-xs px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-mono"
                        data-testid={`button-quick-question-${q.slice(0, 10).replace(/\s/g, "-").toLowerCase()}`}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}

                {/* Input */}
                <div className="px-3 pb-3 pt-2 border-t border-white/5 flex-shrink-0">
                  <div className="flex gap-2 items-center bg-white/5 border border-white/10 rounded-xl px-3 py-2 focus-within:border-primary/50 transition-colors">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKey}
                      placeholder="Ask about Numan..."
                      disabled={loading}
                      className="flex-1 bg-transparent text-sm text-foreground placeholder-muted-foreground outline-none disabled:opacity-50"
                      data-testid="input-chat-message"
                    />
                    <button
                      onClick={() => sendMessage()}
                      disabled={!input.trim() || loading}
                      className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-primary/80 transition-colors flex-shrink-0"
                      style={{ boxShadow: input.trim() ? "0 0 12px rgba(139,92,246,0.5)" : "none" }}
                      data-testid="button-send-message"
                    >
                      <Send size={13} />
                    </button>
                  </div>
                  <div className="text-center mt-2 text-xs text-muted-foreground font-mono opacity-50">
                    Gemini 1.5 Flash
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
