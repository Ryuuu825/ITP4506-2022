import React, { useEffect, useState } from "react";

export function DropDown({ children }) {
    const [show, setShow] = useState(false);

    const s_children = React.Children.toArray(children).filter((child) => {
        return child.props.target === undefined;
    });

    const t_children = React.Children.toArray(children).filter((child) => {
        return child.props.target !== undefined;
    });

    useEffect(() => {
        // close dropdown when click outside
        const closeDropdown = (e) => {
            // if click on dropdown , do nothing
            if (e.target.closest(".dropdown")) {
                return;
            }

            const all_dropdown = document.querySelectorAll(".dropdown");
            all_dropdown.forEach((dropdown) => {
                if (!dropdown.contains(e.target)) {
                    setShow(false);
                }
            });
        };
        document.addEventListener("click", closeDropdown);
        
        return () => {
            document.removeEventListener("click", closeDropdown);
        };
    }, [show]);

    return (
        <div
            className="cursor-pointer dropdown"
            onClick={() => {
                setShow(!show);
            }}
        >
            {/* Dont show children that have target tag */}
            {s_children}

            { show ? t_children : null}
        </div>
    );
}

export function DropDownList({ children }) {
    const items = React.Children.map(children, (child) => {
        return <li>{child}</li>;
    })

    return (
        <div className="absolute z-[9999] mt-1 bg-white rounded-md shadow-lg right-3">
            <ul>
                {React.Children.map(children, (child) => {
                    return <li>{child}</li>;
                })}
            </ul>
        </div>
    );
}

export function DropDownListItem({  handler , context } , children) {
    return (
        <div
            onClick={() => {
                handler( context );
            }}
            className="hover:bg-gray-100 bg-gray-50 select-none px-4 py-2 text-sm text-gray-700 rounded-md"
        >
            {context}
        </div>
    );
}

export function DropDownItemDivider() {
    return <div className="border-t  bg-gray-100 p-1" />;
}

export function DropDownListHeader({ children }) {
    return (
        <div className="px-4 py-2 text-sm text-gray-700 rounded-md">
            {children}
        </div>
    );
}