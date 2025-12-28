import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Target,
  Globe,
  Cloud,
  Code,
  Lock,
  Briefcase,
  Clock,
  Award,
  Users,
  Calendar,
  MapPin,
  ArrowRight,
  CheckCircle,
  Send,
  BookOpen,
  Monitor,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

const courses = [
  {
    id: "apt",
    icon: Target,
    title: "Advanced Penetration Testing",
    level: "Advanced",
    duration: "40 Hours",
    price: "$2,499",
    description:
      "Master offensive security techniques including network exploitation, privilege escalation, and advanced post-exploitation tactics. This intensive course prepares you for real-world penetration testing engagements.",
    topics: [
      "Network Reconnaissance & Enumeration",
      "Exploitation Techniques",
      "Active Directory Attacks",
      "Privilege Escalation (Windows & Linux)",
      "Pivoting & Tunneling",
      "Custom Exploit Development",
      "Report Writing & Documentation",
    ],
    prerequisites: ["Basic networking knowledge", "Linux command line proficiency", "Familiarity with security concepts"],
    certification: "SCPT Certified",
    format: "Live Virtual / In-Person",
  },
  {
    id: "wah",
    icon: Globe,
    title: "Web Application Hacking",
    level: "Intermediate",
    duration: "32 Hours",
    price: "$1,999",
    description:
      "Deep dive into web security vulnerabilities, from OWASP Top 10 to advanced injection techniques and modern framework exploits. Learn to identify and exploit vulnerabilities in modern web applications.",
    topics: [
      "OWASP Top 10 Deep Dive",
      "SQL Injection Mastery",
      "Cross-Site Scripting (XSS)",
      "CSRF & SSRF Attacks",
      "API Security Testing",
      "Authentication & Session Bypasses",
      "Modern Framework Vulnerabilities",
    ],
    prerequisites: ["HTML/CSS/JavaScript basics", "HTTP protocol understanding", "Basic programming knowledge"],
    certification: "SCWH Certified",
    format: "Live Virtual / In-Person",
  },
  {
    id: "scd",
    icon: Code,
    title: "Secure Code Development",
    level: "Intermediate",
    duration: "24 Hours",
    price: "$1,499",
    description:
      "Learn to write secure code and identify vulnerabilities during development with hands-on exercises in multiple programming languages and frameworks.",
    topics: [
      "Secure SDLC Implementation",
      "Code Review Techniques",
      "Common Vulnerability Patterns",
      "Input Validation & Sanitization",
      "Cryptography Best Practices",
      "DevSecOps Integration",
      "Security Testing in CI/CD",
    ],
    prerequisites: ["Programming experience (any language)", "Basic security awareness"],
    certification: "SCSD Certified",
    format: "Live Virtual",
  },
  {
    id: "csf",
    icon: Cloud,
    title: "Cloud Security Fundamentals",
    level: "Intermediate",
    duration: "28 Hours",
    price: "$1,799",
    description:
      "Comprehensive training on securing AWS, Azure, and GCP environments with real-world attack and defense scenarios. Master cloud-native security tools and techniques.",
    topics: [
      "Cloud Architecture Security",
      "IAM Security & Best Practices",
      "Container & Kubernetes Security",
      "Serverless Security Risks",
      "Cloud Forensics & Incident Response",
      "Compliance & Governance",
      "Multi-Cloud Security Strategies",
    ],
    prerequisites: ["Basic cloud platform experience", "Networking fundamentals"],
    certification: "SCCS Certified",
    format: "Live Virtual / In-Person",
  },
  {
    id: "rto",
    icon: Lock,
    title: "Red Team Operations",
    level: "Expert",
    duration: "48 Hours",
    price: "$3,499",
    description:
      "Elite adversary simulation training covering advanced TTPs, evasion techniques, and full-scope red team engagements. Designed for experienced security professionals.",
    topics: [
      "Adversary Emulation Frameworks",
      "Command & Control (C2) Infrastructure",
      "Advanced Evasion Techniques",
      "Physical Security Assessments",
      "Social Engineering Campaigns",
      "Purple Team Collaboration",
      "Executive Reporting & Metrics",
    ],
    prerequisites: ["3+ years security experience", "Strong penetration testing skills", "Programming proficiency"],
    certification: "SCRT Certified",
    format: "In-Person Only",
  },
  {
    id: "sae",
    icon: Briefcase,
    title: "Security Awareness for Executives",
    level: "Beginner",
    duration: "8 Hours",
    price: "$799",
    description:
      "Strategic cybersecurity training for leadership teams covering risk management, compliance, and incident response from a business perspective.",
    topics: [
      "Cyber Risk Management",
      "Regulatory Compliance Overview",
      "Incident Response Leadership",
      "Security Investment ROI",
      "Third-Party Risk Management",
      "Crisis Communication",
    ],
    prerequisites: ["None - designed for non-technical leadership"],
    certification: "Certificate of Completion",
    format: "Live Virtual / In-Person",
  },
];

