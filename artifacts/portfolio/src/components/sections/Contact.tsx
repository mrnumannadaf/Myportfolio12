import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, Github, Linkedin, MessageCircle, Send, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    setSubmitted(true);
  };

  const contactInfo = [
    {
      icon: Phone,
      label: "Phone",
      value: "+91 7349212006",
      href: "tel:+917349212006",
      color: "text-green-400",
      glow: "rgba(74, 222, 128, 0.3)",
    },
    {
      icon: Mail,
      label: "Email",
      value: "numan.nedaf06@gmail.com",
      href: "mailto:numan.nedaf06@gmail.com",
      color: "text-primary",
      glow: "rgba(139, 92, 246, 0.3)",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/numan-nadaf",
      href: "https://github.com/numan-nadaf",
      color: "text-foreground",
      glow: "rgba(255,255,255,0.1)",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/numan-nadaf",
      href: "https://www.linkedin.com/in/numan-nadaf/",
      color: "text-secondary",
      glow: "rgba(59, 130, 246, 0.3)",
    },
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-4"
        >
          <div className="w-12 h-1 bg-primary" />
          <h2 className="heading-font text-3xl md:text-4xl font-bold tracking-wider">
            COMM.INIT <span className="text-muted-foreground font-normal text-xl">// CONTACT ME</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-muted-foreground mb-16 ml-16 font-mono text-sm"
        >
          Let's build something extraordinary together
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.a
                    key={index}
                    href={info.href}
                    target={info.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.03, y: -2 }}
                    className="glass-panel rounded-xl p-5 flex items-center gap-4 group"
                    style={{ boxShadow: `0 4px 20px ${info.glow}` }}
                    data-testid={`link-contact-${info.label.toLowerCase()}`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors">
                      <Icon size={18} className={info.color} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-mono text-muted-foreground mb-0.5">{info.label}</div>
                      <div className={`text-sm font-medium ${info.color} truncate`}>{info.value}</div>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {/* WhatsApp Button */}
            <motion.a
              href="https://wa.me/917349212006"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.6 }}
              whileHover={{ scale: 1.03 }}
              className="flex items-center justify-center gap-3 w-full p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 font-mono text-sm hover:bg-green-500/20 transition-all group"
              style={{ boxShadow: "0 4px 20px rgba(74, 222, 128, 0.2)" }}
              data-testid="link-whatsapp"
            >
              <MessageCircle size={18} />
              Chat on WhatsApp
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-green-400"
              >
                →
              </motion.span>
            </motion.a>

            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
              className="w-full rounded-xl border-primary/30 bg-primary/5 p-4 h-auto justify-center gap-3 text-primary font-mono text-sm hover:bg-primary/10 hover:text-primary"
              data-testid="button-book-discovery-call"
            >
              <CalendarDays size={18} />
              Book a Discovery Call
              <span className="text-primary">→</span>
            </Button>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="glass-panel rounded-xl p-8 glow-border">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mb-4">
                    <Send size={24} className="text-green-400" />
                  </div>
                  <h3 className="heading-font text-xl font-bold mb-2">Message Transmitted</h3>
                  <p className="text-muted-foreground text-sm font-mono">I'll respond within 24 hours. Looking forward to connecting!</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" data-testid="form-contact">
                  <div>
                    <label className="block text-xs font-mono text-muted-foreground mb-2 uppercase tracking-widest">Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-muted/50 border border-white/10 rounded-lg px-4 py-3 text-foreground text-sm placeholder-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                      placeholder="Your name"
                      data-testid="input-name"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-muted-foreground mb-2 uppercase tracking-widest">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-muted/50 border border-white/10 rounded-lg px-4 py-3 text-foreground text-sm placeholder-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                      placeholder="your@email.com"
                      data-testid="input-email"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-muted-foreground mb-2 uppercase tracking-widest">Subject</label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-muted/50 border border-white/10 rounded-lg px-4 py-3 text-foreground text-sm placeholder-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                      placeholder="What are we building?"
                      data-testid="input-subject"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-muted-foreground mb-2 uppercase tracking-widest">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-muted/50 border border-white/10 rounded-lg px-4 py-3 text-foreground text-sm placeholder-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all resize-none"
                      placeholder="Tell me about your project..."
                      data-testid="input-message"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={sending}
                    className="w-full bg-primary hover:bg-primary/90 text-white glow-border-intense rounded-lg h-12 font-mono tracking-widest uppercase text-sm gap-2 disabled:opacity-60"
                    data-testid="button-submit-contact"
                  >
                    {sending ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Transmitting...
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
