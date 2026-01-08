import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  User as UserIcon, 
  BookOpen, 
  Award, 
  Target, 
  Clock, 
  ChevronRight,
  Shield,
  Zap,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { motion } from "framer-motion";

interface ProfileData {
  display_name: string | null;
  avatar_url: string | null;
  full_name: string | null;
  skill_level: string | null;
  goal: string | null;
  has_prior_experience: boolean | null;
  country: string | null;
  bio: string | null;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session?.user) {
          navigate("/auth");
        } else {
          setUser(session.user);
          fetchProfile(session.user.id);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        navigate("/auth");
      } else {
        setUser(session.user);
        fetchProfile(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("display_name, avatar_url, full_name, skill_level, goal, has_prior_experience, country, bio")
        .eq("user_id", userId)
        .maybeSingle();

      if (error && error.code !== "PGRST116") {
        console.error("Error fetching profile:", error);
      }

      if (data) {
        setProfile(data);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = () => {
    if (profile?.full_name) {
      return profile.full_name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    }
    if (profile?.display_name) {
      return profile.display_name.slice(0, 2).toUpperCase();
    }
    return user?.email?.slice(0, 2).toUpperCase() || "U";
  };

  const getSkillBadgeColor = () => {
    switch (profile?.skill_level) {
      case "beginner": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "intermediate": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "advanced": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "expert": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

  // Calculate profile completion
  const calculateProfileCompletion = () => {
    if (!profile) return 0;
    const fields = [
      profile.full_name,
      profile.display_name,
      profile.bio,
      profile.skill_level,
      profile.avatar_url,
    ];
    const filledFields = fields.filter((field) => field && field.trim() !== "").length;
    return Math.round((filledFields / fields.length) * 100);
  };

  const profileCompletion = calculateProfileCompletion();

  // Mock learning progress data
  const learningModules = [
    { name: "Network Security Fundamentals", progress: 75, icon: Shield },
    { name: "Ethical Hacking Basics", progress: 45, icon: Zap },
    { name: "Incident Response", progress: 20, icon: Target },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Welcome back, {profile?.display_name || profile?.full_name || user?.email?.split("@")[0]}!
            </h1>
            <p className="text-muted-foreground">
              Track your cybersecurity learning journey
            </p>
          </motion.div>

          {/* Profile Completion Banner */}
          {profileCompletion < 100 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="mb-6"
            >
              <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 border-primary/20">
                <CardContent className="py-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="p-2 rounded-full bg-primary/20">
                        <AlertCircle className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium text-foreground">
                            Complete your profile
                          </p>
                          <span className="text-sm font-semibold text-primary">{profileCompletion}%</span>
                        </div>
                        <Progress value={profileCompletion} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">
                          A complete profile helps us personalize your learning experience
                        </p>
                      </div>
                    </div>
                    <Link to="/profile">
                      <Button variant="cyber" size="sm">
                        Complete Now
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Summary Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-card border-border h-full">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <UserIcon className="w-5 h-5 text-primary" />
                    Profile Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16 border-2 border-primary/30">
                      <AvatarImage src={profile?.avatar_url || undefined} />
                      <AvatarFallback className="bg-primary/20 text-primary text-lg">
                        {getInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground">
                        {profile?.full_name || profile?.display_name || "Complete your profile"}
                      </p>
                      <p className="text-sm text-muted-foreground">{user?.email}</p>
                      {profile?.country && (
                        <p className="text-sm text-muted-foreground">{profile.country}</p>
                      )}
                    </div>
                  </div>

                  {profile?.skill_level && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Skill Level:</span>
                      <Badge variant="outline" className={getSkillBadgeColor()}>
                        {profile.skill_level.charAt(0).toUpperCase() + profile.skill_level.slice(1)}
                      </Badge>
                    </div>
                  )}

                  {profile?.goal && (
                    <div>
                      <span className="text-sm text-muted-foreground">Goal:</span>
                      <p className="text-sm text-foreground mt-1">{profile.goal}</p>
                    </div>
                  )}

                  <Link to="/profile">
                    <Button variant="cyberOutline" size="sm" className="w-full mt-4">
                      Edit Profile
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* Learning Progress Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Card className="bg-card border-border h-full">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    Learning Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {learningModules.map((module, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <module.icon className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium text-foreground">{module.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{module.progress}%</span>
                      </div>
                      <Progress value={module.progress} className="h-2" />
                    </div>
                  ))}

                  <div className="pt-4 border-t border-border">
                    <Link to="/modules">
                      <Button variant="cyber" className="w-full">
                        Continue Learning
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-card border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/20">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">12h</p>
                      <p className="text-sm text-muted-foreground">Total Learning Time</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-card border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-green-500/20">
                      <Award className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">3</p>
                      <p className="text-sm text-muted-foreground">Certificates Earned</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="bg-card border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-yellow-500/20">
                      <TrendingUp className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">47%</p>
                      <p className="text-sm text-muted-foreground">Overall Progress</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
