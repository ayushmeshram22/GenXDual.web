import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ModuleGrid } from "@/components/modules/ModuleGrid";
import { modules } from "@/data/modules"; 
import { getDifficultyColor, getTypeColor } from "@/utils/moduleColors";

const beginnerModules = modules.filter(
  (m) =>
    m.difficulty === "Easy" ||
    m.tier === "Tier 0" ||
    m.tier === "Tier I"
);

const Beginner = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32 pb-20 container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4 text-primary">
          Beginner Path
        </h1>
        <p className="text-muted-foreground mb-10">
          Start from zero and build strong cybersecurity foundations.
        </p>

        <ModuleGrid
          modules={beginnerModules}
          getDifficultyColor={getDifficultyColor}
          getTypeColor={getTypeColor}
        />
      </main>

      <Footer />
    </div>
  );
};

export default Beginner;
