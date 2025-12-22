import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./App.tsx";
import "./index.css";
import { ClerkProvider } from '@clerk/clerk-react';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    {/* <ClerkProvider>
        
    </ClerkProvider> */}
  </StrictMode>
);
