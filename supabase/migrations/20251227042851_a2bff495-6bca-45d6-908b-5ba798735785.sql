-- Add questionnaire fields to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS full_name TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS age INTEGER,
ADD COLUMN IF NOT EXISTS country TEXT,
ADD COLUMN IF NOT EXISTS has_prior_experience BOOLEAN,
ADD COLUMN IF NOT EXISTS experience_details TEXT,
ADD COLUMN IF NOT EXISTS skill_level TEXT CHECK (skill_level IN ('beginner', 'intermediate', 'advanced')),
ADD COLUMN IF NOT EXISTS goal TEXT CHECK (goal IN ('job', 'freelancing', 'bug_bounty', 'personal_knowledge', 'own_company'));