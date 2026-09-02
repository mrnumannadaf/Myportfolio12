import omniFuzeBanner from "@assets/generated_images/omnifuze-banner.jpg";
import mediQuickBanner from "@assets/generated_images/mediquickai-banner.jpg";
import hackathonBanner from "@assets/generated_images/hackathon-connectr-banner.jpg";
import aiGrowBanner from "@assets/generated_images/ai-grow-automations-banner.jpg";
import vijayapurBanner from "@assets/generated_images/vijayapur-homeverse-banner.jpg";
import connectLocallyBanner from "@assets/generated_images/connect-locally-banner.jpg";

export type PortfolioProject = {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  github: string;
  live?: string;
  image?: string;
  gradient: string;
  accent: string;
  features: string[];
  architecture: string;
};

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "omnifuze",
    title: "OmniFuze",
    description: "An AI automation agency building intelligent digital systems for modern businesses.",
    longDescription:
      "OmniFuze is Numan's AI automation agency for startups, clinics, restaurants, cafes, creators, local businesses, e-commerce brands, and growing companies. The vision combines AI agents, lead generation, appointment workflows, CRM automation, WhatsApp, websites, AI voice agents, and operational dashboards.",
    tags: ["AI Automation", "React", "Node.js", "Gemini", "AI Agents"],
    github: "https://github.com/numan-nadaf/omnifuze-ai",
    image: omniFuzeBanner,
    gradient: "from-primary/25 to-secondary/10",
    accent: "#8B5CF6",
    features: ["AI chatbots and agents", "Lead and appointment automation", "CRM and WhatsApp workflows", "AI-powered business systems"],
    architecture: "Business need → AI workflow → connected tools → measurable action and human oversight.",
  },
  {
    slug: "mediquickai",
    title: "MediQuickAI",
    description: "AI wellness and healthcare discovery experience designed for students.",
    longDescription:
      "MediQuickAI is an AI-powered wellness experience that helps students find nearby care, doctors, hospitals, pharmacies, ambulances, mental health support, and helpful health resources in one simple interface.",
    tags: ["AI Wellness", "React", "Healthcare UX", "Lovable"],
    github: "https://github.com/numan-nadaf",
    live: "https://mediquickai.lovable.app",
    image: mediQuickBanner,
    gradient: "from-cyan-500/20 to-primary/15",
    accent: "#06B6D4",
    features: ["Nearby care discovery", "Doctors and hospitals", "Mental wellness resources", "Student-friendly experience"],
    architecture: "Student need → location-aware discovery → wellness resources → clear next action.",
  },
  {
    slug: "hackathon-connectr",
    title: "Hackathon Connectr",
    description: "A platform for finding hackathons and building the right team.",
    longDescription:
      "Hackathon Connectr connects developers, designers, and innovators with hackathons and teammates around the world. It makes it easier to discover opportunities, find complementary skills, and start building together.",
    tags: ["Community", "Hackathons", "Team Building", "React", "Lovable"],
    github: "https://github.com/numan-nadaf",
    live: "https://hackathon-connectr.lovable.app",
    image: hackathonBanner,
    gradient: "from-cyan-500/20 to-blue-500/15",
    accent: "#22D3EE",
    features: ["Hackathon discovery", "Team matching", "Skill-based connections", "Project collaboration"],
    architecture: "Opportunity → participant profile → skill match → team formation and build.",
  },
  {
    slug: "ai-grow-automations",
    title: "AI Grow Automations",
    description: "An AI automation agency experience for helping businesses grow.",
    longDescription:
      "AI Grow Automations presents a focused agency experience for businesses that want to reduce repetitive work, improve response time, and use AI-powered automation to grow their operations.",
    tags: ["AI Agency", "Automation", "Business Growth", "React", "Lovable"],
    github: "https://github.com/numan-nadaf",
    live: "https://ai-grow-automations-88.lovable.app",
    image: aiGrowBanner,
    gradient: "from-primary/25 to-purple-500/10",
    accent: "#A78BFA",
    features: ["AI growth systems", "Workflow automation", "Lead response flows", "Business process improvement"],
    architecture: "Business goal → automation opportunity → AI workflow → growth outcome.",
  },
  {
    slug: "vijayapur-home-verse",
    title: "Vijayapur HomeVerse",
    description: "A real estate experience for discovering homes and sites in Vijayapura, Karnataka.",
    longDescription:
      "Vijayapur HomeVerse helps people explore properties, sites, and homes in Vijayapura through a more immersive digital experience, including virtual viewing and 3D-inspired ways to find a place that fits.",
    tags: ["Real Estate", "3D Experience", "Vijayapura", "React", "Lovable"],
    github: "https://github.com/numan-nadaf",
    live: "https://vijayapur-home-verse.lovable.app",
    image: vijayapurBanner,
    gradient: "from-secondary/25 to-primary/10",
    accent: "#60A5FA",
    features: ["Property discovery", "Virtual viewing concept", "3D-inspired browsing", "Local Vijayapura focus"],
    architecture: "Search intent → property story → immersive viewing → shortlist and enquiry.",
  },
  {
    slug: "connect-locally",
    title: "Connect Locally",
    description: "A local community app for discovering people, creators, events, and nearby experiences.",
    longDescription:
      "Connect Locally brings people closer to the places and communities around them. It helps users discover local people, creators, cafes, events, and nearby opportunities through a friendly mobile-first social experience.",
    tags: ["Community", "Social App", "Local Discovery", "React", "Lovable"],
    github: "https://github.com/numan-nadaf",
    live: "https://connect-locally-app.lovable.app",
    image: connectLocallyBanner,
    gradient: "from-primary/25 to-pink-500/10",
    accent: "#EC4899",
    features: ["Nearby people and creators", "Local events", "Community discovery", "Mobile-first experience"],
    architecture: "Local signal → community feed → meaningful connection → shared experience.",
  },
];