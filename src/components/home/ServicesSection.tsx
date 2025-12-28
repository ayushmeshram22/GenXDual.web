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
} from "lucide-react";

const services = [
  {
    icon: GraduationCap,
    title: "AI Security Testing",
    description:
      "Hands-on cybersecurity training and certification programs designed for technical teams and security professionals.",
    // href: "/services/training",
    href : " "
  },
  {
    icon: Target,
    title: "Penetration Testing",
    description:
      "Comprehensive security assessments that simulate real-world attacks to identify vulnerabilities in your networks, applications, and infrastructure.",
    // href: "/services/penetration-testing",
    href : " "
  },
  {
    icon: Users,
    title: "Red Team Operations",
    description:
      "Advanced adversarial simulations testing your organization's detection and response capabilities against sophisticated threat actors.",
    // href: "/services/red-team",
    href : " "
  },
  {
    icon: Globe,
    title: "Web Application Security",
    description:
      "In-depth analysis of web applications to uncover OWASP Top 10 vulnerabilities, business logic flaws, and API security issues.",
    // href: "/services/web-security",
    href : " "
  },
  {
    icon: Cloud,
    title: "Cloud Security Assessments",
    description:
      "Evaluate your cloud infrastructure across AWS, Azure, and GCP for misconfigurations, access control issues, and compliance gaps.",
    // href: "/services/cloud-security",
    href : " "
  },
  {
    icon: Shield,
    title: "Blue Team & SOC Services",
    description:
      "Strengthen your defensive capabilities with security operations, incident response planning, and continuous monitoring solutions.",
    // href: "/services/blue-team",
    href : " "
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export const ServicesSection = () => {
  return (
    <section className="py-24 lg:py-32 relative">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-sm font-medium text-primary uppercase tracking-widest mb-4"
          >
            Our Services
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6"
          >
            Comprehensive Cybersecurity Solutions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            From offensive security testing to defensive operations, we provide 
            end-to-end protection for your digital assets.
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={itemVariants}>
              <Link
                to={service.href}
                className="group block p-8 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 hover:bg-card transition-all duration-300 h-full"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
