import { motion } from "framer-motion";
import { CheckCircle, Award, Clock, Users, Zap, Lock } from "lucide-react";

const reasons = [
  {
    icon: Award,
    title: "Certified Experts",
    description:
      "Our team holds elite certifications including OSCP, OSCE, GXPN, CREST, and more.",
  },
  {
    icon: Users,
    title: "Attack-Minded Approach",
    description:
      "We think like adversaries, employing the same tactics used by real threat actors.",
  },
  {
    icon: Zap,
    title: "Rapid Turnaround",
    description:
      "Get actionable results fast with our streamlined assessment methodology.",
  },
  {
    icon: Lock,
    title: "Confidential & Compliant",
    description:
      "Strict NDAs and compliance with ISO 27001, SOC 2, and industry standards.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description:
      "Round-the-clock access to our security experts for critical findings.",
  },
  {
    icon: CheckCircle,
    title: "Remediation Guidance",
    description:
      "Detailed recommendations with prioritized fixes and verification testing.",
  },
];

export const WhyChooseSection = () => {
  return (
    <section className="py-24 lg:py-32 relative bg-secondary/20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-sm font-medium text-primary uppercase tracking-widest mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Security Expertise That
              <span className="text-primary"> Delivers Results</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              At GenXDual Cyber Solutions, we don't just find vulnerabilities—we provide 
              the strategic insight needed to transform your security posture. Our 
              battle-tested methodologies and elite team ensure your defenses are 
              ready for any threat.
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-4">
              {["ISO 27001", "SOC 2 Type II", "CREST Certified", "PCI DSS"].map(
                (badge) => (
                  <div
                    key={badge}
                    className="px-4 py-2 rounded-lg bg-secondary/50 border border-border/50 text-sm font-medium text-muted-foreground"
                  >
                    {badge}
                  </div>
                )
              )}
            </div>
          </motion.div>

          {/* Right Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {reasons.map((reason, idx) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-colors"
              >
                <reason.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {reason.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
