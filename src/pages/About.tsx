import { motion } from "framer-motion";
import { Shield, Target, Users, Award, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CTASection } from "@/components/home/CTASection";

const values = [
  {
    icon: Shield,
    title: "Integrity First",
    description:
      "We operate with the highest ethical standards, ensuring confidentiality and trust in every engagement.",
  },
  {
    icon: Target,
    title: "Excellence Driven",
    description:
      "Our team relentlessly pursues technical mastery, staying ahead of emerging threats and methodologies.",
  },
  {
    icon: Users,
    title: "Client Partnership",
    description:
      "We collaborate closely with clients, providing tailored solutions that address their unique security challenges.",
  },
  {
    icon: Award,
    title: "Results Focused",
    description:
      "We measure success by the tangible improvements we deliver to our clients' security posture.",
  },
];

const leadership = [
  {
    name: "Alexandre Dubois",
    role: "Chief Executive Officer",
    bio: "Former government cybersecurity advisor with 20+ years leading offensive security teams.",
  },
  {
    name: "Maria Santos",
    role: "Chief Technology Officer",
    bio: "Renowned security researcher and OSCE holder, specializing in advanced exploitation techniques.",
  },
  {
    name: "James Harrington",
    role: "VP of Operations",
    bio: "Former CISO of Fortune 100 companies, expert in security program development.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <span className="inline-block text-sm font-medium text-primary uppercase tracking-widest mb-4">
              About Us
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Defending the Digital World
              <span className="text-primary"> Since 2009</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Stratégique Cyber Sec was founded by elite security professionals 
              with a mission to protect organizations from ever-evolving cyber threats.
            </p>
          </motion.div>

          {/* Mission Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-12 items-center mb-24"
          >
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                At Stratégique Cyber Sec, we believe that the best defense is a proactive 
                offense. Our mission is to empower organizations by exposing vulnerabilities 
                before adversaries can exploit them.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We employ the same tactics, techniques, and procedures (TTPs) used by 
                sophisticated threat actors—but we use them to strengthen your defenses, 
                not to breach them. Our team of certified experts combines deep technical 
                expertise with strategic insight to deliver actionable results.
              </p>
              <Button variant="cyber" asChild>
                <Link to="/services" className="flex items-center gap-2">
                  Explore Our Services
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/50 border border-border/50 flex items-center justify-center">
                <Shield className="w-32 h-32 text-primary/30" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
            </div>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Our Core Values
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The principles that guide every engagement and define who we are.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, idx) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 rounded-xl bg-card/50 border border-border/50 text-center"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Leadership */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Leadership Team
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Industry veterans leading our mission to secure the digital frontier.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {leadership.map((leader, idx) => (
                <motion.div
                  key={leader.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className="p-8 rounded-2xl bg-card/50 border border-border/50 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-primary">
                      {leader.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">
                    {leader.name}
                  </h3>
                  <p className="text-sm text-primary mb-4">{leader.role}</p>
                  <p className="text-sm text-muted-foreground">{leader.bio}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default About;
