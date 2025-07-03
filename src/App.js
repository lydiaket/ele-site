import React from "react";
import { Link, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Parents from "./Parents";
import Mentors from "./Mentors";
import Mentees from "./Mentees";
import Support from "./Support";
import Calendar from "./Calendar";
import Login from "./Login";
import Dashboard from "./Dashboard"; // Board members dashboard
import { getCurrentUser } from "aws-amplify/auth"; // Use Amplify instead
import PropTypes from "prop-types"; // Import PropTypes
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

// Private route wrapper using AWS Amplify (replaces react-oidc-context)
const PrivateRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(null);
    
    React.useEffect(() => {
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
        return <div>Loading...</div>; // Show loading while checking auth
    }
    
    return isAuthenticated ? children : <Navigate to="/login" />;
};

// Add prop-type validation for ESLint
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired, // Ensures children is a valid React node
};

function App() {
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
                            <li><Link to="/login">Login</Link></li>
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