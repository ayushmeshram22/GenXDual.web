import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Share2,
  Plus,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Trash2,
  Send,
  X,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/layout/Navbar";
import type { User as SupabaseUser } from "@supabase/supabase-js";

interface Reel {
  id: string;
  user_id: string;
  video_url: string;
  caption: string | null;
  thumbnail_url: string | null;
  likes_count: number;
  created_at: string;
}

interface Comment {
  id: string;
  reel_id: string;
  user_id: string;
  content: string;
  created_at: string;
}

const Flex = () => {
  const [reels, setReels] = useState<Reel[]>([]);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [likedReels, setLikedReels] = useState<Set<string>>(new Set());
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  // Form state
  const [videoUrl, setVideoUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserLikes(session.user.id);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserLikes(session.user.id);
      }
    });

    fetchReels();

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (reels.length > 0 && showComments) {
      fetchComments(reels[currentIndex].id);
    }
  }, [showComments, currentIndex, reels]);

  const fetchReels = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("flex_reels")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching reels:", error);
    } else {
      setReels(data || []);
    }
    setLoading(false);
  };

  const fetchUserLikes = async (userId: string) => {
    const { data } = await supabase
      .from("flex_likes")
      .select("reel_id")
      .eq("user_id", userId);

    if (data) {
      setLikedReels(new Set(data.map((l) => l.reel_id)));
    }
  };

  const fetchComments = async (reelId: string) => {
    const { data } = await supabase
      .from("flex_comments")
      .select("*")
      .eq("reel_id", reelId)
      .order("created_at", { ascending: true });

    setComments(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to upload a reel",
        variant: "destructive",
      });
      return;
    }

    if (!videoUrl.trim()) return;

    setSubmitting(true);

    const { error } = await supabase.from("flex_reels").insert({
      user_id: user.id,
      video_url: videoUrl,
      caption: caption || null,
      thumbnail_url: thumbnailUrl || null,
    });

    if (error) {
      console.error("Error creating reel:", error);
      toast({
        title: "Error",
        description: "Failed to upload reel",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Reel uploaded successfully!",
      });
      setVideoUrl("");
      setCaption("");
      setThumbnailUrl("");
      setShowUploadDialog(false);
      fetchReels();
    }

    setSubmitting(false);
  };

  const handleLike = async (reelId: string) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to like reels",
        variant: "destructive",
      });
      return;
    }

    const isLiked = likedReels.has(reelId);

    if (isLiked) {
      const { error } = await supabase
        .from("flex_likes")
        .delete()
        .eq("reel_id", reelId)
        .eq("user_id", user.id);

      if (!error) {
        setLikedReels((prev) => {
          const next = new Set(prev);
          next.delete(reelId);
          return next;
        });
        setReels((prev) =>
          prev.map((r) =>
            r.id === reelId ? { ...r, likes_count: r.likes_count - 1 } : r
          )
        );
      }
    } else {
      const { error } = await supabase.from("flex_likes").insert({
        reel_id: reelId,
        user_id: user.id,
      });

      if (!error) {
        setLikedReels((prev) => new Set([...prev, reelId]));
        setReels((prev) =>
          prev.map((r) =>
            r.id === reelId ? { ...r, likes_count: r.likes_count + 1 } : r
          )
        );
      }
    }
  };

  const handleComment = async () => {
    if (!user || !newComment.trim() || reels.length === 0) return;

    const { error } = await supabase.from("flex_comments").insert({
      reel_id: reels[currentIndex].id,
      user_id: user.id,
      content: newComment.trim(),
    });

    if (!error) {
      setNewComment("");
      fetchComments(reels[currentIndex].id);
    }
  };

  const handleDeleteReel = async (reelId: string) => {
    const { error } = await supabase.from("flex_reels").delete().eq("id", reelId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete reel",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Deleted",
        description: "Reel removed",
      });
      fetchReels();
      if (currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      }
    }
  };

  const handleShare = async () => {
    if (reels.length === 0) return;

    const url = `${window.location.origin}/flex?reel=${reels[currentIndex].id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this Flex!",
          text: reels[currentIndex].caption || "Amazing reel!",
          url,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link Copied",
        description: "Reel link copied to clipboard!",
      });
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const goToNext = () => {
    if (currentIndex < reels.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsPlaying(true);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsPlaying(true);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const currentReel = reels[currentIndex];

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <main className="pt-16 pb-4 h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold text-white">Flex</h1>
          </div>
          {user && (
            <Button
              onClick={() => setShowUploadDialog(true)}
              size="sm"
              className="gap-1"
            >
              <Plus className="w-4 h-4" />
              Upload
            </Button>
          )}
        </div>

        {/* Reels Container */}
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-muted-foreground">Loading reels...</p>
          </div>
        ) : reels.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
            <Sparkles className="w-16 h-16 text-primary/50 mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">No Flex yet</h2>
            <p className="text-muted-foreground mb-4">
              Be the first to share your skills!
            </p>
            {user ? (
              <Button onClick={() => setShowUploadDialog(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Upload First Reel
              </Button>
            ) : (
              <Button asChild>
                <Link to="/auth">Sign In to Upload</Link>
              </Button>
            )}
          </div>
        ) : (
          <div className="flex-1 relative flex items-center justify-center overflow-hidden">
            {/* Video Container */}
            <div className="relative w-full max-w-md h-full max-h-[80vh] mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentReel.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full rounded-2xl overflow-hidden bg-card"
                >
                  <video
                    ref={videoRef}
                    src={currentReel.video_url}
                    className="w-full h-full object-cover"
                    loop
                    autoPlay
                    muted={isMuted}
                    playsInline
                    onClick={togglePlay}
                  />

                  {/* Play/Pause Overlay */}
                  {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Play className="w-16 h-16 text-white" />
                    </div>
                  )}

                  {/* Caption */}
                  {currentReel.caption && (
                    <div className="absolute bottom-20 left-4 right-16 p-3 bg-black/50 backdrop-blur-sm rounded-lg">
                      <p className="text-white text-sm">{currentReel.caption}</p>
                    </div>
                  )}

                  {/* Delete Button */}
                  {user?.id === currentReel.user_id && (
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-4 right-4"
                      onClick={() => handleDeleteReel(currentReel.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}

                  {/* Volume Control */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 left-4 bg-black/50 hover:bg-black/70 text-white"
                    onClick={toggleMute}
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </Button>
                </motion.div>
              </AnimatePresence>

              {/* Side Actions */}
              <div className="absolute right-4 bottom-28 flex flex-col gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`bg-black/50 hover:bg-black/70 rounded-full h-12 w-12 ${
                    likedReels.has(currentReel.id) ? "text-red-500" : "text-white"
                  }`}
                  onClick={() => handleLike(currentReel.id)}
                >
                  <Heart
                    className={`w-6 h-6 ${
                      likedReels.has(currentReel.id) ? "fill-current" : ""
                    }`}
                  />
                </Button>
                <span className="text-white text-xs text-center -mt-2">
                  {currentReel.likes_count}
                </span>

                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-black/50 hover:bg-black/70 text-white rounded-full h-12 w-12"
                  onClick={() => setShowComments(true)}
                >
                  <MessageCircle className="w-6 h-6" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-black/50 hover:bg-black/70 text-white rounded-full h-12 w-12"
                  onClick={handleShare}
                >
                  <Share2 className="w-6 h-6" />
                </Button>
              </div>

              {/* Navigation */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-black/50 text-white"
                  onClick={goToPrev}
                  disabled={currentIndex === 0}
                >
                  Prev
                </Button>
                <Badge className="bg-black/50 text-white">
                  {currentIndex + 1} / {reels.length}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-black/50 text-white"
                  onClick={goToNext}
                  disabled={currentIndex === reels.length - 1}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Upload Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Upload New Flex
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="videoUrl">Video URL *</Label>
              <Input
                id="videoUrl"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://example.com/video.mp4"
                required
                className="bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="caption">Caption</Label>
              <Textarea
                id="caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="What's this about?"
                rows={3}
                className="bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="thumbnailUrl">Thumbnail URL (optional)</Label>
              <Input
                id="thumbnailUrl"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                placeholder="https://example.com/thumbnail.jpg"
                className="bg-background"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={submitting || !videoUrl.trim()}>
                {submitting ? "Uploading..." : "Upload Flex"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowUploadDialog(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Comments Sheet */}
      <Sheet open={showComments} onOpenChange={setShowComments}>
        <SheetContent side="bottom" className="h-[70vh] bg-card border-border">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-primary" />
              Comments ({comments.length})
            </SheetTitle>
          </SheetHeader>

          <div className="flex flex-col h-full pt-4">
            {/* Comments List */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {comments.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No comments yet. Be the first!
                </p>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/20 text-primary text-xs">
                        {comment.user_id.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-muted/50 rounded-lg p-3">
                        <p className="text-foreground text-sm">{comment.content}</p>
                      </div>
                      <span className="text-xs text-muted-foreground mt-1">
                        {formatDate(comment.created_at)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Comment Input */}
            {user ? (
              <div className="flex gap-2 pt-4 border-t border-border mt-4">
                <Input
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 bg-background"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleComment();
                    }
                  }}
                />
                <Button
                  onClick={handleComment}
                  disabled={!newComment.trim()}
                  size="icon"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="text-center pt-4 border-t border-border mt-4">
                <p className="text-muted-foreground text-sm mb-2">
                  Sign in to comment
                </p>
                <Button asChild size="sm">
                  <Link to="/auth">Sign In</Link>
                </Button>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Flex;
