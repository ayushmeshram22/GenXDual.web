import { Shield } from "lucide-react";
import ServiceTemplate from "./ServiceTemplate";

export default function BlueTeam() {
  return (
    <ServiceTemplate
      icon={Shield}
      title="Blue Team & SOC Services"
      description="Strengthen detection, response, and monitoring capabilities through defensive security services."
      points={[
        "SOC maturity assessment",
        "Incident response planning",
        "Threat detection engineering",
        "Log analysis & monitoring",
        "Continuous security improvement",
      ]}
    />
  );
}
