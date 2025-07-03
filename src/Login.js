import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithRedirect,
  signOut,
  getCurrentUser,
  // fetchAuthSession,
} from "aws-amplify/auth";

const Login = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthState();
  }, [navigate]);

  const checkAuthState = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      // User is authenticated, redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      // Check if we're returning from OAuth flow
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('code')) {
        // OAuth callback with code, wait a moment for Amplify to process
        setTimeout(() => {
          getCurrentUser()
            .then((userData) => {
              setUser(userData);
              navigate("/dashboard");
            })
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
        }, 1000);
        return;
      }
      console.log("User not authenticated");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    try {
      console.log("Attempting to sign in with redirect...");
      await signInWithRedirect({ provider: 'Cognito' });
      console.log("signInWithRedirect called successfully");
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      {user ? (
        <>
          <h1>Welcome, {user.signInDetails?.loginId || user.username}</h1>
          <button onClick={handleSignOut}>Sign Out</button>
        </>
      ) : (
        <button onClick={handleSignIn}>Sign In</button>
      )}
    </div>
  );
};

export default Login;