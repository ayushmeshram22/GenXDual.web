import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Lock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      
      {/* Animated Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
      
      {/* Scan Line Effect */}
      <div className="absolute inset-0 scan-line pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 mb-8"
          >
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              Trusted by Fortune 500 Companies
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground leading-tight mb-6"
          >
            Defend Your Digital
            <span className="block mt-2 cyber-gradient-text">
              Infrastructure
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Elite penetration testing and red team operations that expose vulnerabilities 
            before adversaries do. We think like attackers to protect like guardians.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button variant="cyber" size="xl" asChild>
              <Link to="/contact" className="flex items-center gap-2">
                Request Security Assessment
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="cyberOutline" size="xl" asChild>
              <Link to="/services">Explore Our Services</Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8"
          >
            {[
              { value: "500+", label: "Assessments Completed" },
              { value: "99%", label: "Threat Detection Rate" },
              { value: "24/7", label: "Security Monitoring" },
              { value: "15+", label: "Years Experience" },
            ].map((stat, idx) => (
              <div
                key={stat.label}
                className="p-6 rounded-xl bg-secondary/30 border border-border/50 backdrop-blur-sm"
              >
                <div className="text-2xl sm:text-3xl font-bold text-primary cyber-glow-text mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
