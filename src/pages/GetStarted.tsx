import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Shield, 
  Target, 
  Award, 
  BookOpen, 
  Users, 
  Zap,
  CheckCircle,
  ArrowRight,
  GraduationCap,
  Rocket,
  Trophy
} from "lucide-react";

const levels = [
  {
    id: "beginner",
    title: "Beginner",
    subtitle: "Start Your Cybersecurity Journey",
    icon: BookOpen,
    accentIcon: GraduationCap,
    color: "from-emerald-500 to-teal-600",
    bgGlow: "bg-emerald-500/20",
    description: "Perfect for those new to cybersecurity. Build a strong foundation with essential concepts, tools, and methodologies.",
    features: [
      "Introduction to Cybersecurity Fundamentals",
      "Network Security Basics",
      "Linux & Windows Security Essentials",
      "Basic Vulnerability Assessment",
      "Security Tools Overview (Nmap, Wireshark)",
      "Hands-on Labs & Practice Environments"
    ],
    duration: "8-12 weeks",
    certifications: ["CompTIA Security+", "CEH Foundation"],
    cta: "Begin Your Journey"
  },
  {
    id: "intermediate",
    title: "Intermediate",
    subtitle: "Elevate Your Skills",
    icon: Target,
    accentIcon: Rocket,
    color: "from-primary to-blue-600",
    bgGlow: "bg-primary/20",
    description: "For professionals looking to advance their expertise. Dive deeper into penetration testing, threat analysis, and defensive strategies.",
    features: [
      "Advanced Penetration Testing Techniques",
      "Web Application Security Testing",
      "Network Exploitation & Post-Exploitation",
      "Active Directory Security",
      "Incident Response & Forensics",
      "Real-world Attack Simulations"
    ],
    duration: "12-16 weeks",
    certifications: ["OSCP Preparation", "CEH Advanced"],
    cta: "Level Up Now"
  },
  {
    id: "advanced",
    title: "Advanced",
    subtitle: "Master Elite Techniques",
    icon: Award,
    accentIcon: Trophy,
    color: "from-purple-500 to-pink-600",
    bgGlow: "bg-purple-500/20",
    description: "Elite training for seasoned professionals. Master advanced exploitation, red team operations, and cutting-edge security research.",
    features: [
      "Red Team Operations & Tactics",
      "Advanced Malware Analysis",
      "Zero-Day Research & Exploitation",
      "Cloud Security Architecture",
      "Custom Tool Development",
      "Executive Security Consulting"
    ],
    duration: "16-24 weeks",
    certifications: ["OSEP", "OSCE3", "CRTO"],
    cta: "Become Elite"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const }
  }
};

const GetStarted = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Choose Your Path</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-foreground">Get Started with</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Cybersecurity Training
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Whether you're a beginner or an experienced professional, we have the perfect 
              training path to help you achieve your cybersecurity goals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Levels Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-16"
          >
            {levels.map((level, index) => (
              <motion.div
                key={level.id}
                variants={itemVariants}
                className={`relative ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                  {/* Content Side */}
                  <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-2xl bg-gradient-to-br ${level.color}`}>
                        <level.icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                          {level.title}
                        </h2>
                        <p className="text-muted-foreground font-medium">{level.subtitle}</p>
                      </div>
                    </div>
                    
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {level.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted">
                        <Zap className="w-4 h-4 text-primary" />
                        <span className="text-foreground font-medium">{level.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted">
                        <Users className="w-4 h-4 text-primary" />
                        <span className="text-foreground font-medium">Live Mentorship</span>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">
                        Certification Paths
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {level.certifications.map((cert) => (
                          <span
                            key={cert}
                            className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${level.color} text-white`}
                          >
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <Link to="/contact">
                      <Button 
                        size="lg" 
                        className={`mt-4 bg-gradient-to-r ${level.color} hover:opacity-90 text-white border-0 group`}
                      >
                        {level.cta}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                  
                  {/* Features Card Side */}
                  <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className={`absolute inset-0 ${level.bgGlow} rounded-3xl blur-3xl opacity-50`} />
                    <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <level.accentIcon className={`w-6 h-6 bg-gradient-to-r ${level.color} bg-clip-text text-transparent`} style={{ color: 'transparent', background: `linear-gradient(to right, var(--tw-gradient-stops))` }} />
                        <h3 className="text-xl font-bold text-foreground">What You'll Learn</h3>
                      </div>
                      
                      <ul className="space-y-4">
                        {level.features.map((feature, featureIndex) => (
                          <motion.li
                            key={featureIndex}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: featureIndex * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-start gap-3"
                          >
                            <CheckCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 text-emerald-500`} />
                            <span className="text-muted-foreground">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Divider */}
                {index < levels.length - 1 && (
                  <div className="flex justify-center mt-16">
                    <div className="w-px h-16 bg-gradient-to-b from-border to-transparent" />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Not Sure Which Level Is Right for You?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our experts can help assess your current skill level and recommend the perfect 
              training path tailored to your goals and experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="w-full sm:w-auto">
                  Schedule a Consultation
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/services/training">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  View All Training Programs
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GetStarted;
