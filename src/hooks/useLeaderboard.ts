import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface LeaderboardEntry {
  id: string;
  user_id: string;
  total_points: number;
  modules_completed: number;
  lessons_completed: number;
  quizzes_passed: number;
  average_quiz_score: number;
  streak_days: number;
  display_name: string | null;
  avatar_url: string | null;
  rank: number;
}

export function useLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [userRank, setUserRank] = useState<LeaderboardEntry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      // Fetch engagement stats with profile info
      const { data: engagementData, error: engagementError } = await supabase
        .from('user_engagement')
        .select('*')
        .order('total_points', { ascending: false })
        .limit(100);

      if (engagementError) {
        console.error('Error fetching leaderboard:', engagementError);
        setLoading(false);
        return;
      }

      // Fetch profile info for each user
      const userIds = engagementData?.map(e => e.user_id) || [];
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('user_id, display_name, avatar_url')
        .in('user_id', userIds);

      const profileMap = new Map(profilesData?.map(p => [p.user_id, p]) || []);

      const leaderboardEntries: LeaderboardEntry[] = (engagementData || []).map((entry, index) => {
        const profile = profileMap.get(entry.user_id);
        return {
          ...entry,
          display_name: profile?.display_name || 'Anonymous',
          avatar_url: profile?.avatar_url || null,
          rank: index + 1,
          average_quiz_score: Number(entry.average_quiz_score) || 0
        };
      });

      setLeaderboard(leaderboardEntries);

      // Get current user's rank
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const userEntry = leaderboardEntries.find(e => e.user_id === user.id);
        setUserRank(userEntry || null);
      }

      setLoading(false);
    };

    fetchLeaderboard();
  }, []);

  return {
    leaderboard,
    userRank,
    loading
  };
}
