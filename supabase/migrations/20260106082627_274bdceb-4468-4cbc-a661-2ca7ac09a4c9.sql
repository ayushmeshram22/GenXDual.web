-- Create storage bucket for flex videos
INSERT INTO storage.buckets (id, name, public) VALUES ('flex-videos', 'flex-videos', true);

-- Create policy for public access to flex videos
CREATE POLICY "Anyone can view flex videos"
ON storage.objects FOR SELECT
USING (bucket_id = 'flex-videos');

-- Create policy for authenticated users to upload
CREATE POLICY "Authenticated users can upload flex videos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'flex-videos' AND auth.uid() IS NOT NULL);

-- Create policy for users to delete their own videos
CREATE POLICY "Users can delete their own flex videos"
ON storage.objects FOR DELETE
USING (bucket_id = 'flex-videos' AND auth.uid()::text = (storage.foldername(name))[1]);