import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface QuizAnswer {
  questionIndex: number;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

interface QuizAttempt {
  id: string;
  module_id: string;
  lesson_index: number;
  score: number;
  total_questions: number;
  answers: QuizAnswer[];
  completed_at: string;
}

export function useQuiz(moduleId: string | undefined, lessonIndex: number) {
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [previousAttempts, setPreviousAttempts] = useState<QuizAttempt[]>([]);
  const { toast } = useToast();

  const recordAnswer = (questionIndex: number, selectedAnswer: string, correctAnswer: string) => {
    const isCorrect = selectedAnswer === correctAnswer;
    
    setAnswers(prev => {
      const existing = prev.find(a => a.questionIndex === questionIndex);
      if (existing) {
        return prev.map(a => a.questionIndex === questionIndex 
          ? { ...a, selectedAnswer, isCorrect } 
          : a
        );
      }
      return [...prev, { questionIndex, selectedAnswer, correctAnswer, isCorrect }];
    });

    return isCorrect;
  };

  const submitQuiz = async (totalQuestions: number): Promise<boolean> => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user || !moduleId) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save your quiz results",
        variant: "destructive"
      });
      return false;
    }

    const correctCount = answers.filter(a => a.isCorrect).length;
    const finalScore = correctCount;

    const { error } = await supabase
      .from('quiz_attempts')
      .insert([{
        user_id: user.id,
        module_id: moduleId,
        lesson_index: lessonIndex,
        score: finalScore,
        total_questions: totalQuestions,
        answers: JSON.parse(JSON.stringify(answers))
      }]);

    if (error) {
      console.error('Error saving quiz:', error);
      toast({
        title: "Error",
        description: "Failed to save quiz results",
        variant: "destructive"
      });
      return false;
    }

    setScore(finalScore);
    setSubmitted(true);

    const percentage = Math.round((finalScore / totalQuestions) * 100);
    toast({
      title: percentage >= 70 ? "Quiz Passed! 🎉" : "Quiz Complete",
      description: `You scored ${finalScore}/${totalQuestions} (${percentage}%)`,
      variant: percentage >= 70 ? "default" : "destructive"
    });

    return true;
  };

  const resetQuiz = () => {
    setAnswers([]);
    setSubmitted(false);
    setScore(0);
  };

  const fetchPreviousAttempts = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !moduleId) return;

    const { data, error } = await supabase
      .from('quiz_attempts')
      .select('*')
      .eq('user_id', user.id)
      .eq('module_id', moduleId)
      .eq('lesson_index', lessonIndex)
      .order('completed_at', { ascending: false });

    if (!error && data) {
      setPreviousAttempts(data.map(d => ({
        ...d,
        answers: (d.answers as unknown as QuizAnswer[]) || []
      })));
    }
  };

  return {
    answers,
    submitted,
    score,
    previousAttempts,
    recordAnswer,
    submitQuiz,
    resetQuiz,
    fetchPreviousAttempts
  };
}
