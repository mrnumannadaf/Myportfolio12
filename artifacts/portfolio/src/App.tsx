import { useState } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { CustomCursor } from "@/components/CustomCursor";
import { LoadingScreen } from "@/components/sections/LoadingScreen";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { TechStack } from "@/components/sections/TechStack";
import { AISection } from "@/components/sections/AISection";
import { Ventures } from "@/components/sections/Ventures";
import { Stats } from "@/components/sections/Stats";
import { Contact } from "@/components/sections/Contact";
import { Certifications } from "@/components/sections/Certifications";
import { DiscoveryCall } from "@/components/sections/DiscoveryCall";
import { Footer } from "@/components/sections/Footer";
import { ResumePdf } from "@/components/ResumePdf";
import { ChatBot } from "@/components/ChatBot";
import { ProjectDetails } from "@/components/ProjectDetails";

const queryClient = new QueryClient();

function PortfolioPage() {
  const alreadyLoaded = sessionStorage.getItem("numan-loaded") === "true";
  const [loaded, setLoaded] = useState(alreadyLoaded);

  const handleLoadComplete = () => {
    sessionStorage.setItem("numan-loaded", "true");
    setLoaded(true);
  };

  return (
    <>
      <CustomCursor />
      {!loaded && <LoadingScreen onComplete={handleLoadComplete} />}
      {loaded && (
        <div className="relative min-h-screen overflow-x-hidden">
          <Navbar />
          <main>
            <Hero />
            <About />
            <Experience />
            <Projects />
            <TechStack />
            <Certifications />
            <AISection />
            <Ventures />
            <Stats />
            <DiscoveryCall />
            <Contact />
          </main>
          <Footer />
          <ResumePdf />
          <ChatBot />
        </div>
      )}
    </>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={PortfolioPage} />
      <Route path="/projects/:slug" component={ProjectDetails} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;