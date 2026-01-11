import { useState } from "react";
import { Video, Image, FileText } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { QuickPostEditor } from "./QuickPostEditor";
import { ArticleEditor } from "./ArticleEditor";

interface StartPostCardProps {
  user: { id: string; email?: string } | null;
  onPostCreated: () => void;
  onLoginRequired: () => void;
}

export const StartPostCard = ({ user, onPostCreated, onLoginRequired }: StartPostCardProps) => {
  const [showQuickPost, setShowQuickPost] = useState(false);
  const [showArticleEditor, setShowArticleEditor] = useState(false);
  const [postType, setPostType] = useState<"text" | "photo" | "video">("text");

  const handleAction = (action: "post" | "photo" | "video" | "article") => {
    if (!user) {
      onLoginRequired();
      return;
    }

    if (action === "article") {
      setShowArticleEditor(true);
    } else {
      setPostType(action === "photo" ? "photo" : action === "video" ? "video" : "text");
      setShowQuickPost(true);
    }
  };

  const getInitials = () => {
    if (!user?.email) return "U";
    return user.email.charAt(0).toUpperCase();
  };

  return (
    <>
      <Card className="p-4 bg-card border-border/50">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-primary/20 text-primary">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
          <button
            onClick={() => handleAction("post")}
            className="flex-1 px-4 py-3 text-left text-muted-foreground bg-background border border-border/50 rounded-full hover:bg-muted/50 transition-colors"
          >
            Start a post
          </button>
        </div>
        <div className="flex items-center justify-around pt-2 border-t border-border/30">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground hover:bg-muted/50"
            onClick={() => handleAction("video")}
          >
            <Video className="h-5 w-5 text-green-500" />
            <span className="hidden sm:inline">Video</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground hover:bg-muted/50"
            onClick={() => handleAction("photo")}
          >
            <Image className="h-5 w-5 text-blue-500" />
            <span className="hidden sm:inline">Photo</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground hover:bg-muted/50"
            onClick={() => handleAction("article")}
          >
            <FileText className="h-5 w-5 text-orange-500" />
            <span className="hidden sm:inline">Write article</span>
          </Button>
        </div>
      </Card>

      {/* Quick Post Dialog */}
      <Dialog open={showQuickPost} onOpenChange={setShowQuickPost}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Create a post</DialogTitle>
          </DialogHeader>
          <QuickPostEditor
            user={user}
            postType={postType}
            onClose={() => setShowQuickPost(false)}
            onPostCreated={() => {
              setShowQuickPost(false);
              onPostCreated();
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Article Editor Dialog */}
      <Dialog open={showArticleEditor} onOpenChange={setShowArticleEditor}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          <ArticleEditor
            user={user}
            onClose={() => setShowArticleEditor(false)}
            onPostCreated={() => {
              setShowArticleEditor(false);
              onPostCreated();
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
