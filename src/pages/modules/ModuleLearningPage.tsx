import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Terminal, Clock, CheckCircle2, 
  Lock, ChevronRight, BookOpen, ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

// Content block types
type TextBlock = {
  type: "text";
  heading: string;
  body: string; // Supports {{highlight}} syntax for highlighted terms
};

type CodeBlock = {
  type: "code";
  title: string;
  description: string;
  command: string;
};

type ListBlock = {
  type: "list";
  heading?: string;
  ordered: boolean;
  items: { term?: string; description: string }[];
};

type ContentBlock = TextBlock | CodeBlock | ListBlock;

interface Section {
  id: number;
  title: string;
  completed: boolean;
  current?: boolean;
  locked?: boolean;
  duration: string;
  objectives: string[];
  content: ContentBlock[];
}

interface ModuleData {
  title: string;
  difficulty: "easy" | "medium" | "hard";
  sections: Section[];
}

// Module content database
const moduleDatabase: Record<string, ModuleData> = {
  "linux-fundamentals": {
    title: "Linux Fundamentals",
    difficulty: "medium",
    sections: [
      {
        id: 1,
        title: "Introduction to Linux",
        completed: true,
        duration: "15 min",
        objectives: [
          "Understand Linux origins and philosophy",
          "Learn about Linux distributions",
          "Navigate the terminal basics"
        ],
        content: [
          {
            type: "text",
            heading: "What is Linux?",
            body: "{{Linux}} is a family of open-source {{Unix-like}} operating systems based on the Linux kernel, first released by {{Linus Torvalds}} on September 17, 1991. It has since become one of the most widely used operating systems in the world, powering everything from smartphones to supercomputers."
          },
          {
            type: "text",
            heading: "Why Learn Linux?",
            body: "Understanding Linux is essential for cybersecurity professionals. Most servers, cloud infrastructure, and security tools run on Linux. The {{command-line interface}} (CLI) provides powerful capabilities for automation, system administration, and penetration testing that are simply not available through graphical interfaces."
          },
          {
            type: "code",
            title: "Checking Linux version",
            description: "You can check your Linux version using the `uname` command:",
            command: "uname -a"
          },
          {
            type: "list",
            heading: "Popular Linux Distributions",
            ordered: true,
            items: [
              { term: "Ubuntu", description: "User-friendly distribution perfect for beginners. Based on Debian with a large community and extensive documentation." },
              { term: "Kali Linux", description: "Security-focused distribution pre-loaded with penetration testing tools. Essential for ethical hackers and security researchers." },
              { term: "CentOS/Rocky Linux", description: "Enterprise-grade distributions commonly used in production servers. Known for stability and long-term support." }
            ]
          }
        ]
      },
      {
        id: 2,
        title: "File System Navigation",
        completed: true,
        duration: "20 min",
        objectives: [
          "Navigate the Linux file system",
          "Understand directory structure",
          "Use basic navigation commands"
        ],
        content: [
          {
            type: "text",
            heading: "Linux Directory Structure",
            body: "The Linux file system is organized in a {{hierarchical tree structure}}, with the root directory ({{/}}) at the top. Unlike Windows which uses drive letters (C:, D:), Linux mounts everything under a single root directory."
          },
          {
            type: "text",
            heading: "Understanding the Hierarchy",
            body: "Each directory in the Linux file system has a specific purpose. The {{/home}} directory contains user files, {{/etc}} holds configuration files, {{/var}} stores variable data like logs, and {{/bin}} contains essential command binaries. This standardization allows system administrators to quickly locate files across different Linux systems."
          },
          {
            type: "list",
            heading: "Essential Directories",
            ordered: false,
            items: [
              { term: "/home", description: "Contains home directories for all users. Your personal files, configurations, and data are stored here." },
              { term: "/etc", description: "System-wide configuration files. Almost all system settings are stored in text files here." },
              { term: "/var/log", description: "System log files. Critical for troubleshooting and security monitoring." },
              { term: "/tmp", description: "Temporary files. Cleared on reboot, useful for storing temporary data during operations." }
            ]
          },
          {
            type: "code",
            title: "Navigation commands",
            description: "Use these essential commands to navigate the file system:",
            command: "cd /home/user    # Change directory\npwd              # Print working directory\nls -la           # List all files with details"
          }
        ]
      },
      {
        id: 3,
        title: "Working with Files",
        completed: false,
        current: true,
        duration: "20 min",
        objectives: [
          "Create, copy, move, and delete files",
          "Understand file operations in Linux",
          "Use wildcards and patterns"
        ],
        content: [
          {
            type: "text",
            heading: "Creating Files",
            body: "In Linux, there are multiple ways to create files. The most common methods are using the {{touch}} command and output redirection. Understanding these methods is fundamental for working effectively in the command line."
          },
          {
            type: "code",
            title: "Using touch",
            description: "The `touch` command is primarily used to update file timestamps, but it is commonly used to create empty files:",
            command: "touch newfile.txt"
          },
          {
            type: "code",
            title: "Using echo with redirection",
            description: "You can create a file with content using echo and the `>` operator:",
            command: "echo \"Hello World\" > hello.txt"
          },
          {
            type: "text",
            heading: "Copying and Moving Files",
            body: "The {{cp}} command copies files and directories, while {{mv}} moves or renames them. Both commands support various options for different behaviors. When copying directories, remember to use the {{-r}} (recursive) flag to include all subdirectories and their contents."
          },
          {
            type: "code",
            title: "Copy and move operations",
            description: "Common file manipulation commands:",
            command: "cp source.txt destination.txt     # Copy a file\ncp -r folder1 folder2              # Copy directory recursively\nmv oldname.txt newname.txt         # Rename a file\nmv file.txt /path/to/destination/  # Move a file"
          },
          {
            type: "list",
            heading: "Wildcards and Patterns",
            ordered: true,
            items: [
              { term: "* (asterisk)", description: "Matches any number of characters. For example, *.txt matches all text files." },
              { term: "? (question mark)", description: "Matches exactly one character. file?.txt matches file1.txt, file2.txt, etc." },
              { term: "[] (brackets)", description: "Matches any character within the brackets. [abc]*.txt matches files starting with a, b, or c." }
            ]
          }
        ]
      },
      {
        id: 4,
        title: "Text Processing",
        completed: false,
        locked: true,
        duration: "25 min",
        objectives: [],
        content: []
      },
      {
        id: 5,
        title: "User Management",
        completed: false,
        locked: true,
        duration: "20 min",
        objectives: [],
        content: []
      },
      {
        id: 6,
        title: "Permissions & Ownership",
        completed: false,
        locked: true,
        duration: "25 min",
        objectives: [],
        content: []
      },
      {
        id: 7,
        title: "Process Management",
        completed: false,
        locked: true,
        duration: "20 min",
        objectives: [],
        content: []
      },
      {
        id: 8,
        title: "Network Basics",
        completed: false,
        locked: true,
        duration: "30 min",
        objectives: [],
        content: []
      }
    ]
  },
  "cybersecurity-basics": {
    title: "Cybersecurity Basics",
    difficulty: "easy",
    sections: [
      {
        id: 1,
        title: "What is Cybersecurity?",
        completed: false,
        current: true,
        duration: "15 min",
        objectives: [
          "Define cybersecurity and its importance",
          "Understand the threat landscape",
          "Learn about security domains"
        ],
        content: [
          {
            type: "text",
            heading: "Introduction to Cybersecurity",
            body: "{{Cybersecurity}} is the practice of protecting systems, networks, programs, and data from digital attacks, unauthorized access, and damage. It encompasses a wide range of technologies, processes, and practices designed to safeguard information assets in our increasingly connected world."
          },
          {
            type: "text",
            heading: "Why Cybersecurity Matters",
            body: "In today's digital age, cyber threats are evolving at an unprecedented rate. Organizations face risks from {{malware}}, {{phishing attacks}}, {{ransomware}}, and sophisticated {{Advanced Persistent Threats}} (APTs). A single successful attack can result in millions of dollars in damages, loss of customer trust, and regulatory penalties."
          },
          {
            type: "list",
            heading: "Key Security Domains",
            ordered: true,
            items: [
              { term: "Network Security", description: "Protecting the integrity, confidentiality, and availability of computer networks and data using both software and hardware technologies." },
              { term: "Application Security", description: "Measures taken to improve the security of an application by finding, fixing, and preventing security vulnerabilities." },
              { term: "Information Security", description: "Protecting information and information systems from unauthorized access, use, disclosure, disruption, or destruction." },
              { term: "Operational Security", description: "Processes and decisions for handling and protecting data assets, including user permissions and data storage procedures." }
            ]
          }
        ]
      },
      {
        id: 2,
        title: "The CIA Triad",
        completed: false,
        duration: "20 min",
        objectives: [
          "Understand Confidentiality",
          "Learn about Integrity",
          "Explore Availability concepts"
        ],
        content: [
          {
            type: "text",
            heading: "The Foundation of Security",
            body: "The {{CIA Triad}} is a widely-used model that guides policies for information security within an organization. CIA stands for {{Confidentiality}}, {{Integrity}}, and {{Availability}} - the three core principles that should be guaranteed in any secure system."
          },
          {
            type: "list",
            heading: "CIA Triad Components",
            ordered: true,
            items: [
              { term: "Confidentiality", description: "Ensures that information is accessible only to authorized individuals. Implemented through encryption, access controls, and authentication mechanisms." },
              { term: "Integrity", description: "Maintains the accuracy and completeness of data. Achieved through hashing, digital signatures, and version control systems." },
              { term: "Availability", description: "Ensures that authorized users have reliable access to information when needed. Maintained through redundancy, backups, and disaster recovery plans." }
            ]
          }
        ]
      },
      {
        id: 3,
        title: "Common Threats",
        completed: false,
        locked: true,
        duration: "25 min",
        objectives: [],
        content: []
      },
      {
        id: 4,
        title: "Security Best Practices",
        completed: false,
        locked: true,
        duration: "20 min",
        objectives: [],
        content: []
      }
    ]
  }
};

