import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { Amplify } from "aws-amplify";

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