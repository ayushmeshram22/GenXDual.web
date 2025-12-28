import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ModuleGrid } from "@/components/modules/ModuleGrid";
import { modules } from "@/data/modules";
import { getDifficultyColor, getTypeColor } from "@/utils/moduleColors";

const intermediateModules = modules.filter(
  (m) => m.tier === "Tier II" && m.difficulty === "Medium"
);

export default function Intermediate() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32 pb-20 container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4 text-primary">
          Intermediate Path
        </h1>
        <p className="text-muted-foreground mb-10">
          Hands-on skills, scripting, and real-world attack concepts.
        </p>

        <ModuleGrid
          modules={intermediateModules}
          getDifficultyColor={getDifficultyColor}
          getTypeColor={getTypeColor}
        />
      </main>

      <Footer />
    </div>
  );
}
