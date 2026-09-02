import { useState } from "react";
import { CalendarDays, Check, ExternalLink, Video } from "lucide-react";
import { motion } from "framer-motion";

const bookingLinks = [
  { label: "Google Calendar", href: "https://calendar.google.com/calendar/u/0/r/eventedit?text=Discovery%20Call", icon: CalendarDays },
  { label: "Google Meet", href: "https://meet.google.com/new", icon: Video },
  { label: "Zoom", href: "https://zoom.us/join", icon: Video },
];

export function DiscoveryCall() {
  const [date, setDate] = useState("");
  const [format, setFormat] = useState("Google Meet");
  const [booked, setBooked] = useState(false);

  return (
    <section id="booking" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <div className="mb-5 flex items-center gap-4"><div className="h-1 w-12 bg-primary" /><span className="font-mono text-xs uppercase tracking-widest text-primary">DISCOVERY.CALL</span></div>
            <h2 className="heading-font text-4xl font-black leading-tight sm:text-6xl">Let's build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">next version.</span></h2>
            <p className="mt-6 max-w-md text-muted-foreground leading-7">Choose a time to talk through the problem, the people involved, and a useful first version.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {bookingLinks.map(({ label, href, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noreferrer" className="glass-panel flex items-center gap-2 rounded-md px-3 py-2 text-xs font-mono text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"><Icon size={14} /> {label} <ExternalLink size={11} /></a>)}
            </div>
          </div>
          <motion.form initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} onSubmit={(event) => { event.preventDefault(); setBooked(true); }} className="glass-panel rounded-xl p-6 glow-border sm:p-8">
            {booked ? (
              <div className="flex min-h-64 flex-col items-center justify-center text-center"><div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary glow-border"><Check size={24} /></div><h3 className="heading-font text-xl font-bold">Request queued</h3><p className="mt-2 text-sm text-muted-foreground">I'll follow up to confirm the {format} details for {date}.</p></div>
            ) : (
              <>
                <h3 className="heading-font mb-6 text-xl font-bold">Book Discovery Call</h3>
                <label className="block text-xs font-mono uppercase tracking-widest text-muted-foreground">Preferred date<input required type="date" min={new Date().toISOString().split("T")[0]} value={date} onChange={(event) => setDate(event.target.value)} className="mt-2 block w-full rounded-lg border border-white/10 bg-muted/50 px-4 py-3 text-sm text-foreground focus:border-primary/50 focus:outline-none" data-testid="input-discovery-date" /></label>
                <div className="mt-6"><div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Meeting format</div><div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">{["Google Meet", "Zoom", "WhatsApp"].map((item) => <button key={item} type="button" onClick={() => setFormat(item)} className={`rounded-lg border px-3 py-3 text-left text-xs font-mono transition-colors ${format === item ? "border-primary bg-primary/10 text-primary" : "border-white/10 text-muted-foreground hover:border-primary/40"}`} data-testid={`button-discovery-${item.toLowerCase().replace(" ", "-")}`}>{item}{format === item && <Check size={13} className="float-right" />}</button>)}</div></div>
                <button type="submit" className="mt-7 flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 font-mono text-xs uppercase tracking-widest text-white glow-border-intense hover:bg-primary/90" data-testid="button-discovery-submit">Request a time <CalendarDays size={15} /></button>
                <p className="mt-4 text-center text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Calendar, Meet, Zoom, and WhatsApp links ready to connect</p>
              </>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}