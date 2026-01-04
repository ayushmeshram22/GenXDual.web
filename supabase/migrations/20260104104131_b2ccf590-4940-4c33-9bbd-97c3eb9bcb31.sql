-- Add tags column to blogs table
ALTER TABLE public.blogs ADD COLUMN tags text[] DEFAULT '{}';

-- Add read_time column for estimated reading time
ALTER TABLE public.blogs ADD COLUMN read_time integer DEFAULT 1;