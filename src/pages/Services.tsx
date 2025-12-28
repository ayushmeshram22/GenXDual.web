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
  Clock,
  Award,
  BookOpen,
  Code,
  Lock,
  Briefcase,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/home/CTASection";

const courses = [
  {
    icon: Target,
    title: "Advanced Penetration Testing",
    level: "Advanced",
    duration: "40 Hours",
    description:
      "Master offensive security techniques including network exploitation, privilege escalation, and advanced post-exploitation tactics.",
    topics: ["Network Pentesting", "Active Directory Attacks", "Pivoting & Tunneling", "Custom Exploit Development"],
    certification: "SCPT Certified",
  },
  {
    icon: Globe,
    title: "Web Application Hacking",
    level: "Intermediate",
    duration: "32 Hours",
    description:
      "Deep dive into web security vulnerabilities, from OWASP Top 10 to advanced injection techniques and modern framework exploits.",
    topics: ["SQL Injection Mastery", "XSS & CSRF Attacks", "API Security Testing", "Authentication Bypasses"],
    certification: "SCWH Certified",
  },
  {
    icon: Code,
    title: "Secure Code Development",
    level: "Intermediate",
    duration: "24 Hours",
    description:
      "Learn to write secure code and identify vulnerabilities during development with hands-on exercises in multiple languages.",
    topics: ["Secure SDLC", "Code Review Techniques", "Common Vulnerability Patterns", "DevSecOps Integration"],
    certification: "SCSD Certified",
  },
  {
    icon: Cloud,
    title: "Cloud Security Fundamentals",
    level: "Intermediate",
    duration: "28 Hours",
    description:
      "Comprehensive training on securing AWS, Azure, and GCP environments with real-world attack and defense scenarios.",
    topics: ["IAM Security", "Container Security", "Serverless Risks", "Cloud Forensics"],
    certification: "SCCS Certified",
  },
  {
    icon: Lock,
    title: "Red Team Operations",
    level: "Expert",
    duration: "48 Hours",
    description:
      "Elite adversary simulation training covering advanced TTPs, evasion techniques, and full-scope red team engagements.",
    topics: ["Adversary Emulation", "C2 Frameworks", "Evasion Techniques", "Physical Security"],
    certification: "SCRT Certified",
  },
  {
    icon: Briefcase,
    title: "Security Awareness for Executives",
    level: "Beginner",
    duration: "8 Hours",
    description:
      "Strategic cybersecurity training for leadership teams covering risk management, compliance, and incident response.",
    topics: ["Cyber Risk Management", "Compliance Frameworks", "Incident Response", "Security Investment ROI"],
    certification: "Certificate of Completion",
  },
];

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
                  {/* <Button variant="cyber" asChild>
                    <Link to={service.href} className="flex items-center gap-2">
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button> */}
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

          {/* Courses Section */}
          {/*
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-32"
          >
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-sm font-medium text-primary uppercase tracking-widest mb-4">
                Training Programs
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Cybersecurity <span className="text-primary">Courses</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Hands-on training programs designed by industry experts to elevate your 
                security skills from fundamentals to advanced offensive techniques.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course, idx) => (
                <motion.div
                  key={course.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="group p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-300 flex flex-col"
                >
                  {/* Header 
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <course.icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      course.level === "Beginner" ? "bg-green-500/10 text-green-400" :
                      course.level === "Intermediate" ? "bg-yellow-500/10 text-yellow-400" :
                      course.level === "Advanced" ? "bg-orange-500/10 text-orange-400" :
                      "bg-red-500/10 text-red-400"
                    }`}>
                      {course.level}
                    </span>
                  </div>

                  {/* Title & Description 
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Topics 
                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.topics.map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-1 rounded-md bg-secondary/50 text-xs text-muted-foreground"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  {/* Footer 
                  <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {course.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        {course.certification}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Courses CTA 
            <div className="text-center mt-12">
              <Button variant="cyberOutline" size="lg" asChild>
                <Link to="/contact" className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Request Course Catalog
                </Link>
              </Button>
            </div>
          </motion.div>
          */}

        </div>

        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default Services;
