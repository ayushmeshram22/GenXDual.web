import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
  Shield, Lock, Network, Terminal, Globe, Server,
  Code, FileCode, Bug, Target, Heart, Clock, Award, Search, Filter
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const levels = ["Tier 0", "Tier I", "Tier II", "Tier III"];
const categories = ["Fundamental", "General", "Offensive", "Defensive"];

const modules = [
  {
    title: "Introduction to Cybersecurity",
    icon: Shield,
    tier: "Tier 0",
    difficulty: "Easy",
    type: "Fundamental",
    sections: 12,
    points: 50,
    duration: "2 hours",
    isNew: true,
    href: "/modules/cybersecurity",
  },
  {
    title: "Cybersecurity Basics",
    icon: Shield,
    tier: "Tier 0",
    difficulty: "Easy",
    type: "Fundamental",
    sections: 4,
    points: 40,
    duration: "1.5 hours",
    isNew: true,
    href: "/modules/learn/cybersecurity-basics",
  },
  {
    title: "Security Concepts & Terminology",
    icon: Shield,
    tier: "Tier 0",
    difficulty: "Easy",
    type: "Fundamental",
    sections: 10,
    points: 40,
    duration: "2 hours",
    isNew: false,
    href: "/modules/learn/security-concepts",
  },
  {
    title: "Network Fundamentals",
    icon: Network,
    tier: "Tier I",
    difficulty: "Medium",
    type: "General",
    sections: 18,
    points: 100,
    duration: "4 hours",
    isNew: true,
    href: "/modules/learn/network-fundamentals",
  },
  {
    title: "TCP/IP Model",
    icon: Server,
    tier: "Tier I",
    difficulty: "Medium",
    type: "General",
    sections: 14,
    points: 80,
    duration: "3 hours",
    isNew: false,
    href: "/modules/learn/tcp-ip-model",
  },
  {
    title: "OSI Model",
    icon: Server,
    tier: "Tier I",
    difficulty: "Medium",
    type: "General",
    sections: 12,
    points: 70,
    duration: "3 hours",
    isNew: false,
    href: "/modules/learn/osi-model",
  },
  {
    title: "DNS Basics",
    icon: Globe,
    tier: "Tier I",
    difficulty: "Easy",
    type: "General",
    sections: 8,
    points: 40,
    duration: "1.5 hours",
    isNew: false,
    href: "/modules/learn/dns-basics",
  },
  {
    title: "HTTP & HTTPS",
    icon: Globe,
    tier: "Tier I",
    difficulty: "Medium",
    type: "General",
    sections: 10,
    points: 60,
    duration: "2 hours",
    isNew: true,
    href: "/modules/learn/http-https",
  },
  {
    title: "Linux Fundamentals",
    icon: Terminal,
    tier: "Tier I",
    difficulty: "Medium",
    type: "Offensive",
    sections: 8,
    points: 150,
    duration: "5 hours",
    isNew: true,
    href: "/modules/learn/linux-fundamentals",
  },
  {
    title: "Windows Fundamentals",
    icon: Terminal,
    tier: "Tier I",
    difficulty: "Medium",
    type: "Defensive",
    sections: 18,
    points: 120,
    duration: "4 hours",
    isNew: false,
    href: "/modules/learn/windows-fundamentals",
  },
  {
    title: "macOS Basics",
    icon: Terminal,
    tier: "Tier I",
    difficulty: "Easy",
    type: "General",
    sections: 12,
    points: 60,
    duration: "2.5 hours",
    isNew: false,
    href: "/modules/learn/macos-basics",
  },
  {
    title: "Python Fundamentals",
    icon: Code,
    tier: "Tier II",
    difficulty: "Medium",
    type: "Offensive",
    sections: 25,
    points: 200,
    duration: "6 hours",
    isNew: true,
    href: "/modules/learn/python-fundamentals",
  },
  {
    title: "Bash Basics",
    icon: FileCode,
    tier: "Tier I",
    difficulty: "Medium",
    type: "Offensive",
    sections: 15,
    points: 100,
    duration: "3 hours",
    isNew: false,
    href: "/modules/learn/bash-basics",
  },
  {
    title: "JavaScript Basics",
    icon: Code,
    tier: "Tier II",
    difficulty: "Medium",
    type: "General",
    sections: 20,
    points: 150,
    duration: "5 hours",
    isNew: false,
    href: "/modules/learn/javascript-basics",
  },
  {
    title: "Web Application Basics",
    icon: Globe,
    tier: "Tier II",
    difficulty: "Medium",
    type: "Offensive",
    sections: 16,
    points: 120,
    duration: "4 hours",
    isNew: true,
    href: "/modules/learn/web-application-basics",
  },
  {
    title: "Web Requests",
    icon: Globe,
    tier: "Tier II",
    difficulty: "Medium",
    type: "Offensive",
    sections: 12,
    points: 80,
    duration: "3 hours",
    isNew: false,
    href: "/modules/learn/web-requests",
  },
  {
    title: "Sessions & Cookies",
    icon: Lock,
    tier: "Tier II",
    difficulty: "Medium",
    type: "Offensive",
    sections: 10,
    points: 70,
    duration: "2.5 hours",
    isNew: false,
    href: "/modules/learn/sessions-cookies",
  },
  {
    title: "Cyber Kill Chain",
    icon: Target,
    tier: "Tier III",
    difficulty: "Hard",
    type: "Offensive",
    sections: 14,
    points: 150,
    duration: "4 hours",
    isNew: true,
    href: "/modules/learn/cyber-kill-chain",
  },
  {
    title: "Penetration Testing Methodology",
    icon: Bug,
    tier: "Tier III",
    difficulty: "Hard",
    type: "Offensive",
    sections: 22,
    points: 250,
    duration: "7 hours",
    isNew: true,
    href: "/modules/learn/penetration-testing",
  },
];

