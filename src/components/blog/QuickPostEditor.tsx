import { useState, useRef } from "react";
import { Image, Video, X, Upload } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface QuickPostEditorProps {
  user: { id: string; email?: string } | null;
  postType: "text" | "photo" | "video";
  onClose: () => void;
  onPostCreated: () => void;
}

export const QuickPostEditor = ({ user, postType, onClose, onPostCreated }: QuickPostEditorProps) => {
  const [content, setContent] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMediaFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeMedia = () => {
    setMediaFile(null);
    setMediaPreview(null);
    setMediaUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const uploadMedia = async (): Promise<string | null> => {
    if (!mediaFile || !user) return null;

    setUploading(true);
    const fileExt = mediaFile.name.split(".").pop();
    const fileName = `${user.id}/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("blog-covers")
      .upload(fileName, mediaFile);

    if (uploadError) {
      toast({
        title: "Upload failed",
        description: uploadError.message,
        variant: "destructive",
      });
      setUploading(false);
      return null;
    }

    const { data } = supabase.storage.from("blog-covers").getPublicUrl(fileName);
    setUploading(false);
    return data.publicUrl;
  };

  const handleSubmit = async () => {
    if (!user || !content.trim()) return;

    setSubmitting(true);

    let coverImageUrl = mediaUrl;
    if (mediaFile) {
      const uploadedUrl = await uploadMedia();
      if (uploadedUrl) {
        coverImageUrl = uploadedUrl;
      }
    }

    const readTime = Math.max(1, Math.ceil(content.split(/\s+/).length / 200));

    const { error } = await supabase.from("blogs").insert({
      title: content.substring(0, 100) + (content.length > 100 ? "..." : ""),
      content: `<p>${content.replace(/\n/g, "</p><p>")}</p>`,
      excerpt: content.substring(0, 150),
      cover_image_url: coverImageUrl || null,
      published: true,
      featured: false,
      user_id: user.id,
      tags: [],
      read_time: readTime,
    });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to create post",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Post published!",
      });
      onPostCreated();
    }

    setSubmitting(false);
  };

  const getInitials = () => {
    if (!user?.email) return "U";
    return user.email.charAt(0).toUpperCase();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <Avatar className="h-10 w-10">
          <AvatarFallback className="bg-primary/20 text-primary">
            {getInitials()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Textarea
            placeholder="What do you want to talk about?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[120px] border-none resize-none text-base focus-visible:ring-0 p-0"
            autoFocus
          />
        </div>
      </div>

      {/* Media Preview */}
      {mediaPreview && (
        <div className="relative rounded-lg overflow-hidden border border-border">
          {postType === "video" ? (
            <video src={mediaPreview} controls className="w-full max-h-[300px] object-contain" />
          ) : (
            <img src={mediaPreview} alt="Preview" className="w-full max-h-[300px] object-contain" />
          )}
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={removeMedia}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border/50">
        <div className="flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept={postType === "video" ? "video/*" : "image/*"}
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
            className="text-muted-foreground hover:text-primary"
          >
            {postType === "video" ? <Video className="h-5 w-5" /> : <Image className="h-5 w-5" />}
          </Button>
        </div>
        <Button
          onClick={handleSubmit}
          disabled={!content.trim() || submitting || uploading}
        >
          {uploading ? "Uploading..." : submitting ? "Posting..." : "Post"}
        </Button>
      </div>
    </div>
  );
};
