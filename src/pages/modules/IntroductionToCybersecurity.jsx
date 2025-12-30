import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Award, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ===================== COURSE DATA ===================== */

const courseModules = [
  {
    title: "Module 1: Introduction to Cybersecurity",
    sections: [
      {
        heading: "1.1 What is Cybersecurity?",
        text: [
          "Cybersecurity is the practice of protecting systems, networks, programs, and data from digital attacks, unauthorized access, and damage.",
          "It encompasses a wide range of technologies, processes, and practices designed to safeguard information assets.",
        ],
      },
      {
        heading: "Key Concepts",
        bullets: [
          "Confidentiality: Ensuring information is accessible only to authorized individuals",
          "Integrity: Maintaining accuracy and completeness of data",
          "Availability: Ensuring systems and data are accessible when needed",
        ],
      },
      {
        heading: "1.2 The Importance of Cybersecurity",
        text: [
          "Cybersecurity is critical for protecting personal information, business operations, national security, and infrastructure.",
          "Cyber attacks can result in financial losses, reputational damage, legal consequences, and compromise of sensitive information.",
        ],
      },
      {
        heading: "1.3 Common Cybersecurity Domains",
        bullets: [
          "Network Security",
          "Application Security",
          "Information Security",
          "Operational Security",
          "Disaster Recovery and Business Continuity",
          "End-User Education",
        ],
      },
    ],
  },

  {
    title: "Module 2: Cyber Threats and Attack Vectors",
    sections: [
      {
        heading: "2.1 Types of Cyber Threats – Malware",
        text: [
          "Malware is malicious software designed to damage, disrupt, or gain unauthorized access to computer systems.",
        ],
        bullets: [
          "Viruses: Self-replicating programs that attach to clean files",
          "Trojans: Disguised as legitimate software",
          "Ransomware: Encrypts data and demands payment",
          "Spyware: Secretly monitors user activity",
          "Worms: Self-replicating malware that spreads across networks",
        ],
      },
      {
        heading: "Social Engineering",
        text: [
          "Psychological manipulation used to trick users into revealing confidential information.",
        ],
        bullets: [
          "Phishing",
          "Pretexting",
          "Baiting",
          "Tailgating",
        ],
      },
      {
        heading: "2.2 Advanced Persistent Threats (APTs)",
        text: [
          "Sophisticated and prolonged attacks carried out by well-funded adversaries for espionage or sabotage.",
        ],
      },
      {
        heading: "2.3 DoS and DDoS Attacks",
        text: [
          "Attacks that overwhelm systems with traffic to make services unavailable.",
        ],
      },
    ],
  },

  {
    title: "Module 3: Network Security Fundamentals",
    sections: [
      {
        heading: "3.1 Network Architecture and Protocols",
        text: [
          "Understanding how data flows through networks and the protocols involved is essential for security.",
        ],
        bullets: [
          "Layer 7: Application",
          "Layer 6: Presentation",
          "Layer 5: Session",
          "Layer 4: Transport",
          "Layer 3: Network",
          "Layer 2: Data Link",
          "Layer 1: Physical",
        ],
      },
      {
        heading: "3.2 Firewalls and IDS/IPS",
        text: [
          "Firewalls act as barriers between trusted and untrusted networks.",
          "IDS monitors traffic while IPS actively blocks threats.",
        ],
      },
      {
        heading: "3.3 Virtual Private Networks (VPNs)",
        text: [
          "VPNs create encrypted tunnels over public networks to protect data confidentiality.",
        ],
      },
      {
        heading: "3.4 Wireless Security",
        bullets: [
          "WPA3 encryption",
          "Strong authentication",
          "Network segmentation",
          "Continuous monitoring",
        ],
      },
    ],
  },

  {
    title: "Module 4: Cryptography and Data Protection",
    sections: [
      {
        heading: "4.1 Introduction to Cryptography",
        text: [
          "Cryptography secures information using mathematical algorithms.",
        ],
      },
      {
        heading: "Encryption Types",
        bullets: [
          "Symmetric Encryption: AES, DES, 3DES",
          "Asymmetric Encryption: RSA, ECC, Diffie-Hellman",
        ],
      },
      {
        heading: "4.2 Hashing and Digital Signatures",
        bullets: [
          "SHA-256",
          "SHA-3",
          "MD5 (deprecated)",
        ],
      },
      {
        heading: "4.3 Public Key Infrastructure (PKI)",
        text: [
          "Framework for managing digital certificates and public-key encryption.",
        ],
      },
      {
        heading: "4.4 Data Protection Best Practices",
        bullets: [
          "Encrypt data at rest and in transit",
          "Secure key management",
          "Regular backups and recovery planning",
        ],
      },
    ],
  },

  {
    title: "Module 5: Identity and Access Management",
    sections: [
      {
        heading: "5.1 Authentication Methods",
        bullets: [
          "Something you know (passwords)",
          "Something you have (tokens)",
          "Something you are (biometrics)",
        ],
      },
      {
        heading: "5.2 Multi-Factor Authentication (MFA)",
        text: [
          "Combines multiple authentication factors to enhance security.",
        ],
      },
      {
        heading: "5.3 Access Control Models",
        bullets: [
          "RBAC",
          "ABAC",
          "MAC",
          "DAC",
        ],
      },
      {
        heading: "5.4 Least Privilege",
        text: [
          "Users should have only minimum required access.",
        ],
      },
    ],
  },

  {
    title: "Module 6: Application Security",
    sections: [
      {
        heading: "6.1 OWASP Top 10",
        bullets: [
          "Injection",
          "Broken Authentication",
          "Sensitive Data Exposure",
          "XSS",
          "Security Misconfiguration",
        ],
      },
      {
        heading: "6.2 Secure SDLC",
        bullets: [
          "Requirements",
          "Design",
          "Implementation",
          "Testing",
          "Deployment",
          "Maintenance",
        ],
      },
      {
        heading: "6.3 API Security",
        text: [
          "APIs must be secured using authentication, authorization, and monitoring.",
        ],
      },
    ],
  },

  {
    title: "Module 7: Security Operations and Monitoring",
    sections: [
      {
        heading: "7.1 SIEM",
        text: [
          "Collects and analyzes security events across systems.",
        ],
      },
      {
        heading: "7.2 Log Management",
        bullets: [
          "Centralized logging",
          "Real-time alerts",
          "Regular review",
        ],
      },
      {
        heading: "7.3 Vulnerability Management",
        bullets: [
          "Asset discovery",
          "Risk prioritization",
          "Remediation",
        ],
      },
    ],
  },

  {
    title: "Module 8: Incident Response and Recovery",
    sections: [
      {
        heading: "8.1 Incident Response Lifecycle",
        bullets: [
          "Preparation",
          "Detection",
          "Containment",
          "Eradication",
          "Recovery",
          "Lessons Learned",
        ],
      },
      {
        heading: "8.2 Digital Forensics",
        text: [
          "Preserving and analyzing digital evidence.",
        ],
      },
      {
        heading: "8.3 Business Continuity",
        bullets: [
          "BIA",
          "RTO",
          "RPO",
        ],
      },
    ],
  },

  {
    title: "Module 9: Cloud Security",
    sections: [
      {
        heading: "9.1 Cloud Models",
        bullets: [
          "IaaS",
          "PaaS",
          "SaaS",
        ],
      },
      {
        heading: "9.2 Shared Responsibility Model",
        text: [
          "Security is shared between cloud provider and customer.",
        ],
      },
      {
        heading: "9.3 Best Practices",
        bullets: [
          "Strong IAM",
          "Encryption",
          "Monitoring",
        ],
      },
    ],
  },

  {
    title: "Module 10: Mobile and IoT Security",
    sections: [
      {
        heading: "10.1 Mobile Security",
        bullets: [
          "Device encryption",
          "MDM",
          "Regular updates",
        ],
      },
      {
        heading: "10.2 IoT Security Challenges",
        bullets: [
          "Weak credentials",
          "Limited updates",
          "Physical access",
        ],
      },
    ],
  },

  {
    title: "Module 11: Compliance and Governance",
    sections: [
      {
        heading: "11.1 Security Frameworks",
        bullets: [
          "NIST",
          "ISO 27001",
          "CIS Controls",
          "COBIT",
        ],
      },
      {
        heading: "11.2 Regulations",
        bullets: [
          "GDPR",
          "HIPAA",
          "PCI DSS",
          "SOX",
          "CCPA",
        ],
      },
    ],
  },

  {
    title: "Module 12: Emerging Technologies and Future Trends",
    sections: [
      {
        heading: "12.1 AI & ML in Security",
        text: [
          "AI enhances detection but is also used by attackers.",
        ],
      },
      {
        heading: "12.2 Zero Trust Architecture",
        text: [
          "Never trust, always verify.",
        ],
      },
      {
        heading: "12.3 Post-Quantum Cryptography",
        text: [
          "Preparing cryptography for quantum threats.",
        ],
      },
    ],
  },
];