const getDifficultyColor = (difficulty: string) => {
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

const getTypeColor = (type: string) => {
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

const Modules = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredModules = modules.filter((module) => {
    const matchesSearch =
      module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.tier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.difficulty.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLevel = selectedLevel ? module.tier === selectedLevel : true;
    const matchesCategory = selectedCategory ? module.type === selectedCategory : true;

    return matchesSearch && matchesLevel && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-primary font-medium tracking-widest mb-4">
              ALL LEARNING PATHS
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Cybersecurity Modules
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Master cybersecurity from fundamentals to advanced penetration testing with our structured learning modules
            </p>
          </motion.div>

          {/* Filters */}
          <section className="py-8 border-y border-border bg-card/50 mb-10">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">

              {/* Search */}
              <div className="relative w-full lg:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search modules..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Level Filter */}
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Button
                  size="sm"
                  variant={selectedLevel === null ? "default" : "ghost"}
                  onClick={() => setSelectedLevel(null)}
                >
                  All
                </Button>
                {levels.map((level) => (
                  <Button
                    key={level}
                    size="sm"
                    variant={selectedLevel === level ? "default" : "ghost"}
                    onClick={() => setSelectedLevel(level)}
                  >
                    {level}
                  </Button>
                ))}
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant={selectedCategory === null ? "default" : "ghost"}
                  onClick={() => setSelectedCategory(null)}
                >
                  All
                </Button>
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    size="sm"
                    variant={selectedCategory === cat ? "default" : "ghost"}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>
          </section>

          {/* Module Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModules.map((module, index) => (
              <motion.div
                key={module.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative"
              >
                <div className="bg-card border border-border rounded-xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
                  {/* Card Header with Icon */}
                  <div className="relative bg-gradient-to-br from-muted/50 to-muted p-8 flex items-center justify-center min-h-[160px]">
                    {module.isNew && (
                      <Badge className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-0.5">
                        NEW
                      </Badge>
                    )}

                    <button className="absolute top-3 right-3 text-muted-foreground hover:text-red-400 transition-colors">
                      <Heart className="w-5 h-5" />
                    </button>

                    {(() => {
                      const Icon = module.icon;
                      return (
                        <Icon className="w-16 h-16 text-primary opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                      );
                    })()}
                  </div>


                  {/* Card Content */}
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold text-foreground mb-3 line-clamp-2">
                      {module.title}
                    </h3>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30">
                        {module.tier}
                      </Badge>
                      <Badge variant="outline" className={`text-xs ${getDifficultyColor(module.difficulty)}`}>
                        {module.difficulty}
                      </Badge>
                      <Badge variant="outline" className={`text-xs ${getTypeColor(module.type)}`}>
                        {module.type}
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-muted text-muted-foreground">
                        {module.sections} Sections
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30">
                        <Award className="w-3 h-3 mr-1" />
                        +{module.points}
                      </Badge>
                    </div>

                    {/* Duration */}
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
                      <Clock className="w-4 h-4" />
                      <span>{module.duration}</span>
                    </div>

                    {/* Action Area */}
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-sm text-muted-foreground">
                        Free Access
                      </span>
                      <Link to={module.href}>
                        <Button size="sm" variant="outline">View Module</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Modules;
