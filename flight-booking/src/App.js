import logo from "./logo.svg";
import "./App.css";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import AppProvider from "./services/AppProvider";
import { Routes, Route, Router  } from "react-router-dom";
import { NotFound, NotAllowed } from "./pages/http";
import { ForgotPassword, SingIn, SignUp } from "./pages/LoginPage";

function Main() {
    const [count, setCount] = useState(0); // useState will cause re-render

    return (
        <div className="App">
            <ul>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/create-account">Create Account</Link>
                </li>
                <li>
                    <Link to="/forgot-pw">Forgot Password</Link>
                </li>
            </ul>
        </div>
    );
}

function App() {
    return (
        <>
            <AppProvider>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/NotAllow" element={<NotAllowed />} />
                    <Route path="/login" element={<SingIn />} />
                    <Route path="/create-account" element={<SignUp />} />
                    <Route path="/forgot-pw" element={<ForgotPassword />} />
                </Routes>
            </AppProvider>
        </>
    );
}

export default App;
