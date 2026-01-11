import { useState, useRef } from "react";
import { Upload, Image, X, Star, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RichTextEditor } from "./RichTextEditor";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ArticleEditorProps {
  user: { id: string; email?: string } | null;
  onClose: () => void;
  onPostCreated: () => void;
}

const AVAILABLE_TAGS = [
  "ethical-hacking",
  "beginner",
  "career",
  "tools",
  "pentesting",
  "owasp",
  "web-security",
  "network",
  "malware",
  "cloud",
];

export const ArticleEditor = ({ user, onClose, onPostCreated }: ArticleEditorProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [published, setPublished] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleCoverSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeCover = () => {
    setCoverImage(null);
    setCoverPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const uploadCover = async (): Promise<string | null> => {
    if (!coverImage || !user) return null;

    setUploading(true);
    const fileExt = coverImage.name.split(".").pop();
    const fileName = `${user.id}/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("blog-covers")
      .upload(fileName, coverImage);

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

  const handleSubmit = async (asDraft: boolean = false) => {
    if (!user) return;

    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a title",
        variant: "destructive",
      });
      return;
    }

    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Please add some content",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    let coverImageUrl = null;
    if (coverImage) {
      coverImageUrl = await uploadCover();
    }

    const plainText = content.replace(/<[^>]*>/g, " ");
    const readTime = Math.max(1, Math.ceil(plainText.split(/\s+/).length / 200));

    const { error } = await supabase.from("blogs").insert({
      title,
      content,
      excerpt: excerpt || plainText.substring(0, 150),
      cover_image_url: coverImageUrl,
      published: asDraft ? false : published,
      featured,
      user_id: user.id,
      tags: selectedTags,
      read_time: readTime,
    });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to create article",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: asDraft ? "Article saved as draft!" : "Article published!",
      });
      onPostCreated();
    }

    setSubmitting(false);
  };

  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Write an article</h2>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Manage <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleSubmit(true)}>
                Save as draft
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onClose}>
                Discard
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            onClick={() => handleSubmit(false)}
            disabled={submitting || uploading || !title.trim() || !content.trim()}
            className="gap-2"
          >
            {uploading ? "Uploading..." : submitting ? "Publishing..." : "Next →"}
          </Button>
        </div>
      </div>

      {/* Cover Image Upload */}
      <div className="relative">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleCoverSelect}
          className="hidden"
        />
        {coverPreview ? (
          <div className="relative rounded-lg overflow-hidden border border-border bg-muted">
            <img
              src={coverPreview}
              alt="Cover preview"
              className="w-full h-64 object-cover"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-3 right-3"
              onClick={removeCover}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center h-48 rounded-lg border-2 border-dashed border-border bg-muted/50 cursor-pointer hover:bg-muted transition-colors"
          >
            <Image className="h-12 w-12 text-muted-foreground/50 mb-3" />
            <p className="text-muted-foreground text-sm mb-2">
              Add a cover image or video to your article.
            </p>
            <Button variant="outline" size="sm" className="gap-2">
              <Upload className="h-4 w-4" />
              Upload from computer
            </Button>
          </div>
        )}
      </div>

      {/* Title */}
      <div>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="text-3xl font-bold border-none px-0 focus-visible:ring-0 placeholder:text-muted-foreground/50"
        />
      </div>

      {/* Excerpt */}
      <div>
        <Input
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Write a brief excerpt (optional)"
          className="text-base border-none px-0 focus-visible:ring-0 placeholder:text-muted-foreground/50"
        />
      </div>

      {/* Content Editor */}
      <div className="min-h-[200px]">
        <RichTextEditor content={content} onChange={setContent} />
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <Label className="text-sm text-muted-foreground">Tags</Label>
        <div className="flex flex-wrap gap-2">
          {AVAILABLE_TAGS.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/20"
              onClick={() => toggleTag(tag)}
            >
              #{tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Options */}
      <div className="flex items-center gap-6 pt-4 border-t border-border/50">
        <div className="flex items-center space-x-2">
          <Switch
            id="published"
            checked={published}
            onCheckedChange={setPublished}
          />
          <Label htmlFor="published">Publish immediately</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="featured"
            checked={featured}
            onCheckedChange={setFeatured}
          />
          <Label htmlFor="featured" className="flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-500" />
            Featured
          </Label>
        </div>
      </div>

      {/* Draft indicator */}
      <div className="flex justify-end">
        <span className="text-xs text-muted-foreground flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-yellow-500" />
          Draft
        </span>
      </div>
    </div>
  );
};
