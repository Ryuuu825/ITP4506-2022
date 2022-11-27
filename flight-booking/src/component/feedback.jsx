// function Feedback({ message, color }) {
//   const style = `bg-${color}-100 text-${color}-700`;
//   return (
//     <div className={"rounded-lg py-3 px-5 text-base mb-3 " + style} role="alert">
//       {message}
//     </div>
//   );
// }

import { useState } from "react";
import { Tick, Cross, Warn, Info_SVG } from "./SVGPath";

export function Success({ message, description, dismissable }) {
    const [show, setShow] = useState(true);
    // see if description is a list
    const isList = Array.isArray(description);

    if (show) {
        return (
            <div
                className="rounded-lg py-3 px-6 mb-3 text-base inline-flex items-center bg-green-100"
                role="alert"
            >
                <div className="flex flex-col text-green-700">
                    <div className="flex items-center">
                        {<Tick />}
                        <span className="font-semibold">{message}</span>
                    </div>
                    {isList ? (
                        <ul className="list-disc list-inside pl-2">
                            {description.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    ) : (
                        <span className="text-sm ">{description}</span>
                    )}
                </div>

                {dismissable && (
                    <button
                        className="bg-transparent border-0 text-2xl leading-none font-semibold outline-none focus:outline-none ml-3"
                        onClick={() => setShow(false)}
                    >
                        <span className="opacity-30 h-6 w-6 text-2xl block outline-none focus:outline-none text-black">
                            ×
                        </span>
                    </button>
                )}
            </div>
        );
    } else {
        return null;
    }
}

export function Error({ message, description, dismissable }) {
    const [show, setShow] = useState(true);
    // see if description is a list
    const isList = Array.isArray(description);

    if (show) {
        return (
            <div
                className="rounded-lg py-3 px-6 mb-3 text-base inline-flex items-center bg-red-100"
                role="alert"
            >
                <div className="flex flex-col text-red-700">
                    <div className="flex items-center">
                        {<Cross />}
                        <span className="font-semibold">{message}</span>
                    </div>
                    {isList ? (
                        <ul className="list-disc list-inside pl-2">
                            {description.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    ) : (
                        <span className="text-sm ">{description}</span>
                    )}
                </div>

                {dismissable && (
                    <button
                        className="bg-transparent border-0 text-2xl leading-none font-semibold outline-none focus:outline-none ml-3"
                        onClick={() => setShow(false)}
                    >
                        <span className="opacity-30 h-6 w-6 text-2xl block outline-none focus:outline-none text-black">
                            ×
                        </span>
                    </button>
                )}
            </div>
        );
    } else {
        return null;
    }
}

export function Warning({ message, description, dismissable }) {
    const [show, setShow] = useState(true);
    // see if description is a list
    const isList = Array.isArray(description);

    if (show) {
        return (
            <div
                className="rounded-lg py-3 px-6 mb-3 text-base inline-flex items-center bg-yellow-100"
                role="alert"
            >
                <div className="flex flex-col text-yellow-700">
                    <div className="flex items-center">
                        {<Warn />}
                        <span className="font-semibold">{message}</span>
                    </div>
                    {isList ? (
                        <ul className="list-disc list-inside pl-2">
                            {description.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    ) : (
                        <span className="text-sm ">{description}</span>
                    )}
                </div>

                {dismissable && (
                    <button
                        className="bg-transparent border-0 text-2xl leading-none font-semibold outline-none focus:outline-none ml-3"
                        onClick={() => setShow(false)}
                    >
                        <span className="opacity-30 h-6 w-6 text-2xl block outline-none focus:outline-none text-black">
                            ×
                        </span>
                    </button>
                )}
            </div>
        );
    } else {
        return null;
    }
}

export function Info({ message, description, dismissable }) {
    const [show, setShow] = useState(true);
    // see if description is a list
    const isList = Array.isArray(description);

    if (show) {
        return (
            <div
                className="rounded-lg py-3 px-6 text-base inline-flex align-middle items-center justify-start bg-blue-100"
                role="alert"
            >
                <div className="flex flex-col text-blue-700">
                    <div className="flex items-center">
                        {<Info_SVG />}
                        <span className="font-semibold text-sm">{message}</span>
                    </div>
                    {isList ? (
                        <ul className="list-disc list-inside pl-2">
                            {description.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    ) : (
                        <span className=" text-xs ">{description}</span>
                    )}
                </div>

                {dismissable && (
                    <button
                        className="bg-transparent border-0 text-2xl leading-none font-semibold outline-none focus:outline-none ml-3"
                        onClick={() => setShow(false)}
                    >
                        <span className="mb-2 opacity-30 h-6 w-6 text-2xl block outline-none focus:outline-none text-black">
                            ×
                        </span>
                    </button>
                )}
            </div>
        );
    } else {
        return null;
    }
}
