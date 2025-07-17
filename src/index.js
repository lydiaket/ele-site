import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { Amplify } from "aws-amplify";
// import awsExports from "./aws-exports"; // Temporarily commented out

// Configure ONLY auth first to test
const authOnlyConfig = {
  Auth: {
    Cognito: {
      userPoolId: "us-east-2_qFqFIbjDz",
      userPoolClientId: "6p72lr2g6tg5pv16cci9j7m5ov",
      loginWith: {
        oauth: {
          domain: "us-east-2qfqfibjdz.auth.us-east-2.amazoncognito.com",
          scopes: ["openid", "email", "phone"],
          redirectSignIn: ["http://localhost:3000/"],
          redirectSignOut: ["http://localhost:3000/"],
          responseType: "code",
        },
      },
    },
  },
};

console.log("🔧 Configuring Amplify with auth only...");
console.log("🔧 Auth config:", authOnlyConfig);

Amplify.configure(authOnlyConfig);

// Verify configuration was applied
setTimeout(() => {
  const config = Amplify.getConfig();
  console.log("✅ Final Amplify config:", config);
  console.log("✅ Auth specifically:", config.Auth);
  console.log("✅ OAuth specifically:", config.Auth?.Cognito?.loginWith?.oauth);
}, 100);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);