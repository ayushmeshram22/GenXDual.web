import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

import {
  Heart, Clock, Award, Search, Filter, ChevronDown, ChevronUp, X
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { modules } from "@/data/modules";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const levels = ["Level 1", "Level 2", "Level 3", "Level 4", "Level 5"];
const difficulties = ["Fundamental", "Easy", "Easy/Medium", "Medium", "Medium/Hard", "Hard"];
const types = ["Core", "Offensive", "Defensive", "General"];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Fundamental":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    case "Easy":
      return "bg-green-500/20 text-green-400 border-green-500/30";
    case "Easy/Medium":
      return "bg-lime-500/20 text-lime-400 border-lime-500/30";
    case "Medium":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    case "Medium/Hard":
      return "bg-orange-500/20 text-orange-400 border-orange-500/30";
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
    case "Core":
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
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  const filteredModules = modules.filter((module) => {
    const matchesSearch =
      module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.tier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.difficulty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (module.topics && module.topics.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesLevel = selectedLevel ? module.tier === selectedLevel : true;
    const matchesDifficulty = selectedDifficulty ? module.difficulty === selectedDifficulty : true;
    const matchesType = selectedType ? module.type === selectedType : true;

    return matchesSearch && matchesLevel && matchesDifficulty && matchesType;
  });

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedLevel(null);
    setSelectedDifficulty(null);
    setSelectedType(null);
  };

  const hasActiveFilters = searchQuery || selectedLevel || selectedDifficulty || selectedType;

  const toggleTopics = (title: string) => {
    setExpandedModule(expandedModule === title ? null : title);
  };

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
            <p className="text-sm text-muted-foreground mt-2">
              {filteredModules.length} of {modules.length} modules
            </p>
          </motion.div>

          {/* Filters */}
          <section className="py-6 border-y border-border bg-card/50 mb-10 rounded-lg px-4">
            <div className="flex flex-col gap-4">
              {/* Search Row */}
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search modules, topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Clear filters
                  </Button>
                )}
              </div>

              {/* Filter Dropdowns */}
              <div className="flex flex-wrap items-center gap-3">
                <Filter className="h-4 w-4 text-muted-foreground" />
                
                {/* Level Filter */}
                <Select
                  value={selectedLevel || "all"}
                  onValueChange={(value) => setSelectedLevel(value === "all" ? null : value)}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    {levels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Difficulty Filter */}
                <Select
                  value={selectedDifficulty || "all"}
                  onValueChange={(value) => setSelectedDifficulty(value === "all" ? null : value)}
                >
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Difficulties</SelectItem>
                    {difficulties.map((diff) => (
                      <SelectItem key={diff} value={diff}>
                        {diff}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Type Filter */}
                <Select
                  value={selectedType || "all"}
                  onValueChange={(value) => setSelectedType(value === "all" ? null : value)}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {types.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Active Filter Pills */}
              {hasActiveFilters && (
                <div className="flex flex-wrap gap-2">
                  {selectedLevel && (
                    <Badge variant="secondary" className="gap-1">
                      {selectedLevel}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedLevel(null)} />
                    </Badge>
                  )}
                  {selectedDifficulty && (
                    <Badge variant="secondary" className="gap-1">
                      {selectedDifficulty}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedDifficulty(null)} />
                    </Badge>
                  )}
                  {selectedType && (
                    <Badge variant="secondary" className="gap-1">
                      {selectedType}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedType(null)} />
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </section>

          {/* Module Cards Grid */}
          {filteredModules.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No modules found matching your criteria.</p>
              <Button variant="outline" onClick={clearFilters} className="mt-4">
                Clear all filters
              </Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredModules.map((module, index) => {
                const isExpanded = expandedModule === module.title;
                const Icon = module.icon;
                const topicsList = module.topics ? module.topics.split(", ") : [];
                const moduleHref = `/modules/learn/${module.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;

                return (
                  <motion.div
                    key={module.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.02 }}
                    className="group relative"
                  >
                    <div className="bg-card border border-border rounded-xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
                      {/* Card Header with Icon */}
                      <div className="relative bg-gradient-to-br from-muted/50 to-muted p-8 flex items-center justify-center min-h-[140px]">
                        {module.isNew && (
                          <Badge className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-0.5">
                            NEW
                          </Badge>
                        )}

                        <button className="absolute top-3 right-3 text-muted-foreground hover:text-red-400 transition-colors">
                          <Heart className="w-5 h-5" />
                        </button>

                        <Icon className="w-14 h-14 text-primary opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
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
                        </div>

                        {/* Stats Row */}
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {module.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Award className="w-4 h-4" />
                            +{module.points}
                          </span>
                          <span>{module.sections} sections</span>
                        </div>

                        {/* Topics Toggle */}
                        {topicsList.length > 0 && (
                          <button
                            onClick={() => toggleTopics(module.title)}
                            className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors mb-3"
                          >
                            {isExpanded ? (
                              <>
                                <ChevronUp className="w-4 h-4" />
                                Hide topics
                              </>
                            ) : (
                              <>
                                <ChevronDown className="w-4 h-4" />
                                View {topicsList.length} topics
                              </>
                            )}
                          </button>
                        )}

                        {/* Topics List */}
                        <AnimatePresence>
                          {isExpanded && topicsList.length > 0 && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="flex flex-wrap gap-1.5 mb-4 p-3 bg-muted/50 rounded-lg border border-border">
                                {topicsList.map((topic, i) => (
                                  <Badge
                                    key={i}
                                    variant="outline"
                                    className="text-xs bg-background/50 text-muted-foreground border-border"
                                  >
                                    {topic.trim()}
                                  </Badge>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Action Area */}
                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-border">
                          <span className="text-sm text-muted-foreground">
                            Free Access
                          </span>
                          <Link to={moduleHref}>
                            <Button size="sm" variant="outline">View Module</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Modules;