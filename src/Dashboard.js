import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, signOut } from "aws-amplify/auth";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      console.log("Checking auth state...");
      const currentUser = await getCurrentUser();
      console.log("Current user:", currentUser);
      setUser(currentUser);
      setError(null);
    } catch (error) {
      console.log("User not authenticated, redirecting to login:", error);
      setError("Not authenticated");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/login");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <p>Error: {error}</p>
        <button onClick={() => navigate("/login")}>Go to Login</button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Dashboard</h1>
      {user ? (
        <>
          <p>Welcome, {user.signInDetails?.loginId || user.username || "User"}!</p>
          <p>User ID: {user.userId}</p>
          <button onClick={handleSignOut} style={{ marginTop: "20px" }}>
            Sign Out
          </button>
        </>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export default Dashboard;