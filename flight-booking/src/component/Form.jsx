import { useEffect, useRef, useState } from "react";
import { DropDown , DropDownList , DropDownListItem , DropDownItemDivider, DropDownListHeader } from "./DropDown";
import { useApp } from "../hook/Main";

function Eye() {
    return (
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
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            ></path>
        </svg>
    );
}

function EyeOff() {
    return (
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
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
            ></path>
        </svg>
    );
}

export function FloatingLabel({
    placeholder,
    type,
    id,
    handler,
    error_message,
    normal_message,
    validate,
    preventCopy
}) {
    const [show, setShow] = useState(false);
    const valid = validate

    // clear the input when error
    
    const isArray = Array.isArray(error_message);

    const invalid_class_name = `block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border-2 appearance-none  focus:outline-none focus:ring-0 peer focus:border-grey-500 border-red-300`;
    const valid_class_name = `block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border-2 appearance-none  focus:outline-none focus:ring-0 peer focus:border-grey-500 border-grey-300`;
    return (
        <div className="mb-2">
            <div class="relative mt-5">
                { valid ?
                    (
                        <input
                            type={type}
                            id={id}
                            class={valid_class_name}
                            placeholder=" "
                            onChange={handler}
                            onCopy={preventCopy ? (e) => e.preventDefault() : null}
                        />
                    )
                    :
                    (
                        <input
                            type={type}
                            id={id}
                            class={invalid_class_name}
                            placeholder=" "
                            onChange={handler}
                            onCopy={preventCopy ? (e) => e.preventDefault() : null}
                        />
                    )
                    }
                <label
                    for={id}
                    class={
                        "absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 peer-focus:text-blue-600"
                    }
                >
                    {placeholder}
                </label>
                {type === "password" ? (
                    <button
                        class="absolute right-2 top-3.5"
                        onClick={() => {
                            let input = document.getElementById(id);
                            if (input.type === "password") {
                                input.type = "text";
                                setShow(true);
                            } else {
                                input.type = "password";
                                setShow(false);
                            }
                        }}
                    >
                        {show ? <Eye /> : <EyeOff />}
                    </button>
                ) : null}
            
            </div>

            {validate ? (
                <div class="pl-3 w-full mt-1">
                    <p class={`text-sm text-green-500`}>{normal_message}</p>
                </div>
            ) : (
                <div class="pl-3 w-full mt-1">

                    {isArray ? (
                        error_message.map((message) => (
                            <p class={`text-sm text-red-500`}>{message}</p>
                        )))
                    : 
                    (
                        <p class={`text-sm text-red-500`}>{error_message}</p>
                    )
                    }
                    
                </div>
            )}

        </div>
    );
}

export function CheckBox({ id, context }) {
    return (
        <div class="flex items-center mb-2 mt-2">
            <input
                id="default-checkbox"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500  focus:ring-2 "
            />
            <label
                for="default-checkbox"
                class="ml-2 text-sm font-medium text-black-900"
            >
                {context}
            </label>
        </div>
    );
}


