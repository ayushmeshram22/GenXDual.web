import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Send, BookOpen, Users } from "lucide-react";

const Enrollment = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    course: "",
    experience: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Enrollment Submitted 🎉",
      description:
        "Thank you for enrolling. Our training team will contact you within 24 hours.",
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      course: "",
      experience: "",
      message: "",
    });

    setIsSubmitting(false);
  };

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
            <span className="inline-flex items-center gap-2 text-sm font-medium text-primary uppercase tracking-widest mb-4">
              <BookOpen className="w-4 h-4" />
              Enrollment Form
            </span>

            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Enroll in Training
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Complete the form below to enroll in one of our cybersecurity training programs.
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-card/50 border border-border/50"
          >
            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Full Name *
                  </label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <Input
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Company / Organization
                  </label>
                  <Input
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    placeholder="Your Organization"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Course Interested In *
                </label>
                <select
                  required
                  value={formData.course}
                  onChange={(e) =>
                    setFormData({ ...formData, course: e.target.value })
                  }
                  className="w-full h-10 px-3 rounded-md bg-secondary/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select a course</option>
                  <option value="APT">Advanced Penetration Testing</option>
                  <option value="WAH">Web Application Hacking</option>
                  <option value="SCD">Secure Code Development</option>
                  <option value="CSF">Cloud Security Fundamentals</option>
                  <option value="RTO">Red Team Operations</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Experience Level
                </label>
                <select
                  value={formData.experience}
                  onChange={(e) =>
                    setFormData({ ...formData, experience: e.target.value })
                  }
                  className="w-full h-10 px-3 rounded-md bg-secondary/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select experience</option>
                  <option value="0-1">0–1 years</option>
                  <option value="1-3">1–3 years</option>
                  <option value="3-5">3–5 years</option>
                  <option value="5+">5+ years</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Additional Message
                </label>
                <Textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Any specific requirements or questions?"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                <p className="text-sm text-muted-foreground">
                  <Users className="inline w-4 h-4 mr-1" />
                  Group & corporate enrollments available
                </p>

                <Button type="submit" variant="cyber" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : (
                    <>
                      <Send className="w-4 h-4 mr-1" />
                      Submit Enrollment
                    </>
                  )}
                </Button>
              </div>

            </form>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Enrollment;
