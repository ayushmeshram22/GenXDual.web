import { motion } from 'framer-motion';
import { Trophy, Medal, Award, TrendingUp, Target, BookOpen, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLeaderboard } from '@/hooks/useLeaderboard';
import { Skeleton } from '@/components/ui/skeleton';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function Leaderboard() {
  const { leaderboard, userRank, loading } = useLeaderboard();

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/10 border-yellow-500/30';
      case 2:
        return 'bg-gradient-to-r from-gray-400/20 to-gray-500/10 border-gray-400/30';
      case 3:
        return 'bg-gradient-to-r from-amber-600/20 to-amber-700/10 border-amber-600/30';
      default:
        return 'bg-card border-border';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <Trophy className="w-4 h-4" />
              <span className="text-sm font-medium">Leaderboard</span>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">Top Learners</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              See how you rank against other learners. Complete modules, pass quizzes, and earn points to climb the leaderboard!
            </p>
          </motion.div>

          {/* User's rank card */}
          {userRank && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8 p-6 rounded-xl border-2 border-primary bg-primary/5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">#{userRank.rank}</span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Your Rank</p>
                    <p className="font-semibold text-foreground">{userRank.display_name || 'You'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">{userRank.total_points}</p>
                  <p className="text-sm text-muted-foreground">points</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Stats legend */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {[
              { icon: Target, label: 'Points', color: 'text-primary' },
              { icon: BookOpen, label: 'Lessons', color: 'text-blue-500' },
              { icon: TrendingUp, label: 'Quizzes', color: 'text-green-500' },
              { icon: Flame, label: 'Avg Score', color: 'text-orange-500' }
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                <stat.icon className={cn("w-4 h-4", stat.color)} />
                <span>{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Leaderboard list */}
          <div className="space-y-3">
            {loading ? (
              Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} className="h-20 rounded-xl" />
              ))
            ) : leaderboard.length === 0 ? (
              <div className="text-center py-16">
                <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">No leaderboard data yet</p>
                <p className="text-sm text-muted-foreground mt-1">Start learning to appear on the leaderboard!</p>
              </div>
            ) : (
              leaderboard.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    "p-4 rounded-xl border transition-all hover:shadow-lg",
                    getRankBg(entry.rank),
                    userRank?.user_id === entry.user_id && "ring-2 ring-primary"
                  )}
                >
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div className="w-10 flex justify-center">
                      {getRankIcon(entry.rank)}
                    </div>

                    {/* Avatar and name */}
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={entry.avatar_url || undefined} />
                      <AvatarFallback>
                        {(entry.display_name || 'A')[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <p className="font-semibold text-foreground">
                        {entry.display_name || 'Anonymous'}
                        {userRank?.user_id === entry.user_id && (
                          <span className="ml-2 text-xs text-primary">(You)</span>
                        )}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          {entry.lessons_completed} lessons
                        </span>
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          {entry.quizzes_passed} quizzes
                        </span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="text-right">
                      <p className={cn(
                        "text-xl font-bold",
                        entry.rank <= 3 ? "text-primary" : "text-foreground"
                      )}>
                        {entry.total_points}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {Math.round(entry.average_quiz_score)}% avg
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
