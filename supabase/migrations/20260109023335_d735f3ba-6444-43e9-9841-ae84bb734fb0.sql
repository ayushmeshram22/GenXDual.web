-- Drop the overly permissive policy
DROP POLICY IF EXISTS "System can insert notifications" ON public.user_notifications;

-- Create a more restrictive policy - only authenticated users can receive notifications
CREATE POLICY "Authenticated users can receive notifications" ON public.user_notifications 
FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);