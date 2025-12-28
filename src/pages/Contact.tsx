import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Clock, Shield, Linkedin, Instagram, Twitter, Github, MessageCircle } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Message Sent Successfully!",
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({
      name: "",
      email: "",
      company: "",
      phone: "",
      service: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block text-sm font-medium text-primary uppercase tracking-widest mb-4">
              Contact Us
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Get in Touch with Our
              <span className="text-primary"> Security Experts</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Ready to strengthen your security posture? Reach out for a free 
              consultation and let us help protect your organization.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1 space-y-8"
            >
              <div className="p-6 rounded-xl bg-card/50 border border-border/50">
                <Mail className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Email</h3>
                <a
                  href="mailto:genxdual@gmail.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  genxdual@gmail.com
                </a>
              </div>

              {/* <div className="p-6 rounded-xl bg-card/50 border border-border/50">
                <Phone className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Phone</h3>
                <a
                  href="tel:+1-800-CYBER-01"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  +1-800-CYBER-01
                </a>
              </div> */}

              <div className="p-6 rounded-xl bg-card/50 border border-border/50">
                <Linkedin className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Linked In</h3>
                <p className="text-muted-foreground">
                  
                </p>
              </div>

              <div className="p-6 rounded-xl bg-card/50 border border-border/50">
                <Instagram className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Instagram</h3>
                <p className="text-muted-foreground">
                  
                </p>
              </div>

              <div className="p-6 rounded-xl bg-card/50 border border-border/50">
                <MapPin className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Office</h3>
                <p className="text-muted-foreground">
                  Chhatrapati Square <br/>
                  New Sneh Nagar, Nagpur, Maharashtra 440015
                </p>
              </div>

              <div className="p-6 rounded-xl bg-card/50 border border-border/50">
                <Clock className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Business Hours
                </h3>
                <p className="text-muted-foreground">
                  Monday - Friday: 9AM - 6PM<br />
                  Emergency: 24/7 Support
                </p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2"
            >
              <div className="p-8 rounded-2xl bg-card/50 border border-border/50">
                <div className="flex items-center gap-3 mb-8">
                  <Shield className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-semibold text-foreground">
                    Request a Security Assessment
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Enter your full name"
                        className="bg-secondary/50 border-border"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email ID *
                      </label>
                      <Input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="example@yourcompany.com"
                        className="bg-secondary/50 border-border"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Company / Organisation Name
                      </label>
                      <Input
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                        placeholder="Your organisation name"
                        className="bg-secondary/50 border-border"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Mobile Number
                      </label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+91 XXXXX XXXXX"
                        className="bg-secondary/50 border-border"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Service Required
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) =>
                        setFormData({ ...formData, service: e.target.value })
                      }
                      className="w-full h-10 px-3 rounded-md bg-secondary/50 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Please select a service</option>
                      <option value="pentest">Penetration Testing</option>
                      <option value="redteam">Red Team Assessment</option>
                      <option value="webapp">Web Application Security</option>
                      <option value="cloud">Cloud Security Assessment</option>
                      <option value="training">Cyber Security Training</option>
                      <option value="other">Other Services</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <Textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Please share your requirements in brief..."
                      className="bg-secondary/50 border-border resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="cyber"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto"
                  >
                    {isSubmitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Enquiry
                      </>
                    )}
                  </Button>
                </form>

              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
