import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../logo.svg";
import { CheckBox, FloatingLabel } from "../component/Form";
import { Button } from "../component/Button";
import { Link } from "react-router-dom";
import { LoadPage } from "../component/Loading";
import { useApp } from "../hook/Main";
import UserAccount from "../db/users.json";
import PageLogo from "../component/Logo";
import Tooltips from "../component/tooltips";

const validatePassword = (password) => {
    let pw_err_msg = "";
    if (password === "") {
        pw_err_msg = "Password is required";
        return pw_err_msg;
    }

    if (password.length < 8) {
        pw_err_msg = "Password must be at least 8 characters";
        return pw_err_msg;
    }

    let temp_str = "Password must contain at least one of the following: ";

    if (!/[A-Z]/.test(password)) {
        temp_str += "uppercase letter, ";
        pw_err_msg = temp_str;
    }
    if (!/[a-z]/.test(password)) {
        temp_str += "lowercase letter, ";
        pw_err_msg = temp_str;
    }
    if (!/[0-9]/.test(password)) {
        temp_str += "number, ";
        pw_err_msg = temp_str;
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        temp_str += "special character, ";
        pw_err_msg = temp_str;
    }

    if (pw_err_msg !== "") {
        pw_err_msg = pw_err_msg.slice(0, -2);
        pw_err_msg += ".";
    }

    return pw_err_msg;
};

function Header({ noback }) {
    const navigate = useNavigate();

    return (
        <>
            <div className="flex flex-rows justify-center align-middles mb-3">
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
                    <PageLogo />
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

    const [inputed_all, set_inputed_all] = useState(false);

    const app = useApp();
    app.setDisableFooter(true);

    document.title = "Login | IVE Airline";

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
                            setPwError(false);
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
                            const potential_user = UserAccount.find(
                                (user) => user.email === email.current
                            );
                            if (potential_user) {
                                if (
                                    potential_user.password === password.current
                                ) {
                                    app.setLogin(true);
                                    app.setUser(potential_user.name);
                                    if (potential_user.name === "operator") {
                                        navigate("/operator/reset-pw");
                                    } else {
                                        navigate("/index");
                                    }
                                } else {
                                    setPwError(true);
                                    document.getElementById(
                                        "s_password"
                                    ).value = "";
                                }
                            } else {
                                setEmailError(true);
                                setEmailErrorMsg("Email not found");
                                document.getElementById("s_password").value =
                                    "";
                            }

                            if (!/\S+@\S+\.\S+/.test(email.current)) {
                                setEmailError(true);
                                setEmailErrorMsg("Email format is not valid");
                                document.getElementById("s_password").value =
                                    "";
                            }
                        }}
                        content="Sign in"
                        color={"primary"}
                        disable={!inputed_all}
                        style="w-full mt-5"
                    >
                        Sign in
                    </Button>

                    <div className="text-primary text-center text-sm mt-3">
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

