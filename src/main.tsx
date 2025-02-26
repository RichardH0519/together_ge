import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "./global.css";
import App from "./App";
import PasswordProtection from "./auth/PasswordProtection";
import { ChatProvider } from "./components/avatar/useChat";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <PasswordProtection> */}
    <ChatProvider>
      <App />
    </ChatProvider>
    {/* </PasswordProtection> */}
  </StrictMode>
);