const upcomingSessions = [
  {
    courseId: "apt",
    courseName: "Advanced Penetration Testing",
    date: new Date(2025, 0, 15),
    endDate: new Date(2025, 0, 19),
    location: "Virtual",
    spotsLeft: 8,
  },
  {
    courseId: "wah",
    courseName: "Web Application Hacking",
    date: new Date(2025, 0, 22),
    endDate: new Date(2025, 0, 25),
    location: "New York, NY",
    spotsLeft: 5,
  },
  {
    courseId: "rto",
    courseName: "Red Team Operations",
    date: new Date(2025, 1, 3),
    endDate: new Date(2025, 1, 8),
    location: "Washington, DC",
    spotsLeft: 3,
  },
  {
    courseId: "csf",
    courseName: "Cloud Security Fundamentals",
    date: new Date(2025, 1, 10),
    endDate: new Date(2025, 1, 13),
    location: "Virtual",
    spotsLeft: 12,
  },
  {
    courseId: "scd",
    courseName: "Secure Code Development",
    date: new Date(2025, 1, 17),
    endDate: new Date(2025, 1, 19),
    location: "Virtual",
    spotsLeft: 15,
  },
  {
    courseId: "apt",
    courseName: "Advanced Penetration Testing",
    date: new Date(2025, 2, 3),
    endDate: new Date(2025, 2, 7),
    location: "Los Angeles, CA",
    spotsLeft: 10,
  },
];

