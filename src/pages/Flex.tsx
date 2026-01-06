import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
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
  Upload,
  Sparkles,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
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

const SWIPE_THRESHOLD = 50;

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
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [direction, setDirection] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Form state
  const [caption, setCaption] = useState("");

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

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        goToPrev();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        goToNext();
      } else if (e.key === " ") {
        e.preventDefault();
        togglePlay();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, reels.length]);

  // Handle wheel scroll for navigation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let lastScrollTime = 0;
    const scrollCooldown = 500;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastScrollTime < scrollCooldown) return;

      if (e.deltaY > 30) {
        goToNext();
        lastScrollTime = now;
      } else if (e.deltaY < -30) {
        goToPrev();
        lastScrollTime = now;
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [currentIndex, reels.length]);

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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("video/")) {
        toast({
          title: "Invalid file",
          description: "Please select a video file",
          variant: "destructive",
        });
        return;
      }
      if (file.size > 100 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Video must be under 100MB",
          variant: "destructive",
        });
        return;
      }
      setVideoFile(file);
    }
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

    if (!videoFile) {
      toast({
        title: "No video selected",
        description: "Please select a video file to upload",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Upload video to storage
      const fileExt = videoFile.name.split(".").pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      // Simulate progress (actual progress tracking requires XHR)
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90));
      }, 200);

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("flex-videos")
        .upload(fileName, videoFile, {
          cacheControl: "3600",
          upsert: false,
        });

      clearInterval(progressInterval);

      if (uploadError) throw uploadError;

      setUploadProgress(100);

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("flex-videos")
        .getPublicUrl(uploadData.path);

      // Create reel record
      const { error: insertError } = await supabase.from("flex_reels").insert({
        user_id: user.id,
        video_url: urlData.publicUrl,
        caption: caption || null,
        thumbnail_url: null,
      });

      if (insertError) throw insertError;

      toast({
        title: "Success",
        description: "Reel uploaded successfully!",
      });

      setVideoFile(null);
      setCaption("");
      setShowUploadDialog(false);
      fetchReels();
    } catch (error: any) {
      console.error("Error uploading:", error);
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload reel",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
      setIsUploading(false);
      setUploadProgress(0);
    }
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
    const reel = reels.find((r) => r.id === reelId);
    if (!reel) return;

    // Delete from storage if it's a storage URL
    if (reel.video_url.includes("flex-videos")) {
      const path = reel.video_url.split("flex-videos/")[1];
      if (path) {
        await supabase.storage.from("flex-videos").remove([path]);
      }
    }

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

  const goToNext = useCallback(() => {
    if (currentIndex < reels.length - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
      setIsPlaying(true);
    }
  }, [currentIndex, reels.length]);

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
      setIsPlaying(true);
    }
  }, [currentIndex]);

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.y < -SWIPE_THRESHOLD && info.velocity.y < 0) {
      goToNext();
    } else if (info.offset.y > SWIPE_THRESHOLD && info.velocity.y > 0) {
      goToPrev();
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const currentReel = reels[currentIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      y: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      y: direction > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

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
          <div
            ref={containerRef}
            className="flex-1 relative flex items-center justify-center overflow-hidden touch-none"
          >
            {/* Video Container */}
            <div className="relative w-full max-w-md h-full max-h-[80vh] mx-auto">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentReel.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    y: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  drag="y"
                  dragConstraints={{ top: 0, bottom: 0 }}
                  dragElastic={0.2}
                  onDragEnd={handleDragEnd}
                  className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden bg-card cursor-grab active:cursor-grabbing"
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
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
                      <Play className="w-16 h-16 text-white" />
                    </div>
                  )}

                  {/* Swipe Hints */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                    {currentIndex > 0 && (
                      <ChevronUp className="w-6 h-6 text-white/50 animate-bounce" />
                    )}
                    {currentIndex < reels.length - 1 && (
                      <ChevronDown className="w-6 h-6 text-white/50 animate-bounce" />
                    )}
                  </div>

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
              <div className="absolute right-4 bottom-28 flex flex-col gap-4 z-10">
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

              {/* Navigation Indicators */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex items-center gap-3 z-10">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-black/50 text-white h-8 w-8"
                  onClick={goToPrev}
                  disabled={currentIndex === 0}
                >
                  <ChevronUp className="w-5 h-5" />
                </Button>
                <Badge className="bg-black/50 text-white">
                  {currentIndex + 1} / {reels.length}
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-black/50 text-white h-8 w-8"
                  onClick={goToNext}
                  disabled={currentIndex === reels.length - 1}
                >
                  <ChevronDown className="w-5 h-5" />
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
              <Label>Video File *</Label>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
              >
                {videoFile ? (
                  <div className="space-y-2">
                    <p className="text-foreground font-medium">{videoFile.name}</p>
                    <p className="text-muted-foreground text-sm">
                      {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
                    <p className="text-muted-foreground">
                      Click to select a video (max 100MB)
                    </p>
                  </div>
                )}
              </div>
            </div>

            {isUploading && (
              <div className="space-y-2">
                <Progress value={uploadProgress} className="h-2" />
                <p className="text-sm text-muted-foreground text-center">
                  Uploading... {uploadProgress}%
                </p>
              </div>
            )}

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

            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={submitting || !videoFile}>
                {submitting ? "Uploading..." : "Upload Flex"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowUploadDialog(false);
                  setVideoFile(null);
                }}
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