function AskOtherInfo() {
    const [finsihed, setFinished] = useState(false);

    if (finsihed) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-100 bg-white rounded-lg p-8 shadow-xl">
                    <LoadPage
                        page={<RegisterSuccess />}
                        Preloaded={<Header noback />}
                        loading_time={1}
                    />
                </div>
            </div>
        );
    } else {
        return (
            <>
                <Header noback />
                <div
                    className="bg-white  p-8  m-auto justify-center align-middle"
                    style={{ width: "34rem" }}
                >
                    <div className="flex flex-col justify-center m-auto">
                        <h1 className="text-3xl font-medium text-start mt-3">
                            Create an account
                        </h1>
                        <div className="flex flex-row items-center align-middle">
                            <span className="mt-3 text-start">
                                More about you
                            </span>
                            <Tooltips content={"For suggestion"} />
                        </div>
                        <div htmlFor="" className="text-gray-500 my-3 mt-5">
                            Date of birth
                        </div>
                        <div className="flex flex-row">
                            <div className="w-5/12">
                                <select
                                    name="month"
                                    id="month"
                                    className="w-full border border-gray-300 rounded-md p-2"
                                >
                                    <option value="1">January</option>
                                    <option value="2">February</option>
                                    <option value="3">March</option>
                                    <option value="4">April</option>
                                    <option value="5">May</option>
                                    <option value="6">June</option>
                                    <option value="7">July</option>
                                    <option value="8">August</option>
                                    <option value="9">September</option>
                                    <option value="10">October</option>
                                    <option value="11">November</option>
                                    <option value="12">December</option>
                                </select>
                            </div>

                            <div className="w-3/12 mx-auto">
                                <input
                                    type="text"
                                    min="1"
                                    max="31"
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    placeholder="Day"
                                    onChange={(e) => {
                                        // if the target is not a digit, remove it
                                        if (!e.target.value.match(/^\d+$/)) {
                                            e.target.value =
                                                e.target.value.slice(0, -1);
                                        }
                                        if (e.target.value > 31) {
                                            // if user input 212, then it will be 21
                                            e.target.value =
                                                e.target.value.slice(0, 2);
                                        } else if (
                                            e.target.value < 1 &&
                                            e.target.value !== ""
                                        ) {
                                            e.target.value = 1;
                                        } else if (
                                            e.target.value.length === 2
                                        ) {
                                            document
                                                .getElementById("year")
                                                .focus();
                                        }
                                    }}
                                />
                            </div>

                            <div className=" w-3/12">
                                <input
                                    type="text"
                                    min="1"
                                    max="31"
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    placeholder="Year"
                                />
                            </div>
                        </div>

                       <div>
                        <div htmlFor="" className="text-gray-500 my-3">
                                Sexual
                            </div>
                            <div className=" flex flex-row algin-center items-center">
                                <input type="radio" name="sex" id="m" />
                                <label className="text-gray-600 mx-3" htmlFor="m">
                                    Male
                                </label>

                                <input type="radio" name="sex" id="f" />
                                <label className="text-gray-600 mx-3" htmlFor="f">
                                    Female
                                </label>

                                <input type="radio" name="sex" id="n" />
                                <label className="text-gray-600 mx-3" htmlFor="n">
                                    Non-binary
                                </label>
                            </div>
                       </div>

                        <div className="">
                            <div htmlFor="" className="text-gray-500 my-3">
                                How often do you travel? (per year)
                            </div>
                            <div className=" flex flex-row algin-center items-center">
                                <input type="radio" name="freq" id="freq1" />
                                <label
                                    className="text-gray-600 mx-3"
                                    htmlFor="freq1"
                                >
                                    1-2 times
                                </label>

                                <input type="radio" name="freq" id="freq2" />
                                <label
                                    className="text-gray-600 mx-3"
                                    htmlFor="freq2"
                                >
                                    3-5 times
                                </label>

                                <input type="radio" name="freq" id="freq3" />
                                <label
                                    className="text-gray-600 mx-3"
                                    htmlFor="freq3"
                                >
                                    6 times or more
                                </label>
                            </div>
                        </div>

                        <div className="my-3 mb-10">
                            <div htmlFor="" className="text-gray-500 my-3 ">
                                Industry
                            </div>
                            <select className="w-full border border-gray-300 rounded-md p-2">
                                <option value="1">Agriculture</option>
                                <option value="2">Construction</option>
                                <option value="3">Education</option>
                                <option value="4">Finance</option>
                                <option value="5">Healthcare</option>
                                <option value="6">Hospitality</option>
                                <option value="7">Manufacturing</option>
                                <option value="8">Media</option>
                                <option value="9">Retail</option>
                                <option value="10">Technology</option>
                                <option value="11">Transportation</option>
                                <option value="12">Other</option>
                            </select>
                        </div>

                        <div className="w-full">
                            <Button
                                content="Continue"
                                onClick={() => {
                                    setFinished(true);
                                }}
                            />
                        </div>

                    </div>

                        
                </div>
            </>
        );
    }
}

