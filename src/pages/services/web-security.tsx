import { Globe } from "lucide-react";
import ServiceTemplate from "./ServiceTemplate";

export default function WebSecurity() {
  return (
    <ServiceTemplate
      icon={Globe}
      title="Web Application Security"
      description="Comprehensive assessment of web apps and APIs to identify vulnerabilities and logic flaws."
      points={[
        "OWASP Top 10 testing",
        "Business logic vulnerabilities",
        "API security testing",
        "Authentication & session issues",
        "Remediation guidance",
      ]}
    />
  );
}