export function InputBox({
    placeholder,
    type,
    id,
    handler,
    error_message,
    normal_message,
    validate,
    props
}) {
    const [show, setShow] = useState(false);
    const valid = validate

    // clear the input when error
    
    const isArray = Array.isArray(error_message);

    const invalid_class_name = `block px-2.5 py-3 w-full text-sm text-gray-900 bg-white rounded-lg border-2 appearance-none  focus:outline-none focus:ring-0 peer focus:border-grey-500 border-red-300`;
    const valid_class_name = `block px-2.5 py-3 w-full text-sm text-gray-900 bg-white rounded-lg border-2 appearance-none  focus:outline-none focus:ring-0 peer focus:border-grey-500 border-grey-300`;
    return (
        <div className="mb-2">
            <div class="relative mt-5">
                { valid ?
                    (
                        <input
                            type={type}
                            id={id}
                            class={valid_class_name}
                            placeholder={placeholder}
                            onChange={handler}
                            {...props}
                        />
                    )
                    :
                    (
                        <input
                            type={type}
                            id={id}
                            class={invalid_class_name}
                            placeholder={placeholder}
                            onChange={handler}
                            {...props}
                        />
                    )
                    }
                {type === "password" ? (
                    <button
                        class="absolute right-2 top-3.5"
                        {...props}
                        onClick={() => {
                            let input = document.getElementById(id);
                            if (input.type === "password") {
                                input.type = "text";
                                setShow(true);
                            } else {
                                input.type = "password";
                                setShow(false);
                            }
                        }}
                    >
                        {show ? <Eye /> : <EyeOff />}
                    </button>
                ) : null}
            
            </div>

            {validate ? (
                <div class="pl-3 w-full mt-1">
                    <p class={`text-sm text-green-500`}>{normal_message}</p>
                </div>
            ) : (
                <div class="pl-3 w-full mt-1">

                    {isArray ? (
                        error_message.map((message) => (
                            <p class={`text-sm text-red-500`}>{message}</p>
                        )))
                    : 
                    (
                        <p class={`text-sm text-red-500`}>{error_message}</p>
                    )
                    }
                    
                </div>
            )}

        </div>
    );
}

export function DatePicker({ id , handler, props }) {
    return (
        <div class="relative mt-5">
            <input
                type="date"
                id={id}
                class="block px-2.5 py-3 w-full text-sm text-gray-900 bg-white rounded-lg border-2 appearance-none  focus:outline-none focus:ring-0 peer focus:border-grey-500 border-grey-300"
                onChange={handler}
                {...props}
            />
        </div>
    );
}

export function ExpandableInputText({ id, placeholder, type , props , dropdownlist }) {
    const [show, setShow] = useState(false);
    const [showList, setShowList] = useState(false);
    const [list , setList] = useState(dropdownlist);

    const [inputValue, setInputValue] = useState("");

    const handleOnClickOtherLocation = (e) => {
        if (e.target == document.getElementById(id) || e.target == document.querySelector(".dropdownlist") ) {
            setShow(true);
            document.getElementById(id).classList.add("scale-110");
        }
        else {
            setShow(false);
            document.getElementById(id).classList.remove("scale-110");
        }
    }
    
    useEffect(() => {
        window.addEventListener('click', handleOnClickOtherLocation);

        return () => {
            window.removeEventListener('click', handleOnClickOtherLocation);
        }
    }, [])

    const newOnChangeEvent = (e) => {
        setInputValue(e.target.value);
        if (e.target.value === "") {
            setShowList(false);
            setShow(true);
        }
        else {
            setShowList(true);
            setShow(true);
        }

        // filter the dropdown list
        const filter = dropdownlist.filter((item) => {
            return item.toLowerCase().includes(e.target.value.toLowerCase());
        })

        // set the dropdown list
        setList(filter);
    }

    return (
        <div class="relative mt-5 expandable" >
            <div className="flex flex-col">
                <input
                    type={type}
                    id={id}
                    class="block px-2.5 w-full py-3 text-sm text-gray-900 bg-white rounded-lg border-2  border-grey-300  focus:rounded-b-none focus:outline-none focus:ring-0 peer focus:border-grey-500 focus:border-b-0"
                    placeholder={placeholder}
                    onChange={newOnChangeEvent}
                    {...props}
                    autoComplete="off"
                    value={inputValue}
                />
                    <DropDown className="relative">
                { show ? (

                        <div className="bg-white w-full absolute border-2 rounded-b-lg border-primary dropdownlist scale-110"  >
                            { 
                                showList && list.length != 0 ? (
                                    list.map((item) => (
                                        <DropDownListItem context={item} handler={(input) => { setInputValue(input) }} />
                                    ))
                                ) : 
                                <DropDownListItem 
                                        context={
                                            <div className="flex flex-col p-3">
                                                <p className="text-sm text-gray-500">Search by city or airport </p>
                                            </div>
                                        }
                                />
                            }
                        </div>
                        ) : 
                            null
                    }
                    </DropDown>
                
            </div>
        </div>
    );
}