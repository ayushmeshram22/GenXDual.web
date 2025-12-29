import { Users } from "lucide-react";
import ServiceTemplate from "./ServiceTemplate";

export default function RedTeam() {
  return (
    <ServiceTemplate
      icon={Users}
      title="Red Team Operations"
      description="Advanced adversary simulations that test your detection, response, and resilience against real attackers."
      points={[
        "Adversary emulation",
        "Social engineering campaigns",
        "C2 & evasion techniques",
        "Purple team collaboration",
        "Executive threat reporting",
      ]}
    />
  );
}
