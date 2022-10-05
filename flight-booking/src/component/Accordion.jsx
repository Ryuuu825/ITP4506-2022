import { useState, useRef, useEffect } from "react";

export default function Accordion({ title, content, alwaysOpen }) {
    const [open, setOpen] = useState(false);
    const [height, setHeight] = useState(0);

    const contentRef = useRef(null);

    useEffect(() => {
        if (alwaysOpen) {
            setOpen(true);
        }
        setHeight(contentRef.current.scrollHeight);
    }, []);

    const toggleAccordion = () => {
        setOpen(!open);
    };

    return (
        <div className="w-full ">
            <button
                className={"w-full flex flex-row py-3 "}
                onClick={toggleAccordion}
            >
                <p className="text-2xl font-semibold mx-auto mt-3">{title}</p>
                <span className="mr-3">
                    {!open ? (
                        <svg
                            class="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19 9l-7 7-7-7"
                            ></path>
                        </svg>
                    ) : (
                        <svg
                            class="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M5 15l7-7 7 7"
                            ></path>
                        </svg>
                    )}
                </span>
            </button>
            <div
                ref={contentRef}
                style={{ minHeight: `${open ? height : 0}px`  }}
                className="transition-height duration-500 ease-in-out border-b "
            >
                <div className=" text-black font-normal text-xl pl-10 pt-2">
                    {open ? <div className="w-10/12 mx-auto mb-5">{content}</div> : ""}
                </div>
            </div>
        </div>
    );
}
