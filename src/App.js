import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Parents from "./Parents";
import Mentors from "./Mentors";
import Mentees from "./Mentees";
import Support from "./Support";
import Calendar from "./Calendar";
import AdminLogin from "./AdminLogin";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <nav className="App-nav">
                    <div className="App-nav-left">
                        <Link to="/">
                            <img src="/logo.png" alt="Logo" className="logo" />
                        </Link>
                    </div>

                    <ul className="App-nav-center">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About Us</Link>
                        </li>
                        <li>
                            <Link to="/mentees">Apply</Link>
                        </li>
                        <li>
                            <Link to="/parents">Parents</Link>
                        </li>
                        <li>
                            <Link to="/mentors">Become a Mentor</Link>
                        </li>
                        <li>
                            <Link to="/support">Support Us</Link>
                        </li>
                    </ul>

                    <ul className="App-nav-right"></ul>
                </nav>
            </header>

            <main className="App-content">
                <Routes>
                    {/* Public pages */}
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/parents" element={<Parents />} />
                    <Route path="/mentors" element={<Mentors />} />
                    <Route path="/mentees" element={<Mentees />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/support" element={<Support />} />

                    {/* Admin login */}
                    <Route
                        path="/admin/login"
                        element={<AdminLogin />}
                    />

                    {/* Protected admin dashboard */}
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </main>

            <footer className="app-footer">
            <div className="footer-content">
                <div className="footer-section contact-info">
                    <p>
                        <FontAwesomeIcon icon={faEnvelope} />{" "}
                        <a href="mailto:Egnaleegnamentors@gmail.com">
                            Egnaleegnamentors@gmail.com
                        </a>
                    </p>

                    <p>
                        <FontAwesomeIcon icon={faInstagram} />{" "}
                        <a
                            href="https://www.instagram.com/ele_mentors"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            @ele_mentors
                        </a>
                    </p>

                    <p>
                        &copy; {new Date().getFullYear()} Egna Le Egna. All rights reserved.
                    </p>

                    <p className="footer-admin-link">
                        <Link to="/admin/login">Admin</Link>
                    </p>
                </div>
            </div>
</footer>
        </div>
    );
}

export default App;