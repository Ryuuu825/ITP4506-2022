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
import SingIn, { SignUp } from "./pages/LoginPage";

function Main() {
    const [count, setCount] = useState(0); // useState will cause re-render

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <button
                    onClick={() => setCount(count + 1)}
                    className="underline "
                >
                    Click Me (useState)
                </button>
                <span className="text-red-400/100"> {count}</span>
                <Success message={"Hello"} dismissable description={["Your password should be 8 len" , "Your password should be 8 len"]}/>

                <ButtonBadge context="You are shit" number={count} />

                <Floating
                    color="red"
                    path={
                        <Download />
                    }
                />

                <h2>
                    dkjfsfsdf
                    <TextBadge context="New" color="blue" />
                    <Pills context="New" color="blue" />
                </h2>
            </header>
        </div>
    );
}

function App() {
    const location = useLocation();
    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={<Main />}
                />
                <Route path="*" element={<NotFound />} />
                <Route path="/NotAllow" element={<NotAllowed />} />
                <Route path="/login" element={<SingIn />} />
                <Route path="/create-account" element={<SignUp />} />
            </Routes>
        </>
    );
}

export default App;
