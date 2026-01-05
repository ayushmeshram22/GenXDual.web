import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Tag, Calendar, Clock, Plus, Trash2, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RichTextEditor } from "@/components/blog/RichTextEditor";
import { FeaturedPosts } from "@/components/blog/FeaturedPosts";
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
  tags: string[] | null;
  read_time: number | null;
  featured: boolean;
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

const Blog = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const { toast } = useToast();

  // Form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [published, setPublished] = useState(false);
  const [featured, setFeatured] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
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
      setBlogs((data as Blog[]) || []);
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

    // Strip HTML tags for word count
    const plainText = content.replace(/<[^>]*>/g, " ");
    const readTime = Math.max(1, Math.ceil(plainText.split(/\s+/).length / 200));

    const { error } = await supabase.from("blogs").insert({
      title,
      content,
      excerpt: excerpt || null,
      cover_image_url: coverImageUrl || null,
      published,
      featured,
      user_id: user.id,
      tags: selectedTags,
      read_time: readTime,
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
      setTitle("");
      setContent("");
      setExcerpt("");
      setCoverImageUrl("");
      setPublished(false);
      setFeatured(false);
      setSelectedTags([]);
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

  const toggleFormTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (blog.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    const matchesTag =
      !selectedTag || (blog.tags && blog.tags.includes(selectedTag));
    return matchesSearch && matchesTag;
  });

  const featuredBlogs = filteredBlogs.filter((blog) => blog.featured && blog.published);
  const regularBlogs = filteredBlogs.filter((blog) => !blog.featured);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
              <Tag className="w-3 h-3 mr-1" />
              Security Blog
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="text-foreground">Cybersecurity</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-primary">
                Insights
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest security trends, tutorials, and best practices
            </p>
          </motion.div>

          {/* Search and Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-10 border-y border-border/50 py-6"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-card border-border/50"
                />
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-muted-foreground">Tags:</span>
                <Badge
                  variant={selectedTag === null ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedTag(null)}
                >
                  All
                </Badge>
                {AVAILABLE_TAGS.slice(0, 5).map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTag === tag ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary/20"
                    onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Create Blog Button / Form */}
          {user && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-10"
            >
              {!showUploadForm ? (
                <div className="flex justify-center">
                  <Button onClick={() => setShowUploadForm(true)} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Create New Blog Post
                  </Button>
                </div>
              ) : (
                <Card className="max-w-3xl mx-auto border-primary/20 bg-card/50">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold text-foreground mb-6">
                      Create New Blog Post
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Title *</Label>
                        <Input
                          id="title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="Enter blog title"
                          required
                          className="bg-background"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="excerpt">Excerpt</Label>
                        <Input
                          id="excerpt"
                          value={excerpt}
                          onChange={(e) => setExcerpt(e.target.value)}
                          placeholder="Brief description of your blog"
                          className="bg-background"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="coverImage">Cover Image URL</Label>
                        <Input
                          id="coverImage"
                          value={coverImageUrl}
                          onChange={(e) => setCoverImageUrl(e.target.value)}
                          placeholder="https://example.com/image.jpg"
                          className="bg-background"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Tags</Label>
                        <div className="flex flex-wrap gap-2">
                          {AVAILABLE_TAGS.map((tag) => (
                            <Badge
                              key={tag}
                              variant={selectedTags.includes(tag) ? "default" : "outline"}
                              className="cursor-pointer"
                              onClick={() => toggleFormTag(tag)}
                            >
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Content *</Label>
                        <RichTextEditor content={content} onChange={setContent} />
                      </div>

                      <div className="flex items-center gap-6">
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

                      <div className="flex gap-3 pt-4">
                        <Button type="submit" disabled={submitting || !content.trim()}>
                          {submitting ? "Creating..." : "Create Post"}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowUploadForm(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          )}

          {!user && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mb-10 p-6 bg-card/50 rounded-xl border border-border/50"
            >
              <p className="text-muted-foreground mb-4">
                Sign in to create and manage your own blog posts
              </p>
              <Button asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
            </motion.div>
          )}

          {/* Featured Posts */}
          {featuredBlogs.length > 0 && <FeaturedPosts posts={featuredBlogs} />}

          {/* Blog Grid */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading blogs...</p>
            </div>
          ) : regularBlogs.length === 0 && featuredBlogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {searchQuery || selectedTag
                  ? "No blogs match your search criteria."
                  : "No blog posts yet. Be the first to create one!"}
              </p>
            </div>
          ) : (
            <>
              {regularBlogs.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regularBlogs.map((blog, index) => (
                    <motion.div
                      key={blog.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="h-full flex flex-col overflow-hidden bg-gradient-to-br from-card to-card/80 border-border/50 hover:border-primary/50 transition-all duration-300 group">
                        {/* Cover Image / Placeholder */}
                        <div className="aspect-[16/10] bg-gradient-to-br from-cyan-900/30 to-primary/20 relative overflow-hidden">
                          {blog.cover_image_url ? (
                            <img
                              src={blog.cover_image_url}
                              alt={blog.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Tag className="w-12 h-12 text-cyan-500/50" />
                            </div>
                          )}
                          {user && user.id === blog.user_id && (
                            <Button
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => {
                                e.preventDefault();
                                handleDelete(blog.id);
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>

                        {/* Tags */}
                        <CardContent className="flex-1 p-4">
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {(blog.tags || []).slice(0, 2).map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="text-xs bg-primary/10 border-primary/30 text-primary"
                              >
                                #{tag}
                              </Badge>
                            ))}
                          </div>

                          {/* Title */}
                          <Link to={`/blog/${blog.id}`}>
                            <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 hover:text-primary transition-colors">
                              {blog.title}
                            </h3>
                          </Link>

                          {/* Excerpt */}
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                            {blog.excerpt || blog.content.replace(/<[^>]*>/g, " ").substring(0, 120) + "..."}
                          </p>

                          {/* Meta */}
                          <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(blog.created_at)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {blog.read_time || 1} min read
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
