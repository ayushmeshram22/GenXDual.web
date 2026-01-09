-- User progress tracking for lessons and modules
CREATE TABLE public.user_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  module_id TEXT NOT NULL,
  lesson_index INTEGER NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  video_progress_seconds INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, module_id, lesson_index)
);

-- Quiz attempts and scores
CREATE TABLE public.quiz_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  module_id TEXT NOT NULL,
  lesson_index INTEGER NOT NULL,
  score INTEGER NOT NULL DEFAULT 0,
  total_questions INTEGER NOT NULL DEFAULT 0,
  answers JSONB DEFAULT '[]'::jsonb,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- User notifications
CREATE TABLE public.user_notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT false,
  data JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- User engagement stats for leaderboard
CREATE TABLE public.user_engagement (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  total_points INTEGER NOT NULL DEFAULT 0,
  modules_completed INTEGER NOT NULL DEFAULT 0,
  lessons_completed INTEGER NOT NULL DEFAULT 0,
  quizzes_passed INTEGER NOT NULL DEFAULT 0,
  average_quiz_score DECIMAL(5,2) DEFAULT 0,
  streak_days INTEGER DEFAULT 0,
  last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_engagement ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_progress
CREATE POLICY "Users can view their own progress" ON public.user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own progress" ON public.user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own progress" ON public.user_progress FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for quiz_attempts
CREATE POLICY "Users can view their own quiz attempts" ON public.quiz_attempts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own quiz attempts" ON public.quiz_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for user_notifications
CREATE POLICY "Users can view their own notifications" ON public.user_notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own notifications" ON public.user_notifications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "System can insert notifications" ON public.user_notifications FOR INSERT WITH CHECK (true);

-- RLS Policies for user_engagement (public read for leaderboard)
CREATE POLICY "Anyone can view engagement stats" ON public.user_engagement FOR SELECT USING (true);
CREATE POLICY "Users can insert their own engagement" ON public.user_engagement FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own engagement" ON public.user_engagement FOR UPDATE USING (auth.uid() = user_id);

-- Enable realtime for notifications
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_notifications;

-- Triggers for updated_at
CREATE TRIGGER update_user_progress_updated_at BEFORE UPDATE ON public.user_progress FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_user_engagement_updated_at BEFORE UPDATE ON public.user_engagement FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to update engagement stats when progress is made
CREATE OR REPLACE FUNCTION public.update_engagement_on_progress()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  total_lessons INTEGER;
  completed_lessons INTEGER;
  total_modules INTEGER;
  completed_modules INTEGER;
BEGIN
  -- Count completed lessons
  SELECT COUNT(*) INTO completed_lessons FROM user_progress WHERE user_id = NEW.user_id AND completed = true;
  
  -- Count distinct completed modules (all lessons in module completed)
  SELECT COUNT(DISTINCT module_id) INTO completed_modules 
  FROM user_progress 
  WHERE user_id = NEW.user_id AND completed = true;
  
  -- Upsert engagement stats
  INSERT INTO user_engagement (user_id, lessons_completed, modules_completed, total_points, last_activity_at)
  VALUES (NEW.user_id, completed_lessons, completed_modules, completed_lessons * 10, now())
  ON CONFLICT (user_id) DO UPDATE SET
    lessons_completed = EXCLUDED.lessons_completed,
    modules_completed = EXCLUDED.modules_completed,
    total_points = EXCLUDED.total_points + 10,
    last_activity_at = now();
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_progress_update
  AFTER INSERT OR UPDATE ON public.user_progress
  FOR EACH ROW
  WHEN (NEW.completed = true)
  EXECUTE FUNCTION public.update_engagement_on_progress();

-- Function to update engagement on quiz completion
CREATE OR REPLACE FUNCTION public.update_engagement_on_quiz()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  avg_score DECIMAL(5,2);
  quiz_count INTEGER;
BEGIN
  -- Calculate average quiz score
  SELECT AVG((score::decimal / NULLIF(total_questions, 0)) * 100), COUNT(*) 
  INTO avg_score, quiz_count
  FROM quiz_attempts 
  WHERE user_id = NEW.user_id;
  
  -- Update engagement stats
  INSERT INTO user_engagement (user_id, quizzes_passed, average_quiz_score, total_points, last_activity_at)
  VALUES (NEW.user_id, quiz_count, COALESCE(avg_score, 0), 50, now())
  ON CONFLICT (user_id) DO UPDATE SET
    quizzes_passed = EXCLUDED.quizzes_passed,
    average_quiz_score = COALESCE(avg_score, 0),
    total_points = user_engagement.total_points + 50,
    last_activity_at = now();
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_quiz_complete
  AFTER INSERT ON public.quiz_attempts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_engagement_on_quiz();