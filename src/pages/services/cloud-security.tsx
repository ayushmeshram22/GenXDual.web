import { Cloud } from "lucide-react";
import ServiceTemplate from "./ServiceTemplate";

export default function CloudSecurity() {
  return (
    <ServiceTemplate
      icon={Cloud}
      title="Cloud Security Assessments"
      description="Evaluate cloud environments for misconfigurations, access risks, and compliance gaps."
      points={[
        "AWS, Azure & GCP security review",
        "IAM & access control analysis",
        "Container & Kubernetes security",
        "Cloud incident readiness",
        "Compliance validation",
      ]}
    />
  );
}
