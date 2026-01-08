interface MCQQuestion {
  question: string;
  options: { label: string; text: string }[];
  correctAnswer: string;
}

interface FlexCard {
  id: string;
  category: string;
  categoryColor: string;
  username: string;
  role: string;
  avatar: string;
  description: string;
  likes: string;
  comments: string;
  gradient: string;
}

interface SectionContent {
  readContent: {
    heading: string;
    body: string;
  }[];
  mcqQuestions: MCQQuestion[];
  flexCards: FlexCard[];
}

interface Section {
  id: number;
  title: string;
  completed: boolean;
  duration: string;
  description: string;
  content: SectionContent;
}

interface ModuleData {
  title: string;
  sections: Section[];
}

export const moduleDatabase: Record<string, ModuleData> = {
  "cybersecurity-basics": {
    title: "Cybersecurity Basics",
    sections: [
      {
        id: 1,
        title: "What is Cybersecurity?",
        completed: true,
        duration: "15 min",
        description: "Understanding the basics of cybersecurity and why it matters.",
        content: {
          readContent: [
            {
              heading: "",
              body: "Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks. These cyberattacks typically aim to access, change, or destroy sensitive information, extort money from users, or interrupt normal business processes."
            },
            {
              heading: "Why Cybersecurity Matters",
              body: "In today's interconnected world, everyone benefits from advanced cyberdefense programs. At an individual level, a cybersecurity attack can result in identity theft, extortion attempts, or the loss of important data like family photos. At an organizational level, breaches can lead to financial losses, reputational damage, and legal consequences."
            },
            {
              heading: "The Digital Landscape",
              body: "The digital transformation has created unprecedented opportunities but also significant vulnerabilities. Organizations of all sizes face constant threats from: - Cybercriminals seeking financial gain - Nation-state actors conducting espionage - Insider threats from employees or contractors - Automated attacks scanning for vulnerabilities"
            },
            {
              heading: "Key Areas of Focus",
              body: ""
            }
          ],
          mcqQuestions: [
            {
              question: "What is the primary goal of cybersecurity?",
              options: [
                { label: "A", text: "To make systems faster" },
                { label: "B", text: "To protect systems, networks, and data from digital attacks" },
                { label: "C", text: "To create new software" },
                { label: "D", text: "To monitor employee activity" }
              ],
              correctAnswer: "B"
            },
            {
              question: "Which of the following is NOT a common type of cyber threat?",
              options: [
                { label: "A", text: "Phishing" },
                { label: "B", text: "Malware" },
                { label: "C", text: "System updates" },
                { label: "D", text: "Ransomware" }
              ],
              correctAnswer: "C"
            },
            {
              question: "What does the 'C' in CIA triad stand for?",
              options: [
                { label: "A", text: "Compliance" },
                { label: "B", text: "Confidentiality" },
                { label: "C", text: "Control" },
                { label: "D", text: "Communication" }
              ],
              correctAnswer: "B"
            }
          ],
          flexCards: [
            {
              id: "1",
              category: "Security",
              categoryColor: "bg-primary",
              username: "cyber_guardian",
              role: "Flex Creator",
              avatar: "🛡️",
              description: "Breaking down the latest zero-day exploit 🔥...",
              likes: "256K",
              comments: "1.8K",
              gradient: "from-primary/30 to-primary/10"
            },
            {
              id: "2",
              category: "Linux",
              categoryColor: "bg-green-500",
              username: "linux.master",
              role: "Flex Creator",
              avatar: "🐧",
              description: "Linux terminal tricks that will blow your mind 🔥 #Linux...",
              likes: "89K",
              comments: "1.8K",
              gradient: "from-green-500/30 to-green-500/10"
            },
            {
              id: "3",
              category: "Coding",
              categoryColor: "bg-blue-500",
              username: "code.ninja",
              role: "Flex Creator",
              avatar: "💻",
              description: "Clean code principles every developer needs 📚...",
              likes: "256K",
              comments: "5.2K",
              gradient: "from-blue-500/30 to-blue-500/10"
            },
            {
              id: "4",
              category: "AI & ML",
              categoryColor: "bg-purple-500",
              username: "ai.explorer",
              role: "Flex Creator",
              avatar: "🤖",
              description: "Building your own AI assistant from scratch 🤖...",
              likes: "178K",
              comments: "3.1K",
              gradient: "from-purple-500/30 to-purple-500/10"
            }
          ]
        }
      },
      {
        id: 2,
        title: "Types of Cyber Threats",
        completed: false,
        duration: "20 min",
        description: "Learn about different types of cyber attacks and threats.",
        content: {
          readContent: [
            {
              heading: "",
              body: "Cyber threats come in many forms, each designed to exploit different vulnerabilities in systems and human behavior."
            },
            {
              heading: "Malware",
              body: "Malicious software designed to damage, disrupt, or gain unauthorized access to computer systems. This includes viruses, worms, trojans, and spyware."
            },
            {
              heading: "Phishing",
              body: "Social engineering attacks that trick users into revealing sensitive information through fraudulent emails, websites, or messages."
            }
          ],
          mcqQuestions: [
            {
              question: "What type of malware encrypts files and demands payment?",
              options: [
                { label: "A", text: "Virus" },
                { label: "B", text: "Ransomware" },
                { label: "C", text: "Spyware" },
                { label: "D", text: "Adware" }
              ],
              correctAnswer: "B"
            }
          ],
          flexCards: []
        }
      },
      {
        id: 3,
        title: "Security Principles",
        completed: false,
        duration: "25 min",
        description: "Core security principles and the CIA triad.",
        content: {
          readContent: [
            {
              heading: "",
              body: "Security principles form the foundation of any cybersecurity strategy."
            }
          ],
          mcqQuestions: [],
          flexCards: []
        }
      },
      {
        id: 4,
        title: "Defense in Depth",
        completed: false,
        duration: "20 min",
        description: "Understanding layered security approaches.",
        content: {
          readContent: [],
          mcqQuestions: [],
          flexCards: []
        }
      },
      {
        id: 5,
        title: "Security Best Practices",
        completed: false,
        duration: "15 min",
        description: "Essential security practices for organizations.",
        content: {
          readContent: [],
          mcqQuestions: [],
          flexCards: []
        }
      }
    ]
  },
  "linux-fundamentals": {
    title: "Linux Fundamentals",
    sections: [
      {
        id: 1,
        title: "Introduction to Linux",
        completed: true,
        duration: "15 min",
        description: "Getting started with Linux operating system.",
        content: {
          readContent: [
            {
              heading: "",
              body: "Linux is a family of open-source Unix-like operating systems based on the Linux kernel, first released by Linus Torvalds on September 17, 1991."
            },
            {
              heading: "Why Learn Linux?",
              body: "Linux powers most of the internet's servers, cloud infrastructure, and is essential for cybersecurity professionals. Understanding Linux opens doors to system administration, DevOps, and security careers."
            }
          ],
          mcqQuestions: [
            {
              question: "Who created the Linux kernel?",
              options: [
                { label: "A", text: "Bill Gates" },
                { label: "B", text: "Steve Jobs" },
                { label: "C", text: "Linus Torvalds" },
                { label: "D", text: "Dennis Ritchie" }
              ],
              correctAnswer: "C"
            }
          ],
          flexCards: []
        }
      },
      {
        id: 2,
        title: "File System Navigation",
        completed: false,
        duration: "20 min",
        description: "Navigate the Linux file system with confidence.",
        content: {
          readContent: [],
          mcqQuestions: [],
          flexCards: []
        }
      },
      {
        id: 3,
        title: "Working with Files",
        completed: false,
        duration: "20 min",
        description: "Create, edit, and manage files in Linux.",
        content: {
          readContent: [],
          mcqQuestions: [],
          flexCards: []
        }
      },
      {
        id: 4,
        title: "User Permissions",
        completed: false,
        duration: "25 min",
        description: "Understanding file permissions and ownership.",
        content: {
          readContent: [],
          mcqQuestions: [],
          flexCards: []
        }
      }
    ]
  }
};