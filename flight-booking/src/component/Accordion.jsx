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
        <div className="w-full flex flex-col " >
            <button
                className={"w-full flex flex-row py-3 "}
                onClick={toggleAccordion}
            >
                <p className="peer text-2xl font-semibold mt-3  text-left mr-auto">{title}</p>
                <span className="mr-3">
                    {!open ? (
                        <svg
                            className="w-6 h-6 " 
                            // display only when parent is hovered
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
                style={{ height: `${open ? "115" : "0"}px`  }}
                className="transition-height duration-500 ease-in-out overflow-hidden w-full"
                
            >
                <div  className="text-black font-normal text-xl pt-2 " >
                    {open ? <div className="w-11/12 ml-5 mb-5 relative" >{content}</div> : ""}
                </div>
            </div>
        </div>
    );
}
