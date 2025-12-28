import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./App.tsx";
import "./index.css";
import { ClerkProvider } from '@clerk/clerk-react';

const PUBLISHABLE_KEY="pk_test_ZWxlZ2FudC1jaWNhZGEtMi5jbGVyay5hY2NvdW50cy5kZXYk";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
  </StrictMode>
);
