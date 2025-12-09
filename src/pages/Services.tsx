import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Target,
  Shield,
  Globe,
  Cloud,
  GraduationCap,
  Users,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/home/CTASection";

const services = [
  {
    icon: Target,
    title: "Penetration Testing",
    description:
      "Comprehensive security assessments simulating real-world attacks on your networks, applications, and infrastructure to identify exploitable vulnerabilities before malicious actors do.",
    features: [
      "Network & Infrastructure Testing",
      "External & Internal Assessments",
      "Wireless Security Testing",
      "Social Engineering Simulations",
      "Physical Security Assessments",
    ],
    href: "/services/penetration-testing",
  },
  {
    icon: Users,
    title: "Red Team Operations",
    description:
      "Advanced adversarial simulations that test your entire security program—people, processes, and technology—against sophisticated, multi-vector attack campaigns.",
    features: [
      "Full-Scope Adversary Simulation",
      "Assumed Breach Scenarios",
      "Objective-Based Testing",
      "Detection & Response Validation",
      "Executive-Level Reporting",
    ],
    href: "/services/red-team",
  },
  {
    icon: Globe,
    title: "Web Application Security",
    description:
      "In-depth security testing of web applications to uncover OWASP Top 10 vulnerabilities, business logic flaws, authentication bypasses, and API security issues.",
    features: [
      "OWASP Top 10 Assessment",
      "API Security Testing",
      "Authentication & Authorization Review",
      "Business Logic Analysis",
      "Source Code Review",
    ],
    href: "/services/web-security",
  },
  {
    icon: Cloud,
    title: "Cloud Security Assessments",
    description:
      "Evaluate your cloud infrastructure across AWS, Azure, and GCP for misconfigurations, IAM issues, data exposure risks, and compliance gaps.",
    features: [
      "Cloud Configuration Review",
      "IAM & Access Control Audit",
      "Container & Kubernetes Security",
      "Serverless Security Testing",
      "Compliance Mapping",
    ],
    href: "/services/cloud-security",
  },
  {
    icon: Shield,
    title: "Blue Team & SOC Services",
    description:
      "Strengthen your defensive capabilities with security operations, threat hunting, incident response planning, and continuous monitoring solutions.",
    features: [
      "SOC Assessment & Optimization",
      "Incident Response Planning",
      "Threat Hunting Exercises",
      "SIEM Tuning & Optimization",
      "Purple Team Engagements",
    ],
    href: "/services/blue-team",
  },
  {
    icon: GraduationCap,
    title: "Security Training & Certifications",
    description:
      "Hands-on cybersecurity training programs designed for security professionals, developers, and IT teams seeking to enhance their offensive and defensive skills.",
    features: [
      "Penetration Testing Courses",
      "Secure Coding Training",
      "Security Awareness Programs",
      "CTF & Lab Environments",
      "Custom Corporate Training",
    ],
    href: "/services/training",
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32 pb-24">
        {/* Header */}
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <span className="inline-block text-sm font-medium text-primary uppercase tracking-widest mb-4">
              Our Services
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Comprehensive Cybersecurity
              <span className="text-primary"> Solutions</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              From offensive security testing to defensive operations, we provide 
              end-to-end protection tailored to your organization's unique needs.
            </p>
          </motion.div>

          {/* Services List */}
          <div className="space-y-12">
            {services.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="grid lg:grid-cols-2 gap-8 items-center p-8 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 transition-colors"
              >
                <div className={idx % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                    {service.title}
                  </h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <Button variant="cyber" asChild>
                    <Link to={service.href} className="flex items-center gap-2">
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>

                <div
                  className={`p-6 rounded-xl bg-secondary/50 border border-border/50 ${
                    idx % 2 === 1 ? "lg:order-1" : ""
                  }`}
                >
                  <h4 className="text-sm font-medium text-primary uppercase tracking-widest mb-4">
                    Key Capabilities
                  </h4>
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default Services;
