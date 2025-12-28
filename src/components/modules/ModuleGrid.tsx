import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Award, Heart } from "lucide-react";

interface ModuleGridProps {
  modules: any[];
  getDifficultyColor: (d: string) => string;
  getTypeColor: (t: string) => string;
}

export const ModuleGrid = ({
  modules,
  getDifficultyColor,
  getTypeColor,
}: ModuleGridProps) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {modules.map((module, index) => (
        <motion.div
          key={module.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
          className="group relative"
        >
          <div className="bg-card border border-border rounded-xl h-full flex flex-col hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
            {/* Header */}
            <div className="relative bg-muted p-8 flex justify-center min-h-[150px]">
              <module.icon className="w-14 h-14 text-primary" />
              <button className="absolute top-3 right-3 text-muted-foreground hover:text-red-400">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="font-semibold mb-3">{module.title}</h3>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline">{module.tier}</Badge>
                <Badge variant="outline" className={getDifficultyColor(module.difficulty)}>
                  {module.difficulty}
                </Badge>
                <Badge variant="outline" className={getTypeColor(module.type)}>
                  {module.type}
                </Badge>
                <Badge variant="outline">
                  <Award className="w-3 h-3 mr-1" /> {module.points}
                </Badge>
              </div>

              <div className="flex items-center text-sm text-muted-foreground mb-4">
                <Clock className="w-4 h-4 mr-1" />
                {module.duration}
              </div>

              <Button variant="outline" size="sm" className="mt-auto">
                Coming Soon
              </Button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
