export type PortfolioProject = {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  github: string;
  live: string;
  gradient: string;
  accent: string;
  features: string[];
  architecture: string;
};

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "omnifuze",
    title: "OmniFuze",
    description: "AI automation studio for startups and businesses.",
    longDescription:
      "OmniFuze helps startups, clinics, restaurants, cafes, creators, local businesses, e-commerce brands, and growing companies automate support, lead generation, appointments, CRM workflows, WhatsApp, websites, AI voice agents, and AI dashboards.",
    tags: ["React", "TypeScript", "Node.js", "Gemini", "Automation"],
    github: "https://github.com/numan-nadaf",
    live: "https://example.com",
    gradient: "from-primary/25 to-secondary/10",
    accent: "#8B5CF6",
    features: ["AI chatbots and agents", "Lead and appointment automation", "CRM and WhatsApp workflows", "Operational AI dashboards"],
    architecture: "Web interface → orchestration layer → connected business tools → human approval and analytics.",
  },
  {
    slug: "influencer-buzz",
    title: "Influencer Buzz Platform",
    description: "A campaign workspace for creator discovery, execution, and ROI.",
    longDescription:
      "A full-stack platform for managing influencer marketing campaigns with brand tracking, creator discovery, campaign coordination, deliverables, and performance reporting.",
    tags: ["React", "Node.js", "Express", "MongoDB", "REST APIs"],
    github: "https://github.com/numan-nadaf",
    live: "https://example.com",
    gradient: "from-primary/20 to-secondary/15",
    accent: "#A78BFA",
    features: ["Brand and creator dashboards", "Campaign management", "Deliverable tracking", "ROI analytics"],
    architecture: "Role-based dashboard → campaign service → creator and deliverable data → analytics reporting.",
  },
  {
    slug: "fashion-flick",
    title: "Fashion Flick E-commerce",
    description: "A modern fashion storefront with a smooth path from discovery to checkout.",
    longDescription:
      "A complete e-commerce concept with product collections, advanced filtering, cart management, wishlists, authentication, order tracking, and payment integration.",
    tags: ["React", "Node.js", "PostgreSQL", "Razorpay", "Tailwind"],
    github: "https://github.com/numan-nadaf",
    live: "https://example.com",
    gradient: "from-secondary/20 to-primary/15",
    accent: "#60A5FA",
    features: ["Editorial product catalog", "Search and filters", "Cart and wishlist flows", "Payment-ready checkout"],
    architecture: "Storefront → product and cart APIs → PostgreSQL → payment and order services.",
  },
  {
    slug: "salesforce-crm-automation",
    title: "Salesforce CRM Automation",
    description: "Enterprise CRM workflows made clearer, faster, and less manual.",
    longDescription:
      "Salesforce development work at Arlig Technologies, connecting Apex triggers, Lightning Web Components, SOQL, and REST callouts into dependable business processes.",
    tags: ["Salesforce", "Apex", "LWC", "SOQL", "REST APIs"],
    github: "https://github.com/numan-nadaf",
    live: "https://example.com",
    gradient: "from-primary/20 to-purple-500/15",
    accent: "#7C3AED",
    features: ["Apex triggers", "Lightning Web Components", "SOQL data workflows", "REST integrations"],
    architecture: "CRM event → Apex business logic → Lightning UI → connected systems and follow-up automation.",
  },
  {
    slug: "ai-automation-dashboard",
    title: "AI Automation Dashboard",
    description: "A command center for schedules, workflows, webhooks, and execution history.",
    longDescription:
      "A web-based dashboard to create, schedule, monitor, and understand automation pipelines with visual workflow building and real-time execution feedback.",
    tags: ["React", "TypeScript", "Node.js", "WebSockets", "Cron"],
    github: "https://github.com/numan-nadaf",
    live: "https://example.com",
    gradient: "from-blue-500/20 to-primary/15",
    accent: "#2563EB",
    features: ["Visual workflow builder", "Webhook triggers", "Task scheduling", "Real-time execution logs"],
    architecture: "Workflow editor → job queue → worker execution → WebSocket events and run history.",
  },
  {
    slug: "social-media-analytics",
    title: "Social Media Analytics Tool",
    description: "One clear view of brand mentions, engagement, growth, and campaign performance.",
    longDescription:
      "A multi-platform analytics aggregator for tracking brand performance, sentiment, competitor signals, automated reporting, and growth forecasting.",
    tags: ["React", "Python", "FastAPI", "PostgreSQL", "Chart.js"],
    github: "https://github.com/numan-nadaf",
    live: "https://example.com",
    gradient: "from-cyan-500/20 to-primary/15",
    accent: "#06B6D4",
    features: ["Cross-platform metrics", "Sentiment analysis", "Competitor tracking", "Automated reports"],
    architecture: "Platform APIs → FastAPI ingestion → PostgreSQL aggregates → visual analytics and reports.",
  },
];