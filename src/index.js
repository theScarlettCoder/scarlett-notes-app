import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { ModalContextProvider } from "./context/ModalContext";
import { MobileContextProvider } from "./context/MobileContext";
import { AuthContextProvider } from "./context/AuthContext";
import { TodoContextProvider } from "./context/TodoContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <TodoContextProvider>
        <MobileContextProvider>
          <ModalContextProvider>
            <App />
          </ModalContextProvider>
        </MobileContextProvider>
      </TodoContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
