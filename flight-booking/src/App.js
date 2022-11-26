import logo from "./logo.svg";
import "./App.css";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import AppProvider from "./services/AppProvider";
import { Routes, Route, Router  } from "react-router-dom";
import { NotFound, NotAllowed } from "./pages/http";
import { ForgotPassword, SingIn, SignUp, OperatorResetPw } from "./pages/LoginPage";
import Footor from "./layout/footer";
import SearchBox from "./layout/FilterBox";
import SearchPage from "./pages/SearchPage";
import { ToastContainer } from "react-toastify";
import TranscationPage from "./pages/TranscationPage";
import { AdminPageAccountManagement, AdminPageAccountManagement_AddUser, AdminPageIndex, AdminPageSetting } from "./pages/adminpage";

function Main() {

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
                <li>
                    <Link to="/operator/reset-pw">Operator Resets</Link>
                </li>
                <li>
                    <Link to="/index">LandingPage</Link>
                </li>
                <li>
                    <Link to="/search">SearchPage</Link>
                </li>
                <li>
                    <Link to="/transcation">TranscationPage</Link>
                </li>
            </ul>
        </div>
    );
}

function App() {
    return (
        <>
            <div className="z-[999] absolute">
                <ToastContainer />
            </div>
            <AppProvider>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/NotAllow" element={<NotAllowed />} />
                    <Route path="/login" element={<SingIn />} />
                    <Route path="/index" element={<LandingPage />} />
                    <Route path="/create-account" element={<SignUp />} />
                    <Route path="/forgot-pw" element={<ForgotPassword />} />
                    <Route path="/operator">
                        <Route path="reset-pw" element={<OperatorResetPw />} />
                    </Route>
                    <Route path="/admin">
                        <Route index element={<AdminPageIndex />} />
                        <Route path="setting" element={<AdminPageSetting />} />
                        <Route path="users">
                            <Route index element={<AdminPageAccountManagement />} />
                        </Route>
                    </Route>
                    <Route path="/search/:dest/:date"  element={<SearchPage />} />
                    <Route path="/transcation"  element={<TranscationPage />} />
                </Routes>
                <Footor />
            </AppProvider>
        </>
    );
}

export default App;