const difficultyColors = {
  easy: "bg-difficulty-easy/20 text-difficulty-easy border-difficulty-easy/40",
  medium: "bg-difficulty-medium/20 text-difficulty-medium border-difficulty-medium/40",
  hard: "bg-difficulty-hard/20 text-difficulty-hard border-difficulty-hard/40",
};

// Parse text with {{highlighted}} terms
const parseHighlightedText = (text: string) => {
  const parts = text.split(/(\{\{[^}]+\}\})/g);
  return parts.map((part, i) => {
    if (part.startsWith("{{") && part.endsWith("}}")) {
      const term = part.slice(2, -2);
      return (
        <code key={i} className="px-1.5 py-0.5 bg-difficulty-easy/20 text-difficulty-easy rounded text-sm font-mono">
          {term}
        </code>
      );
    }
    return part;
  });
};

// Parse code descriptions with `backticks`
const parseInlineCode = (text: string) => {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      const code = part.slice(1, -1);
      return (
        <code key={i} className="px-1.5 py-0.5 bg-difficulty-hard/20 text-difficulty-hard rounded text-xs font-mono">
          {code}
        </code>
      );
    }
    return part;
  });
};

interface CodeBlockProps {
  title: string;
  description: string;
  command: string;
}

const CodeBlockComponent = ({ title, description, command }: CodeBlockProps) => (
  <div className="bg-surface-elevated border border-border rounded-xl overflow-hidden my-6">
    <div className="px-4 py-3 border-b border-border bg-surface">
      <span className="text-sm text-muted-foreground font-mono">{title}</span>
    </div>
    <div className="p-5">
      <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
        {parseInlineCode(description)}
      </p>
      <div className="bg-[#0d1117] rounded-lg p-4 font-mono text-sm overflow-x-auto">
        {command.split("\n").map((line, i) => (
          <div key={i} className="flex items-start gap-2 whitespace-pre">
            <span className="text-difficulty-easy select-none">$</span>
            <span className="text-foreground">{line}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

interface ListBlockProps {
  heading?: string;
  ordered: boolean;
  items: { term?: string; description: string }[];
}

const ListBlockComponent = ({ heading, ordered, items }: ListBlockProps) => (
  <div className="my-6">
    {heading && (
      <h3 className="text-lg font-semibold text-foreground mb-4">{heading}</h3>
    )}
    <div className="space-y-3">
      {items.map((item, idx) => (
        <div 
          key={idx} 
          className="bg-surface-elevated border border-border rounded-lg p-4 flex gap-3"
        >
          {ordered && (
            <span className="flex items-center justify-center w-6 h-6 rounded bg-primary/20 text-primary text-sm font-mono shrink-0">
              {idx + 1}.
            </span>
          )}
          <div className="flex-1">
            {item.term && (
              <code className="px-1.5 py-0.5 bg-difficulty-easy/20 text-difficulty-easy rounded text-sm font-mono mr-2">
                {item.term}
              </code>
            )}
            <span className="text-muted-foreground leading-relaxed">
              {parseHighlightedText(item.description)}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function ModuleLearningPage() {
  const { moduleId } = useParams();
  
  // Get module data or default to linux-fundamentals
  const module = moduleDatabase[moduleId || "linux-fundamentals"] || moduleDatabase["linux-fundamentals"];
  
  // Find current section index
  const initialSection = module.sections.findIndex(s => s.current) !== -1 
    ? module.sections.findIndex(s => s.current) 
    : 0;
  const [activeSection, setActiveSection] = useState(initialSection);
  
  const currentSection = module.sections[activeSection];
  const completedCount = module.sections.filter(s => s.completed).length;
  const totalSections = module.sections.length;
  const progressPercentage = (completedCount / totalSections) * 100;

  const handleNextSection = () => {
    if (activeSection < totalSections - 1) {
      setActiveSection(activeSection + 1);
    }
  };

  const handlePrevSection = () => {
    if (activeSection > 0) {
      setActiveSection(activeSection - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-72 border-r border-border bg-surface shrink-0 flex flex-col sticky top-0 h-screen">
        <div className="p-4 border-b border-border">
          <Link 
            to="/modules" 
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Modules
          </Link>
        </div>

        <div className="p-4 border-b border-border">
          <h2 className="font-bold text-foreground text-lg">{module.title}</h2>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Progress</span>
              <span className="text-difficulty-easy font-mono">{completedCount}/{totalSections}</span>
            </div>
            <Progress value={progressPercentage} className="h-1.5 bg-surface-elevated" />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-2">
          {module.sections.map((section, idx) => (
            <button
              key={section.id}
              onClick={() => !section.locked && setActiveSection(idx)}
              disabled={section.locked}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-all mb-1",
                activeSection === idx
                  ? "bg-difficulty-easy text-background font-medium"
                  : section.completed
                    ? "text-foreground hover:bg-surface-elevated"
                    : section.locked
                      ? "text-muted-foreground/50 cursor-not-allowed"
                      : "text-muted-foreground hover:bg-surface-elevated hover:text-foreground"
              )}
            >
              <div className={cn(
                "w-6 h-6 rounded flex items-center justify-center shrink-0 text-xs font-mono",
                activeSection === idx
                  ? "bg-background/20 text-background"
                  : section.completed
                    ? "bg-difficulty-easy/20 text-difficulty-easy"
                    : section.locked
                      ? "bg-muted/20 text-muted-foreground/50"
                      : "bg-surface-elevated text-muted-foreground border border-border"
              )}>
                {section.completed ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : section.locked ? (
                  <Lock className="w-3 h-3" />
                ) : (
                  idx + 1
                )}
              </div>
              <span className="text-sm truncate">{section.title}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-8 py-8">
          {/* Header */}
          <motion.header 
            key={activeSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start justify-between mb-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-surface-elevated border border-border flex items-center justify-center">
                <Terminal className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{currentSection.title}</h1>
                <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                  <span>Section {activeSection + 1} of {totalSections}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    ~{currentSection.duration}
                  </span>
                </div>
              </div>
            </div>
            <span className={cn(
              "px-3 py-1 rounded-md text-xs font-bold uppercase border",
              difficultyColors[module.difficulty]
            )}>
              {module.difficulty}
            </span>
          </motion.header>

          {/* Learning Objectives */}
          {currentSection.objectives.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-10"
            >
              <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground mb-4">
                <span className="text-difficulty-medium">💡</span>
                Learning Objectives
              </h2>
              <div className="bg-surface-elevated border border-border rounded-xl p-5">
                <ul className="space-y-3">
                  {currentSection.objectives.map((objective, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                      <ChevronRight className="w-4 h-4 text-difficulty-medium shrink-0 mt-0.5" />
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.section>
          )}

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            {currentSection.content.map((block, idx) => (
              <div key={idx}>
                {block.type === "text" && (
                  <div>
                    <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground mb-4">
                      <BookOpen className="w-5 h-5 text-primary" />
                      {block.heading}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed text-[15px]">
                      {parseHighlightedText(block.body)}
                    </p>
                  </div>
                )}
                {block.type === "code" && (
                  <CodeBlockComponent 
                    title={block.title}
                    description={block.description}
                    command={block.command}
                  />
                )}
                {block.type === "list" && (
                  <ListBlockComponent
                    heading={block.heading}
                    ordered={block.ordered}
                    items={block.items}
                  />
                )}
              </div>
            ))}
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-16 pt-8 border-t border-border">
            <Button
              variant="outline"
              onClick={handlePrevSection}
              disabled={activeSection === 0}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>
            <Button
              onClick={handleNextSection}
              disabled={activeSection === totalSections - 1}
              className="gap-2 bg-primary hover:bg-primary/90"
            >
              Next Section
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
