import { GraduationCap } from "lucide-react";
import ServiceTemplate from "./ServiceTemplate";

export default function AISecurity() {
  return (
    <ServiceTemplate
      icon={GraduationCap}
      title="AI Security Testing"
      description="Security assessment of AI and machine learning systems to ensure safe, resilient, and compliant deployments."
      points={[
        "Model abuse & prompt injection testing",
        "Data leakage & privacy risks",
        "Adversarial ML attacks",
        "AI pipeline security review",
        "Compliance & governance assessment",
      ]}
    />
  );
}
