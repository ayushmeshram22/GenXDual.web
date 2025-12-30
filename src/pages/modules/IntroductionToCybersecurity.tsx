import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Clock, Award, CheckCircle2, ArrowLeft, ArrowRight, 
  ShieldCheck, Terminal, Lock, Shield, Server,
  Mail, Download, Bug, DollarSign, Zap, XCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ===================== DIAGRAMS ===================== */

const CIATriadDiagram = () => {
  const nodes = [
    { icon: Lock, label: "Confidentiality", desc: "Encryption" },
    { icon: Shield, label: "Integrity", desc: "Hashing" },
    { icon: Server, label: "Availability", desc: "Redundancy" },
  ];

  return (
    <div className="relative py-8">
      <div className="flex justify-center items-center gap-4 md:gap-8">
        {nodes.map((node, idx) => (
          <motion.div
            key={node.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.15, duration: 0.4 }}
            className="flex flex-col items-center gap-3 group"
          >
            <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-surface-elevated border border-border flex items-center justify-center transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-neon">
              <node.icon className="w-7 h-7 md:w-8 md:h-8 text-primary transition-all group-hover:drop-shadow-[0_0_8px_hsl(185,100%,50%)]" />
              <div className="absolute -top-px -right-px w-3 h-3 border-t border-r border-primary/50 rounded-tr-lg" />
              <div className="absolute -bottom-px -left-px w-3 h-3 border-b border-l border-primary/50 rounded-bl-lg" />
            </div>
            <div className="text-center">
              <span className="text-xs md:text-sm font-semibold text-foreground block">{node.label}</span>
              <span className="text-[10px] text-muted-foreground font-mono">{node.desc}</span>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent -z-10" />
      <p className="text-center text-xs text-muted-foreground mt-8 font-mono">
        <span className="text-primary">$</span> security_model <span className="text-primary">--type</span> CIA_TRIAD
      </p>
    </div>
  );
};

const OSIModelDiagram = () => {
  const layers = [
    { num: 7, name: "Application", security: "WAF, HTTPS", color: "difficulty-hard" },
    { num: 6, name: "Presentation", security: "Encryption", color: "difficulty-hard" },
    { num: 5, name: "Session", security: "Auth Tokens", color: "difficulty-medium" },
    { num: 4, name: "Transport", security: "TLS/SSL", color: "difficulty-medium" },
    { num: 3, name: "Network", security: "Firewalls", color: "difficulty-easy" },
    { num: 2, name: "Data Link", security: "MAC Filter", color: "difficulty-easy" },
    { num: 1, name: "Physical", security: "Access Ctrl", color: "difficulty-easy" },
  ];

  return (
    <div className="py-4">
      <div className="space-y-1.5">
        {layers.map((layer, idx) => (
          <motion.div
            key={layer.num}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05, duration: 0.3 }}
            className="flex items-center gap-3 group"
          >
            <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 font-mono text-xs font-bold transition-all ${layer.color}`}>
              {layer.num}
            </div>
            <div className="flex-1 glow-card bg-surface-elevated rounded-lg px-4 py-2.5 flex items-center justify-between border border-border group-hover:border-primary/30 transition-all">
              <span className="font-medium text-sm text-foreground">{layer.name}</span>
              <span className="text-xs text-muted-foreground font-mono">{layer.security}</span>
            </div>
          </motion.div>
        ))}
      </div>
      <p className="text-center text-xs text-muted-foreground mt-6 font-mono">
        <span className="text-primary">$</span> nmap <span className="text-primary">-sV</span> target
      </p>
    </div>
  );
};

const MalwareLifecycleDiagram = () => {
  const stages = [
    { icon: Mail, label: "Delivery", desc: "Phishing" },
    { icon: Download, label: "Install", desc: "Payload" },
    { icon: Bug, label: "Execute", desc: "Run code" },
    { icon: Lock, label: "Persist", desc: "Backdoor" },
    { icon: DollarSign, label: "Action", desc: "Ransom" },
  ];

  return (
    <div className="py-6">
      <div className="flex flex-wrap justify-center items-center gap-1 md:gap-0">
        {stages.map((stage, idx) => (
          <motion.div
            key={stage.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1, duration: 0.3 }}
            className="flex items-center group"
          >
            <div className="flex flex-col items-center gap-2 px-2 md:px-4">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-surface-elevated border border-difficulty-hard/30 flex items-center justify-center transition-all group-hover:border-difficulty-hard group-hover:shadow-glow-hard">
                <stage.icon className="w-5 h-5 md:w-6 md:h-6 text-difficulty-hard" />
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-foreground">{stage.label}</p>
                <p className="text-[10px] text-muted-foreground font-mono">{stage.desc}</p>
              </div>
            </div>
            {idx < stages.length - 1 && (
              <div className="hidden md:flex items-center text-difficulty-hard/40 mx-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
          </motion.div>
        ))}
      </div>
      <p className="text-center text-xs text-muted-foreground mt-6 font-mono">
        <span className="text-difficulty-hard">!</span> kill_chain <span className="text-primary">--stage</span> all
      </p>
    </div>
  );
};

/* ===================== PROGRESS BAR ===================== */

const ProgressBar = ({ current, total }: { current: number; total: number }) => {
  const percentage = ((current + 1) / total) * 100;

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-surface z-50">
      <motion.div
        className="h-full bg-gradient-to-r from-primary via-neon-cyan to-neon-green relative overflow-hidden"
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
      </motion.div>
    </div>
  );
};

/* ===================== NAVIGATION ===================== */

const difficultyColors = {
  easy: "bg-difficulty-easy/10 text-difficulty-easy border-difficulty-easy/30",
  medium: "bg-difficulty-medium/10 text-difficulty-medium border-difficulty-medium/30",
  hard: "bg-difficulty-hard/10 text-difficulty-hard border-difficulty-hard/30",
};

interface CourseNavigationProps {
  modules: typeof courseModules;
  activeModule: number;
  quizMode: boolean;
  onModuleSelect: (index: number) => void;
  onQuizSelect: () => void;
}

const CourseNavigation = ({ modules, activeModule, quizMode, onModuleSelect, onQuizSelect }: CourseNavigationProps) => {
  return (
    <aside className="lg:w-72 shrink-0">
      <div className="lg:sticky lg:top-8 space-y-6">
        <div className="flex items-center gap-3 px-1">
          <div className="w-10 h-10 bg-primary/10 border border-primary/30 rounded-xl flex items-center justify-center shadow-neon">
            <ShieldCheck className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-foreground neon-text">Cyber Academy</h3>
            <p className="text-xs text-muted-foreground font-mono">{modules.length} modules</p>
          </div>
        </div>

        <div className="px-3 py-2 bg-surface-elevated rounded-lg border border-border">
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <Terminal className="w-3.5 h-3.5 text-primary" />
            <span className="text-primary">$</span>
            <span className="terminal-cursor">cd /learning/modules</span>
          </div>
        </div>

        <nav className="space-y-1">
          {modules.map((m, idx) => (
            <button
              key={m.id}
              onClick={() => onModuleSelect(idx)}
              className={cn(
                "group flex items-center w-full py-3 px-4 text-sm text-left transition-all rounded-xl border",
                activeModule === idx && !quizMode
                  ? "bg-primary/10 border-primary/30 text-primary font-semibold shadow-neon"
                  : "bg-transparent border-transparent text-muted-foreground hover:text-foreground hover:bg-surface-elevated hover:border-border"
              )}
            >
              <span className={cn(
                "mr-3 text-xs font-mono px-2 py-0.5 rounded border transition-all",
                activeModule === idx && !quizMode 
                  ? "bg-primary/20 border-primary/40 text-primary" 
                  : "bg-surface border-border text-muted-foreground group-hover:border-primary/30"
              )}>
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span className="truncate flex-1">{m.shortTitle}</span>
              {m.difficulty && (
                <span className={cn("ml-2 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase border", difficultyColors[m.difficulty])}>
                  {m.difficulty[0]}
                </span>
              )}
            </button>
          ))}

          <button
            onClick={onQuizSelect}
            className={cn(
              "flex items-center w-full py-3 px-4 text-sm font-semibold rounded-xl border mt-4 transition-all",
              quizMode
                ? "bg-difficulty-medium/10 border-difficulty-medium/30 text-difficulty-medium shadow-glow-medium"
                : "bg-transparent border-transparent text-muted-foreground hover:text-difficulty-medium hover:bg-surface-elevated hover:border-difficulty-medium/30"
            )}
          >
            <Award className="w-4 h-4 mr-3" />
            Final Assessment
          </button>
        </nav>

        <div className="p-4 bg-surface-elevated rounded-xl border border-border glow-card">
          <p className="text-xs font-bold uppercase text-primary tracking-wider mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            System Status
          </p>
          <div className="space-y-2 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Progress</span>
              <span className="text-difficulty-easy">{Math.round(((activeModule + 1) / modules.length) * 100)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Modules</span>
              <span className="text-foreground">{activeModule + 1}/{modules.length}</span>
            </div>
            <div className="h-1.5 bg-surface rounded-full overflow-hidden mt-2">
              <div 
                className="h-full bg-gradient-to-r from-primary to-neon-green transition-all duration-500"
                style={{ width: `${((activeModule + 1) / modules.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

/* ===================== MODULE CONTENT ===================== */

const difficultyConfig = {
  easy: { label: "Easy", class: "difficulty-easy" },
  medium: { label: "Medium", class: "difficulty-medium" },
  hard: { label: "Hard", class: "difficulty-hard" },
};

interface ModuleContentProps {
  module: typeof courseModules[0];
  moduleIndex: number;
  totalModules: number;
  onPrevious: () => void;
  onNext: () => void;
  onStartQuiz: () => void;
}

const ModuleContent = ({ module, moduleIndex, totalModules, onPrevious, onNext, onStartQuiz }: ModuleContentProps) => {
  const difficulty = module.difficulty || "medium";
  const config = difficultyConfig[difficulty];

  return (
    <motion.article
      key={module.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <header className="mb-10 pb-8 border-b border-border">
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono mb-4">
          <span className="px-2 py-1 bg-primary/10 border border-primary/30 rounded text-primary">
            MODULE_{String(moduleIndex + 1).padStart(2, '0')}
          </span>
          <span className={cn("px-2 py-1 rounded border", config.class)}>
            {config.label.toUpperCase()}
          </span>
          <span className="flex items-center text-muted-foreground">
            <Clock className="w-3.5 h-3.5 mr-1" /> 15 min
          </span>
        </div>
        <h1 className="text-2xl md:text-4xl font-bold text-foreground leading-tight">{module.title}</h1>
      </header>

      <div className="space-y-12">
        {module.sections.map((sec, i) => (
          <section key={i}>
            <h2 className="text-xl md:text-2xl font-bold flex items-center gap-3 text-foreground mb-6">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-surface-elevated border border-border text-sm font-mono text-primary">
                {moduleIndex + 1}.{i + 1}
              </span>
              {sec.heading}
            </h2>

            <p className="text-muted-foreground leading-relaxed mb-8 text-base md:text-lg">{sec.content}</p>

            {sec.diagram && (
              <div className="my-10 bg-surface rounded-xl p-6 border border-dashed border-border relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent opacity-50 pointer-events-none" />
                {sec.diagram}
              </div>
            )}

            {sec.bullets && (
              <div className="grid grid-cols-1 gap-3 mb-8">
                {sec.bullets.map((bullet, k) => (
                  <div key={k} className="glow-card flex gap-4 p-4 md:p-5 bg-surface-elevated rounded-xl border border-border hover:border-primary/30 transition-all">
                    <div className="mt-0.5 bg-neon-green/10 border border-neon-green/30 p-1.5 rounded-lg shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-neon-green" />
                    </div>
                    <span className="text-foreground/90 text-sm md:text-[15px] leading-relaxed">{bullet}</span>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-16 pt-8 border-t border-border">
        <Button variant="outline" disabled={moduleIndex === 0} onClick={onPrevious} className="w-full sm:w-auto border-border hover:border-primary/50 hover:bg-surface-elevated">
          <ArrowLeft className="w-4 h-4 mr-2" /> Previous
        </Button>

        {moduleIndex + 1 < totalModules ? (
          <Button onClick={onNext} className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-neon">
            Next Module <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={onStartQuiz} className="w-full sm:w-auto bg-difficulty-medium hover:bg-difficulty-medium/90 text-background font-bold shadow-glow-medium">
            <Zap className="w-4 h-4 mr-2" /> Start Final Exam
          </Button>
        )}
      </div>
    </motion.article>
  );
};

/* ===================== QUIZ SECTION ===================== */

interface QuizSectionProps {
  questions: typeof quizQuestions;
  onComplete: () => void;
}

const QuizSection = ({ questions, onComplete }: QuizSectionProps) => {
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [score, setScore] = useState<number | null>(null);

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.answer) correct++;
    });
    setScore(correct);
  };

  const handleReset = () => {
    setScore(null);
    setUserAnswers({});
    onComplete();
  };

  const percentage = score !== null ? Math.round((score / questions.length) * 100) : 0;
  const passed = percentage >= 70;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-difficulty-medium/10 border border-difficulty-medium/30 rounded-lg text-difficulty-medium text-xs font-mono mb-4">
          <Terminal className="w-3.5 h-3.5" /> ASSESSMENT_MODE
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Knowledge Check</h2>
        <p className="text-muted-foreground font-mono text-sm">Answer all questions to unlock certification</p>
      </div>

      <div className="space-y-6">
        {questions.map((q, idx) => (
          <div key={idx} className="p-6 md:p-8 border border-border rounded-2xl bg-surface glow-card">
            <p className="font-bold text-lg md:text-xl mb-6 flex gap-3 text-foreground">
              <span className="text-primary font-mono">[Q{String(idx + 1).padStart(2, '0')}]</span>
              {q.question}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {q.options.map((opt, oIdx) => {
                const isSelected = userAnswers[idx] === oIdx;
                const showResult = score !== null;
                const isCorrect = q.answer === oIdx;
                
                return (
                  <label
                    key={oIdx}
                    className={cn(
                      "flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all",
                      showResult && isCorrect && "border-neon-green/50 bg-neon-green/10",
                      showResult && isSelected && !isCorrect && "border-difficulty-hard/50 bg-difficulty-hard/10",
                      !showResult && isSelected && "border-primary/50 bg-primary/10",
                      !showResult && !isSelected && "border-border bg-surface-elevated hover:border-primary/30"
                    )}
                  >
                    <input type="radio" name={`q-${idx}`} className="hidden" disabled={score !== null} onChange={() => setUserAnswers({ ...userAnswers, [idx]: oIdx })} />
                    <div className={cn(
                      "w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center shrink-0",
                      showResult && isCorrect && "border-neon-green",
                      showResult && isSelected && !isCorrect && "border-difficulty-hard",
                      !showResult && isSelected && "border-primary",
                      !showResult && !isSelected && "border-muted-foreground/40"
                    )}>
                      {showResult && isCorrect && <CheckCircle2 className="w-4 h-4 text-neon-green" />}
                      {showResult && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-difficulty-hard" />}
                      {!showResult && isSelected && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
                    </div>
                    <span className="text-foreground font-medium text-sm md:text-base">{opt}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}

        {score === null ? (
          <Button onClick={handleSubmit} disabled={Object.keys(userAnswers).length < questions.length} className="w-full py-6 text-base font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-neon" size="lg">
            <Terminal className="w-4 h-4 mr-2" /> Execute Verification
          </Button>
        ) : (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={cn("text-center p-8 md:p-12 rounded-2xl border-2", passed ? "bg-neon-green/10 border-neon-green/30 shadow-glow-easy" : "bg-difficulty-hard/10 border-difficulty-hard/30 shadow-glow-hard")}
          >
            <Award className={cn("w-16 h-16 mx-auto mb-4", passed ? "text-neon-green" : "text-difficulty-hard")} />
            <h3 className={cn("text-4xl font-black mb-2 font-mono", passed ? "text-neon-green" : "text-difficulty-hard")}>{percentage}%</h3>
            <p className="text-muted-foreground mb-8 font-mono text-sm">{passed ? "ACCESS_GRANTED: Certification complete" : "ACCESS_DENIED: Score below threshold"}</p>
            <Button onClick={handleReset} variant="outline" className="px-8 py-3 font-bold border-border hover:border-primary/50">Return to Course</Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

/* ===================== DATA ===================== */
const cybersecurityCourseContent = {
  title: "Introduction to Cybersecurity",
  subtitle: "A Comprehensive 12-Module Course",

  overview:
    "This comprehensive course provides a thorough introduction to cybersecurity fundamentals, covering essential concepts, practices, and tools needed to understand and implement effective security measures. Designed for beginners and intermediate learners, this course combines theoretical knowledge with practical applications.",

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
      id: "m1",
      shortTitle: "Intro to Cybersecurity",
      title: "Module 1: Introduction to Cybersecurity",
      difficulty: "easy",
      sections: [
        {
          heading: "What is Cybersecurity?",
          content:
            "Cybersecurity is the practice of protecting systems, networks, programs, and data from digital attacks, unauthorized access, and damage.",
          diagram: <CIATriadDiagram />,
        },
        {
          heading: "Key Concepts",
          bullets: [
            "Confidentiality: Authorized access only",
            "Integrity: Accuracy and completeness of data",
            "Availability: Access when required",
          ],
        },
        {
          heading: "Cybersecurity Domains",
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
      id: "m2",
      shortTitle: "Threats & Attacks",
      title: "Module 2: Cyber Threats and Attack Vectors",
      difficulty: "medium",
      sections: [
        {
          heading: "Malware",
          content:
            "Malware is malicious software designed to damage, disrupt, or gain unauthorized access.",
          diagram: <MalwareLifecycleDiagram />,
          bullets: [
            "Viruses",
            "Trojans",
            "Ransomware",
            "Spyware",
            "Worms",
          ],
        },
        {
          heading: "Social Engineering",
          bullets: [
            "Phishing",
            "Pretexting",
            "Baiting",
            "Tailgating",
          ],
        },
      ],
    },

    {
      id: "m3",
      shortTitle: "Network Security",
      title: "Module 3: Network Security Fundamentals",
      difficulty: "medium",
      sections: [
        {
          heading: "OSI Model",
          diagram: <OSIModelDiagram />,
          bullets: [
            "Layer 7 – Application",
            "Layer 6 – Presentation",
            "Layer 5 – Session",
            "Layer 4 – Transport",
            "Layer 3 – Network",
            "Layer 2 – Data Link",
            "Layer 1 – Physical",
          ],
        },
        {
          heading: "Firewalls and IDS/IPS",
          content:
            "Firewalls filter traffic, IDS detects threats, IPS blocks malicious activity.",
        },
      ],
    },

    {
      id: "m4",
      shortTitle: "Cryptography",
      title: "Module 4: Cryptography and Data Protection",
      difficulty: "medium",
      sections: [
        {
          heading: "Encryption",
          bullets: [
            "Symmetric: AES, DES",
            "Asymmetric: RSA, ECC",
          ],
        },
        {
          heading: "Hashing & PKI",
          bullets: [
            "SHA-256, SHA-3",
            "Digital Signatures",
            "Public Key Infrastructure",
          ],
        },
      ],
    },

    {
      id: "m5",
      shortTitle: "IAM",
      title: "Module 5: Identity and Access Management",
      difficulty: "medium",
      sections: [
        {
          heading: "Authentication Factors",
          bullets: [
            "Something you know",
            "Something you have",
            "Something you are",
          ],
        },
        {
          heading: "Access Control Models",
          bullets: ["RBAC", "ABAC", "MAC", "DAC"],
        },
      ],
    },

    {
      id: "m6",
      shortTitle: "Application Security",
      title: "Module 6: Application Security",
      difficulty: "hard",
      sections: [
        {
          heading: "OWASP Top 10",
          bullets: [
            "Injection",
            "Broken Authentication",
            "XSS",
            "Security Misconfiguration",
          ],
        },
        {
          heading: "Secure SDLC",
          bullets: [
            "Requirements",
            "Design",
            "Implementation",
            "Testing",
            "Deployment",
            "Maintenance",
          ],
        },
      ],
    },

    {
      id: "m7",
      shortTitle: "SOC & Monitoring",
      title: "Module 7: Security Operations and Monitoring",
      difficulty: "hard",
      sections: [
        {
          heading: "SIEM",
          bullets: [
            "Log collection",
            "Correlation",
            "Alerting",
          ],
        },
        {
          heading: "Vulnerability Management",
          bullets: [
            "Asset discovery",
            "Risk prioritization",
            "Remediation",
          ],
        },
      ],
    },

    {
      id: "m8",
      shortTitle: "Incident Response",
      title: "Module 8: Incident Response and Recovery",
      difficulty: "hard",
      sections: [
        {
          heading: "Incident Lifecycle",
          bullets: [
            "Preparation",
            "Detection",
            "Containment",
            "Eradication",
            "Recovery",
            "Lessons Learned",
          ],
        },
      ],
    },

    {
      id: "m9",
      shortTitle: "Cloud Security",
      title: "Module 9: Cloud Security",
      difficulty: "medium",
      sections: [
        {
          heading: "Cloud Models",
          bullets: ["IaaS", "PaaS", "SaaS"],
        },
        {
          heading: "Shared Responsibility Model",
          content:
            "Cloud security is shared between provider and customer.",
        },
      ],
    },

    {
      id: "m10",
      shortTitle: "Mobile & IoT",
      title: "Module 10: Mobile and IoT Security",
      difficulty: "medium",
      sections: [
        {
          heading: "Mobile Security",
          bullets: [
            "Encryption",
            "MDM",
            "Secure updates",
          ],
        },
        {
          heading: "IoT Challenges",
          bullets: [
            "Weak credentials",
            "Limited updates",
            "Physical risks",
          ],
        },
      ],
    },

    {
      id: "m11",
      shortTitle: "Compliance",
      title: "Module 11: Compliance and Governance",
      difficulty: "easy",
      sections: [
        {
          heading: "Frameworks",
          bullets: [
            "NIST",
            "ISO 27001",
            "CIS Controls",
            "COBIT",
          ],
        },
        {
          heading: "Regulations",
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
      id: "m12",
      shortTitle: "Future Trends",
      title: "Module 12: Emerging Technologies & Future Trends",
      difficulty: "easy",
      sections: [
        {
          heading: "Key Takeaways",
          bullets: [
            "Defense in depth",
            "Security is everyone’s responsibility",
            "Continuous monitoring",
          ],
        },
        {
          heading: "Next Steps",
          bullets: [
            "Hands-on practice",
            "Security certifications",
            "Community involvement",
            "Ethical hacking",
          ],
        },
      ],
    },
  ],
};

const courseModules = cybersecurityCourseContent.modules;

const quizQuestions = [
  { question: "Which component of the CIA Triad is compromised if a hacker modifies your bank balance?", options: ["Confidentiality", "Integrity", "Availability", "Authentication"], answer: 1 },
  { question: "Which OSI layer is primarily responsible for end-to-end encryption using TLS?", options: ["Layer 1 (Physical)", "Layer 3 (Network)", "Layer 4 (Transport)", "Layer 7 (Application)"], answer: 2 },
  { question: "What type of malware disguises itself as legitimate software?", options: ["Ransomware", "Worm", "Trojan", "Adware"], answer: 2 },
];

/* ===================== MAIN PAGE ===================== */

const IntroductionToCybersecurity = () => {
  const [activeModule, setActiveModule] = useState(0);
  const [quizMode, setQuizMode] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeModule, quizMode]);

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 bg-[linear-gradient(hsl(var(--border))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border))_1px,transparent_1px)] bg-[size:60px_60px] opacity-30 pointer-events-none" />
      
      <ProgressBar current={activeModule} total={courseModules.length} />

      <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12 max-w-7xl relative">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <CourseNavigation
            modules={courseModules}
            activeModule={activeModule}
            quizMode={quizMode}
            onModuleSelect={(idx) => { setActiveModule(idx); setQuizMode(false); }}
            onQuizSelect={() => setQuizMode(true)}
          />

          <main className="flex-1 min-w-0">
            <div className="bg-card rounded-2xl border border-border p-6 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary/30 rounded-tl-2xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary/30 rounded-br-2xl pointer-events-none" />
              
              {!quizMode ? (
                <ModuleContent
                  module={courseModules[activeModule]}
                  moduleIndex={activeModule}
                  totalModules={courseModules.length}
                  onPrevious={() => setActiveModule((prev) => prev - 1)}
                  onNext={() => setActiveModule((prev) => prev + 1)}
                  onStartQuiz={() => setQuizMode(true)}
                />
              ) : (
                <QuizSection questions={quizQuestions} onComplete={() => { setQuizMode(false); setActiveModule(0); }} />
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default IntroductionToCybersecurity;
