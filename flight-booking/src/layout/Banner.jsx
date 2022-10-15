import { Button } from "../component/Button";
import { DatePicker, ExpandableInputText, FloatingLabel, InputBox, DropDownSearch } from "../component/Form";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import data from "../db/airport.json";

export function HeroBanner() {
    const [date, setDate] = useState(new Date().toLocaleDateString("sv"));
    const [to, setTo] = useState("");

    const validForm = to !== "";
    

    return (
        <div className="mx-auto mb-10 w-full " >
            <section class="z-[99]">
                <div
                    class="relative bg-no-repeat bg-cover "
                    style={{
                        backgroundPosition: "50%",
                        backgroundImage:
                            "url(https://mdbcdn.b-cdn.net/img/new/slides/146.webp)",
                        height: "500px",
                    }}
                >
                    <div
                        class="absolute top-0 right-0 bottom-0 left-0 w-full h-full bg-fixed"
                        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                    >
                        <div class="flex justify-center items-center h-full">
                            <div class="text-center text-white px-6 md:px-12">
                                <h1 class="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12">
                                    <span class="block">
                                        Let the journey begin
                                    </span>
                                </h1>
                                <div className="flex justify-center flex-row align-middle">
                                    <div className="w-10/12 mr-2 flex flex-row items-center">
                                        <div className="grow mr-2 z-50 text-start">
                                            <DropDownSearch dest={to} setTo={setTo}/>
                                        </div >
                                        <div className="w-4/12">
                                            <DatePicker
                                                style={{
                                                    zIndex: 1,
                                                }}
                                                setDate={setDate}
                                            />
                                        </div>
                                    </div>
                                    { validForm ? (
                                        <Link to={{ pathname: `/search/${to}/${date}`, search: '?page=1' }}>
                                            <Button content="Search"  />
                                        </Link>
                                    ) : (
                                       <div>
                                        <Button content="Search" onClick={() => {alert("Please tell us here you want to go")}}/>
                                       </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export function Banner() {
    const [top, setTop] = useState(0);
    const contentRef = useRef(null);
    return (
        <div className="" >
            <div className="container mx-auto ">
                <section className="xs">
                    <div ref={contentRef} className="bg-blue-600 fixed right-0 left-0 z-[123] w-full py-3 px-6 text-white md:flex justify-between items-center text-center md:text-left animate-fixed-up"
                        style={{ bottom: `${top}px` }}
                    >
                        <div className="mb-4 md:mb-0 flex items-center flex-wrap justify-center md:justify-start ">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 384 512"
                                className="w-4 h-4 mr-2"
                            >
                                <path
                                    fill="currentColor"
                                    d="M216 23.86c0-23.8-30.65-32.77-44.15-13.04C48 191.85 224 200 224 288c0 35.63-29.11 64.46-64.85 63.99-35.17-.45-63.15-29.77-63.15-64.94v-85.51c0-21.7-26.47-32.23-41.43-16.5C27.8 213.16 0 261.33 0 320c0 105.87 86.13 192 192 192s192-86.13 192-192c0-170.29-168-193-168-296.14z"
                                />
                            </svg>
                            <strong className="mr-1">Limited offer!</strong> Get 20%
                            off on the first flight.
                        </div>
                        <div className="flex items-center justify-center">
                            <a
                                className="inline-block px-6 py-2.5 bg-white text-gray-700 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-100 hover:shadow-lg focus:bg-gray-100 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-200 active:shadow-lg transition duration-150 ease-in-out mr-4"
                                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                            >
                                Claim offer
                            </a>
                            <div
                                className="text-white"
                                onClick={() => {
                                    contentRef.current.classList.add("animate-fixed-down");
                                    contentRef.current.classList.remove("animate-fixed-up");

                                    setTimeout(() => {
                                        setTop(-100);
                                    }, 1000);

                                }}
                                style={{ cursor: "pointer" }}
                            >
                                <svg
                                    className="w-4 h-4"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 352 512"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
