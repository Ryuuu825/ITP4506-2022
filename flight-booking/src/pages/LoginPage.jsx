import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../logo.svg";
import { CheckBox, DatePicker, FloatingLabel } from "../component/Form";
import { LoadingButton } from "../component/Button";
import { Link } from "react-router-dom";
import { LoadPage } from "../component/Loading";
import { useApp } from "../hook/Main";
import UserAccount from "../db/users.json";
import PageLogo from "../component/Logo";
import Tooltips, { TooltipsBottom } from "../component/tooltips";
import { Birthday_SVG } from "../component/SVGPath";
import footer from "../asserts/foot.png";
import imgBorder from "../asserts/image-border.png";
import bg1 from "../asserts/login-bg.jpg";
import bg2 from "../asserts/login-bg2.jpg";
import bg3 from "../asserts/login-bg3.jpg";
import forgot_pw_img from "../asserts/forgot-pw-img.png";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Button.css";
import Select from "react-select";
import "../styles/registerform.css";
import { Modal, Button } from "flowbite-react";
import ReactStars from "react-rating-stars-component";

function Header({ noback }) {
    const navigate = useNavigate();

    return (
        <>
            <div className="flex flex-rows justify-center align-middles pb-3 border-b-2">
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
        </>
    );
}

export function SingIn() {
    // get the previous page
    const imgList = [bg1, bg2, bg3];

    const [bgImg, setBgImg] = useState(imgList[0]);
    let idx = 1;

    const box = useRef(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setBgImg(imgList[idx]);
            idx++;
            if (idx % 3 == 0) {
                idx = 0;
            }
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    document.title = "Login | IVE Airline";

    return (
        <div className="h-screen flex bg-blue-100 w-full overflow-hidden">
            <div
                ref={box}
                className="z-10 md:h-3/4 md:w-3/5  sm:w-4/5 sm:h-5/6   flex flex-row rounded-xl shadow-xl m-auto justify-center align-middle"
            >
                <div
                    className="rounded-l-xl flex-1 right relative h-full bg-cover animate-fade-in-forever"
                    style={{ backgroundImage: `url(${bgImg})` }}
                >
                    <img
                        className="absolute right-0 border-0"
                        src={`${imgBorder}`}
                        style={{ height: "100%" }}
                        alt=""
                        srcset=""
                    />
                </div>
                <div className="rounded-r-xl h-full bg-white flex-1">
                    <LoginForm box={box} />
                </div>
            </div>
            <div className="fixed bottom-0 left-0 w-full">
                <img src={`${footer}`} alt="" srcset="" />
            </div>
        </div>
    );
}

export function LoginForm({ box }) {
    const navigate = useNavigate();
    const email = useRef("");
    const password = useRef("");
    const app = useApp();
    app.setDisableFooter(true);
    const [emailError, setEmailError] = useState(false);
    const [pwError, setPwError] = useState(false);
    const [emailErrorMsg, setEmailErrorMsg] = useState("");

    const [inputed_all, set_inputed_all] = useState(false);

    return (
        <div className="flex flex-col justify-center p-8" ref={box}>
            <Header />
            <h1 className="text-3xl font-medium text-start mt-3 ">Sign in</h1>
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
                    if (email.current !== "" && password.current !== "") {
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
                    if (email.current !== "" && password.current !== "") {
                        set_inputed_all(true);
                    } else {
                        set_inputed_all(false);
                    }
                }}
                validate={true}
            />

            <div>
                <div className="flex align-center text-sm text-gray-500">
                    <CheckBox
                        id="default-checkbox"
                        context="Keep me signed in"
                    />
                    <TooltipsBottom
                        content={`Selecting this checkbox will keep you signed in for
            30 days. If you are using a public or shared device,
            uncheck this box to prevent unauthorized access to
            your account.`}
                        title={`Keep me signed in`}
                    />
                </div>

                <div className="text-sm text-black-500 mt-3">
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

            <LoadingButton
                onClick={() => {
                    const potential_user = UserAccount.find(
                        (user) => user.email === email.current
                    );
                    if (potential_user) {
                        if (potential_user.password === password.current) {
                            app.setLogin(true);
                            app.setUser(potential_user.name);
                            app.setUserName(potential_user.username);
                            if (potential_user.name === "operator") {
                                navigate("/operator/reset-pw");
                                toast.error("Please reset your password");
                            } else if (potential_user.name === "admin") {
                                navigate("/admin");
                            } else {
                                navigate("/index");
                            }
                        } else {
                            setPwError(true);
                            document.getElementById("s_password").value = "";
                        }
                    } else {
                        setEmailError(true);
                        setEmailErrorMsg("Email not found");
                        document.getElementById("s_password").value = "";
                        document
                            .getElementById("s_password")
                            .classList.add("animate-shake");
                    }

                    if (!/\S+@\S+\.\S+/.test(email.current)) {
                        setEmailError(true);
                        setEmailErrorMsg("Email format is not valid");
                        document.getElementById("s_password").value = "";
                        document
                            .getElementById("r_email")
                            .classList.add("animate-shake");
                    }

                    // toast error at the top-right corner of the screen
                    if (emailError || pwError) {
                        toast.error("Failed to Login!", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    }
                }}
                content="Sign in"
                color={"primary"}
                disable={!inputed_all}
                style="w-full mt-3"
            >
                Sign in
            </LoadingButton>

            <div className="text-primary text-center text-sm mt-2">
                <span
                    onClick={() => {
                        box.current.classList.add("animate-fade-out-right");
                        setTimeout(() => {
                            navigate("/forgot-pw");
                        }, 500);
                    }}
                    className="text-primary cursor-pointer"
                >
                    Forgot password?
                </span>
            </div>

            <div className="flex justify-center mt-2 text-center align-middle">
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
    );
}

export function SignUp() {
    const app = useApp();
    app.setDisableFooter(true);

    const box = useRef(null);

    document.title = "Sign up";

    const [step, setStep] = useState(1);

    // tooltip
    const [tooltipStatus, setTooltipStatus] = useState(0);
    useEffect(() => {
        const onMouseClickOnOther = (e) => {
            if (!document.getElementById("password").contains(e.target)) {
                setTooltipStatus(0);
            }
        };
        window.addEventListener("click", onMouseClickOnOther);

        return () => {
            window.removeEventListener("click", onMouseClickOnOther);
        };
    }, []);

    // step button state
    const [canNext, setCanNext] = useState(false);
    const backBtn = useRef(null);
    const nextBtn = useRef(null);

    // step 1
    const stepOne = useRef(null);
    const [emailValid, setEmailValid] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [password2Valid, setPassword2Valid] = useState(true);

    const validStepOne = () => {
        setCanNext(false);
        setEmailValid(true);
        // test email
        if (email.length == 0 || email == "") {
            toast.error("Please enter your email address");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailValid(false);
            return;
        }
        // test if first password is empty
        if (password.length == 0 || password == "") {
            toast.error("Please enter your password");
            return;
        }
        // test if first password is valid
        if (
            pwCheckListItem1Status == 0 ||
            pwCheckListItem2Status == 0 ||
            pwCheckListItem3Status == 0
        ) {
            toast.error("Please enter a valid password");
            return;
        }

        // test if second password is empty
        if (password2.length == 0 || password2 == "") {
            toast.error("Please enter your password again");
            return;
        }

        // test if second password is valid
        if (password2 != password) {
            setPassword2Valid(false);
            return;
        }

        setEmailValid(true);
        setPassword2Valid(true);
        setCanNext(true);

        return true;
    };

    // pwCheckListItem
    const [pwCheckListItem1Status, setPwCheckListItem1Status] = useState(0);
    const [pwCheckListItem2Status, setPwCheckListItem2Status] = useState(0);
    const [pwCheckListItem3Status, setPwCheckListItem3Status] = useState(0);
    const [pwCheckListItem4Status, setPwCheckListItem4Status] = useState(0);
    const [pwCheckListItem5Status, setPwCheckListItem5Status] = useState(0);

    const Checker = ({ type, message }) => {
        return (
            <>
                {type ? (
                    <div className="flex valid">
                        <Kick />
                        <p className="ml-2 text-xs leading-4  pb-3">
                            {message}
                        </p>
                    </div>
                ) : (
                    <div className="flex invalid">
                        <Cross />
                        <p className="ml-2 text-xs leading-4 invalid pb-3">
                            {message}
                        </p>
                    </div>
                )}
            </>
        );
    };

    const Kick = () => {
        return (
            <>
                <svg
                    class="h-4 w-4 text-green"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    {" "}
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <path d="M5 12l5 5l10 -10" />
                </svg>
            </>
        );
    };

    const Cross = () => {
        return (
            <>
                <svg
                    class="h-4 w-4 text-red-500"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    {" "}
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <line x1="18" y1="6" x2="6" y2="18" />{" "}
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </>
        );
    };

    // step 2
    const stepTwo = useRef(null);
    const firstName = useRef("");
    const [firstNameValid, setFirstNameValid] = useState(true);
    const lastName = useRef("");
    const [lastNameValid, setLastNameValid] = useState(true);
    const sexual = useRef("m");
    const phone = useRef("");
    const phoneInput = useRef(null);
    const dob = useRef();
    const dobInput = useRef(null);
    const [job, setJob] = useState("");
    const jobInput = useRef(null);

    const jobOptions = [
        { value: "1", label: "Accounting" },
        { value: "2", label: "Construction" },
        { value: "3", label: "Education" },
        { value: "4", label: "Engineering" },
        { value: "5", label: "Finance" },
        { value: "6", label: "IT" },
        { value: "7", label: "Law" },
        { value: "8", label: "Marketing" },
        { value: "9", label: "Medical" },
        { value: "10", label: "Sales" },
    ];

    const validStepTwo = () => {
        setCanNext(false);

        // test first name
        if (firstName.current.length == 0 || firstName.current == "") {
            toast.error("Please enter your first name");
            setFirstNameValid(false);
            return false;
        }
        setFirstNameValid(true);

        // test last name
        if (lastName.current.length == 0 || lastName.current == "") {
            toast.error("Please enter your last name");
            setLastNameValid(false);
            return false;
        }
        setLastNameValid(true);

        // test sexual
        if (sexual.current.length == 0 || sexual.current == "") {
            toast.error("Please enter your sexual");
            return false;
        }

        // test dob
        console.log(dob.current);
        if (
            dob.current == null ||
            dob.current.length == 0 ||
            dob.current == ""
        ) {
            toast.error("Please enter your date of birth");
            dobInput.current.classList.add("animate-shake");
            setTimeout(() => {
                dobInput.current.classList.remove("animate-shake");
            }, 500);
            return false;
        }

        if (job == null || job == "") {
            toast.error("Please enter your job");
            jobInput.current.classList.add("animate-shake");
            setTimeout(() => {
                jobInput.current.classList.remove("animate-shake");
            }, 500);

            return false;
        }

        // test phone
        if (phone.current == "") {
            toast.error("Please enter your phone");
            phoneInput.current.classList.add("animate-shake");
            setTimeout(() => {
                phoneInput.current.classList.remove("animate-shake");
            }, 500);

            return false;
        }

        if (phone.current.length != 8) {
            toast.error("Please enter a valid phone");
            phoneInput.current.classList.add("animate-shake");
            setTimeout(() => {
                phoneInput.current.classList.remove("animate-shake");
            }, 500);

            return false;
        }

        setCanNext(true);

        return true;
    };

    // step 3
    const stepThree = useRef(null);
    var Spinner = require("react-spinkit");

    // step 4
    const stepFour = useRef(null);

    // step 5
    const loader = useRef(null);
    const stepFive = useRef(null);

    const [canEditRating, setCanEditRating] = useState(true);

    return (
        <div className="h-screen overflow-hidden flex flex-col bg-blue-100">
            <div className="z-[2] animate-fade-in flex w-full h-3/4  my-auto justify-center align-middle item-center">
                <div
                    ref={box}
                    className="relative box bg-white h-full w-3/5 rounded-lg shadow-lg "
                >
                    <div className="flex flex-row w-full h-24 overflow-hidden items-center align-middle justify-center  ">
                        <img src={logo} className="h-12" alt="logo" />
                        <span className="text-2xl text-blue-700 font-semibold pl-5 pt-2">
                            IVE AIRLINE
                        </span>
                    </div>
                    <div className="w-10/12 mx-auto ">
                        <div className="border"></div>
                        <div class="mx-4 p-4 mb-6">
                            <div class="flex items-center">
                                <div class="flex items-center relative">
                                    <div
                                        class="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-primary"
                                        style={{
                                            backgroundColor:
                                                step === 1
                                                    ? "rgb(48 88 210)"
                                                    : "white",
                                            color:
                                                step === 1
                                                    ? "white"
                                                    : "rgb(48 88 210)",
                                            borderColor:
                                                step >= 1
                                                    ? "rgb(48 88 210)"
                                                    : "rgb(209 213 219)",
                                        }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="100%"
                                            height="100%"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="feather feather-bookmark "
                                        >
                                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                                        </svg>
                                    </div>
                                    <div class="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-primary">
                                        Account
                                    </div>
                                </div>
                                <div
                                    class="flex-auto border-t-2 transition duration-500 ease-in-out"
                                    style={{
                                        borderColor:
                                            step > 1
                                                ? "rgb(48 88 210)"
                                                : "rgb(209 213 219)",
                                    }}
                                ></div>
                                <div class="flex items-center text-white relative">
                                    <div
                                        class="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2"
                                        style={{
                                            backgroundColor:
                                                step === 2
                                                    ? "rgb(48 88 210)"
                                                    : "white",
                                            color:
                                                step === 2
                                                    ? "white"
                                                    : step >= 2
                                                    ? "rgb(48 88 210)"
                                                    : "grey",
                                            borderColor:
                                                step >= 2
                                                    ? "rgb(48 88 210)"
                                                    : "rgb(209 213 219)",
                                        }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="100%"
                                            height="100%"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="feather feather-user-plus "
                                        >
                                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                            <circle
                                                cx="8.5"
                                                cy="7"
                                                r="4"
                                            ></circle>
                                            <line
                                                x1="20"
                                                y1="8"
                                                x2="20"
                                                y2="14"
                                            ></line>
                                            <line
                                                x1="23"
                                                y1="11"
                                                x2="17"
                                                y2="11"
                                            ></line>
                                        </svg>
                                    </div>
                                    <div
                                        class="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase"
                                        style={{
                                            color:
                                                step >= 2
                                                    ? "rgb(48 88 210)"
                                                    : "grey",
                                        }}
                                    >
                                        Personal Info
                                    </div>
                                </div>
                                <div
                                    class="flex-auto border-t-2 transition duration-500 ease-in-out "
                                    style={{
                                        borderColor:
                                            step > 2
                                                ? "rgb(48 88 210)"
                                                : "rgb(209 213 219)",
                                    }}
                                ></div>
                                <div class="flex items-center text-gray-500 relative">
                                    <div
                                        class="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 "
                                        style={{
                                            backgroundColor:
                                                step === 3 || step === 4
                                                    ? "rgb(48 88 210)"
                                                    : "white",
                                            color:
                                                step === 3 || step === 4
                                                    ? "white"
                                                    : step >= 3
                                                    ? "rgb(48 88 210)"
                                                    : "grey",
                                            borderColor:
                                                step >= 3
                                                    ? "rgb(48 88 210)"
                                                    : "rgb(209 213 219)",
                                        }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="100%"
                                            height="100%"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="feather feather-mail "
                                        >
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                            <polyline points="22,6 12,13 2,6"></polyline>
                                        </svg>
                                    </div>
                                    <div
                                        class="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase "
                                        style={{
                                            color:
                                                step >= 3
                                                    ? "rgb(48 88 210)"
                                                    : "grey",
                                        }}
                                    >
                                        Survery
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* For different Form */}

                    <div className=" h-3/6">
                        {/* Form 1 */}
                        <div
                            ref={stepOne}
                            className=" step1 h-full w-full flex justify-center items-center align-middle"
                        >
                            <div className="w-full flex flex-col justify-center items-center">
                                <div>
                                    <h1 className="mt-2 mb-3">
                                        Please enter your email and password for
                                        account creation.
                                    </h1>
                                </div>
                                <div className="inputgroup w-5/12">
                                    <div className="w-full">
                                        <FloatingLabel
                                            placeholder={"Email"}
                                            type="email"
                                            id={"r_email"}
                                            handler={(e) => {
                                                setEmail(e.target.value);
                                            }}
                                            validate={emailValid}
                                            error_message="Email format is not valid"
                                            defaultValue={email}
                                        />
                                    </div>

                                    <div
                                        className="w-full relative"
                                        id="password"
                                        onMouseEnter={() => {
                                            setTooltipStatus(1);
                                        }}
                                    >
                                        <FloatingLabel
                                            placeholder={"Password"}
                                            type="password"
                                            id={"r_password"}
                                            handler={(e) => {
                                                setPwCheckListItem1Status(
                                                    false
                                                );
                                                setPwCheckListItem2Status(
                                                    false
                                                );
                                                setPwCheckListItem3Status(
                                                    false
                                                );
                                                setPwCheckListItem4Status(
                                                    false
                                                );
                                                setPwCheckListItem5Status(
                                                    false
                                                );

                                                if (
                                                    e.target.value.length >= 8
                                                ) {
                                                    setPwCheckListItem1Status(
                                                        true
                                                    );
                                                }

                                                if (
                                                    e.target.value.match(
                                                        /[a-z]/g
                                                    )
                                                ) {
                                                    setPwCheckListItem3Status(
                                                        true
                                                    );
                                                }
                                                if (
                                                    e.target.value.match(
                                                        /[A-Z]/g
                                                    )
                                                ) {
                                                    setPwCheckListItem2Status(
                                                        true
                                                    );
                                                }

                                                if (
                                                    e.target.value.match(
                                                        /[0-9]/g
                                                    )
                                                ) {
                                                    setPwCheckListItem4Status(
                                                        true
                                                    );
                                                }

                                                if (
                                                    e.target.value.match(
                                                        /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/
                                                    )
                                                ) {
                                                    setPwCheckListItem5Status(
                                                        true
                                                    );
                                                }

                                                setPassword(e.target.value);
                                            }}
                                            validate={true}
                                            error_message="Password must be at least 8 characters"
                                        />
                                        {tooltipStatus == 1 && (
                                            <div
                                                role="tooltip"
                                                className="z-20 -mt-20 w-64 absolute transition duration-150 ease-in-out  left-full  ml-8 shadow-lg bg-gray-100 p-4 rounded"
                                            >
                                                <svg
                                                    className="absolute left-0 -ml-2 bottom-0 top-0 h-full "
                                                    width="9px"
                                                    height="16px"
                                                    viewBox="0 0 9 16"
                                                    version="1.1"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                                >
                                                    <g
                                                        id="Page-1"
                                                        stroke="none"
                                                        strokeWidth={1}
                                                        fill="none"
                                                        fillRule="evenodd"
                                                    >
                                                        <g
                                                            id="Tooltips-"
                                                            transform="translate(-874.000000, -1029.000000)"
                                                            fill="rgb(243 244 246)"
                                                        >
                                                            <g
                                                                id="Group-3-Copy-16"
                                                                transform="translate(850.000000, 975.000000)"
                                                            >
                                                                <g
                                                                    id="Group-2"
                                                                    transform="translate(24.000000, 0.000000)"
                                                                >
                                                                    <polygon
                                                                        id="Triangle"
                                                                        transform="translate(4.500000, 62.000000) rotate(-90.000000) translate(-4.500000, -62.000000) "
                                                                        points="4.5 57.5 12.5 66.5 -3.5 66.5"
                                                                    />
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </svg>
                                                <div className="font-bold text-black pb-3 ">
                                                    Password must be at least
                                                </div>
                                                <Checker
                                                    message={"8 characters"}
                                                    type={
                                                        pwCheckListItem1Status
                                                    }
                                                />
                                                <Checker
                                                    message={
                                                        "1 uppercase letter"
                                                    }
                                                    type={
                                                        pwCheckListItem2Status
                                                    }
                                                />
                                                <Checker
                                                    message={
                                                        "1 lowercase letter"
                                                    }
                                                    type={
                                                        pwCheckListItem3Status
                                                    }
                                                />
                                                <Checker
                                                    message={"1 number"}
                                                    type={
                                                        pwCheckListItem4Status
                                                    }
                                                />
                                                <Checker
                                                    message={
                                                        "1 special character"
                                                    }
                                                    type={
                                                        pwCheckListItem5Status
                                                    }
                                                />
                                            </div>
                                        )}{" "}
                                    </div>

                                    <div className="w-full">
                                        <FloatingLabel
                                            placeholder={"Password"}
                                            type="password"
                                            id={"r_password2"}
                                            handler={(e) => {
                                                setPassword2(e.target.value);
                                            }}
                                            validate={password2Valid}
                                            error_message="Your passwords do not match"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Form 2 */}
                        <div
                            ref={stepTwo}
                            className="step2 hidden h-full w-full justify-center items-center align-middle"
                        >
                            <div className="w-7/12 flex flex-col justify-center items-center align-middle">
                                <div>
                                    <h1 className="mt-2 mb-3">Step Two</h1>
                                </div>
                                <div className="w-full flex flex-col align-middle">
                                    {/* Title, First Name, Last Name, Sexual, Jobs, Phone */}

                                    <div className="flex flex-row w-full justify-center align-middle items-center">
                                        <div className="h-full w-8/12 relative">
                                            <FloatingLabel
                                                placeholder={"First Name"}
                                                type="text"
                                                id={"fname"}
                                                handler={(e) => {
                                                    firstName.current =
                                                        e.target.value;
                                                }}
                                                validate={firstNameValid}
                                                bg="bg-gray-50"
                                            />
                                        </div>
                                        <div className="h-full w-4/12 ml-3 relative">
                                            <FloatingLabel
                                                placeholder={"Last Name"}
                                                type="text"
                                                id={"lname"}
                                                handler={(e) => {
                                                    lastName.current =
                                                        e.target.value;
                                                }}
                                                validate={lastNameValid}
                                                bg="bg-gray-50"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-2 flex flex-row w-full">
                                        <div className="">
                                            <div className="flex flex-row text-gray-500">
                                                <svg
                                                    class="w-5 h-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                    ></path>
                                                </svg>
                                                <div className="text-sm ml-2 mb-2">
                                                    Sexual*
                                                </div>
                                            </div>

                                            <div
                                                ref={sexual}
                                                className="flex flex-row w-fit text-sm text-gray-900 bg-gray-50 overflow-hidden rounded-2xl border-2  appearance-none  focus:outline-none focus:ring-2 focus:ring-blue-300 peer focus:border-blue-300 border-gray-300 shadow-lg"
                                            >
                                                <div className="border-r border-gray-400 ">
                                                    <input
                                                        defaultChecked
                                                        className="peer hidden"
                                                        type="radio"
                                                        name="sex"
                                                        id="m"
                                                        value="m"
                                                        onChange={(e) => {
                                                            sexual.current =
                                                                e.target.value;
                                                        }}
                                                    />
                                                    <div className=" py-3 px-2.5 select-none hover:bg-gray-100  peer-checked:bg-primary peer-checked:text-white peer-checked:shadow-sm ">
                                                        <label
                                                            htmlFor="m"
                                                            className="px-2.5 cursor-pointer"
                                                        >
                                                            Male
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="">
                                                    <input
                                                        className="peer hidden"
                                                        type="radio"
                                                        name="sex"
                                                        id="f"
                                                        value="f"
                                                        onChange={(e) => {
                                                            sexual.current =
                                                                e.target.value;
                                                        }}
                                                    />
                                                    <div className=" py-3 px-2.5 select-none hover:bg-gray-100 cursor-pointer peer-checked:bg-primary peer-checked:text-white peer-checked:shadow-sm ">
                                                        <label
                                                            htmlFor="f"
                                                            className="py-3 px-2.5 cursor-pointer"
                                                        >
                                                            Female
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="border-l border-gray-400">
                                                    <input
                                                        className="peer hidden"
                                                        type="radio"
                                                        name="sex"
                                                        id="n"
                                                        value="n"
                                                        onChange={(e) => {
                                                            sexual.current =
                                                                e.target.value;
                                                        }}
                                                    />
                                                    <div className="py-3 px-2.5 select-none hover:bg-gray-100 cursor-pointer peer-checked:bg-primary peer-checked:text-white peer-checked:shadow-sm ">
                                                        <label
                                                            htmlFor="n"
                                                            className="py-3 px-2.5 cursor-pointer"
                                                        >
                                                            Others
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="relative w-6/12 ml-auto">
                                            <div className="flex flex-row  text-gray-500">
                                                <svg
                                                    class="w-5 h-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"
                                                    ></path>
                                                </svg>
                                                <div className="text-sm mb-2 ml-2">
                                                    Date of Birth*
                                                </div>
                                            </div>

                                            <div className="w-full">
                                                <div class="relative">
                                                    <input
                                                        ref={dobInput}
                                                        type="date"
                                                        id={"dob"}
                                                        max={new Date().toLocaleDateString(
                                                            "sv"
                                                        )}
                                                        class="block px-2.5 py-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border-2  appearance-none  focus:outline-none focus:ring-1 focus:ring-gray-600 peer focus:border-gray-600 border-gray-300 hover:border-gray-500 shadow-lg"
                                                        onChange={(e) => {
                                                            dob.current =
                                                                e.target.value;
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-3 flex flex-row w-full">
                                        <div className="w-7/12 mr-5 z-[101]">
                                            <div className="flex flex-row  text-gray-500">
                                                <svg
                                                    class="w-5 h-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                    ></path>
                                                </svg>
                                                <div className="text-sm mb-2 ml-2">
                                                    Job*
                                                </div>
                                            </div>

                                            <div
                                                ref={jobInput}
                                                className="relative"
                                            >
                                                <Select
                                                    className="basic-single relative"
                                                    classNamePrefix="ive"
                                                    isClearable={true}
                                                    isSearchable={true}
                                                    onChange={setJob}
                                                    value={job}
                                                    name="color"
                                                    options={jobOptions}
                                                    styles={{
                                                        control: (
                                                            base,
                                                            state
                                                        ) => ({
                                                            ...base,
                                                            border: "2px solid rgb(209 213 219)",
                                                            borderRadius:
                                                                "0.5rem",
                                                            ":hover": {
                                                                borderColor:
                                                                    "rgb(107 114 128)",
                                                            },
                                                            boxShadow: "none",
                                                            position:
                                                                "relative",
                                                            zIndex: "100",
                                                            padding: "2px",
                                                        }),
                                                        option: (
                                                            base,
                                                            state
                                                        ) => ({
                                                            ...base,
                                                            backgroundColor:
                                                                state.isFocused
                                                                    ? "rgb(58 110 216)"
                                                                    : "white",
                                                            color: state.isFocused
                                                                ? "white"
                                                                : "black",
                                                            ":hover": {
                                                                backgroundColor:
                                                                    "rgb(58 110 216)",
                                                                color: "white",
                                                            },
                                                            zIndex: "100",
                                                        }),
                                                        singleValue: (
                                                            base,
                                                            state
                                                        ) => ({
                                                            ...base,
                                                            color: "black",
                                                            position:
                                                                "absolute",
                                                        }),
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div className="w-5/12 ">
                                            <div className="flex flex-row  text-gray-500">
                                                <svg
                                                    class="w-5 h-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                                    ></path>
                                                </svg>{" "}
                                                <div className="text-sm mb-2 ml-2">
                                                    Phone Numbers*
                                                </div>
                                            </div>
                                            <div
                                                ref={phoneInput}
                                                className="p-1 border-gray-300 hover:border-gray-500 w-full border-2 flex flex-row align-middle items-center rounded-xl overflow-hidden"
                                            >
                                                <div className=" px-3  border-r-2 select-none  border-gray-400">
                                                    +852
                                                </div>
                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                <input
                                                    type="tel"
                                                    className="p-1 border-none w-full focus:ring-0"
                                                    onChange={(e) => {
                                                        phone.current =
                                                            e.target.value;
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Form 3 */}
                        <div
                            ref={stepThree}
                            className="step3 hidden  h-full w-full justify-center items-center align-middle"
                        >
                            <div className="w-full flex flex-col justify-center items-center align-middle">
                                {/* survery and ask user how frequecy they travel */}
                                <div className="mt-5 w-6/12 flex flex-col justify-items-start align-middle">
                                    <div>
                                        <div className="text-2xl font-bold text-gray-700 text-center">
                                            We are almost done!
                                        </div>
                                        <div className="text-gray-500 text-sm mt-2 text-center">
                                            We need to know more about you for
                                            provide better service.
                                        </div>
                                    </div>
                                    <div className="flex flex-col mt-5 mr-20">
                                        <div className="text-gray-500 my-3 flex items-center">
                                            <div className="flex flex-row align-middle items-center">
                                                <svg
                                                    class="w-4 h-4 mr-2 text-black"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    ></path>
                                                </svg>
                                                <span className="">
                                                    How often do you travel?
                                                    (per year)
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex flex-row algin-center items-center">
                                            <input
                                                type="radio"
                                                name="freq"
                                                id="freq1"
                                            />
                                            <label
                                                className="text-gray-600 mx-3"
                                                htmlFor="freq1"
                                            >
                                                1-2 times
                                            </label>

                                            <input
                                                type="radio"
                                                name="freq"
                                                id="freq2"
                                            />
                                            <label
                                                className="text-gray-600 mx-3"
                                                htmlFor="freq2"
                                            >
                                                3-5 times
                                            </label>

                                            <input
                                                type="radio"
                                                name="freq"
                                                id="freq3"
                                            />
                                            <label
                                                className="text-gray-600 mx-3"
                                                htmlFor="freq3"
                                            >
                                                6 times or more
                                            </label>
                                        </div>
                                    </div>

                                    <div className="w-full flex flex-col mt-3 mr-20">
                                        <div className="text-gray-500 my-3 flex items-center">
                                            <div className="flex flex-row align-middle items-center">
                                                <svg
                                                    class="w-4 h-4 text-black mr-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                                                    ></path>
                                                </svg>
                                                <span className="">
                                                    What is your purpose of
                                                    travel ?
                                                </span>
                                            </div>
                                        </div>
                                        <div className="w-full flex flex-row algin-center items-center">
                                            <div className="relative w-full z-[200]">
                                                <Select
                                                    isMulti
                                                    name="colors"
                                                    options={[
                                                        {
                                                            value: "Business",
                                                            label: "Business",
                                                        },
                                                        {
                                                            value: "Leisure",
                                                            label: "Leisure",
                                                        },
                                                        {
                                                            value: "Family",
                                                            label: "Family",
                                                        },
                                                        {
                                                            value: "Study",
                                                            label: "Study",
                                                        },
                                                        {
                                                            value: "Others",
                                                            label: "Others",
                                                        },
                                                    ]}
                                                    className="basic-multi-select w-full focus:ring-0 "
                                                    classNamePrefix="ive"
                                                    styles={{
                                                        control: (
                                                            base,
                                                            state
                                                        ) => ({
                                                            ...base,
                                                            border: "2px solid rgb(209 213 219)",
                                                            borderRadius:
                                                                "0.5rem",
                                                            ":hover": {
                                                                borderColor:
                                                                    "rgb(107 114 128)",
                                                            },
                                                            boxShadow: "none",
                                                            position:
                                                                "relative",
                                                            zIndex: "101",
                                                            padding: "2px",
                                                        }),
                                                        option: (
                                                            base,
                                                            state
                                                        ) => ({
                                                            ...base,
                                                            backgroundColor:
                                                                state.isFocused
                                                                    ? "rgb(58 110 216)"
                                                                    : "white",
                                                            color: state.isFocused
                                                                ? "white"
                                                                : "black",
                                                            ":hover": {
                                                                backgroundColor:
                                                                    "rgb(58 110 216)",
                                                                color: "white",
                                                            },
                                                            zIndex: "101",
                                                        }),
                                                        singleValue: (
                                                            base,
                                                            state
                                                        ) => ({
                                                            ...base,
                                                            color: "black",
                                                            position:
                                                                "absolute",
                                                        }),
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full flex flex-col mt-3 mr-20">
                                        <div className="flex flex-row align-middle items-center mb-2">
                                            <svg
                                                class="w-4 h-4 mr-2 text-black"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                ></path>
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                ></path>
                                            </svg>
                                            <span className="">
                                                Where do you usually travel to ?
                                            </span>
                                        </div>

                                        <div className="w-full flex flex-row algin-center items-center">
                                            <div className="relative w-full z-[199]">
                                                <Select
                                                    isMulti
                                                    name="colors"
                                                    options={[
                                                        {
                                                            value: "Europe",
                                                            label: "Europe",
                                                        },
                                                        {
                                                            value: "Asia",
                                                            label: "Asia",
                                                        },
                                                        {
                                                            value: "North America",
                                                            label: "North America",
                                                        },
                                                        {
                                                            value: "South America",
                                                            label: "South America",
                                                        },
                                                        {
                                                            value: "Africa",
                                                            label: "Africa",
                                                        },
                                                        {
                                                            value: "Australia",
                                                            label: "Australia",
                                                        },
                                                        {
                                                            value: "Antarctica",
                                                            label: "Antarctica",
                                                        },
                                                    ]}
                                                    className="basic-multi-select w-full focus:ring-0 "
                                                    classNamePrefix="ive"
                                                    styles={{
                                                        control: (
                                                            base,
                                                            state
                                                        ) => ({
                                                            ...base,
                                                            border: "2px solid rgb(209 213 219)",
                                                            borderRadius:
                                                                "0.5rem",
                                                            ":hover": {
                                                                borderColor:
                                                                    "rgb(107 114 128)",
                                                            },
                                                            boxShadow: "none",
                                                            position:
                                                                "relative",
                                                            padding: "2px",
                                                        }),
                                                        option: (
                                                            base,
                                                            state
                                                        ) => ({
                                                            ...base,
                                                            backgroundColor:
                                                                state.isFocused
                                                                    ? "rgb(58 110 216)"
                                                                    : "white",
                                                            color: state.isFocused
                                                                ? "white"
                                                                : "black",
                                                            ":hover": {
                                                                backgroundColor:
                                                                    "rgb(58 110 216)",
                                                                color: "white",
                                                            },
                                                        }),
                                                        singleValue: (
                                                            base,
                                                            state
                                                        ) => ({
                                                            ...base,
                                                            color: "black",
                                                            position:
                                                                "absolute",
                                                        }),
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Form 4 */}
                        <div
                            ref={stepFour}
                            className="step4 hidden h-full w-full justify-center items-center align-middle "
                        >
                            <div className="w-full flex flex-col justify-center items-center align-middle bg-white z-[101]">
                                <div className="mt-5 w-6/12 flex flex-col justify-items-start align-middle ">
                                    <div className="flex flex-col">
                                        <div className="z-[100]">
                                            <label className="text-gray-700 text-sm font-bold mb-2 ">
                                                How did you find out about us?
                                            </label>
                                            <div className="relative">
                                                <Select
                                                    isMulti
                                                    options={[
                                                        {
                                                            value: "Google",
                                                            label: "Google",
                                                        },
                                                        {
                                                            value: "Facebook",
                                                            label: "Facebook",
                                                        },
                                                        {
                                                            value: "Instagram",
                                                            label: "Instagram",
                                                        },
                                                        {
                                                            value: "Twitter",
                                                            label: "Twitter",
                                                        },
                                                        {
                                                            value: "Youtube",
                                                            label: "Youtube",
                                                        },
                                                        {
                                                            value: "LinkedIn",
                                                            label: "LinkedIn",
                                                        },
                                                        {
                                                            value: "Other",
                                                            label: "Other",
                                                        },
                                                    ]}
                                                    className="basic-multi-select w-full focus:ring-0 "
                                                    classNamePrefix="ive"
                                                    styles={{
                                                        control: (
                                                            base,
                                                            state
                                                        ) => ({
                                                            ...base,
                                                            border: "2px solid rgb(209 213 219)",
                                                            borderRadius:
                                                                "0.5rem",
                                                            ":hover": {
                                                                borderColor:
                                                                    "rgb(107 114 128)",
                                                            },
                                                            boxShadow: "none",
                                                            position:
                                                                "relative",
                                                            padding: "2px",
                                                            zIndex: "200",
                                                        }),
                                                        option: (
                                                            base,
                                                            state
                                                        ) => ({
                                                            ...base,
                                                            backgroundColor:
                                                                state.isFocused
                                                                    ? "rgb(58 110 216)"
                                                                    : "white",
                                                            color: state.isFocused
                                                                ? "white"
                                                                : "black",
                                                            ":hover": {
                                                                backgroundColor:
                                                                    "rgb(58 110 216)",
                                                                color: "white",
                                                            },
                                                        }),
                                                        singleValue: (
                                                            base,
                                                            state
                                                        ) => ({
                                                            ...base,
                                                            color: "black",
                                                            position:
                                                                "absolute",
                                                        }),
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <label className="text-gray-700 text-sm font-bold mb-2">
                                                Is the registration process
                                                clear?
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="radio"
                                                    name="rcq"
                                                    id="rcq-yes"
                                                />
                                                <label
                                                    htmlFor="rcq-yes"
                                                    className="mr-5 select-none mx-1"
                                                >
                                                    Yes
                                                </label>
                                                <input
                                                    type="radio"
                                                    name="rcq"
                                                    id="rcq-no"
                                                />
                                                <label
                                                    htmlFor="rcq-no"
                                                    className="select-none mx-1"
                                                >
                                                    No
                                                </label>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <label className="text-gray-700 text-sm font-bold mb-2">
                                                Any suggestions for improvement?
                                            </label>
                                            <div className="relative">
                                                <textarea
                                                    className="mt-3 w-full h-24 px-3 py-2 text-base text-gray-700 placeholder-gray-400 border rounded-lg focus:shadow-outline"
                                                    placeholder="Please enter your suggestions here"
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Form 5 */}
                        <div className="step5 w-full h-full flex flex-col items-center justify-center">
                            <div
                                className="hidden flex-col justify-center align-middle items-center "
                                ref={loader}
                            >
                                <Spinner name="pacman" />
                                <span className="text-xl font-bold mt-5 text-gray-500">
                                    Please wait while we are creating your
                                    account
                                </span>
                            </div>
                            <div
                                ref={stepFive}
                                className="w-full hidden flex-col justify-center items-center align-middle"
                            >
                                <div className=" text-green-700">
                                    <svg
                                        class="w-16 h-16"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        ></path>
                                    </svg>
                                </div>
                                <div className="text-2xl font-bold text-center">
                                    You Have Successfully Signed Up!
                                </div>
                                <div className=" whitespace-pre-wrap w-1/2 text-center mt-5 text-lg">
                                    <span>
                                        We have sent you an email to
                                        <span className="text-primary">
                                            {" "}
                                            {email}{" "}
                                        </span>
                                        with a link to verify your account.
                                        After receiving the email please click
                                        on the link to verify your account.
                                    </span>
                                </div>
                                <div className="border-t w-1/2 mt-4 mb-6 text-center"></div>
                                <div className=" text-gray-500">
                                    Go back to
                                    <Link to="/login">
                                        <a className="text-primary ml-1 font-semibold">
                                            Login
                                        </a>
                                    </Link>{" "}
                                    page
                                </div>

                                <div className="text-base text-gray-500 flex flex-row items-center mt-4">
                                    Please rate your experience
                                    <div
                                        className="underline inline-block text-primary cursor-pointer ml-3 scale-110"
                                        onClick={() => {
                                            toast.success(
                                                "Thank you for your feedback"
                                            );
                                            setCanEditRating(false);
                                        }}
                                    >
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            edit={canEditRating}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="z-[99] relative flex flex-row justify-center mt-12">
                        <div
                            ref={backBtn}
                            onClick={() => {
                                nextBtn.current.innerHTML = "Next";
                                if (step === 2) {
                                    stepTwo.current.classList.add(
                                        "animate-fade-out-right"
                                    );
                                    setTimeout(() => {
                                        stepTwo.current.classList.add("hidden");
                                        stepTwo.current.classList.remove(
                                            "animate-fade-out-right"
                                        );
                                        stepOne.current.classList.remove(
                                            "hidden"
                                        );
                                        stepOne.current.classList.add(
                                            "animate-fade-in-left"
                                        );
                                    }, 500);

                                    setTimeout(() => {
                                        stepOne.current.classList.remove(
                                            "animate-fade-in-left"
                                        );
                                    }, 1000);

                                    setStep(1);
                                } else if (step === 3) {
                                    stepThree.current.classList.add(
                                        "animate-fade-out-right"
                                    );
                                    setTimeout(() => {
                                        stepThree.current.classList.add(
                                            "hidden"
                                        );
                                        stepThree.current.classList.remove(
                                            "animate-fade-out-right"
                                        );
                                        stepTwo.current.classList.remove(
                                            "hidden"
                                        );
                                        stepTwo.current.classList.add(
                                            "animate-fade-in-left"
                                        );
                                    }, 500);

                                    setTimeout(() => {
                                        stepTwo.current.classList.remove(
                                            "animate-fade-in-left"
                                        );
                                    }, 1000);

                                    setStep(2);
                                } else if (step === 4) {
                                    stepFour.current.classList.add(
                                        "animate-fade-out-right"
                                    );
                                    setTimeout(() => {
                                        stepFour.current.classList.add(
                                            "hidden"
                                        );
                                        stepFour.current.classList.remove(
                                            "animate-fade-out-right"
                                        );
                                        stepThree.current.classList.remove(
                                            "hidden"
                                        );
                                        stepThree.current.classList.add(
                                            "animate-fade-in-left"
                                        );
                                    }, 500);

                                    setTimeout(() => {
                                        stepThree.current.classList.remove(
                                            "animate-fade-in-left"
                                        );
                                    }, 1000);

                                    setStep(3);
                                } else if (step === 5) {
                                    // stepFour.current.classList.add(
                                    //     "animate-fade-out-right"
                                    // );
                                    setTimeout(() => {
                                        // stepFour.current.classList.add("hidden");
                                        // stepFour.current.classList.remove(
                                        //     "animate-fade-out-right"
                                        // );
                                        stepThree.current.classList.remove(
                                            "hidden"
                                        );
                                        stepThree.current.classList.add(
                                            "animate-fade-in-left"
                                        );
                                    }, 500);

                                    setTimeout(() => {
                                        stepThree.current.classList.remove(
                                            "animate-fade-in-left"
                                        );
                                    }, 1000);

                                    setStep(3);
                                }
                            }}
                            className="btn text-center w-1/12 mx-12 buttom border inline-block p-2 rounded-lg shadow-lg text-primary select-none  hover:text-white "
                        >
                            <span className="text-sm">Back</span>
                        </div>

                        <div
                            ref={nextBtn}
                            onClick={() => {
                                if (step === 1) {
                                    if (validStepOne()) {
                                        stepOne.current.classList.add(
                                            "animate-fade-out-left"
                                        );
                                        setTimeout(() => {
                                            stepOne.current.classList.add(
                                                "hidden"
                                            );
                                            stepOne.current.classList.remove(
                                                "animate-fade-out-left"
                                            );
                                            stepTwo.current.classList.remove(
                                                "hidden"
                                            );
                                            stepTwo.current.classList.add(
                                                "flex"
                                            );
                                            stepTwo.current.classList.add(
                                                "animate-fade-in-right"
                                            );
                                        }, 500);

                                        setTimeout(() => {
                                            stepTwo.current.classList.remove(
                                                "animate-fade-in-right"
                                            );
                                        }, 1000);
                                        setStep(2);
                                        setCanNext(false);
                                    }
                                } else if (step === 2) {
                                    if (validStepTwo()) {
                                        stepTwo.current.classList.add(
                                            "animate-fade-out-left"
                                        );
                                        setTimeout(() => {
                                            stepTwo.current.classList.add(
                                                "hidden"
                                            );
                                            stepTwo.current.classList.remove(
                                                "animate-fade-out-left"
                                            );
                                            stepThree.current.classList.remove(
                                                "hidden"
                                            );
                                            stepThree.current.classList.add(
                                                "flex"
                                            );
                                            stepThree.current.classList.add(
                                                "animate-fade-in-right"
                                            );
                                        }, 500);

                                        setTimeout(() => {
                                            stepThree.current.classList.remove(
                                                "animate-fade-in-right"
                                            );
                                        }, 1000);
                                        setStep(3);
                                        setCanNext(false);
                                    }
                                } else if (step === 3) {
                                    nextBtn.current.innerHTML = "Create";
                                    stepThree.current.classList.add(
                                        "animate-fade-out-left"
                                    );
                                    setTimeout(() => {
                                        stepThree.current.classList.add(
                                            "hidden"
                                        );
                                        stepThree.current.classList.remove(
                                            "animate-fade-out-left"
                                        );
                                        stepFour.current.classList.remove(
                                            "hidden"
                                        );
                                        stepFour.current.classList.add("flex");
                                        stepFour.current.classList.add(
                                            "animate-fade-in-right"
                                        );
                                    }, 500);

                                    setTimeout(() => {
                                        stepFour.current.classList.remove(
                                            "animate-fade-in-right"
                                        );
                                    }, 1000);
                                    setStep(4);
                                    setCanNext(false);
                                } else if (step === 4) {
                                    stepThree.current.classList.add(
                                        "animate-fade-out-left"
                                    );

                                    setTimeout(() => {
                                        stepFour.current.classList.add(
                                            "hidden"
                                        );
                                        stepFour.current.classList.remove(
                                            "animate-fade-out-left"
                                        );
                                        loader.current.classList.remove(
                                            "hidden"
                                        );
                                        loader.current.classList.add("flex");
                                        nextBtn.current.classList.add("hidden");
                                        backBtn.current.classList.add("hidden");
                                    }, 500);

                                    setTimeout(() => {
                                        stepFive.current.classList.remove(
                                            "hidden"
                                        );
                                        stepFive.current.classList.add("flex");
                                        loader.current.classList.add("hidden");
                                    }, 6500);

                                    setStep(5);
                                    setCanNext(false);
                                }
                            }}
                            className="transition-colors text-center w-2/12 mx-12 buttom border inline-block p-2 rounded-lg shadow-lg text-white bg-primary select-none hover:bg-primary-dark"
                        >
                            Next
                        </div>
                    </div>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 w-full select-none">
                <img src={`${footer}`} alt="" srcset="" />
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

    const app = useApp();
    app.setDisableFooter(true);

    const box = useRef(null);

    document.title = "Forgot Password";

    return (
        <div className="flex justify-center items-center h-screen bg-blue-100 ">
            <div className="fixed bottom-0 w-full z-[1]">
                <img src={`${footer}`} alt="" srcset="" />
            </div>
            <div
                ref={box}
                className=" bg-white rounded-lg shadow-xl h-3/4  animate-fade-in-left transition-all duration-200 ease-linear "
                style={{ transition: "all 0.5s ease-in-out", width: "60%" }}
            >
                {!sucess ? (
                    <div className="flex flex-row h-full align-middle items-center justify-center  overflow-hidden rounded bg-white-100 p-5">
                        <div className="flex justify-center h-full p-3">
                            <img
                                src={forgot_pw_img}
                                alt=""
                                className="h-full"
                            />
                        </div>

                        <div className="h-full flex flex-col w-1/2 pl-5">
                            <div className="flex flex-row mt-14 border-b-2 pb-3">
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
                            <div className="mt-20">
                                <span className="mt-3 text-start">
                                    Don't worry we can help you out! If you
                                    still remember your email address, please
                                    enter it below and we will send you a link
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
                                    className="w-full mt-5"
                                    >
                                    Continue
                                    </Button>

                                <div className="text-center text-xs text-black-500 mt-5 font-light ">
                                    <span className="cursor-pointer text-blue-600">
                                        Terms of Service
                                    </span>
                                    {/* a point */}
                                    <span className="mx-1">•</span>
                                    <span className="cursor-pointer text-blue-600">
                                        Privacy Policy
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="h-full p-12 overflow-hidden">
                        <LoadPage
                            page={<ResetPwSuccess box={box} />}
                            loading_time={3}
                            Preloaded={<Header noback />}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

function ResetPwSuccess({ box }) {
    const navigate = useNavigate();
    const [time, set_time] = useState(5);

    if (box.current) {
        box.current.style.width = "25%";
        box.current.style.height = "50%";
    }

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
        <div className="flex flex-col sm-auto mt-8 h-full ">
            <div className="flex flex-col justify-center align-middle text-center items-center my-auto">
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
                    <span className="text-sm text-black-500">
                        ( {time} sec )
                    </span>
                </div>
            </div>
        </div>
    );
}

export function OperatorResetPw({  }) {
    const app = useApp();
    app.setDisableFooter(true);

    document.title = "Reset Password";

    let [success, set_success] = useState(false);
    let ratebar = useRef(null);
    let box = useRef(null);

    if (!success) {
        return (
            <div className="overflow-hidden  h-screen">
                <Header noback />
                <div className="flex flex-col mt-24 sm-auto  text-center overflow-hidden">
                    <div  className="flex flex-col justify-center sm-auto w-7/12 h-[70%] mx-auto border rounded-2xl shadow-xl overflow-hidden"
                        >
                        <div className="">
                            <div className="flex flex-col bg-gray-50 p-5 w-full">
                                <div className="text-2xl font-bold">
                                    Please reset your password below
                                </div>
                                <div className="text-sm text-black-500 mt-5">
                                    This is the first time you login to the
                                    system. Please reset your password to
                                    continue.
                                </div>
                                <div className="flex flex-row flex-wrap mt-5 w-full items-center justify-center align-middle">
                                    <div className="flex flex-col mr-5 w-5/12">
                                        <div className="text-gray-500">
                                            New Password
                                        </div>
                                        <FloatingLabel
                                            placeholder={"Password"}
                                            type="password"
                                            id={"password"}
                                            bg={"bg-gray-100"}
                                            handler={(e) => {
                                                // rate the password strength , from 0 to 4, 0 being the weakest, starting to 1 when the password is 8 characters long
                                                let passwordStrength = 0;

                                                // check if the password contains a number
                                                if (
                                                    e.target.value.match(/\d/)
                                                ) {
                                                    passwordStrength++;
                                                }

                                                // check if the password contains a lowercase letter
                                                if (
                                                    e.target.value.match(
                                                        /[a-z]/
                                                    )
                                                ) {
                                                    passwordStrength++;
                                                }

                                                // check if the password contains an uppercase letter
                                                if (
                                                    e.target.value.match(
                                                        /[A-Z]/
                                                    )
                                                ) {
                                                    passwordStrength++;
                                                }

                                                // check if the password contains a special character
                                                if (
                                                    e.target.value.match(
                                                        /[^a-zA-Z\d]/
                                                    )
                                                ) {
                                                    passwordStrength++;
                                                }

                                                if (
                                                    e.target.value.length <= 8
                                                ) {
                                                    passwordStrength = 0;
                                                }

                                                ratebar.current.value =
                                                    passwordStrength;
                                            }}
                                            validate={true}
                                        />
                                    </div>
                                    <div className="flex flex-col mr-5 w-5/12">
                                        <div className="text-gray-500">
                                            Comfirm Password
                                        </div>
                                        <FloatingLabel
                                            placeholder={"Confirm Password"}
                                            type="password"
                                            id={"r_password"}
                                            bg={"bg-gray-100"}
                                            validate={true}
                                        />
                                    </div>
                                </div>
                                {/* password requirements */}
                                <meter
                                    value="0"
                                    min="0"
                                    max="4"
                                    className="w-5/12 ml-12 mt-1"
                                    ref={ratebar}
                                    high="3"
                                    low="2"
                                    optimum="4"
                                ></meter>
                                    <div className="bg-blue-50 my-5 rounded-md border mx-12 text-left text-gray-600 text-sm p-5">
                                        <div className="ml-5">
                                            Passwords must be at least 8 characters that cannot be easily guessed
                                            and must adhere to the following requirements:
                                        </div>

                                        <ul className="text-start list-disc ml-14">
                                            <li>
                                                <p>
                                                    Password must contain at least one character from 
                                                    each of the following groups:
                                                </p>
                                                <ul className="list-decimal ml-14">
                                                    <li>At least 1 uppercase letter</li>
                                                    <li>At least 1 lowercase letter</li>
                                                    <li>At least 1 number</li>
                                                    <li>At least 1 special character</li>
                                                </ul>
                                            </li>
                                            <li>
                                                Password cannot contain your name or email address
                                            </li>
                                        </ul>

                                    </div>
                                <Button
                                    className="mt-5 w-fit mx-auto"
                                    onClick={() => {
                                        set_success(true);
                                    }}
                                >
                                    Save Changes
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="flex justify-center items-center h-screen">

                <div ref={box} className="animate-fade-in flex flex-col justify-center sm-auto w-7/12 h-[70%] mx-auto border rounded-2xl shadow-xl overflow-hidden"
                        style={{ transition: "all 0.5s ease-in-out", width: "60%" }}>
                        <div className="h-full p-12 overflow-hidden">
                        <LoadPage
                            page={<ResetPwSuccess box={box} />}
                            loading_time={3}
                            Preloaded={<Header noback />}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
