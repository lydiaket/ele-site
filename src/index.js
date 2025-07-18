import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { Amplify } from "aws-amplify";

// FORCE CLEAR EVERYTHING
console.log("🚨 FORCING AMPLIFY CLEAR");
Amplify.configure({});

const authOnlyConfig = {
  Auth: {
    Cognito: {
      userPoolId: "us-east-2_qFqFIbjDz",
      userPoolClientId: "6p72lr2g6tg5pv16cci9j7m5ov",
      loginWith: {
        oauth: {
          domain: "us-east-2qfqfibjdz.auth.us-east-2.amazoncognito.com",
          scopes: ["openid", "email", "phone"],
          redirectSignIn: [
            "http://localhost:3000/dashboard",
            "https://elementors.org/dashboard",
            "https://www.elementors.org/dashboard"
          ],
          redirectSignOut: [
            "http://localhost:3000/",
            "https://elementors.org/",
            "https://www.elementors.org/"
          ],
          responseType: "code",
        },
      },
    },
  },
};

console.log("🔧 Auth config BEFORE applying:", authOnlyConfig.Auth.Cognito.loginWith.oauth);
console.log("🔧 redirectSignIn array:", authOnlyConfig.Auth.Cognito.loginWith.oauth.redirectSignIn);
console.log("🔧 Array length:", authOnlyConfig.Auth.Cognito.loginWith.oauth.redirectSignIn.length);

Amplify.configure(authOnlyConfig);


console.log("🔧 Applied auth config!");

// Check immediately
const immediateConfig = Amplify.getConfig();
console.log("🔧 IMMEDIATE check:", immediateConfig.Auth?.Cognito?.loginWith?.oauth);


// Verify configuration was applied
setTimeout(() => {
  const config = Amplify.getConfig();
  console.log("Final Amplify config:", config);
  console.log("Auth specifically:", config.Auth);
  console.log("OAuth specifically:", config.Auth?.Cognito?.loginWith?.oauth);
}, 100);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);