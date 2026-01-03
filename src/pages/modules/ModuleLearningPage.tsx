import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Clock, CheckCircle2, Circle,
  Play, FileText, BookOpen, FlaskConical, Sparkles,
  Heart, MessageCircle, Share2, Bookmark
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Tab types
type TabType = "watch" | "read" | "mcq" | "lab" | "flex";

// MCQ question type
interface MCQQuestion {
  question: string;
  options: { label: string; text: string }[];
  correctAnswer: string;
}

// Flex creator card type
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

// Section content type
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

// Module content database
const moduleDatabase: Record<string, ModuleData> = {
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

// Parse text with highlighted terms (for key areas)
const parseKeyAreas = (text: string) => {
  const keyAreas = [
    { term: "Network Security:", description: "Protecting the integrity and usability of networks and data through firewalls, intrusion detection systems, and access controls." },
    { term: "Application Security:", description: "Ensuring software and devices are free from threats through secure coding practices." },
    { term: "Information Security:", description: "Protecting the integrity and privacy of data during storage and transmission." },
    { term: "Operational Security:", description: "Processes for handling and protecting data assets and user permissions." }
  ];
  
  return keyAreas;
};

export default function ModuleLearningPage() {
  const { moduleId } = useParams();
  const [activeTab, setActiveTab] = useState<TabType>("watch");
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // Get module data or default to cybersecurity-basics
  const module = moduleDatabase[moduleId || "cybersecurity-basics"] || moduleDatabase["cybersecurity-basics"];
  
  // Find current section index (first incomplete or first completed)
  const initialSection = module.sections.findIndex(s => !s.completed);
  const [activeSection, setActiveSection] = useState(initialSection === -1 ? 0 : initialSection);
  
  const currentSection = module.sections[activeSection];
  const totalSections = module.sections.length;

  const handleNextSection = () => {
    if (activeSection < totalSections - 1) {
      setActiveSection(activeSection + 1);
      setActiveTab("watch");
      setSelectedAnswer(null);
      setCurrentQuestionIndex(0);
    }
  };

  const handlePrevSection = () => {
    if (activeSection > 0) {
      setActiveSection(activeSection - 1);
      setActiveTab("watch");
      setSelectedAnswer(null);
      setCurrentQuestionIndex(0);
    }
  };

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: "watch", label: "Watch", icon: <Play className="w-4 h-4" /> },
    { id: "read", label: "Read", icon: <FileText className="w-4 h-4" /> },
    { id: "mcq", label: "MCQ", icon: <BookOpen className="w-4 h-4" /> },
    { id: "lab", label: "Lab", icon: <FlaskConical className="w-4 h-4" /> },
    { id: "flex", label: "Flex", icon: <Sparkles className="w-4 h-4" /> },
  ];

  const keyAreas = parseKeyAreas("");

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-72 border-r border-border bg-card shrink-0 flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-border">
          <Link 
            to="/modules" 
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Modules
          </Link>
          <h2 className="font-semibold text-foreground text-lg">Lessons</h2>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          {module.sections.map((section, idx) => (
            <button
              key={section.id}
              onClick={() => {
                setActiveSection(idx);
                setActiveTab("watch");
                setSelectedAnswer(null);
                setCurrentQuestionIndex(0);
              }}
              className={cn(
                "w-full flex items-start gap-3 px-4 py-4 rounded-lg text-left transition-all mb-2",
                activeSection === idx
                  ? "bg-primary/10 border-l-4 border-primary"
                  : "hover:bg-muted/50"
              )}
            >
              <div className="mt-0.5">
                {section.completed ? (
                  <CheckCircle2 className={cn(
                    "w-5 h-5",
                    activeSection === idx ? "text-primary" : "text-primary"
                  )} />
                ) : (
                  <Circle className={cn(
                    "w-5 h-5",
                    activeSection === idx ? "text-primary" : "text-muted-foreground"
                  )} />
                )}
              </div>
              <div className="flex-1">
                <span className={cn(
                  "text-sm font-medium block",
                  activeSection === idx ? "text-primary" : "text-foreground"
                )}>
                  {section.title}
                </span>
                <span className={cn(
                  "text-xs mt-1 block",
                  activeSection === idx ? "text-primary/70" : "text-muted-foreground"
                )}>
                  {section.duration}
                </span>
              </div>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-8 py-8">
          {/* Header */}
          <motion.header 
            key={`${activeSection}-header`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
              <span>Lesson {activeSection + 1} of {totalSections}</span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {currentSection.duration}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{currentSection.title}</h1>
            <p className="text-muted-foreground">{currentSection.description}</p>
          </motion.header>

          {/* Tabs */}
          <div className="border-b border-border mb-8">
            <div className="flex gap-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 pb-3 px-1 text-sm font-medium transition-all border-b-2 -mb-[2px]",
                    activeTab === tab.id
                      ? "text-primary border-primary"
                      : "text-muted-foreground border-transparent hover:text-foreground"
                  )}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <motion.div
            key={`${activeSection}-${activeTab}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-[400px]"
          >
            {/* Watch Tab */}
            {activeTab === "watch" && (
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-muted to-card">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center mx-auto mb-4">
                      <Play className="w-8 h-8 text-primary ml-1" />
                    </div>
                    <p className="text-foreground font-medium mb-2">Video content coming soon</p>
                    <p className="text-muted-foreground text-sm">Interactive video lessons for this module</p>
                  </div>
                </div>
                <div className="p-4 border-t border-border flex items-center gap-4">
                  <button className="text-muted-foreground hover:text-foreground">
                    <Play className="w-5 h-5" />
                  </button>
                  <div className="flex-1 h-1 bg-muted rounded-full">
                    <div className="h-full w-0 bg-primary rounded-full"></div>
                  </div>
                  <span className="text-primary text-sm font-mono">0:00 / {currentSection.duration}</span>
                </div>
              </div>
            )}

            {/* Read Tab */}
            {activeTab === "read" && (
              <div className="prose prose-invert max-w-none">
                {currentSection.content.readContent.map((content, idx) => (
                  <div key={idx} className="mb-6">
                    {content.heading && (
                      <h2 className="text-xl font-semibold text-foreground mb-3">{content.heading}</h2>
                    )}
                    <p className="text-muted-foreground leading-relaxed">{content.body}</p>
                  </div>
                ))}
                
                {/* Key Areas of Focus */}
                {currentSection.id === 1 && moduleId === "cybersecurity-basics" && (
                  <div className="mt-8">
                    <h2 className="text-xl font-semibold text-foreground mb-4">Key Areas of Focus</h2>
                    <div className="space-y-4">
                      {keyAreas.map((area, idx) => (
                        <div key={idx} className="flex">
                          <span className="text-primary font-medium mr-2">{area.term}</span>
                          <span className="text-muted-foreground">{area.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {currentSection.content.readContent.length === 0 && (
                  <div className="text-center py-16">
                    <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Reading content coming soon</p>
                  </div>
                )}
              </div>
            )}

            {/* MCQ Tab */}
            {activeTab === "mcq" && (
              <div>
                {currentSection.content.mcqQuestions.length > 0 ? (
                  <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="text-lg font-medium text-foreground mb-6">
                      Question {currentQuestionIndex + 1}: {currentSection.content.mcqQuestions[currentQuestionIndex]?.question}
                    </h3>
                    <div className="space-y-3">
                      {currentSection.content.mcqQuestions[currentQuestionIndex]?.options.map((option) => (
                        <button
                          key={option.label}
                          onClick={() => setSelectedAnswer(option.label)}
                          className={cn(
                            "w-full text-left p-4 rounded-lg border transition-all",
                            selectedAnswer === option.label
                              ? "bg-primary/10 border-primary text-foreground"
                              : "bg-muted/30 border-border text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                          )}
                        >
                          {option.label}. {option.text}
                        </button>
                      ))}
                    </div>
                    {currentSection.content.mcqQuestions.length > 1 && (
                      <div className="flex justify-between mt-6 pt-4 border-t border-border">
                        <Button
                          variant="outline"
                          disabled={currentQuestionIndex === 0}
                          onClick={() => {
                            setCurrentQuestionIndex(currentQuestionIndex - 1);
                            setSelectedAnswer(null);
                          }}
                        >
                          Previous Question
                        </Button>
                        <Button
                          disabled={currentQuestionIndex === currentSection.content.mcqQuestions.length - 1}
                          onClick={() => {
                            setCurrentQuestionIndex(currentQuestionIndex + 1);
                            setSelectedAnswer(null);
                          }}
                          className="bg-primary hover:bg-primary/90"
                        >
                          Next Question
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Quiz questions coming soon</p>
                  </div>
                )}
              </div>
            )}

            {/* Lab Tab */}
            {activeTab === "lab" && (
              <div className="flex items-center justify-center py-16">
                <div className="bg-card border border-border rounded-xl p-12 text-center max-w-md">
                  <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center mx-auto mb-4">
                    <Play className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">Interactive Lab Coming Soon</h3>
                  <p className="text-muted-foreground text-sm">Practice your skills with hands-on exercises</p>
                </div>
              </div>
            )}

            {/* Flex Tab */}
            {activeTab === "flex" && (
              <div>
                {currentSection.content.flexCards.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                      {currentSection.content.flexCards.map((card) => (
                        <div
                          key={card.id}
                          className={cn(
                            "bg-gradient-to-b rounded-xl overflow-hidden border border-border",
                            card.gradient
                          )}
                        >
                          <div className="p-4">
                            <div className="flex justify-between items-start mb-24">
                              <span className={cn("px-2 py-1 rounded text-xs font-medium text-white", card.categoryColor)}>
                                {card.category}
                              </span>
                              <Heart className="w-4 h-4 text-muted-foreground" />
                            </div>
                            
                            <div className="absolute right-3 top-16 space-y-3">
                              <div className="flex flex-col items-center text-xs text-muted-foreground">
                                <Heart className="w-4 h-4 mb-1" />
                                <span>{card.likes}</span>
                              </div>
                              <div className="flex flex-col items-center text-xs text-muted-foreground">
                                <MessageCircle className="w-4 h-4 mb-1" />
                                <span>{card.comments}</span>
                              </div>
                              <Share2 className="w-4 h-4 text-muted-foreground" />
                              <Bookmark className="w-4 h-4 text-muted-foreground" />
                            </div>
                          </div>
                          
                          <div className="p-4 bg-card/80 backdrop-blur">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-2xl">{card.avatar}</span>
                              <div>
                                <p className="text-sm font-medium text-foreground">{card.username}</p>
                                <p className="text-xs text-primary">{card.role}</p>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2">{card.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t border-border pt-8">
                      <h3 className="text-xl font-semibold text-foreground mb-6">Featured Creators</h3>
                      <p className="text-muted-foreground">More creator content coming soon...</p>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-16">
                    <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Flex content coming soon</p>
                  </div>
                )}
              </div>
            )}
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-16 pt-8 border-t border-border">
            <Button
              variant="outline"
              onClick={handlePrevSection}
              disabled={activeSection === 0}
              className="px-6"
            >
              Previous Lesson
            </Button>
            <Button
              onClick={handleNextSection}
              disabled={activeSection === totalSections - 1}
              className="px-6 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Next Lesson
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
