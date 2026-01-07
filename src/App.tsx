import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import AIChatbot from "@/components/chat/AIChatbot";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Training from "./pages/Training";
import Contact from "./pages/Contact";
import GetStarted from "./pages/GetStarted";
import Modules from "./pages/Modules";
import Auth from "./pages/Auth";
import Blog from "./pages/Blog";
import Flex from "./pages/Flex";
import BlogDetail from "./pages/BlogDetail";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Careers from "./pages/Careers";
import Beginner from "./components/modules/Beginner";
import Intermediate from "./components/modules/Intermediate";
import Advanced from "./components/modules/Advanced";
import Enrollment from "./pages/Enrollment";
import AISecurity from "./pages/services/ai-security";
import PenetrationTesting from "./pages/services/penetration-testing";
import RedTeam from "./pages/services/red-team";
import WebSecurity from "./pages/services/web-security";
import CloudSecurity from "./pages/services/cloud-security";
import BlueTeam from "./pages/services/blue-team";
import ScrollToTop from "@/components/common/ScrollToTop";
import IntroductionToCybersecurity from "@/pages/modules/IntroductionToCybersecurity";
import CybersecurityTest from "@/pages/modules/CybersecurityTest";
import ModuleLearningPage from "@/pages/modules/ModuleLearningPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <AIChatbot />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/training" element={<Training />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/modules" element={<Modules />} />
          <Route path="/modules/beginner" element={<Beginner />} />
          <Route path="/modules/intermediate" element={<Intermediate />} />
          <Route path="/modules/advanced" element={<Advanced />} />

          <Route path="/auth" element={<Auth />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/flex" element={<Flex />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/enroll" element={<Enrollment />} />

          <Route path="/services/ai-security" element={<AISecurity />} />
          <Route path="/services/penetration-testing" element={<PenetrationTesting />} />
          <Route path="/services/red-team" element={<RedTeam />} />
          <Route path="/services/web-security" element={<WebSecurity />} />
          <Route path="/services/cloud-security" element={<CloudSecurity />} />
          <Route path="/services/blue-team" element={<BlueTeam />} />
          <Route path="/modules/cybersecurity" element={<IntroductionToCybersecurity />} />
          <Route path="/modules/cybersecurity/test" element={<CybersecurityTest />} />
          <Route path="/modules/learn/:moduleId" element={<ModuleLearningPage />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
