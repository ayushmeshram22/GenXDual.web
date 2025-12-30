import { useState } from "react";
import { Button } from "@/components/ui/button";

const questions = [
  {
    question: "What does CIA stand for in cybersecurity?",
    options: [
      "Central Intelligence Agency",
      "Confidentiality, Integrity, Availability",
      "Control, Inspect, Allow",
      "Cyber Intelligence Authority"
    ],
    answer: 1,
  },
  {
    question: "Which attack uses fake emails to trick users?",
    options: ["Malware", "Phishing", "DDoS", "Spoofing"],
    answer: 1,
  },
  {
    question: "What protocol secures web traffic?",
    options: ["HTTP", "FTP", "HTTPS", "SMTP"],
    answer: 2,
  },
];

const CybersecurityTest = () => {
  const [selected, setSelected] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const score = questions.reduce((total, q, i) => {
    return total + (selected[i] === q.answer ? 1 : 0);
  }, 0);

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-3xl">

        <h1 className="text-3xl font-bold mb-6">
          Cybersecurity Final Test
        </h1>

        {questions.map((q, i) => (
          <div key={i} className="mb-6 border border-border rounded-lg p-4">
            <p className="font-medium mb-3">
              {i + 1}. {q.question}
            </p>

            {q.options.map((opt, idx) => (
              <label key={idx} className="block mb-2">
                <input
                  type="radio"
                  name={`q-${i}`}
                  disabled={submitted}
                  onChange={() =>
                    setSelected({ ...selected, [i]: idx })
                  }
                  className="mr-2"
                />
                {opt}
              </label>
            ))}
          </div>
        ))}

        {!submitted ? (
          <Button onClick={() => setSubmitted(true)}>
            Submit Test
          </Button>
        ) : (
          <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <p className="text-lg font-semibold">
              Your Score: {score} / {questions.length}
            </p>
            <p className="text-sm text-muted-foreground">
              {score >= 2 ? "✅ Passed" : "❌ Failed"}
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default CybersecurityTest;
