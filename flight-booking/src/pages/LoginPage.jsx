import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../logo.svg";
import { CheckBox, FloatingLabel } from "../component/Form";
import { Button } from "../component/Button";
import { Link } from "react-router-dom";
import { LoadPage } from "../component/Loading";
import { useApp } from "../hook/Main";

function Header({ noback }) {
    const navigate = useNavigate();

    return (
        <>
            <div className="flex flex-rows justify-center align-middles">
                {noback ? null : (
                    <button
                        className="inline-block"
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        <svg
                            className="h-8 w-8 text-black"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M7 16l-4-4m0 0l4-4m-4 4h18"
                            />
                        </svg>
                    </button>
                )}
                <div className="flex items-center justify-center mt-3 mx-auto">
                    <img src={logo} className="w-16 h-16" alt="logo" />
                    <span className="text-3xl text-dark-800 font-semibold">
                        IVE airline
                    </span>
                </div>
            </div>
            <div className=" w-full border mt-1 mb-2"></div>
        </>
    );
}
export function SingIn() {
    const navigate = useNavigate();
    // get the previous page

    const email = useRef("");
    const password = useRef("");

    const [emailError, setEmailError] = useState(false);
    const [pwError, setPwError] = useState(false);
    const [emailErrorMsg, setEmailErrorMsg] = useState("");

    const _email = "210123456@stu.vtc.edu.hk";
    const _password = "TKkxNHrGs&!$t6+&";

    const [inputed_all, set_inputed_all] = useState(false);

    const app = useApp();

    return (
        <div className="h-screen flex">
            <div
                className="bg-white rounded-lg p-8 shadow-xl m-auto justify-center align-middle"
                style={{ width: "34rem" }}
            >
                <div className="flex flex-col justify-center m-auto">
                    <Header />
                    <h1 className="text-3xl font-medium text-start mt-3">
                        Sign in
                    </h1>
                    <span className="mt-3 text-start">
                        Get the best experience with our app
                    </span>

                    <FloatingLabel
                        placeholder={"Email"}
                        type="email"
                        id={"r_email"}
                        handler={(e) => {
                            setPwError(false)
                            email.current = e.target.value;
                            if (
                                email.current !== "" &&
                                password.current !== ""
                            ) {
                                set_inputed_all(true);
                            } else {
                                set_inputed_all(false);
                            }
                        }}
                        validate={!emailError}
                        error_message={emailErrorMsg}
                    />
                    <FloatingLabel
                        placeholder={"Password"}
                        type="password"
                        id={"s_password"}
                        handler={(e) => {
                            password.current = e.target.value;
                            if (
                                email.current !== "" &&
                                password.current !== ""
                            ) {
                                set_inputed_all(true);
                            } else {
                                set_inputed_all(false);
                            }
                        }}
                        validate={true}
                    />
                    <CheckBox
                        id="default-checkbox"
                        context="Keep me signed in"
                    />

                    <div>
                        <div className="text-sm text-gray-500">
                            Selecting this checkbox will keep you signed in for
                            30 days. If you are using a public or shared device,
                            uncheck this box to prevent unauthorized access to
                            your account.
                        </div>

                        <div className="text-sm text-black-500 mt-8">
                            By signing in, you agree to our
                            <span className="text-blue-600 cursor-pointer">
                                {" "}
                                Terms of Service
                            </span>
                            <span> and</span>
                            <span className="text-blue-600 cursor-pointer">
                                {" "}
                                Privacy Policy
                            </span>
                        </div>
                    </div>

                    <Button
                        onClick={() => {
                            if (
                                email.current === _email &&
                                password.current === _password
                            ) {
                                setEmailError(false);
                                setEmailErrorMsg("");
                                app.setLogin(true);
                                navigate("/");

                            } else if (!/\S+@\S+\.\S+/.test(email.current)) {
                                setEmailError(true);
                                setEmailErrorMsg("Email format is not valid");
                                document.getElementById("s_password").value = "";
                            } else {
                                setEmailError(true);
                                setEmailErrorMsg(
                                    "Email or password is incorrect"
                                );
                                document.getElementById("s_password").value = "";
                            }
                        }}
                        content="Sign in"
                        color={"primary"}
                        disable={!inputed_all}
                        style="w-full mt-5"
                    >
                        Sign in
                    </Button>

                    <div className="text-primary text-center text-sm">
                        <Link to="/forgot-pw" className="text-primary">
                            Forgot password?
                        </Link>
                    </div>

                    <div className="flex justify-center mt-5 text-center align-middle">
                        <span className="text-sm text-black-500">
                            Don't have an account?
                        </span>
                        <Link
                            to="/create-account"
                            className="text-blue-600 ml-1 text-sm"
                        >
                            Create one
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function SignUp() {
    const email = useRef("");
    const password = useRef("");
    const fname = useRef("");
    const lname = useRef("");

    const [password_error_msgs, set_password_error_msgs] = useState([]);

    // ingore the first render
    const [email_valid, set_email_valid] = useState(true);
    const [password_valid, set_password_valid] = useState(true);
    const [fname_valid, set_fname_valid] = useState(true);
    const [lname_valid, set_lname_valid] = useState(true);

    const [sucess, set_sucess] = useState(false);

    const [inputed_all, set_inputed_all] = useState(false);

    // when user press the "enter" key, system press the "Sign up" button
    useEffect(() => {
        document.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                document.getElementById("sign_up_btn").click();
            }
        });
    }, []);

    return (
        <div className="h-screen flex">
            <div
                className="bg-white rounded-lg p-8 shadow-xl m-auto justify-center align-middle"
                style={{ width: "34rem" }}
            >
                {!sucess ? (
                    <>
                        <Header />
                        <div className="flex flex-col justify-center m-auto">
                            <h1 className="text-3xl font-medium text-start mt-3">
                                Create an account
                            </h1>
                            <span className="mt-3 text-start">
                                Let start your journey with us
                            </span>

                            <FloatingLabel
                                placeholder={"Email"}
                                type="email"
                                id={"r_email"}
                                handler={(e) => {
                                    email.current = e.target.value;
                                    if (
                                        email.current !== "" &&
                                        password.current !== "" &&
                                        fname.current !== "" &&
                                        lname.current !== ""
                                    ) {
                                        set_inputed_all(true);
                                    } else {
                                        set_inputed_all(false);
                                    }
                                }}
                                validate={email_valid}
                                error_message="Email format is not valid"
                            />

                            <FloatingLabel
                                placeholder={"First Name"}
                                type="text"
                                id={"r_fname"}
                                handler={(e) => {
                                    fname.current = e.target.value;
                                    if (
                                        email.current !== "" &&
                                        password.current !== "" &&
                                        fname.current !== "" &&
                                        lname.current !== ""
                                    ) {
                                        set_inputed_all(true);
                                    } else {
                                        set_inputed_all(false);
                                    }
                                }}
                                validate={fname_valid}
                            />

                            <FloatingLabel
                                placeholder={"Last Name"}
                                type="text"
                                id={"r_lname"}
                                handler={(e) => {
                                    lname.current = e.target.value;
                                    if (
                                        email.current !== "" &&
                                        password.current !== "" &&
                                        fname.current !== "" &&
                                        lname.current !== ""
                                    ) {
                                        set_inputed_all(true);
                                    } else {
                                        set_inputed_all(false);
                                    }
                                }}
                                validate={lname_valid}
                            />
                            <FloatingLabel
                                placeholder={"Password"}
                                type="password"
                                id={"r_password"}
                                handler={(e) => {
                                    password.current = e.target.value;
                                    if (
                                        email.current !== "" &&
                                        password.current !== "" &&
                                        fname.current !== "" &&
                                        lname.current !== ""
                                    ) {
                                        set_inputed_all(true);
                                    } else {
                                        set_inputed_all(false);
                                    }
                                }}
                                validate={password_valid}
                                error_message={password_error_msgs}
                            />

                            <CheckBox
                                id="default-checkbox"
                                context="Keep me signed in"
                            />

                            <div>
                                <div className="text-sm text-gray-500">
                                    Selecting this checkbox will keep you signed
                                    in for 30 days. If you are using a public or
                                    shared device, uncheck this box to prevent
                                    unauthorized access to your account.
                                </div>

                                <div className="text-sm text-black-500 mt-8">
                                    By creating an account, you agree to our
                                    <span className="text-blue-600 cursor-pointer">
                                        {" "}
                                        Terms of Service
                                    </span>
                                    <span> and</span>
                                    <span className="text-blue-600 cursor-pointer">
                                        {" "}
                                        Privacy Policy
                                    </span>
                                </div>
                            </div>

                            <Button
                                content="Continue"
                                color={"primary"}
                                disable={!inputed_all}
                                style="w-full mt-5"
                                id="sign_up_btn"
                                onClick={() => {
                                    if (
                                        email.current === "" ||
                                        !/\S+@\S+\.\S+/.test(email.current)
                                    ) {
                                        set_email_valid(false);
                                    } else {
                                        set_email_valid(true);
                                    }

                                    const pw_err_msg = [];
                                    if (password.current === "") {
                                        pw_err_msg.push("Password is required");
                                    }
                                    if (password.current.length < 8) {
                                        pw_err_msg.push(
                                            "Password must be at least 8 characters"
                                        );
                                    }
                                    if (!/[A-Z]/.test(password.current)) {
                                        pw_err_msg.push(
                                            "Password must contain at least one uppercase letter"
                                        );
                                    }
                                    if (!/[a-z]/.test(password.current)) {
                                        pw_err_msg.push(
                                            "Password must contain at least one lowercase letter"
                                        );
                                    }
                                    if (!/[0-9]/.test(password.current)) {
                                        pw_err_msg.push(
                                            "Password must contain at least one number"
                                        );
                                    }
                                    if (
                                        !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
                                            password.current
                                        )
                                    ) {
                                        pw_err_msg.push(
                                            "Password must contain at least one special character"
                                        );
                                    }
                                    if (pw_err_msg.length > 0) {
                                        set_password_valid(false);
                                        set_password_error_msgs(pw_err_msg);
                                    } else {
                                        // forward user to sign in page
                                        set_password_valid(true);
                                        set_sucess(true);
                                    }
                                }}
                            >
                                Sign in
                            </Button>

                            <div className="flex justify-center mt-5 text-center align-middle">
                                <span className="text-sm text-black-500">
                                    Already have an account?
                                </span>
                                <a
                                    href="#"
                                    className="text-blue-600 ml-1 text-sm"
                                >
                                    <Link to="/login">Sign In</Link>
                                </a>
                            </div>
                            <div className="mb-5"></div>
                        </div>
                    </>
                ) : (
                    <LoadPage
                        page={<RegisterSuccess name={fname.current} />}
                        loading_time={3}
                        Preloaded={<Header noback/>}
                    />
                )}
            </div>
        </div>
    );
}

