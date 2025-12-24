import { motion } from "framer-motion";
import { Shield, ShieldCheck, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const skillLevels = [
  {
    title: "BEGINNER",
    subtitle: "Foundations",
    icon: ShieldCheck,
    buttonText: "Start as Beginner",
    delay: 0.1,
  },
  {
    title: "INTERMEDIATE",
    subtitle: "Hands-on Skills",
    icon: Shield,
    buttonText: "Upgrade to Intermediate",
    delay: 0.2,
  },
  {
    title: "ADVANCED",
    subtitle: "Expert Level",
    icon: ShieldAlert,
    buttonText: "Go Advanced",
    delay: 0.3,
  },
];

const GetStarted = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-primary font-medium tracking-widest mb-4">
              GXD CYBER SOLUTION
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Choose Your Skill Level
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Structured learning paths inspired by enterprise-grade security platforms
            </p>
          </motion.div>

          {/* Skill Level Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {skillLevels.map((level, index) => (
              <motion.div
                key={level.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: level.delay }}
                className="group relative"
              >
                <div className="bg-card border border-border rounded-xl p-8 h-full flex flex-col items-start transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
                  {/* Icon and Title */}
                  <div className="flex items-center gap-3 mb-2">
                    <level.icon className="w-8 h-8 text-primary" />
                    <h3 className="text-xl font-bold text-primary tracking-wide">
                      {level.title}
                    </h3>
                  </div>
                  
                  {/* Subtitle */}
                  <p className="text-muted-foreground mb-8 ml-11">
                    {level.subtitle}
                  </p>
                  
                  {/* Button */}
                  <Button
                    variant="outline"
                    className="w-full mt-auto border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    {level.buttonText}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GetStarted;
