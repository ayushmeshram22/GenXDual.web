import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
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
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Careers from "./pages/Careers";
import Beginner from "./components/modules/Beginner";
import Intermediate from "./components/modules/Intermediate";
import Advanced from "./components/modules/Advanced";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/careers" element={<Careers />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
