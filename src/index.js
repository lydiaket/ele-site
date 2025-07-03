import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
// ✅ Modular import
import { Amplify } from "aws-amplify";

Amplify.configure({
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
});

// Debug: Log the configuration
console.log("Amplify configured with:", {
  userPoolId: "us-east-2_qFqFIbjDz",
  userPoolClientId: "6p72lr2g6tg5pv16cci9j7m5ov",
  domain: "us-east-2qfqfibjdz.auth.us-east-2.amazoncognito.com"
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);