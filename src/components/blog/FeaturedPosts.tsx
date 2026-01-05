import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star, Calendar, Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  cover_image_url: string | null;
  created_at: string;
  tags: string[] | null;
  read_time: number | null;
}

interface FeaturedPostsProps {
  posts: Blog[];
}

export const FeaturedPosts = ({ posts }: FeaturedPostsProps) => {
  if (posts.length === 0) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const mainPost = posts[0];
  const sidePosts = posts.slice(1, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <div className="flex items-center gap-2 mb-6">
        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
        <h2 className="text-xl font-bold text-foreground">Featured Posts</h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Main Featured Post */}
        <Card className="overflow-hidden bg-gradient-to-br from-card to-card/80 border-primary/30 group">
          <div className="aspect-[16/10] bg-gradient-to-br from-cyan-900/30 to-primary/20 relative overflow-hidden">
            {mainPost.cover_image_url ? (
              <img
                src={mainPost.cover_image_url}
                alt={mainPost.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Star className="w-16 h-16 text-yellow-500/30" />
              </div>
            )}
            <div className="absolute top-3 left-3">
              <Badge className="bg-yellow-500/90 text-yellow-950 gap-1">
                <Star className="w-3 h-3 fill-current" />
                Featured
              </Badge>
            </div>
          </div>
          <CardContent className="p-5">
            <div className="flex flex-wrap gap-1.5 mb-3">
              {(mainPost.tags || []).slice(0, 3).map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-xs bg-primary/10 border-primary/30 text-primary"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
            <Link to={`/blog/${mainPost.id}`}>
              <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                {mainPost.title}
              </h3>
            </Link>
            <p className="text-muted-foreground line-clamp-2 mb-4">
              {mainPost.excerpt || mainPost.content.substring(0, 150) + "..."}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(mainPost.created_at)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {mainPost.read_time || 1} min
                </span>
              </div>
              <Link
                to={`/blog/${mainPost.id}`}
                className="text-primary text-sm flex items-center gap-1 hover:gap-2 transition-all"
              >
                Read More <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Side Featured Posts */}
        <div className="flex flex-col gap-4">
          {sidePosts.map((post) => (
            <Card
              key={post.id}
              className="flex overflow-hidden bg-card/50 border-border/50 hover:border-primary/50 transition-colors group"
            >
              <div className="w-1/3 min-w-[120px] bg-gradient-to-br from-cyan-900/30 to-primary/20 relative overflow-hidden">
                {post.cover_image_url ? (
                  <img
                    src={post.cover_image_url}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Star className="w-8 h-8 text-yellow-500/30" />
                  </div>
                )}
                <div className="absolute top-2 left-2">
                  <Badge className="bg-yellow-500/90 text-yellow-950 text-xs px-1.5 py-0.5">
                    <Star className="w-2.5 h-2.5 fill-current" />
                  </Badge>
                </div>
              </div>
              <CardContent className="flex-1 p-4 flex flex-col justify-center">
                <div className="flex flex-wrap gap-1 mb-2">
                  {(post.tags || []).slice(0, 2).map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-xs bg-primary/10 border-primary/30 text-primary"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
                <Link to={`/blog/${post.id}`}>
                  <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors mb-2">
                    {post.title}
                  </h3>
                </Link>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(post.created_at)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.read_time || 1} min
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
