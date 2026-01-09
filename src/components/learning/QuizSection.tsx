import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, CheckCircle2, XCircle, Trophy, RotateCcw, ChevronRight, ChevronLeft, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useQuiz } from '@/hooks/useQuiz';
import { Progress } from '@/components/ui/progress';

interface MCQQuestion {
  question: string;
  options: { label: string; text: string }[];
  correctAnswer: string;
  explanation?: string;
}

interface QuizSectionProps {
  questions: MCQQuestion[];
  moduleId: string;
  lessonIndex: number;
  onComplete?: () => void;
}

export function QuizSection({ questions, moduleId, lessonIndex, onComplete }: QuizSectionProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  
  const { answers, submitted, score, recordAnswer, submitQuiz, resetQuiz, fetchPreviousAttempts, previousAttempts } = useQuiz(moduleId, lessonIndex);

  useEffect(() => {
    fetchPreviousAttempts();
  }, []);

  const currentQuestion = questions[currentQuestionIndex];
  const isAnswered = answeredQuestions.has(currentQuestionIndex);
  const currentAnswer = answers.find(a => a.questionIndex === currentQuestionIndex);
  const progress = (answeredQuestions.size / questions.length) * 100;

  const handleSelectAnswer = (label: string) => {
    if (isAnswered || submitted) return;
    
    setSelectedAnswer(label);
    const isCorrect = recordAnswer(currentQuestionIndex, label, currentQuestion.correctAnswer);
    setAnsweredQuestions(prev => new Set([...prev, currentQuestionIndex]));
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      const prevAnswer = answers.find(a => a.questionIndex === currentQuestionIndex - 1);
      setSelectedAnswer(prevAnswer?.selectedAnswer || null);
      setShowExplanation(answeredQuestions.has(currentQuestionIndex - 1));
    }
  };

  const handleSubmitQuiz = async () => {
    const success = await submitQuiz(questions.length);
    if (success) {
      onComplete?.();
    }
  };

  const handleRetry = () => {
    resetQuiz();
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setAnsweredQuestions(new Set());
  };

  if (questions.length === 0) {
    return (
      <div className="text-center py-16">
        <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">Quiz questions coming soon</p>
      </div>
    );
  }

  // Results screen
  if (submitted) {
    const percentage = Math.round((score / questions.length) * 100);
    const passed = percentage >= 70;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card border border-border rounded-xl p-8 text-center"
      >
        <div className={cn(
          "w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center",
          passed ? "bg-green-500/20" : "bg-orange-500/20"
        )}>
          {passed ? (
            <Trophy className="w-12 h-12 text-green-500" />
          ) : (
            <BookOpen className="w-12 h-12 text-orange-500" />
          )}
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-2">
          {passed ? "Congratulations! 🎉" : "Keep Learning!"}
        </h2>
        <p className="text-muted-foreground mb-6">
          You scored {score} out of {questions.length} ({percentage}%)
        </p>

        <div className="w-full max-w-xs mx-auto mb-8">
          <Progress value={percentage} className="h-3" />
          <p className="text-sm text-muted-foreground mt-2">
            {passed ? "You passed! Great job!" : "You need 70% to pass. Try again!"}
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <Button variant="outline" onClick={handleRetry}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Retry Quiz
          </Button>
          {passed && (
            <Button onClick={onComplete}>
              Continue
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>

        {/* Previous attempts */}
        {previousAttempts.length > 1 && (
          <div className="mt-8 pt-6 border-t border-border">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Previous Attempts</h3>
            <div className="flex gap-2 justify-center flex-wrap">
              {previousAttempts.slice(0, 5).map((attempt, idx) => (
                <div
                  key={attempt.id}
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium",
                    (attempt.score / attempt.total_questions) >= 0.7
                      ? "bg-green-500/20 text-green-500"
                      : "bg-orange-500/20 text-orange-500"
                  )}
                >
                  {Math.round((attempt.score / attempt.total_questions) * 100)}%
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
        <span>{answeredQuestions.size} answered</span>
      </div>
      <Progress value={progress} className="h-2" />

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h3 className="text-lg font-medium text-foreground mb-6">
            {currentQuestion.question}
          </h3>

          <div className="space-y-3">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedAnswer === option.label || currentAnswer?.selectedAnswer === option.label;
              const isCorrect = option.label === currentQuestion.correctAnswer;
              const showResult = isAnswered || submitted;

              return (
                <button
                  key={option.label}
                  onClick={() => handleSelectAnswer(option.label)}
                  disabled={isAnswered || submitted}
                  className={cn(
                    "w-full text-left p-4 rounded-lg border transition-all flex items-center gap-3",
                    !showResult && "hover:bg-muted/50 hover:border-primary/50",
                    !showResult && isSelected && "bg-primary/10 border-primary",
                    showResult && isCorrect && "bg-green-500/10 border-green-500",
                    showResult && isSelected && !isCorrect && "bg-red-500/10 border-red-500",
                    showResult && !isSelected && !isCorrect && "opacity-50",
                    (isAnswered || submitted) && "cursor-default"
                  )}
                >
                  <span className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border",
                    showResult && isCorrect && "bg-green-500 border-green-500 text-white",
                    showResult && isSelected && !isCorrect && "bg-red-500 border-red-500 text-white",
                    !showResult && isSelected && "bg-primary border-primary text-primary-foreground",
                    !showResult && !isSelected && "bg-muted border-border"
                  )}>
                    {showResult && isCorrect ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : showResult && isSelected && !isCorrect ? (
                      <XCircle className="w-5 h-5" />
                    ) : (
                      option.label
                    )}
                  </span>
                  <span className={cn(
                    "flex-1",
                    showResult && isCorrect && "text-green-500 font-medium",
                    showResult && isSelected && !isCorrect && "text-red-500"
                  )}>
                    {option.text}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {showExplanation && currentQuestion.explanation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg"
              >
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-primary mb-1">Explanation</p>
                    <p className="text-sm text-muted-foreground">{currentQuestion.explanation}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        {currentQuestionIndex === questions.length - 1 ? (
          <Button
            onClick={handleSubmitQuiz}
            disabled={answeredQuestions.size < questions.length}
          >
            Submit Quiz
            <CheckCircle2 className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            disabled={!isAnswered}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}
