import { motion } from "framer-motion";
import { FileSearch, Target, FileText, ShieldCheck } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: FileSearch,
    title: "Discovery & Scoping",
    description:
      "We analyze your infrastructure, define objectives, and establish rules of engagement for a tailored assessment.",
  },
  {
    step: "02",
    icon: Target,
    title: "Assessment Execution",
    description:
      "Our experts conduct thorough testing using advanced methodologies to uncover vulnerabilities across your systems.",
  },
  {
    step: "03",
    icon: FileText,
    title: "Detailed Reporting",
    description:
      "Receive comprehensive reports with prioritized findings, risk ratings, and actionable remediation guidance.",
  },
  {
    step: "04",
    icon: ShieldCheck,
    title: "Remediation & Retest",
    description:
      "Validate your fixes with follow-up testing to confirm vulnerabilities are effectively resolved.",
  },
];

export const ProcessSection = () => {
  return (
    <section className="py-24 lg:py-32 relative bg-card/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-sm font-medium text-primary uppercase tracking-widest mb-4"
          >
            Our Process
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6"
          >
            How We Secure Your Organization
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            A proven four-step methodology that ensures comprehensive security 
            coverage and measurable results.
          </motion.p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative"
              >
                <div className="relative p-8 rounded-2xl bg-secondary/50 border border-border/50 hover:border-primary/30 transition-all duration-300 text-center h-full">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6 mt-4">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