export function ForgotPassword() {
    const [email, set_email] = useState("");
    const [email_valid, set_email_valid] = useState(true);
    const [inputed_all, set_inputed_all] = useState(false);
    const [sucess, set_sucess] = useState(false);

    const navigate = useNavigate();
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-96 bg-white rounded-lg p-8 shadow-xl">

            {!sucess ? (
                    <>
                    <div className="flex justify-center align-middle flex-row mb-3">
                        <button
                            className="inline-block"
                            onClick={() => {
                                navigate(-1);
                            }}
                        >
                            <svg
                                className="h-6 w6 text-black"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M7 16l-4-4m0 0l4-4m-4 4h18"
                                />
                            </svg>
                        </button>
                        <h1 className="text-2xl font-bold text-center mx-auto">
                            Forgot Password
                        </h1>
                    </div>
                    <span className="mt-3 text-start">
                        Enter your email address and we will send you a link to
                        reset your password.
                    </span>

                    <FloatingLabel
                        placeholder={"Email"}
                        type="email"
                        id={"r_email"}
                        handler={(e) => {
                            set_email(e.target.value);
                            if (email === "") {
                                set_inputed_all(false);
                            } else {
                                set_inputed_all(true);
                            }
                        }}
                        validate={email_valid}
                        error_message="Email format is not valid"
                    />

                    <Button
                        content="Continue"
                        color={"primary"}
                        disable={!inputed_all}
                        style="w-full mt-5"
                        id="sign_up_btn"
                        onClick={() => {
                            if (email === "" || !/\S+@\S+\.\S+/.test(email)) {
                                set_email_valid(false);
                            } else {
                                set_email_valid(true);
                                set_sucess(true);
                            }
                        }}
                    >
                        Sign in
                    </Button>
                    </>
            ) : ( 
                <LoadPage
                    page={<ResetPwSuccess />}
                    Preloaded={<Header noback/>}
                    loading_time={3}
                    />
            )}
            </div>
        </div>
    );
}

function RegisterSuccess({ name }) {
    return (
        <div className="flex flex-col justify-center sm-auto mt-10">
            <Header noback />
            <h1 className="font-semibold text-3xl mt-5">Welcome, {name}</h1>
            <div className="text-sm text-black-500 mt-5">
                With your new IVE airline account, the world is at your
                fingertips.
                <br />
                We are excited to have you on board.
            </div>

            <div className="text-s text-black mt-5 text-center">
                Click{" "}
                <Link to="/login">
                    <span className="text-primary font-semibold">HERE</span>
                </Link>{" "}
                to sign in.
            </div>
        </div>
    );
}


function ResetPwSuccess() {
    return (
        <div className="flex flex-col justify-center sm-auto mt-10">
            <Header noback />
            <h1 className="font-semibold text-3xl mt-5">Password Reset</h1>
            <div className="text-sm text-black-500 mt-5">
                Your password has been reset 
                <span className="font-semibold"> successfully</span>.
                <br />
                Click{" "}
                <Link to="/login">
                    <span className="text-primary font-semibold">HERE</span>
                </Link>{" "}
                to sign in.
            </div>
        </div>
    );
}