import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Clock, CheckCircle2, Circle,
  Play, FileText, BookOpen, FlaskConical, Sparkles,
  Heart, MessageCircle, Share2, Bookmark, Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { moduleDatabase } from "@/data/moduleContent";
import { modules } from "@/data/modules";
import { VideoPlayer } from "@/components/learning/VideoPlayer";
import { QuizSection } from "@/components/learning/QuizSection";
import { useProgress } from "@/hooks/useProgress";
import { Progress } from "@/components/ui/progress";

// Tab types
type TabType = "watch" | "read" | "mcq" | "lab" | "flex";

// Key Areas of Focus (static data)
const keyAreas = [
  {
    term: "Network Security:",
    description:
      "Protecting the integrity and usability of networks and data through firewalls, intrusion detection systems, and access controls.",
  },
  {
    term: "Application Security:",
    description:
      "Ensuring software and devices are free from threats through secure coding practices.",
  },
  {
    term: "Information Security:",
    description:
      "Protecting the integrity and privacy of data during storage and transmission.",
  },
  {
    term: "Operational Security:",
    description:
      "Processes for handling and protecting data assets and user permissions.",
  },
];

const parseTopics = (topics: string): string[] =>
  topics.split(",").map(t => t.trim());

export default function ModuleLearningPage() {
  const { moduleId } = useParams();

  const [activeTab, setActiveTab] = useState<TabType>("watch");
  const { 
    progress, 
    loading, 
    userId,
    markLessonComplete, 
    updateVideoProgress, 
    getVideoProgress, 
    isLessonCompleted,
    getCompletedCount 
  } = useProgress(moduleId);

  const resetLessonState = () => {
    setActiveTab("watch");
  };

  const moduleMeta = modules.find(m => m.id === moduleId);
  const topics = moduleMeta ? parseTopics(moduleMeta.topics) : [];
  
  // Get module data or default to module meta
  const module =
    moduleDatabase[moduleId!] ??
    (moduleMeta
      ? {
          title: moduleMeta.title,
          sections: Array.from({ length: moduleMeta.sections }).map((_, i) => ({
            id: i + 1,
            completed: false,
            duration: "15 min",
            description: "Content coming soon",
            content: {
              readContent: [],
              mcqQuestions: [],
              flexCards: []
            },
          })),
        } 
      : null
    );
  
  // Find current section index (first incomplete based on user progress)
  const getInitialSection = () => {
    if (!module) return 0;
    for (let i = 0; i < module.sections.length; i++) {
      if (!isLessonCompleted(i)) {
        return i;
      }
    }
    return 0;
  };

  const [activeSection, setActiveSection] = useState(0);

  // Update active section once progress loads
  useEffect(() => {
    if (!loading && module) {
      const initial = getInitialSection();
      setActiveSection(initial);
    }
  }, [loading, progress]);

  // Handle case where module is not found
  if (!module) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Module Not Found</h1>
          <p className="text-muted-foreground mb-6">The module "{moduleId}" could not be found.</p>
          <Link to="/modules">
            <Button>Back to Modules</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (topics.length !== module.sections.length) {
    console.warn(
      `Topic count (${topics.length}) does not match section count (${module.sections.length}) for ${moduleId}`
    );
  }
  
  const currentSection = {
    ...module.sections[activeSection],
    title: topics[activeSection] ?? `Lesson ${activeSection + 1}`,
  };

  const totalSections = module.sections.length;
  const completedCount = getCompletedCount();
  const overallProgress = (completedCount / totalSections) * 100;

  const handleNextSection = async () => {
    // Mark current lesson as complete
    await markLessonComplete(activeSection);
    
    if (activeSection < totalSections - 1) {
      setActiveSection(activeSection + 1);
      resetLessonState();
    }
  };

  const handlePrevSection = () => {
    if (activeSection > 0) {
      setActiveSection(activeSection - 1);
      resetLessonState();
    }
  };

  const handleVideoProgress = (seconds: number) => {
    updateVideoProgress(activeSection, Math.floor(seconds));
  };

  const handleVideoComplete = async () => {
    await markLessonComplete(activeSection);
  };

  const handleQuizComplete = async () => {
    await markLessonComplete(activeSection);
  };

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: "watch", label: "Watch", icon: <Play className="w-4 h-4" /> },
    { id: "read", label: "Read", icon: <FileText className="w-4 h-4" /> },
    { id: "mcq", label: "MCQ", icon: <BookOpen className="w-4 h-4" /> },
    { id: "lab", label: "Lab", icon: <FlaskConical className="w-4 h-4" /> },
    { id: "flex", label: "Flex", icon: <Sparkles className="w-4 h-4" /> },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

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
          <h2 className="font-semibold text-foreground text-lg mb-3">Lessons</h2>
          
          {/* Overall Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{completedCount} of {totalSections} completed</span>
              <span>{Math.round(overallProgress)}%</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          {module.sections.map((section, idx) => {
            const lessonCompleted = isLessonCompleted(idx);
            return (
              <button
                key={section.id}
                onClick={() => {
                  setActiveSection(idx);
                  resetLessonState();
                }}
                className={cn(
                  "w-full flex items-start gap-3 px-4 py-4 rounded-lg text-left transition-all mb-2",
                  activeSection === idx
                    ? "bg-primary/10 border-l-4 border-primary"
                    : "hover:bg-muted/50"
                )}
              >
                <div className="mt-0.5">
                  {lessonCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
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
                    {topics[idx] ?? `Lesson ${idx + 1}`}
                  </span>
                  <span className={cn(
                    "text-xs mt-1 block",
                    activeSection === idx ? "text-primary/70" : "text-muted-foreground"
                  )}>
                    {section.duration}
                  </span>
                </div>
              </button>
            );
          })}
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
              {isLessonCompleted(activeSection) && (
                <span className="flex items-center gap-1 text-green-500">
                  <CheckCircle2 className="w-4 h-4" />
                  Completed
                </span>
              )}
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
              <VideoPlayer
                videoUrl={undefined} // Will show placeholder - add video URLs to moduleContent.ts
                duration={currentSection.duration}
                onProgress={handleVideoProgress}
                onComplete={handleVideoComplete}
                initialProgress={getVideoProgress(activeSection)}
                title={currentSection.title}
              />
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
                {activeSection === 0 && moduleId === "introduction-to-cybersecurity" && (
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

                {/* Mark as complete button for read tab */}
                {currentSection.content.readContent.length > 0 && !isLessonCompleted(activeSection) && (
                  <div className="mt-8 pt-6 border-t border-border">
                    <Button onClick={() => markLessonComplete(activeSection)}>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Mark as Complete
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* MCQ Tab */}
            {activeTab === "mcq" && moduleId && (
              <QuizSection
                questions={currentSection.content.mcqQuestions}
                moduleId={moduleId}
                lessonIndex={activeSection}
                onComplete={handleQuizComplete}
              />
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
                          <div className="relative p-4">
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
            
            <div className="flex items-center gap-4">
              {!isLessonCompleted(activeSection) && (
                <Button
                  variant="outline"
                  onClick={() => markLessonComplete(activeSection)}
                  className="px-6"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Mark Complete
                </Button>
              )}
              <Button
                onClick={handleNextSection}
                disabled={activeSection === totalSections - 1}
                className="px-6 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Next Lesson
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
