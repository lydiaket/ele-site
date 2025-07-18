import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// Import Amplify
import { Amplify } from "aws-amplify";

// 💣 NUCLEAR OPTION: Completely bypass any auto-configuration
console.log("🚨 NUCLEAR AMPLIFY CONFIG - Bypassing all auto-config");

// Force clear any existing configuration multiple times
Amplify.configure({});
Amplify.configure({});
Amplify.configure({});

// Our configuration
const authConfig = {
  Auth: {
    Cognito: {
      userPoolId: "us-east-2_qFqFIbjDz",
      userPoolClientId: "6p72lr2g6tg5pv16cci9j7m5ov",
      loginWith: {
        oauth: {
          domain: "us-east-2qfqfibjdz.auth.us-east-2.amazoncognito.com",
          scopes: ["openid", "email", "phone"],
          redirectSignIn: [
            "https://elementors.org/dashboard",
            "https://www.elementors.org/dashboard",
            "http://localhost:3000/dashboard"
          ],
          redirectSignOut: [
            "https://elementors.org/",
            "https://www.elementors.org/", 
            "http://localhost:3000/"
          ],
          responseType: "code",
        },
      },
    },
  },
};

console.log("🚨 NUCLEAR: redirectSignIn array:", authConfig.Auth.Cognito.loginWith.oauth.redirectSignIn);
console.log("🚨 NUCLEAR: Array length:", authConfig.Auth.Cognito.loginWith.oauth.redirectSignIn.length);

// Apply configuration aggressively
Amplify.configure(authConfig);

// Verify immediately
setTimeout(() => {
  const config = Amplify.getConfig();
  console.log("🚨 NUCLEAR RESULT:", config.Auth?.Cognito?.loginWith?.oauth);
  console.log("🚨 NUCLEAR redirectSignIn:", config.Auth?.Cognito?.loginWith?.oauth?.redirectSignIn);
}, 50);

// Verify again after a longer delay
setTimeout(() => {
  const config = Amplify.getConfig();
  console.log("🚨 NUCLEAR FINAL CHECK:", config.Auth?.Cognito?.loginWith?.oauth?.redirectSignIn);
}, 500);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);