export function SignUp() {
    const email = useRef("");
    const password = useRef("");
    const c_password = useRef("");
    const fname = useRef("");
    const lname = useRef("");

    const [password_error_msgs, set_password_error_msgs] = useState("");

    // ingore the first render
    const [email_valid, set_email_valid] = useState(true);
    const [password_valid, set_password_valid] = useState(true);
    const [c_password_valid, set_c_password_valid] = useState(true);
    const [fname_valid, set_fname_valid] = useState(true);
    const [lname_valid, set_lname_valid] = useState(true);

    const [sucess, set_sucess] = useState(false);

    const [inputed_all, set_inputed_all] = useState(false);

    const app = useApp();
    app.setDisableFooter(true);

    // when user press the "enter" key, system press the "Sign up" button
    useEffect(() => {
        document.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                document.getElementById("sign_up_btn").click();
            }
        });
    }, []);

    document.title = "Sign up";

    return (
        <div className="h-screen flex flex-col">
            {!sucess ? (
                <>
                    <Header noback />
                    <div
                        className="bg-white  p-8  m-auto justify-center align-middle"
                        style={{ width: "34rem" }}
                    >
                        <div className="flex flex-col justify-center m-auto"></div>
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
                                    lname.current !== "" &&
                                    c_password.current !== ""
                                ) {
                                    set_inputed_all(true);
                                } else {
                                    set_inputed_all(false);
                                }
                            }}
                            validate={email_valid}
                            error_message="Email format is not valid"
                        />

                        <div className="w-full flex flex-row justify-between">
                            <div className="w-1/2 mr-2">
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
                                            lname.current !== "" &&
                                            c_password.current !== ""
                                        ) {
                                            set_inputed_all(true);
                                        } else {
                                            set_inputed_all(false);
                                        }
                                    }}
                                    validate={fname_valid}
                                />
                            </div>
                            <div className="w-1/2 ml-2">
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
                                            lname.current !== "" &&
                                            c_password.current !== ""
                                        ) {
                                            set_inputed_all(true);
                                        } else {
                                            set_inputed_all(false);
                                        }
                                    }}
                                    validate={lname_valid}
                                />
                            </div>
                        </div>
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
                                    lname.current !== "" &&
                                    c_password.current !== ""
                                ) {
                                    set_inputed_all(true);
                                } else {
                                    set_inputed_all(false);
                                }
                            }}
                            validate={password_valid}
                            error_message={password_error_msgs}
                        />

                        <FloatingLabel
                            placeholder={"Confirm Password"}
                            type="password"
                            id={"c_password"}
                            handler={(e) => {
                                c_password.current = e.target.value;
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
                            validate={c_password_valid}
                            error_message={"Password does not match"}
                        />

                        <div className="mt-5">
                            <CheckBox
                                id="default-checkbox"
                                context="Keep me signed in"
                            />
                        </div>

                        <div>
                            <div className="text-sm text-gray-500">
                                Selecting this checkbox will keep you signed in
                                for 30 days. If you are using a public or shared
                                device, uncheck this box to prevent unauthorized
                                access to your account.
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
                                let status = true;
                                if (
                                    email.current === "" ||
                                    !/\S+@\S+\.\S+/.test(email.current)
                                ) {
                                    set_email_valid(false);
                                    status = false;
                                } else {
                                    set_email_valid(true);
                                }

                                const pw_err_msg = validatePassword(
                                    password.current
                                );

                                if (pw_err_msg.length > 0) {
                                    set_password_valid(false);
                                    set_password_error_msgs(pw_err_msg);
                                    status = false;
                                } else {
                                    set_password_valid(true);
                                }

                                if (c_password.current !== password.current) {
                                    set_c_password_valid(false);
                                    status = false;
                                } else {
                                    set_c_password_valid(true);
                                }

                                if (status) {
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
                            <a href="#" className="text-blue-600 ml-1 text-sm">
                                <Link to="/login">Sign In</Link>
                            </a>
                        </div>
                        <div className="mb-5"></div>
                    </div>
                </>
            ) : (
                // <LoadPage
                //     page={<RegisterSuccess name={fname.current} />}
                //     loading_time={3}
                //     Preloaded={<Header noback />}
                // />
                <>
                    <AskOtherInfo />
                </>
            )}
        </div>
    );
}

export function ForgotPassword() {
    const [email, set_email] = useState("");
    const [email_valid, set_email_valid] = useState(true);
    const [inputed_all, set_inputed_all] = useState(false);
    const [sucess, set_sucess] = useState(false);

    const navigate = useNavigate();

    document.title = "Forgot Password";

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
                            Enter your email address and we will send you a link
                            to reset your password.
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
                                if (
                                    email === "" ||
                                    !/\S+@\S+\.\S+/.test(email)
                                ) {
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
                        Preloaded={<Header noback />}
                        loading_time={1}
                    />
                )}
            </div>
        </div>
    );
}

