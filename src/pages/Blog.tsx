import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Calendar, User, ArrowRight, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import type { User as SupabaseUser } from "@supabase/supabase-js";

interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  cover_image_url: string | null;
  published: boolean;
  created_at: string;
  user_id: string;
}

const Blog = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  // Form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [published, setPublished] = useState(false);

  useEffect(() => {
    // Check auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    fetchBlogs();

    return () => subscription.unsubscribe();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching blogs:", error);
      toast({
        title: "Error",
        description: "Failed to load blogs",
        variant: "destructive",
      });
    } else {
      setBlogs(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to create a blog",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    const { error } = await supabase.from("blogs").insert({
      title,
      content,
      excerpt: excerpt || null,
      cover_image_url: coverImageUrl || null,
      published,
      user_id: user.id,
    });

    if (error) {
      console.error("Error creating blog:", error);
      toast({
        title: "Error",
        description: "Failed to create blog post",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Blog post created successfully!",
      });
      // Reset form
      setTitle("");
      setContent("");
      setExcerpt("");
      setCoverImageUrl("");
      setPublished(false);
      setShowUploadForm(false);
      fetchBlogs();
    }

    setSubmitting(false);
  };

  const handleDelete = async (blogId: string) => {
    const { error } = await supabase.from("blogs").delete().eq("id", blogId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Blog post deleted",
      });
      fetchBlogs();
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Security <span className="text-primary">Blog</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest cybersecurity insights, tutorials, and industry news
            </p>
          </motion.div>

          {/* Upload Section */}
          {user && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-12"
            >
              {!showUploadForm ? (
                <div className="flex justify-center">
                  <Button
                    onClick={() => setShowUploadForm(true)}
                    className="gap-2"
                    size="lg"
                  >
                    <Plus className="w-5 h-5" />
                    Create New Blog Post
                  </Button>
                </div>
              ) : (
                <Card className="max-w-2xl mx-auto border-primary/20">
                  <CardHeader>
                    <h2 className="text-2xl font-bold text-foreground">
                      Create New Blog Post
                    </h2>
                  </CardHeader>
                  <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Title *</Label>
                        <Input
                          id="title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="Enter blog title"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="excerpt">Excerpt</Label>
                        <Input
                          id="excerpt"
                          value={excerpt}
                          onChange={(e) => setExcerpt(e.target.value)}
                          placeholder="Brief description of your blog"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="coverImage">Cover Image URL</Label>
                        <Input
                          id="coverImage"
                          value={coverImageUrl}
                          onChange={(e) => setCoverImageUrl(e.target.value)}
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="content">Content *</Label>
                        <Textarea
                          id="content"
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          placeholder="Write your blog content here..."
                          rows={8}
                          required
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="published"
                          checked={published}
                          onCheckedChange={setPublished}
                        />
                        <Label htmlFor="published">Publish immediately</Label>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-3">
                      <Button type="submit" disabled={submitting}>
                        {submitting ? "Creating..." : "Create Post"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowUploadForm(false)}
                      >
                        Cancel
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              )}
            </motion.div>
          )}

          {!user && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center mb-12 p-6 bg-card rounded-xl border border-border"
            >
              <p className="text-muted-foreground mb-4">
                Sign in to create and manage your own blog posts
              </p>
              <Button asChild>
                <a href="/auth">Sign In</a>
              </Button>
            </motion.div>
          )}

          {/* Blog List */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading blogs...</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No blog posts yet. Be the first to create one!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full flex flex-col overflow-hidden hover:border-primary/50 transition-colors">
                    {blog.cover_image_url && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={blog.cover_image_url}
                          alt={blog.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <h3 className="text-xl font-semibold text-foreground line-clamp-2">
                        {blog.title}
                      </h3>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-muted-foreground line-clamp-3">
                        {blog.excerpt || blog.content.substring(0, 150) + "..."}
                      </p>
                      <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(blog.created_at)}
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <Button variant="ghost" size="sm" className="gap-1">
                        Read More <ArrowRight className="w-4 h-4" />
                      </Button>
                      {user && user.id === blog.user_id && (
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(blog.id)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      )}
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
