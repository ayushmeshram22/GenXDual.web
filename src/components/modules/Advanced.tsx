import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ModuleGrid } from "@/components/modules/ModuleGrid";
import { modules } from "@/data/modules";
import { getDifficultyColor, getTypeColor } from "@/utils/moduleColors";

const advancedModules = modules.filter(
  (m) => m.tier === "Tier III" && m.difficulty === "Hard"
);

export default function Advanced() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32 pb-20 container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4 text-primary">
          Advanced Path
        </h1>
        <p className="text-muted-foreground mb-10">
          Advanced penetration testing and red-team methodologies.
        </p>

        <ModuleGrid
          modules={advancedModules}
          getDifficultyColor={getDifficultyColor}
          getTypeColor={getTypeColor}
        />
      </main>

      <Footer />
    </div>
  );
}
