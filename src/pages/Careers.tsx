import { motion } from "framer-motion";
import {
  Briefcase,
  Users,
  GraduationCap,
  Award,
  ChevronRight,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CTASection } from "@/components/home/CTASection";
import white_bg_logo from "@/assets/white_bg_logo.jpeg";

/* ----------------------------- WHY JOIN US ----------------------------- */
const benefits = [
  {
    icon: Users,
    title: "Collaborative Culture",
    description:
      "Work alongside experienced security professionals in a supportive and growth-driven environment.",
  },
  {
    icon: GraduationCap,
    title: "Continuous Learning",
    description:
      "Access certifications, hands-on labs, and real-world attack simulations to sharpen your skills.",
  },
  {
    icon: Award,
    title: "Recognition & Growth",
    description:
      "We reward performance, innovation, and dedication with rapid career progression.",
  },
  {
    icon: Briefcase,
    title: "Impactful Work",
    description:
      "Protect organizations from real cyber threats and make a tangible difference every day.",
  },
];

/* ----------------------------- OPEN ROLES ----------------------------- */
const openings = [
  {
    title: "Junior Cyber Security Analyst",
    location: "Nagpur, India",
    type: "Full Time",
    description:
      "Assist senior analysts in monitoring threats, conducting assessments, and improving client security posture.",
  },
  {
    title: "Web Application Pentester",
    location: "Remote",
    type: "Contract",
    description:
      "Perform manual and automated security testing on modern web applications and APIs.",
  },
  {
    title: "Security Research Intern",
    location: "Hybrid",
    type: "Internship",
    description:
      "Research emerging vulnerabilities, write POCs, and contribute to internal security tooling.",
  },
];

const Careers = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4 lg:px-8">

          {/* ----------------------------- HEADER ----------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <span className="inline-block text-sm font-medium text-primary uppercase tracking-widest mb-4">
              Careers
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Build Your Future in
              <span className="text-primary"> Cyber Security</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Join GenXDual Cyber Solutions and work at the frontlines of digital
              defense with passionate professionals.
            </p>
          </motion.div>

          {/* ----------------------------- WHY JOIN US ----------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Why Join GenXDual?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We invest in people who are curious, driven, and passionate
                about cyber security.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 rounded-xl bg-card/50 border border-border/50 text-center"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ----------------------------- OPEN POSITIONS ----------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Open Positions
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore current opportunities and become part of our growing team.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {openings.map((job, idx) => (
                <motion.div
                  key={job.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className="p-8 rounded-2xl bg-card/50 border border-border/50"
                >
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {job.title}
                  </h3>
                  <p className="text-sm text-primary mb-1">
                    {job.location} • {job.type}
                  </p>
                  <p className="text-sm text-muted-foreground mb-6">
                    {job.description}
                  </p>

                  <Button variant="cyber" asChild>
                    <Link to="/contact" className="flex items-center gap-2">
                      Apply Now
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ----------------------------- BRAND IMAGE ----------------------------- */}
          

        </div>

        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default Careers;
