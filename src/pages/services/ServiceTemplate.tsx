import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ServiceTemplateProps {
  icon: any;
  title: string;
  description: string;
  points: string[];
}

const ServiceTemplate = ({ icon: Icon, title, description, points }: ServiceTemplateProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Icon className="w-8 h-8 text-primary" />
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              {title}
            </h1>

            <p className="text-lg text-muted-foreground">
              {description}
            </p>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card/50 border border-border/50 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-semibold mb-6 text-foreground">
              What We Deliver
            </h2>

            <ul className="space-y-3 mb-10">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-muted-foreground">
                  <span className="text-primary">✔</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <Button variant="cyber" asChild>
              <Link to="/contact" className="flex items-center gap-2">
                Talk to Our Experts
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServiceTemplate;
