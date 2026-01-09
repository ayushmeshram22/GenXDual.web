import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ProgressItem {
  module_id: string;
  lesson_index: number;
  completed: boolean;
  completed_at: string | null;
  video_progress_seconds: number;
}

export function useProgress(moduleId: string | undefined) {
  const [progress, setProgress] = useState<ProgressItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id || null);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (!moduleId || !userId) {
      setLoading(false);
      return;
    }

    const fetchProgress = async () => {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('module_id', moduleId);

      if (error) {
        console.error('Error fetching progress:', error);
      } else {
        setProgress(data || []);
      }
      setLoading(false);
    };

    fetchProgress();
  }, [moduleId, userId]);

  const markLessonComplete = async (lessonIndex: number) => {
    if (!moduleId || !userId) {
      toast({
        title: "Sign in required",
        description: "Please sign in to track your progress",
        variant: "destructive"
      });
      return false;
    }

    const { error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: userId,
        module_id: moduleId,
        lesson_index: lessonIndex,
        completed: true,
        completed_at: new Date().toISOString()
      }, {
        onConflict: 'user_id,module_id,lesson_index'
      });

    if (error) {
      console.error('Error saving progress:', error);
      toast({
        title: "Error",
        description: "Failed to save progress",
        variant: "destructive"
      });
      return false;
    }

    setProgress(prev => {
      const existing = prev.find(p => p.lesson_index === lessonIndex);
      if (existing) {
        return prev.map(p => p.lesson_index === lessonIndex ? { ...p, completed: true, completed_at: new Date().toISOString() } : p);
      }
      return [...prev, { module_id: moduleId, lesson_index: lessonIndex, completed: true, completed_at: new Date().toISOString(), video_progress_seconds: 0 }];
    });

    toast({
      title: "Lesson completed!",
      description: "Your progress has been saved",
    });

    return true;
  };

  const updateVideoProgress = async (lessonIndex: number, seconds: number) => {
    if (!moduleId || !userId) return;

    await supabase
      .from('user_progress')
      .upsert({
        user_id: userId,
        module_id: moduleId,
        lesson_index: lessonIndex,
        video_progress_seconds: seconds,
        completed: false
      }, {
        onConflict: 'user_id,module_id,lesson_index'
      });
  };

  const getVideoProgress = (lessonIndex: number): number => {
    const item = progress.find(p => p.lesson_index === lessonIndex);
    return item?.video_progress_seconds || 0;
  };

  const isLessonCompleted = (lessonIndex: number): boolean => {
    const item = progress.find(p => p.lesson_index === lessonIndex);
    return item?.completed || false;
  };

  const getCompletedCount = (): number => {
    return progress.filter(p => p.completed).length;
  };

  return {
    progress,
    loading,
    userId,
    markLessonComplete,
    updateVideoProgress,
    getVideoProgress,
    isLessonCompleted,
    getCompletedCount
  };
}
