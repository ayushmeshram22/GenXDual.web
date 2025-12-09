import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Shield, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="text-center relative z-10 px-4">
        <Shield className="w-20 h-20 text-primary/30 mx-auto mb-6" />
        <h1 className="text-8xl font-bold text-primary cyber-glow-text mb-4">404</h1>
        <p className="text-2xl font-semibold text-foreground mb-2">Access Denied</p>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved to a secure location.
        </p>
        <Button variant="cyber" asChild>
          <Link to="/" className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
