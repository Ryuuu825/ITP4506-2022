import { useState , useRef, useEffect } from "react";
import "./tooltips.css"

export default function Tooltips({content , title } ) {
    // show the popup tips when the mouse is over the element
    return (
        <div className="inline-block relative tooltip pt-3 ml-2" >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <div className="rounded-lg border border-gray-500 absolute tooltiptext left-8 top-0 overflow-hidden w-40 text-center z-10 mt-2 bg-gray-700 text-white text-sm py-1">
                {content}
            </div>
        </div>
    )

}