/* ===================== COMPONENT ===================== */

const IntroductionToCybersecurity = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">

        <h1 className="text-4xl font-bold mb-2">
          Introduction to Cybersecurity
        </h1>
        <p className="text-muted-foreground mb-6">
          A Comprehensive 12-Module Course
        </p>

        <div className="flex gap-3 mb-10 flex-wrap">
          <Badge variant="outline">Tier 0</Badge>
          <Badge variant="outline">Beginner</Badge>
          <Badge variant="outline">
            <Clock className="w-3 h-3 mr-1" /> 2 Hours
          </Badge>
          <Badge variant="outline">
            <Award className="w-3 h-3 mr-1" /> 50 Points
          </Badge>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {courseModules.map((module, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="border border-border rounded-lg bg-card overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex justify-between items-center p-5 text-left"
                >
                  <span className="text-lg font-semibold">
                    {module.title}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="px-6 pb-6"
                    >
                      {module.sections.map((sec, i) => (
                        <div key={i} className="mb-4">
                          <h4 className="font-semibold mb-2">
                            {sec.heading}
                          </h4>

                          {sec.text &&
                            sec.text.map((t, j) => (
                              <p
                                key={j}
                                className="text-sm text-muted-foreground mb-2"
                              >
                                {t}
                              </p>
                            ))}

                          {sec.bullets && (
                            <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
                              {sec.bullets.map((b, k) => (
                                <li key={k}>{b}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Final Test */}
        <div className="mt-10 p-6 border border-primary/40 rounded-xl bg-primary/5">
          <h2 className="text-2xl font-bold mb-3">
            Final Assessment Test
          </h2>
          <p className="text-muted-foreground mb-4">
            You must score at least 60% to pass.
          </p>
          <Button onClick={() => navigate("/modules/cybersecurity/test")}>
            Start Test
          </Button>
        </div>

      </div>
    </div>
  );
};

export default IntroductionToCybersecurity;
