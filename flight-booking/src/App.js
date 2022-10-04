import logo from "./logo.svg";
import "./App.css";
import { useState, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { InputText } from "./component/InputGroup";
import { NotFound, NotAllowed } from "./pages/http";
import Nav from "./layout/Nav";
import { LoadPage } from "./component/Loading";
import { Success, Warning , Error} from "./component/feedback";
import { ButtonBadge, TextBadge, Pills } from "./component/Badge";
import { Button, Floating } from "./component/Button";
import { Download } from "./component/SVGPath";
import SingIn, { ForgotPassword, SignUp } from "./pages/LoginPage";
import { Link } from "react-router-dom";

function Main() {
    const [count, setCount] = useState(0); // useState will cause re-render

    return (
        <div className="App">
           <ul>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/create-account">Create Account</Link></li>
                <li><Link to="/forgot-pw">Forgot Password</Link></li>
           </ul>
        </div>
    );
}

function App() {
    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={<ForgotPassword />}
                />
                <Route path="*" element={<NotFound />} />
                <Route path="/NotAllow" element={<NotAllowed />} />
                <Route path="/login" element={<SingIn />} />
                <Route path="/create-account" element={<SignUp />} />
                <Route path="/forgot-pw" element={<ForgotPassword />} />
            </Routes>
        </>
    );
}

export default App;
