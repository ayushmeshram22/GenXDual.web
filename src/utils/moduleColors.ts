// src/utils/moduleColors.ts

export const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Easy":
      return "bg-green-500/20 text-green-400 border-green-500/30";
    case "Medium":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    case "Hard":
      return "bg-red-500/20 text-red-400 border-red-500/30";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export const getTypeColor = (type: string) => {
  switch (type) {
    case "Offensive":
      return "bg-red-500/20 text-red-400 border-red-500/30";
    case "Defensive":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    case "Fundamental":
      return "bg-purple-500/20 text-purple-400 border-purple-500/30";
    case "General":
      return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
    default:
      return "bg-muted text-muted-foreground";
  }
};