const Training = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    course: "",
    session: "",
    experience: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Enrollment Request Submitted!",
      description: "Our training team will contact you within 24 hours to confirm your enrollment.",
    });

    setFormData({
      name: "",
      email: "",
      company: "",
      phone: "",
      course: "",
      session: "",
      experience: "",
      message: "",
    });
    setSelectedCourse("");
    setIsSubmitting(false);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "Intermediate":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "Advanced":
        return "bg-orange-500/10 text-orange-400 border-orange-500/20";
      case "Expert":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      default:
        return "bg-primary/10 text-primary border-primary/20";
    }
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
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <span className="inline-flex items-center gap-2 text-sm font-medium text-primary uppercase tracking-widest mb-4">
              <GraduationCap className="w-4 h-4" />
              Training Programs
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Elevate Your <span className="text-primary">Security Skills</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Hands-on cybersecurity training designed by industry experts. From fundamentals 
              to elite red team operations, we have courses for every skill level.
            </p>
          </motion.div>

          {/* Course Cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid lg:grid-cols-2 gap-8 mb-24"
          >
            {courses.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group p-8 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <course.icon className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {course.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getLevelColor(course.level)}`}>
                          {course.level}
                        </span>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {course.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{course.price}</div>
                    <div className="text-xs text-muted-foreground">per student</div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {course.description}
                </p>

                {/* Topics */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-foreground mb-3">What You'll Learn:</h4>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {course.topics.slice(0, 6).map((topic) => (
                      <div key={topic} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prerequisites */}
                <div className="mb-6 p-4 rounded-lg bg-secondary/30 border border-border/50">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Prerequisites</h4>
                  <ul className="text-sm text-foreground space-y-1">
                    {course.prerequisites.map((prereq) => (
                      <li key={prereq}>• {prereq}</li>
                    ))}
                  </ul>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Award className="w-4 h-4 text-primary" />
                      {course.certification}
                    </span>
                    <span className="flex items-center gap-1">
                      <Monitor className="w-4 h-4" />
                      {course.format}
                    </span>
                  </div>
                  <Button
                    variant="cyberOutline"
                    size="sm"
                    onClick={() => {
                      setSelectedCourse(course.id);
                      setFormData({ ...formData, course: course.id });
                      document.getElementById("enrollment-form")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Enroll Now
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Upcoming Sessions 
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 text-sm font-medium text-primary uppercase tracking-widest mb-4">
                <Calendar className="w-4 h-4" />
                Upcoming Sessions
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Scheduled Training Dates
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Reserve your spot in our upcoming training sessions. Limited seats available 
                to ensure personalized attention and hands-on learning.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 text-sm font-semibold text-muted-foreground">Course</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-muted-foreground">Dates</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-muted-foreground">Location</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-muted-foreground">Availability</th>
                    <th className="text-right py-4 px-4 text-sm font-semibold text-muted-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingSessions.map((session, idx) => (
                    <motion.tr
                      key={`${session.courseId}-${idx}`}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                      className="border-b border-border/50 hover:bg-secondary/20 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <span className="font-medium text-foreground">{session.courseName}</span>
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">
                        {format(session.date, "MMM d")} - {format(session.endDate, "MMM d, yyyy")}
                      </td>
                      <td className="py-4 px-4">
                        <span className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          {session.location}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          session.spotsLeft <= 5 
                            ? "bg-red-500/10 text-red-400" 
                            : session.spotsLeft <= 10 
                            ? "bg-yellow-500/10 text-yellow-400"
                            : "bg-green-500/10 text-green-400"
                        }`}>
                          {session.spotsLeft} spots left
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:text-primary"
                          onClick={() => {
                            setSelectedCourse(session.courseId);
                            setFormData({ 
                              ...formData, 
                              course: session.courseId,
                              session: `${format(session.date, "MMM d")} - ${format(session.endDate, "MMM d, yyyy")} (${session.location})`
                            });
                            document.getElementById("enrollment-form")?.scrollIntoView({ behavior: "smooth" });
                          }}
                        >
                          Register
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
          */}

          {/* Enrollment Form */}
          <motion.div
            id="enrollment-form"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 text-sm font-medium text-primary uppercase tracking-widest mb-4">
                <BookOpen className="w-4 h-4" />
                Enrollment
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Register for Training
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Complete the form below to enroll in a training course. Our team will 
                confirm your registration and send payment instructions.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-card/50 border border-border/50">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Full Name *
                    </label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="bg-secondary/50 border-border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@company.com"
                      className="bg-secondary/50 border-border"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Company / Organization
                    </label>
                    <Input
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Your Company"
                      className="bg-secondary/50 border-border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="bg-secondary/50 border-border"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Select Course *
                    </label>
                    <select
                      required
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      className="w-full h-10 px-3 rounded-md bg-secondary/50 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Choose a course...</option>
                      {courses.map((course) => (
                        <option key={course.id} value={course.id}>
                          {course.title} ({course.price})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Preferred Session
                    </label>
                    <Input
                      value={formData.session}
                      onChange={(e) => setFormData({ ...formData, session: e.target.value })}
                      placeholder="Select from sessions above or specify"
                      className="bg-secondary/50 border-border"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Relevant Experience
                  </label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full h-10 px-3 rounded-md bg-secondary/50 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select your experience level...</option>
                    <option value="0-1">0-1 years in cybersecurity</option>
                    <option value="1-3">1-3 years in cybersecurity</option>
                    <option value="3-5">3-5 years in cybersecurity</option>
                    <option value="5+">5+ years in cybersecurity</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Additional Information
                  </label>
                  <Textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your learning goals, special requirements, or questions..."
                    className="bg-secondary/50 border-border resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                  <p className="text-sm text-muted-foreground">
                    <Users className="w-4 h-4 inline mr-1" />
                    Group discounts available for 3+ enrollments
                  </p>
                  <Button
                    type="submit"
                    variant="cyber"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Enrollment
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Corporate Training CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 p-8 lg:p-12 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/50 border border-primary/20 text-center"
          >
            <Briefcase className="w-12 h-12 text-primary mx-auto mb-6" />
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Corporate Training Solutions
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Need to train your entire security team? We offer customized corporate training 
              programs, private sessions, and on-site delivery options tailored to your organization's needs.
            </p>
            <Button variant="cyber" size="lg" asChild>
              <Link to="/contact" className="flex items-center gap-2">
                Contact Us for Corporate Pricing
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Training;
