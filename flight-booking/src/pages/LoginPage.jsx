import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../logo.svg";
import { CheckBox, FloatingLabel } from "../component/Form";
import { Button, LoadingButton } from "../component/Button";
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

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Button.css";
import AuthCode from "react-auth-code-input";

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

                <div className="text-sm text-black-500 mt-5">
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
                style="w-full mt-5"
            >
                Sign in
            </LoadingButton>

            <div className="text-primary text-center text-sm mt-3">
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
                    className="bg-white px-8  m-auto justify-center align-middle"
                    style={{ width: "34rem" }}
                >
                    <div className="flex flex-col justify-center m-auto">
                        <h1 className="text-3xl font-medium text-start">
                            Create an account
                        </h1>
                        <div className="flex flex-row items-center pb-2 align-middle border-b-2">
                            <span className="mt-3 text-start">
                                More about you
                            </span>
                            <Tooltips content={"For suggestion"} />
                        </div>
                        <div
                            htmlFor=""
                            className="text-gray-500 my-3 mt-5 flex items-center"
                        >
                            <svg
                                width="24px"
                                height="24px"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g>
                                    <path fill="none" d="M0 0h24v24H0z" />
                                    <path d="M8 6v3.999h3V6h2v3.999h3V6h2v3.999L19 10a3 3 0 0 1 2.995 2.824L22 13v1c0 1.014-.377 1.94-.999 2.645L21 21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4.36a4.025 4.025 0 0 1-.972-2.182l-.022-.253L2 14v-1a3 3 0 0 1 2.824-2.995L5 10l1-.001V6h2zm11 6H5a1 1 0 0 0-.993.883L4 13v.971l.003.147A2 2 0 0 0 6 16a1.999 1.999 0 0 0 1.98-1.7l.015-.153.005-.176c.036-1.248 1.827-1.293 1.989-.134l.01.134.004.147a2 2 0 0 0 3.992.031l.012-.282c.124-1.156 1.862-1.156 1.986 0l.012.282a2 2 0 0 0 3.99 0L20 14v-1a1 1 0 0 0-.883-.993L19 12zM7 1c1.32.871 1.663 2.088 1.449 2.888a1.5 1.5 0 0 1-2.898-.776C5.85 2.002 7 2.5 7 1zm5 0c1.32.871 1.663 2.088 1.449 2.888a1.5 1.5 0 1 1-2.898-.776C10.85 2.002 12 2.5 12 1zm5 0c1.32.871 1.663 2.088 1.449 2.888a1.5 1.5 0 1 1-2.898-.776C15.85 2.002 17 2.5 17 1z" />
                                </g>
                            </svg>
                            <span className="ml-2">Date of birth</span>
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
                            <div
                                htmlFor=""
                                className="text-gray-500 my-3 flex items-center"
                            >
                                <svg
                                    width="28px"
                                    height="28px"
                                    viewBox="0 0 48 48"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M23.3931 28.9299C23.9454 28.9299 24.3931 29.3776 24.3931 29.9299V39.9299C24.3931 40.4822 23.9454 40.9299 23.3931 40.9299C22.8408 40.9299 22.3931 40.4822 22.3931 39.9299V29.9299C22.3931 29.3776 22.8408 28.9299 23.3931 28.9299Z"
                                        fill="#333333"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M19.3931 36.9299C19.3931 36.3776 19.8408 35.9299 20.3931 35.9299H26.3931C26.9454 35.9299 27.3931 36.3776 27.3931 36.9299C27.3931 37.4822 26.9454 37.9299 26.3931 37.9299H20.3931C19.8408 37.9299 19.3931 37.4822 19.3931 36.9299Z"
                                        fill="#333333"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M23.3931 14.9287C19.5271 14.9287 16.3931 18.0627 16.3931 21.9287C16.3931 25.7947 19.5271 28.9287 23.3931 28.9287C27.2591 28.9287 30.3931 25.7947 30.3931 21.9287C30.3931 18.0627 27.2591 14.9287 23.3931 14.9287ZM23.3931 12.9287C18.4225 12.9287 14.3931 16.9581 14.3931 21.9287C14.3931 26.8993 18.4225 30.9287 23.3931 30.9287C28.3636 30.9287 32.3931 26.8993 32.3931 21.9287C32.3931 16.9581 28.3636 12.9287 23.3931 12.9287Z"
                                        fill="#333333"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M29.1183 16.7049C28.729 16.3131 28.731 15.68 29.1228 15.2907L36.706 7.75503C37.0978 7.36574 37.731 7.36773 38.1202 7.75949C38.5095 8.15124 38.5075 8.7844 38.1158 9.17369L30.5325 16.7093C30.1408 17.0986 29.5076 17.0966 29.1183 16.7049Z"
                                        fill="#333333"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M35.7028 15.8272C35.3123 16.2177 34.6791 16.2177 34.2886 15.8272L30.046 11.5846C29.6555 11.194 29.6555 10.5609 30.046 10.1703C30.4365 9.77982 31.0697 9.77982 31.4602 10.1703L35.7028 14.413C36.0934 14.8035 36.0934 15.4367 35.7028 15.8272Z"
                                        fill="#333333"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M37.8751 13C37.3228 13 36.8751 12.5523 36.8751 12V9H33.8751C33.3228 9 32.8751 8.55228 32.8751 8C32.8751 7.44772 33.3228 7 33.8751 7H37.8751C38.4273 7 38.8751 7.44772 38.8751 8V12C38.8751 12.5523 38.4273 13 37.8751 13Z"
                                        fill="#333333"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M11.1713 8.29714L18.1671 15.2929C18.5576 15.6834 18.5576 16.3166 18.1671 16.7071C17.7765 17.0976 17.1434 17.0976 16.7529 16.7071L9.75713 9.71136C9.36661 9.32083 9.36661 8.68767 9.75713 8.29714C10.1477 7.90662 10.7808 7.90662 11.1713 8.29714Z"
                                        fill="#333333"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M15.0001 8.53992C15.0001 9.0922 14.5523 9.53992 14.0001 9.53992H11.0001V12.5399C11.0001 13.0922 10.5523 13.5399 10.0001 13.5399C9.44778 13.5399 9.00006 13.0922 9.00006 12.5399V8.53992C9.00006 7.98763 9.44778 7.53992 10.0001 7.53992H14.0001C14.5523 7.53992 15.0001 7.98763 15.0001 8.53992Z"
                                        fill="#333333"
                                    />
                                </svg>
                                <span className="">Sexual</span>
                            </div>
                            <div className=" flex flex-row algin-center items-center">
                                <input type="radio" name="sex" id="m" />
                                <label
                                    className="text-gray-600 mx-3"
                                    htmlFor="m"
                                >
                                    Male
                                </label>

                                <input type="radio" name="sex" id="f" />
                                <label
                                    className="text-gray-600 mx-3"
                                    htmlFor="f"
                                >
                                    Female
                                </label>

                                <input type="radio" name="sex" id="n" />
                                <label
                                    className="text-gray-600 mx-3"
                                    htmlFor="n"
                                >
                                    Non-binary
                                </label>
                            </div>
                        </div>

                        <div className="">
                            <div
                                htmlFor=""
                                className="text-gray-500 my-3 flex items-center"
                            >
                                <svg
                                    width="20px"
                                    height="20px"
                                    viewBox="0 0 58.568 58.568"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        id="flight_plane"
                                        data-name="flight plane"
                                        d="M1023.994,672.006c2.4-3.218,3.843-6.559,3.85-8.946a3.323,3.323,0,0,0-.453-1.828,1.706,1.706,0,0,0-.578-.584,3.265,3.265,0,0,0-1.852-.466c-2.381,0-5.723,1.442-8.942,3.849a77.166,77.166,0,0,0-8.806,8.487q-.917.966-1.934,2.031l-6.976-2.091.02-.02a1.566,1.566,0,0,0-.005-2.2l-1.259-1.261a1.571,1.571,0,0,0-1.11-.461,1.541,1.541,0,0,0-1.1.458l-1.885,1.886-1-.3a1.563,1.563,0,0,0-.125-2.063l-1.266-1.265a1.568,1.568,0,0,0-1.109-.457,1.534,1.534,0,0,0-1.1.458l-1.73,1.73-7.094-2.125a1.775,1.775,0,0,0-.507-.072,1.875,1.875,0,0,0-1.311.531l-2.494,2.494a1.463,1.463,0,0,0-.439,1.029,1.433,1.433,0,0,0,.761,1.284l14.918,8.334a2.607,2.607,0,0,1,.362.275l4.253,4.252c-3.978,4.191-7.522,8.25-10.284,11.781-.258.328-.5.649-.742.965l-11.541-1.048a1.573,1.573,0,0,0-.2-.012,2.127,2.127,0,0,0-1.429.591l-1.163,1.161a1.449,1.449,0,0,0-.446,1.029,1.418,1.418,0,0,0,.839,1.3l8.119,3.857a1.843,1.843,0,0,1,.311.223l.674.668a4.938,4.938,0,0,0-.325,1.561,2.053,2.053,0,0,0,.567,1.5l.029.026.008.005a2.056,2.056,0,0,0,1.493.56,4.964,4.964,0,0,0,1.548-.322l.684.682a1.956,1.956,0,0,1,.212.3l3.848,8.1a1.435,1.435,0,0,0,1.294.851h.008a1.446,1.446,0,0,0,1.026-.432l1.192-1.2a2.132,2.132,0,0,0,.569-1.426c0-.066,0-.117-.005-.144l-1.051-11.581c.317-.238.636-.484.965-.739,3.536-2.766,7.6-6.313,11.779-10.286l4.256,4.26a2.314,2.314,0,0,1,.278.365l8.318,14.891a1.451,1.451,0,0,0,2.322.342l2.512-2.51a1.9,1.9,0,0,0,.514-1.31,1.769,1.769,0,0,0-.069-.491l-2.125-7.095,1.729-1.733a1.563,1.563,0,0,0,0-2.205l-1.268-1.267a1.559,1.559,0,0,0-2.062-.129l-.3-.995,1.887-1.886a1.577,1.577,0,0,0,.455-1.107,1.54,1.54,0,0,0-.455-1.1l-1.262-1.262a1.563,1.563,0,0,0-2.217,0l-.013.012-2.089-6.976q1.082-1.032,2.062-1.96C1019.32,677.193,1022.053,674.6,1023.994,672.006Z"
                                        transform="translate(-969.276 -660.182)"
                                    />
                                </svg>
                                <span className="ml-2">
                                    How often do you travel? (per year)
                                </span>
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

                        <div className="my-3">
                            <div
                                htmlFor=""
                                className="text-gray-500 my-3 flex items-center"
                            >
                                <svg
                                    width="24px"
                                    height="24px"
                                    viewBox="0 0 32 32"
                                    data-name="Layer 1"
                                    id="Layer_1"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <defs>
                                        <style></style>
                                    </defs>
                                    <title />
                                    <path
                                        class="cls-1"
                                        d="M28,8H21V6a2,2,0,0,0-2-2H13a2,2,0,0,0-2,2V8H4a2,2,0,0,0-2,2V26a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V10A2,2,0,0,0,28,8ZM13,6h6V8H13Zm15,4v9H4V10ZM4,26V21H28v5Z"
                                    />
                                    <path
                                        class="cls-1"
                                        fill="#4d4d4d"
                                        d="M15,18h2a1,1,0,0,0,0-2H15a1,1,0,0,0,0,2Z"
                                    />
                                </svg>
                                <span className="ml-2">Industry</span>
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
    const app = useApp();
    app.setDisableFooter(true);

    document.title = "Sign up";

    const [step, setStep] = useState(1);

    // step button state
    const [canNext , setCanNext] = useState(false);
    // step 1
    const stepOne = useRef(null);
    const [emailValid, setEmailValid] = useState(true);
    const [email, setEmail] = useState("");
    const validStepOne = () => {
        setCanNext(false);
        setEmailValid(true);
        // test email
        if (email.length == 0 || email == "") {
            toast.error("Please enter your email address");
            return;
        }
        if (
            !/\S+@\S+\.\S+/.test(email)
        ) {
            setEmailValid(false);
            return;
        } 
        setCanNext(true);
    };



    return (
        <div className="h-screen flex flex-col bg-blue-100">
            <div className="flex w-full h-3/4  my-auto justify-center align-middle item-center">
                <div className="relative box bg-white h-full w-3/5 rounded-lg shadow-lg overflow-hidden">
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
                                    <div class="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-primary"
                                        style={{ backgroundColor: step === 1 ? "rgb(48 88 210)" : "white" , color : step === 1 ? "white" : "rgb(48 88 210)" , borderColor : step >= 1 ? "rgb(48 88 210)" : "rgb(209 213 219)" }}>
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
                                        Email
                                    </div>
                                </div>
                                <div class="flex-auto border-t-2 transition duration-500 ease-in-out"
                                    style={{ borderColor: step > 1 ? "rgb(48 88 210)" : "rgb(209 213 219)" }}
                                ></div>
                                <div class="flex items-center text-white relative">
                                    <div class="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2"
                                        style={{ backgroundColor: step === 2 ? "rgb(48 88 210)" : "white" , color : step === 2 ? "white": (step >= 2 ? "rgb(48 88 210)" : "grey" ) ,
                                        borderColor : step >= 2 ? "rgb(48 88 210)" : "rgb(209 213 219)" 
                                        }}>
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
                                            <circle cx="8.5" cy="7" r="4"></circle>
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
                                    <div class="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase"
                                        style={{ color: step >= 2 ? "rgb(48 88 210)" : "grey"  }}
                                    >
                                        Account
                                    </div>
                                </div>
                                <div class="flex-auto border-t-2 transition duration-500 ease-in-out "
                                    style={{ borderColor: step > 2 ? "rgb(48 88 210)" : "rgb(209 213 219)" }}
                                ></div>
                                <div class="flex items-center text-gray-500 relative">
                                    <div class="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 "
                                        style={{ backgroundColor: step === 3 ? "rgb(48 88 210)" : "white" , color : step === 3 ? "white": (step >= 3 ? "rgb(48 88 210)" : "grey" ) ,
                                        borderColor : step >= 3 ? "rgb(48 88 210)" : "rgb(209 213 219)"  }}>
                                            
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
                                    <div class="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase "
                                        style={{ color: step >= 3 ? "rgb(48 88 210)" : "grey" }}
                                    >
                                        Message
                                    </div>
                                </div>
                                <div class="flex-auto border-t-2 transition duration-500 ease-in-out "
                                    style={{ borderColor: step > 3 ? "rgb(48 88 210)" : "rgb(209 213 219)" }}
                                ></div>
                                <div class="flex items-center text-gray-500 relative">
                                    <div class="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 "
                                        style={{ backgroundColor: step === 4 ? "rgb(48 88 210)" : "white" , color : step === 4 ? "white": (step >= 4 ? "rgb(48 88 210)" : "grey" ) ,
                                        borderColor : step >= 4 ? "rgb(48 88 210)" : "rgb(209 213 219)"  }}>
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
                                            class="feather feather-database "
                                        >
                                            <ellipse
                                                cx="12"
                                                cy="5"
                                                rx="9"
                                                ry="3"
                                            ></ellipse>
                                            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                                            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                                        </svg>
                                    </div>
                                    <div class="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase "
                                        style={{ color: step >= 4 ? "rgb(48 88 210)" : "grey" }}
                                    >
                                        Confirm
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* For different Form */}

                    <div className=" h-3/6">

                        <div ref={stepOne} className=" step1 h-full w-full flex justify-center items-center align-middle">
                            <div className="flex flex-col justify-center items-center">
                                <div>
                                    <h1 className="text-2xl font-bold">Step 1</h1>
                                </div>
                                <div>
                                    <h1 className="mt-2 mb-3">
                                        Please provide your email
                                        and we will send you a
                                        verification code
                                    </h1>

                                </div>
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
                                {/* <AuthCode  allowedCharacters='numeric' length={5}
                                inputClassName="border-2 border-gray-300 bg-white w-12 rounded-lg text-sm focus:outline-none"
                                containerClassName="flex justify-center items-center"
                                 /> */}
                            </div>
                        </div>

                    </div>
    
                    

                    <div className="z-[99] relative flex flex-row justify-center mt-12">
                        
                        <div
                            onClick={() => {
                                if (step === 2) {
                                    setStep(1);
                                    stepOne.current.classList.remove("hidden");
                                    stepOne.current.classList.add("animate-fade-in-right");
                                    setTimeout(() => {
                                        stepOne.current.classList.remove("animate-fade-in-right");

                                    }
                                    , 500);
                                }
                            }}
                            className="btn text-center w-1/12 mx-12 buttom border inline-block p-2 rounded-lg shadow-lg text-primary select-none  hover:text-white "
                        >
                            <span className="text-sm">Back</span>
                        </div>


                        <div
                            onClick={() => {

                                if (step === 1) {
                                    validStepOne();
                                    if (canNext) {
                                        stepOne.current.classList.add("animate-fade-out-right");
                                        
                                        setTimeout(() => {
                                            stepOne.current.classList.add("hidden");
                                            stepOne.current.classList.remove("animate-fade-out-right");
                                        
                                        }, 500);
                                        setStep(2);
                                    }
                                }
                            }}
                            className="transition-colors text-center w-2/12 mx-12 buttom border inline-block p-2 rounded-lg shadow-lg text-white bg-primary select-none hover:bg-primary-dark"
                        >
                            Next
                        </div>


                    </div>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 w-full">
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
            <div className="fixed bottom-0 w-full ">
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
                                ></Button>

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
                    <div className="h-full p-12 overflow-hidden ">
                        <LoadPage
                            page={<ResetPwSuccess box={box} />}
                            Preloaded={<Header noback />}
                            loading_time={3}
                        />
                    </div>
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

function ResetPwSuccess({ box }) {
    const navigate = useNavigate();
    const [time, set_time] = useState(5);

    if (box.current) {
        box.current.classList.remove("h-3/4");
        box.current.classList.add("h-1/2");
        box.current.style.width = "20%";
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
            <Header noback />
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