function RegisterSuccess({ name = "Lee " }) {
    const navigate = useNavigate();
    const [time, set_time] = useState(5);

    useEffect(() => {
        const timer = setTimeout(() => {
            set_time(time - 1);
            if (time <= 0) {
                navigate("/login");
            }
        }, 1000);

        return () => clearTimeout(timer);
    });

    document.title = "Register Success";

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
                to sign in. {/* auto direct user in 5 sec */}
                <span className="text-sm text-black-500">
                    (Redirecting in {time} seconds)
                </span>
            </div>
        </div>
    );
}

function ResetPwSuccess() {
    const navigate = useNavigate();
    const [time, set_time] = useState(5);

    useEffect(() => {
        const timer = setTimeout(() => {
            set_time(time - 1);
            if (time <= 0) {
                navigate("/login");
            }
        }, 1000);

        return () => clearTimeout(timer);
    });

    document.title = "Reset Password Success";

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
                to sign in. {/* auto direct user in 5 sec */}
                <span className="text-sm text-black-500">( {time} sec )</span>
            </div>
        </div>
    );
}

export function OperatorResetPw({ name = "Lee" }) {
    const app = useApp();
    app.setDisableFooter(true);

    const [showForm, setShowForm] = useState(false);
    const password = useRef();
    const r_password = useRef();
    const [pwValid, setPwValid] = useState(true);
    const [r_pwValid, setR_PwValid] = useState(true);
    const [password_error_msgs, set_password_error_msgs] = useState([]);
    const [success, set_success] = useState(false);

    const navigate = useNavigate();

    document.title = "Reset Password";

    if (!success) {
        return (
            <div>
                <Header noback />
                <div className="flex flex-col justify-center sm-auto mt-10 text-center h-screen">
                    <h1 className="font-semibold text-5xl mt-5">
                        Welcome, {name}
                    </h1>
                    <div className="text-black-500 mt-5 text-3xl pt-3">
                        We noticed that this is your first time logging in.
                        <br />
                        Please click
                        <div
                            className="font-semibold text-primary cursor-pointer inline"
                            onClick={() => {
                                setShowForm(true);
                            }}
                        >
                            {" "}
                            HERE{" "}
                        </div>
                        reset your password.
                    </div>

                    {showForm ? (
                        <div className="flex flex-col justify-center sm-auto mt-10 w-1/2 mx-auto">
                            <div className="text-sm text-black-500 mt-5">
                                Enter your new password below.
                                <FloatingLabel
                                    placeholder={"New Password"}
                                    type="password"
                                    id={"r_password"}
                                    handler={(e) => {
                                        password.current = e.target.value;
                                        document.getElementById(
                                            "r_confirm_password"
                                        ).value = "";
                                    }}
                                    validate={pwValid}
                                    error_message={password_error_msgs}
                                    preventCopy
                                />
                                <FloatingLabel
                                    placeholder={"Confirm Password"}
                                    type="password"
                                    id={"r_confirm_password"}
                                    handler={(e) => {
                                        r_password.current = e.target.value;
                                    }}
                                    validate={r_pwValid}
                                    error_message="Password does not match"
                                />
                                <Button
                                    content="Continue"
                                    color={"primary"}
                                    disable={false}
                                    style="w-full mt-5"
                                    id="sign_up_btn"
                                    onClick={() => {
                                        let haveError = false;

                                        if (
                                            password.current === undefined ||
                                            password.current === ""
                                        ) {
                                            set_password_error_msgs([
                                                "Bruh, you didn't even enter a character",
                                            ]);
                                            setPwValid(false);
                                        } else {
                                            setPwValid(true);
                                        }

                                        if (
                                            r_password.current === "" ||
                                            r_password.current !==
                                                password.current
                                        ) {
                                            setR_PwValid(false);
                                            haveError = true;
                                        } else {
                                            setR_PwValid(true);
                                        }

                                        const pw_err_msg = validatePassword(
                                            password.current
                                        );

                                        console.log(pw_err_msg);

                                        if (
                                            pw_err_msg.length > 0 ||
                                            haveError
                                        ) {
                                            set_password_error_msgs(pw_err_msg);
                                            setPwValid(false);
                                        } else {
                                            // forward user to sign in page
                                            set_success(true);
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        );
    } else {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-96 bg-white rounded-lg p-8 shadow-xl">
                    <LoadPage
                        page={<ResetPwSuccess />}
                        Preloaded={<Header noback />}
                        loading_time={1}
                    />
                </div>
            </div>
        );
    }
}
