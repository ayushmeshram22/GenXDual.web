import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CTASection = () => {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8">
            <Shield className="w-10 h-10 text-primary" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ready to Fortify Your
            <span className="text-primary"> Cyber Defenses?</span>
          </h2>

          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Don't wait for a breach to expose your vulnerabilities. Partner with 
            Stratégique Cyber Sec and proactively secure your digital assets today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="cyber" size="xl" asChild>
              <Link to="/contact" className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Request Free Consultation
              </Link>
            </Button>
            <Button variant="cyberGhost" size="xl" asChild>
              <Link to="/services" className="flex items-center gap-2">
                View All Services
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>

          {/* Trust Text */}
          <p className="mt-10 text-sm text-muted-foreground">
            Trusted by over <span className="text-primary font-semibold">200+</span> organizations 
            worldwide. Response within 24 hours.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
