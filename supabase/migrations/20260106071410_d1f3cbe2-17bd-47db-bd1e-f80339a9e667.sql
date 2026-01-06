-- Create flex_reels table
CREATE TABLE public.flex_reels (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  video_url TEXT NOT NULL,
  caption TEXT,
  thumbnail_url TEXT,
  likes_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create flex_likes table
CREATE TABLE public.flex_likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  reel_id UUID NOT NULL REFERENCES public.flex_reels(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(reel_id, user_id)
);

-- Create flex_comments table
CREATE TABLE public.flex_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  reel_id UUID NOT NULL REFERENCES public.flex_reels(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.flex_reels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flex_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flex_comments ENABLE ROW LEVEL SECURITY;

-- flex_reels policies
CREATE POLICY "Anyone can view reels"
ON public.flex_reels FOR SELECT USING (true);

CREATE POLICY "Users can create their own reels"
ON public.flex_reels FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reels"
ON public.flex_reels FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reels"
ON public.flex_reels FOR DELETE USING (auth.uid() = user_id);

-- flex_likes policies
CREATE POLICY "Anyone can view likes"
ON public.flex_likes FOR SELECT USING (true);

CREATE POLICY "Authenticated users can like"
ON public.flex_likes FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unlike their own likes"
ON public.flex_likes FOR DELETE USING (auth.uid() = user_id);

-- flex_comments policies
CREATE POLICY "Anyone can view comments"
ON public.flex_comments FOR SELECT USING (true);

CREATE POLICY "Authenticated users can comment"
ON public.flex_comments FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments"
ON public.flex_comments FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments"
ON public.flex_comments FOR DELETE USING (auth.uid() = user_id);

-- Triggers for updated_at
CREATE TRIGGER update_flex_reels_updated_at
BEFORE UPDATE ON public.flex_reels
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_flex_comments_updated_at
BEFORE UPDATE ON public.flex_comments
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to update likes count
CREATE OR REPLACE FUNCTION public.update_reel_likes_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.flex_reels SET likes_count = likes_count + 1 WHERE id = NEW.reel_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.flex_reels SET likes_count = likes_count - 1 WHERE id = OLD.reel_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;

-- Trigger for likes count
CREATE TRIGGER update_likes_count_trigger
AFTER INSERT OR DELETE ON public.flex_likes
FOR EACH ROW EXECUTE FUNCTION public.update_reel_likes_count();