import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Share2, Bookmark } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  cover_image_url: string | null;
  published: boolean;
  created_at: string;
  user_id: string;
  tags: string[] | null;
  read_time: number | null;
}

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      fetchBlog();
    }
  }, [id]);

  const fetchBlog = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error("Error fetching blog:", error);
      toast({
        title: "Error",
        description: "Failed to load blog post",
        variant: "destructive",
      });
    } else if (data) {
      setBlog(data);
      fetchRelatedBlogs(data.tags || [], data.id);
    }
    setLoading(false);
  };

  const fetchRelatedBlogs = async (tags: string[], currentId: string) => {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .neq("id", currentId)
      .eq("published", true)
      .limit(3);

    if (!error && data) {
      // Sort by tag overlap
      const sorted = data.sort((a, b) => {
        const aOverlap = (a.tags || []).filter((t: string) => tags.includes(t)).length;
        const bOverlap = (b.tags || []).filter((t: string) => tags.includes(t)).length;
        return bOverlap - aOverlap;
      });
      setRelatedBlogs(sorted.slice(0, 2));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog?.title,
          text: blog?.excerpt || "",
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Blog link copied to clipboard!",
      });
    }
  };

  const handleBookmark = () => {
    toast({
      title: "Bookmarked",
      description: "Article saved to your bookmarks",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Blog Not Found</h1>
            <Button asChild>
              <Link to="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap gap-2 justify-center mb-4"
          >
            {(blog.tags || []).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="bg-primary/10 border-primary/30 text-primary"
              >
                #{tag}
              </Badge>
            ))}
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4"
          >
            <span className="text-foreground">{blog.title.split(" ").slice(0, -2).join(" ")}</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-primary">
              {blog.title.split(" ").slice(-2).join(" ")}
            </span>
          </motion.h1>

          {/* Meta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center gap-6 text-sm text-muted-foreground mb-10"
          >
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(blog.created_at)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {blog.read_time || 1} min read
            </span>
          </motion.div>

          {/* Excerpt */}
          {blog.excerpt && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg text-muted-foreground mb-8 border-l-4 border-primary pl-4"
            >
              {blog.excerpt}
            </motion.p>
          )}

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="prose prose-invert prose-lg max-w-none mb-10"
          >
            {blog.content.split("\n").map((paragraph, index) => (
              <p key={index} className="text-muted-foreground mb-4">
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* Share / Bookmark */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center justify-between border-t border-border/50 pt-6 mb-12"
          >
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Share:</span>
              <Button variant="ghost" size="icon" onClick={handleShare}>
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
            <Button variant="ghost" size="icon" onClick={handleBookmark}>
              <Bookmark className="w-5 h-5" />
            </Button>
          </motion.div>

          {/* Related Articles */}
          {relatedBlogs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">Related Articles</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {relatedBlogs.map((related) => (
                  <Card
                    key={related.id}
                    className="bg-card/50 border-border/50 hover:border-primary/50 transition-colors"
                  >
                    <CardContent className="p-4">
                      <Link to={`/blog/${related.id}`}>
                        <h3 className="font-semibold text-foreground hover:text-primary transition-colors mb-2">
                          {related.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {related.excerpt || related.content.substring(0, 100) + "..."}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogDetail;