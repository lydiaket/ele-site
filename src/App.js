import React, { useEffect, useState } from "react";
import { Link, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Parents from "./Parents";
import Mentors from "./Mentors";
import Mentees from "./Mentees";
import Support from "./Support";
import Calendar from "./Calendar";
import Login from "./Login";
import Dashboard from "./components/Dashboard"; // Board members dashboard
import DatabaseTest from './components/DatabaseTest';
import GraphQLTest from './components/GraphQLTest';
import ApiTest from './components/ApiTest';
import { getCurrentUser, signOut } from "aws-amplify/auth";
import PropTypes from "prop-types";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

// Private route wrapper using AWS Amplify
const PrivateRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(null);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            await getCurrentUser();
            setIsAuthenticated(true);
        } catch (error) {
            setIsAuthenticated(false);
        }
    };

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? children : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

function App() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const currentUser = await getCurrentUser();
                setUser(currentUser);
            } catch {
                setUser(null);
            }
        };
        fetchUser();
    }, []);

    const handleSignOut = async () => {
        try {
            await signOut();
            setUser(null);
            navigate("/login");
        } catch (error) {
            console.error("Sign out error:", error);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <nav className="App-nav">
                    <div className="App-nav-left">
                        <Link to="/">
                            <img src="logo.png" alt="Logo" className="logo" />
                        </Link>
                    </div>
                    <ul className="App-nav-center">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/mentees">Apply</Link></li>
                        <li><Link to="/parents">Parents</Link></li>
                        <li><Link to="/mentors">Become a Mentor</Link></li>
                        <li><Link to="/support">Support Us</Link></li>
                    </ul>
                    <ul className="App-nav-right">
                        {user ? (
                            <>
                                <li>
                                    <Link to="/dashboard" className="dashboard-link">
                                        Admin Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <button className="signout-button" onClick={handleSignOut}>
                                        Sign Out ({user.signInDetails?.loginId || user.username || "User"})
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li><Link to="/login">Login</Link></li>
                        )}
                    </ul>
                </nav>
            </header>

            <main className="App-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/parents" element={<Parents />} />
                    <Route path="/mentors" element={<Mentors />} />
                    <Route path="/mentees" element={<Mentees />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                    <Route path="/db-test" element={<DatabaseTest />} />
                    <Route path="/graphql-test" element={<GraphQLTest />} />
                    <Route path="/api-test" element={<ApiTest />} />
                </Routes>
            </main>

            <footer className="app-footer">
                <div className="footer-content">
                    <div className="footer-section contact-info">
                        <p>
                            <FontAwesomeIcon icon={faEnvelope} />{" "}
                            <a href="mailto:Egnaleegnamentors@gmail.com">Egnaleegnamentors@gmail.com</a>
                        </p>
                        <p>
                            <FontAwesomeIcon icon={faInstagram} />{" "}
                            <a href="https://www.instagram.com/ele_mentors" target="_blank" rel="noopener noreferrer">
                                @ele_mentors
                            </a>
                        </p>
                    </div>
                    <div className="footer-section copyright">
                        <p>&copy; {new Date().getFullYear()} Egna Le Egna. All rights reserved.</p>
                    </div>
                </div>
            </footer>
            
        </div>
    );
}

export default App;
