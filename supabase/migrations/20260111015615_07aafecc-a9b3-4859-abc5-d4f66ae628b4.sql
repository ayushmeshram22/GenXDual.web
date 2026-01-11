-- Create a storage bucket for blog cover images
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-covers', 'blog-covers', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to view blog cover images
CREATE POLICY "Anyone can view blog covers"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-covers');

-- Allow authenticated users to upload their own blog covers
CREATE POLICY "Authenticated users can upload blog covers"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'blog-covers' 
  AND auth.uid() IS NOT NULL
);

-- Allow users to update their own uploads
CREATE POLICY "Users can update their own blog covers"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'blog-covers' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to delete their own uploads
CREATE POLICY "Users can delete their own blog covers"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'blog-covers' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);