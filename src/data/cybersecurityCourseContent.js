export const cybersecurityCourseContent = {
  title: "Introduction to Cybersecurity",
  subtitle: "A Comprehensive 12-Module Course",

  overview: `This comprehensive course provides a thorough introduction to cybersecurity fundamentals, 
covering essential concepts, practices, and tools needed to understand and implement effective 
security measures. Designed for beginners and intermediate learners, this course combines 
theoretical knowledge with practical applications.`,

  objectives: [
    "Understand fundamental cybersecurity concepts and terminology",
    "Identify common cyber threats and vulnerabilities",
    "Implement basic security controls and best practices",
    "Analyze and respond to security incidents",
    "Apply cryptographic principles for secure communications",
    "Understand network security architecture and protocols",
    "Recognize legal and ethical considerations in cybersecurity",
  ],

  modules: [
    {
      title: "Module 1: Introduction to Cybersecurity",
      sections: [
        {
          heading: "What is Cybersecurity?",
          content:
            "Cybersecurity is the practice of protecting systems, networks, programs, and data from digital attacks, unauthorized access, and damage. It encompasses a wide range of technologies, processes, and practices designed to safeguard information assets.",
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
          heading: "The Importance of Cybersecurity",
          content:
            "In today's interconnected digital world, cybersecurity is critical for protecting personal information, business operations, national security, and infrastructure. Cyber attacks can result in financial losses, reputational damage, legal consequences, and compromise of sensitive information.",
        },
        {
          heading: "Common Cybersecurity Domains",
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
          heading: "Types of Cyber Threats – Malware",
          content:
            "Malware is malicious software designed to damage, disrupt, or gain unauthorized access to computer systems.",
          bullets: [
            "Viruses: Self-replicating programs that attach to clean files",
            "Trojans: Disguised as legitimate software",
            "Ransomware: Encrypts data and demands payment",
            "Spyware: Secretly monitors and collects user information",
            "Worms: Self-replicating malware that spreads across networks",
          ],
        },
        {
          heading: "Social Engineering",
          content:
            "Psychological manipulation to trick users into divulging confidential information or performing actions that compromise security.",
          bullets: [
            "Phishing",
            "Pretexting",
            "Baiting",
            "Tailgating",
          ],
        },
        {
          heading: "Advanced Persistent Threats (APTs)",
          content:
            "Sophisticated and prolonged attacks typically conducted by well-funded adversaries targeting specific organizations for espionage or sabotage.",
        },
        {
          heading: "Denial of Service (DoS) and DDoS Attacks",
          content:
            "Attacks that overwhelm systems with traffic to make services unavailable. DDoS attacks use multiple compromised systems to amplify the impact.",
        },
      ],
    },

    {
      title: "Module 3: Network Security Fundamentals",
      sections: [
        {
          heading: "Network Architecture and Protocols",
          content:
            "Understanding network layers, protocols such as TCP/IP, HTTP, and DNS, and how data flows through networks is essential for effective security.",
        },
        {
          heading: "OSI Model Layers",
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
          heading: "Firewalls and IDS/IPS",
          content:
            "Firewalls filter network traffic based on predefined security rules. IDS monitors traffic for suspicious activity, while IPS actively blocks detected threats.",
        },
        {
          heading: "Virtual Private Networks (VPNs)",
          content:
            "VPNs create encrypted tunnels over public networks to ensure confidentiality and integrity of transmitted data.",
        },
        {
          heading: "Wireless Security",
          content:
            "Wireless security requires strong encryption (WPA3), authentication, segmentation, and continuous monitoring.",
        },
      ],
    },

    {
      title: "Module 4: Cryptography and Data Protection",
      sections: [
        {
          heading: "Introduction to Cryptography",
          content:
            "Cryptography secures information by transforming readable data into unreadable ciphertext using mathematical algorithms.",
        },
        {
          heading: "Encryption Types",
          bullets: [
            "Symmetric Encryption: AES, DES, 3DES",
            "Asymmetric Encryption: RSA, ECC, Diffie-Hellman",
          ],
        },
        {
          heading: "Hashing and Digital Signatures",
          bullets: [
            "Hash Functions: SHA-256, SHA-3, MD5 (deprecated)",
            "Digital Signatures ensure authenticity and integrity",
          ],
        },
        {
          heading: "Public Key Infrastructure (PKI)",
          content:
            "PKI manages digital certificates, public keys, and certificate authorities for secure communication.",
        },
        {
          heading: "Data Protection Best Practices",
          bullets: [
            "Encrypt data at rest and in transit",
            "Secure key management",
            "Regular backups and disaster recovery",
          ],
        },
      ],
    },

    {
      title: "Module 5: Identity and Access Management",
      sections: [
        {
          heading: "Authentication Methods",
          bullets: [
            "Something you know: Passwords, PINs",
            "Something you have: Tokens, smart cards",
            "Something you are: Biometrics",
          ],
        },
        {
          heading: "Multi-Factor Authentication (MFA)",
          content:
            "MFA combines multiple authentication factors and is one of the most effective security controls.",
        },
        {
          heading: "Access Control Models",
          bullets: [
            "Role-Based Access Control (RBAC)",
            "Attribute-Based Access Control (ABAC)",
            "Mandatory Access Control (MAC)",
            "Discretionary Access Control (DAC)",
          ],
        },
        {
          heading: "Principle of Least Privilege",
          content:
            "Users should have only the minimum access required to perform their tasks.",
        },
        {
          heading: "Single Sign-On (SSO) and Federation",
          content:
            "SSO allows users to authenticate once and access multiple systems using standards like SAML and OAuth.",
        },
      ],
    },

    {
      title: "Module 6: Application Security",
      sections: [
        {
          heading: "OWASP Top 10 Vulnerabilities",
          bullets: [
            "Injection Flaws",
            "Broken Authentication",
            "Sensitive Data Exposure",
            "XML External Entities (XXE)",
            "Broken Access Control",
            "Security Misconfiguration",
            "Cross-Site Scripting (XSS)",
            "Insecure Deserialization",
            "Using Components with Known Vulnerabilities",
            "Insufficient Logging and Monitoring",
          ],
        },
        {
          heading: "Secure Software Development Lifecycle",
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
          heading: "Input Validation and API Security",
          content:
            "Proper input validation, output encoding, authentication, authorization, and monitoring are critical for application and API security.",
        },
      ],
    },

    {
      title: "Module 7: Security Operations and Monitoring",
      sections: [
        {
          heading: "Security Information and Event Management (SIEM)",
          content:
            "SIEM systems collect and analyze security event data to detect threats and support incident response.",
        },
        {
          heading: "Log Management",
          bullets: [
            "Centralized logging",
            "Log retention policies",
            "Real-time alerting",
            "Regular review and analysis",
          ],
        },
        {
          heading: "Vulnerability Management",
          bullets: [
            "Asset discovery",
            "Vulnerability scanning",
            "Risk prioritization",
            "Remediation and patching",
          ],
        },
        {
          heading: "Penetration Testing",
          bullets: [
            "Black Box Testing",
            "White Box Testing",
            "Gray Box Testing",
          ],
        },
      ],
    },

    {
      title: "Module 8: Incident Response and Recovery",
      sections: [
        {
          heading: "Incident Response Lifecycle",
          bullets: [
            "Preparation",
            "Detection and Analysis",
            "Containment",
            "Eradication",
            "Recovery",
            "Lessons Learned",
          ],
        },
        {
          heading: "Digital Forensics",
          content:
            "Digital forensics involves collecting and analyzing digital evidence while maintaining chain of custody.",
        },
        {
          heading: "Business Continuity and Disaster Recovery",
          bullets: [
            "Business Impact Analysis (BIA)",
            "Recovery Time Objective (RTO)",
            "Recovery Point Objective (RPO)",
          ],
        },
      ],
    },

    {
      title: "Module 9: Cloud Security",
      sections: [
        {
          heading: "Cloud Service Models",
          bullets: ["IaaS", "PaaS", "SaaS"],
        },
        {
          heading: "Shared Responsibility Model",
          content:
            "Security responsibilities are shared between cloud providers and customers.",
        },
        {
          heading: "Cloud Security Best Practices",
          bullets: [
            "Strong IAM",
            "Encryption",
            "Monitoring and logging",
            "Regular security assessments",
          ],
        },
      ],
    },

    {
      title: "Module 10: Mobile and IoT Security",
      sections: [
        {
          heading: "Mobile Security",
          bullets: [
            "Device encryption",
            "Strong authentication",
            "MDM solutions",
            "Regular updates",
          ],
        },
        {
          heading: "IoT Security Challenges",
          bullets: [
            "Weak default credentials",
            "Limited updates",
            "Physical access risks",
          ],
        },
        {
          heading: "Securing IoT Deployments",
          bullets: [
            "Change default credentials",
            "Network segmentation",
            "Firmware updates",
            "Continuous monitoring",
          ],
        },
      ],
    },

    {
      title: "Module 11: Compliance and Governance",
      sections: [
        {
          heading: "Security Frameworks",
          bullets: [
            "NIST Cybersecurity Framework",
            "ISO 27001",
            "CIS Controls",
            "COBIT",
          ],
        },
        {
          heading: "Regulatory Requirements",
          bullets: [
            "GDPR",
            "HIPAA",
            "PCI DSS",
            "SOX",
            "CCPA",
          ],
        },
        {
          heading: "Security Policies and Awareness",
          content:
            "Security policies, procedures, and regular training are essential for maintaining a strong security posture.",
        },
      ],
    },

    {
      title: "Module 12: Emerging Technologies and Future Trends",
      sections: [
        {
          heading: "AI and Machine Learning in Security",
          content:
            "AI enhances threat detection and response but is also used by attackers for advanced attacks.",
        },
        {
          heading: "Zero Trust Architecture",
          bullets: [
            "Never trust, always verify",
            "Continuous authentication",
            "Micro-segmentation",
            "Least privilege",
          ],
        },
        {
          heading: "Post-Quantum Cryptography",
          content:
            "Organizations must prepare for quantum threats by evaluating quantum-resistant cryptographic algorithms.",
        },
        {
          heading: "Privacy-Enhancing Technologies",
          bullets: [
            "Homomorphic Encryption",
            "Differential Privacy",
            "Secure Multi-Party Computation",
            "Federated Learning",
          ],
        },
        {
          heading: "Blockchain and Decentralized Security",
          content:
            "Blockchain provides immutable audit trails and decentralized identity but introduces new security challenges.",
        },
      ],
    },
  ],

  conclusion: [
    "Cybersecurity is a continuously evolving field requiring ongoing learning and adaptation.",
    "Security is everyone’s responsibility, not just IT’s.",
    "Defense in depth provides multiple layers of protection.",
    "Proactive security measures are more effective than reactive responses.",
    "Continuous monitoring and improvement are essential.",
  ],

  nextSteps: [
    "Hands-on practice with security tools",
    "Professional certifications (Security+, CEH, CISSP)",
    "Participation in security communities and conferences",
    "Reading security blogs and research papers",
    "Contributing to open-source security projects",
    "Ethical hacking practice in controlled environments",
  ],
};
