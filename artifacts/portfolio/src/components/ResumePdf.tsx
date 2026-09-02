import numanPhoto from "@assets/image_1777899267067.png";

export function ResumePdf() {
  return (
    <div
      id="resume-pdf-target"
      style={{
        display: "none",
        width: "794px",
        minHeight: "1123px",
        backgroundColor: "#0a0d1a",
        color: "#e2e8f0",
        fontFamily: "'Inter', sans-serif",
        padding: "0",
        position: "fixed",
        top: "-9999px",
        left: "-9999px",
        zIndex: -1,
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #1a0533 0%, #0a0d1a 40%, #001133 100%)",
          padding: "40px 48px",
          borderBottom: "2px solid #8B5CF6",
          display: "flex",
          alignItems: "center",
          gap: "32px",
        }}
      >
        {/* Photo */}
        <div
          style={{
            width: "110px",
            height: "110px",
            borderRadius: "50%",
            overflow: "hidden",
            border: "3px solid #8B5CF6",
            boxShadow: "0 0 24px rgba(139,92,246,0.6)",
            flexShrink: 0,
          }}
        >
          <img
            src={numanPhoto}
            alt="Numan Nadaf"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Name & Title */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: "32px",
              fontWeight: 900,
              letterSpacing: "3px",
              color: "#ffffff",
              marginBottom: "6px",
              textTransform: "uppercase",
            }}
          >
            NUMAN NADAF
          </div>
          <div
            style={{
              fontSize: "14px",
              color: "#8B5CF6",
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: "14px",
            }}
          >
            Computer Science Engineering Student · Full Stack Developer · Freelancer
          </div>
          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
            {[
              { label: "Phone", value: "+91 7349212006" },
              { label: "Email", value: "numan.nadaf06@gmail.com" },
              { label: "GitHub", value: "github.com/numan-nadaf" },
              { label: "LinkedIn", value: "linkedin.com/in/numan-nadaf" },
            ].map((c) => (
              <div key={c.label} style={{ fontSize: "11px" }}>
                <span style={{ color: "#6b7280", letterSpacing: "1px", textTransform: "uppercase" }}>
                  {c.label}:{" "}
                </span>
                <span style={{ color: "#e2e8f0" }}>{c.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: "flex", padding: "36px 48px", gap: "36px" }}>
        {/* Left Column */}
        <div style={{ width: "260px", flexShrink: 0 }}>
          <Section title="About Me">
            <p style={{ fontSize: "12px", lineHeight: "1.8", color: "#94a3b8" }}>
              CSE student passionate about building real-world digital solutions. Experienced as a
              Salesforce Developer at Arlig Technologies, and active in Full Stack Dev and Social Media
              Marketing. Goal: combine technology, business, and AI to build scalable digital products.
            </p>
          </Section>

          <Section title="Skills">
            <SkillGroup label="Frontend" skills={["React", "JavaScript", "TypeScript", "HTML5", "Tailwind CSS"]} />
            <SkillGroup label="Backend" skills={["Node.js", "Express", "REST APIs", "PostgreSQL"]} />
            <SkillGroup label="Platforms" skills={["Salesforce", "GitHub", "VS Code"]} />
            <SkillGroup label="Other" skills={["Social Media Marketing", "Automation", "AI/ML"]} />
          </Section>

          <Section title="Education">
            <div>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#e2e8f0" }}>
                Computer Science Engineering
              </div>
              <div style={{ fontSize: "11px", color: "#8B5CF6", marginTop: "2px" }}>Expected 2026 · Ongoing</div>
            </div>
          </Section>

          <Section title="Ventures">
            <VentureItem name="OmniFuze" type="AI Automation Agency · Building" />
            <VentureItem name="Influencer Buzz" type="Influencer Marketing Agency" />
            <VentureItem name="Fashion Flick" type="E-commerce Brand · In Development" />
          </Section>
        </div>

        {/* Right Column */}
        <div style={{ flex: 1 }}>
          <Section title="Work Experience">
            {[
              {
                title: "Web Development Intern",
                company: "Arlig Technologies",
                period: "2024",
                points: [
                  "Developed and maintained web application modules using React.js and JavaScript",
                  "Executed functional testing, debugging, and detailed bug documentation",
                  "Integrated REST APIs into frontend components for dynamic data",
                ],
              },
              {
                title: "Full Stack Developer & Freelancer",
                company: "Self-Employed",
                period: "Present",
                points: [
                  "Build responsive websites, digital products, and AI-powered experiences",
                  "Work across frontend interfaces, APIs, QA, and practical automation",
                ],
              },
              {
                title: "AI Output Evaluation Freelancer",
                company: "Independent",
                period: "Present",
                points: [
                  "Evaluate AI outputs for factual accuracy, coherence, reasoning, and safety",
                  "Use structured rubrics and prompt analysis for consistent QA",
                ],
              },
              {
                title: "Social Media Marketing Freelancer",
                company: "Self-Employed",
                period: "Present",
                points: [
                  "Support brands with social media strategy and creator-led growth",
                  "Plan content and execute practical digital marketing campaigns",
                ],
              },
            ].map((exp) => (
              <ExpItem key={exp.title} {...exp} />
            ))}
          </Section>

          <Section title="Key Projects">
            {[
              { name: "OmniFuze", stack: "AI Automation · React · Node.js · Gemini" },
              { name: "MediQuickAI", stack: "AI Wellness · React · Healthcare UX" },
              { name: "Hackathon Connectr", stack: "Hackathons · Team Building · React" },
              { name: "AI Grow Automations", stack: "AI Agency · Automation · React" },
              { name: "Vijayapur HomeVerse", stack: "Real Estate · 3D Experience · React" },
              { name: "Connect Locally", stack: "Community · Social App · React" },
            ].map((p) => (
              <div key={p.name} style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", alignItems: "flex-start" }}>
                <div style={{ fontSize: "12px", fontWeight: 600, color: "#e2e8f0" }}>{p.name}</div>
                <div style={{ fontSize: "10px", color: "#6b7280", textAlign: "right", maxWidth: "200px" }}>{p.stack}</div>
              </div>
            ))}
            <div style={{ fontSize: "11px", color: "#8B5CF6", marginTop: "6px" }}>
              github.com/numan-nadaf
            </div>
          </Section>
        </div>
      </div>

      {/* Footer bar */}
      <div
        style={{
          background: "linear-gradient(90deg, #8B5CF6, #3B82F6)",
          height: "4px",
          width: "100%",
        }}
      />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "24px" }}>
      <div
        style={{
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "3px",
          color: "#8B5CF6",
          textTransform: "uppercase",
          borderBottom: "1px solid rgba(139,92,246,0.3)",
          paddingBottom: "6px",
          marginBottom: "12px",
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}

function SkillGroup({ label, skills }: { label: string; skills: string[] }) {
  return (
    <div style={{ marginBottom: "10px" }}>
      <div style={{ fontSize: "10px", color: "#6b7280", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "4px" }}>{label}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
        {skills.map((s) => (
          <span
            key={s}
            style={{
              fontSize: "10px",
              padding: "2px 8px",
              background: "rgba(139,92,246,0.15)",
              border: "1px solid rgba(139,92,246,0.3)",
              color: "#c4b5fd",
              borderRadius: "3px",
            }}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

function VentureItem({ name, type }: { name: string; type: string }) {
  return (
    <div style={{ marginBottom: "10px" }}>
      <div style={{ fontSize: "12px", fontWeight: 700, color: "#e2e8f0" }}>{name}</div>
      <div style={{ fontSize: "10px", color: "#6b7280" }}>{type}</div>
    </div>
  );
}

function ExpItem({ title, company, period, points }: { title: string; company: string; period: string; points: string[] }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "3px" }}>
        <div style={{ fontSize: "13px", fontWeight: 700, color: "#e2e8f0" }}>{title}</div>
        <div style={{ fontSize: "10px", color: "#6b7280", whiteSpace: "nowrap" }}>{period}</div>
      </div>
      <div style={{ fontSize: "11px", color: "#8B5CF6", marginBottom: "6px" }}>{company}</div>
      <ul style={{ margin: 0, paddingLeft: "16px" }}>
        {points.map((pt) => (
          <li key={pt} style={{ fontSize: "11px", color: "#94a3b8", lineHeight: "1.7", marginBottom: "2px" }}>
            {pt}
          </li>
        ))}
      </ul>
    </div>
  );
}
