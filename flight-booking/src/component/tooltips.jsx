import { useState, useRef, useEffect } from "react";
import "./tooltips.css"

export default function Tooltips({ content, title }) {
    // show the popup tips when the mouse is over the element
    return (
        <div className="inline-block relative tooltip pt-3 ml-2" >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <div className="rounded-lg border border-gray-500 absolute tooltiptext left-8 top-0 overflow-hidden w-40 text-center z-10 mt-2 bg-gray-700 text-white text-sm py-1">
                {content}
            </div>
        </div>
    )
}

export function TooltipsBottom({ content, title }) {
    const [tooltipStatus, setTooltipStatus] = useState(0);
    return (
        <div className="relative md:my-auto ml-1" onMouseEnter={() => setTooltipStatus(1)} onMouseLeave={() => setTooltipStatus(0)}>
            <div className="mr-2 cursor-pointer">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            {tooltipStatus == 1 && (
                <div role="tooltip" className="z-20 -mt-20 w-64 absolute transition duration-150 ease-in-out left-0 ml-8 shadow-lg bg-indigo-700 p-4 rounded-lg">
                    <svg className="absolute left-0 -ml-2 bottom-0 top-0 h-full" width="9px" height="16px" viewBox="0 0 9 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                        <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                            <g id="Tooltips-" transform="translate(-874.000000, -1029.000000)" fill="#4c51bf">
                                <g id="Group-3-Copy-16" transform="translate(850.000000, 975.000000)">
                                    <g id="Group-2" transform="translate(24.000000, 0.000000)">
                                        <polygon id="Triangle" transform="translate(4.500000, 62.000000) rotate(-90.000000) translate(-4.500000, -62.000000) " points="4.5 57.5 12.5 66.5 -3.5 66.5" />
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg>
                    <p className="text-sm font-bold text-white pb-1">{title}</p>
                    <p className="text-xs leading-4 text-white pb-3">{content}</p>
                </div>
            )}
        </div>
    )
}