import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Terminal, Clock, CheckCircle2, 
  Lock, ChevronRight, BookOpen
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

// Sample module data structure - this would come from your data source
const linuxFundamentalsModule = {
  title: "Linux Fundamentals",
  difficulty: "easy" as const,
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
          type: "text" as const,
          heading: "What is Linux?",
          body: "Linux is a family of open-source Unix-like operating systems based on the Linux kernel, first released by Linus Torvalds on September 17, 1991."
        },
        {
          type: "code" as const,
          title: "Checking Linux version",
          description: "You can check your Linux version using the following command:",
          command: "uname -a"
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
          type: "text" as const,
          heading: "Linux Directory Structure",
          body: "The Linux file system is organized in a hierarchical tree structure, with the root directory (/) at the top."
        },
        {
          type: "code" as const,
          title: "Navigation commands",
          description: "Use these commands to navigate the file system:",
          command: "cd /home/user\npwd\nls -la"
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
          type: "text" as const,
          heading: "Creating Files",
          body: "In Linux, there are multiple ways to create files. The most common methods are using the touch command and output redirection."
        },
        {
          type: "code" as const,
          title: "Using touch",
          description: "The touch command is primarily used to update file timestamps, but it's commonly used to create empty files:",
          command: "touch newfile.txt"
        },
        {
          type: "code" as const,
          title: "Using echo with redirection",
          description: "You can create a file with content using echo and the > operator:",
          command: 'echo "Hello World" > hello.txt'
        },
        {
          type: "text" as const,
          heading: "Copying Files",
          body: "The cp command is used to copy files and directories in Linux. It supports various options for different copying behaviors."
        },
        {
          type: "code" as const,
          title: "Copy command examples",
          description: "Basic file copying operations:",
          command: "cp source.txt destination.txt\ncp -r folder1 folder2\ncp *.txt backup/"
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
};

const difficultyColors = {
  easy: "bg-difficulty-easy/20 text-difficulty-easy border-difficulty-easy/40",
  medium: "bg-difficulty-medium/20 text-difficulty-medium border-difficulty-medium/40",
  hard: "bg-difficulty-hard/20 text-difficulty-hard border-difficulty-hard/40",
};

interface CodeBlockProps {
  title: string;
  description: string;
  command: string;
}

const CodeBlock = ({ title, description, command }: CodeBlockProps) => (
  <div className="bg-surface-elevated border border-border rounded-xl overflow-hidden my-6">
    <div className="px-4 py-3 border-b border-border bg-surface">
      <span className="text-sm text-muted-foreground font-mono">{title}</span>
    </div>
    <div className="p-5">
      <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
        {description.split('`').map((part, i) => 
          i % 2 === 1 ? (
            <code key={i} className="px-1.5 py-0.5 bg-difficulty-hard/20 text-difficulty-hard rounded text-xs font-mono">
              {part}
            </code>
          ) : part
        )}
      </p>
      <div className="bg-[#0d1117] rounded-lg p-4 font-mono text-sm">
        {command.split('\n').map((line, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="text-difficulty-easy select-none">$</span>
            <span className="text-foreground">{line}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default function ModuleLearningPage() {
  const { moduleId } = useParams();
  const [activeSection, setActiveSection] = useState(2); // 0-indexed, "Working with Files"
  
  const module = linuxFundamentalsModule;
  const currentSection = module.sections[activeSection];
  const completedCount = module.sections.filter(s => s.completed).length;
  const totalSections = module.sections.length;
  const progressPercentage = (completedCount / totalSections) * 100;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-72 border-r border-border bg-surface shrink-0 flex flex-col">
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
                    <p className="text-muted-foreground leading-relaxed">{block.body}</p>
                  </div>
                )}
                {block.type === "code" && (
                  <CodeBlock 
                    title={block.title}
                    description={block.description}
                    command={block.command}
                  />
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
