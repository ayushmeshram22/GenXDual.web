import { Target } from "lucide-react";
import ServiceTemplate from "./ServiceTemplate";

export default function PenetrationTesting() {
  return (
    <ServiceTemplate
      icon={Target}
      title="Penetration Testing"
      description="Real-world attack simulations to uncover vulnerabilities across networks, applications, and infrastructure."
      points={[
        "Network & infrastructure testing",
        "Web & API security testing",
        "Cloud penetration testing",
        "Privilege escalation & lateral movement",
        "Executive & technical reporting",
      ]}
    />
  );
}
