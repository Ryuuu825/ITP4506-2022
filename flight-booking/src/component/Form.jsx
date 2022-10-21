import { useEffect, useRef, useState } from "react";
import { DropDown, DropDownList, DropDownListItem, DropDownItemDivider, DropDownListHeader } from "./DropDown";
import { useApp } from "../hook/Main";
import DropDownBox from "./DropDownBox";

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
    preventCopy,
    props
}) {
    const [show, setShow] = useState(false);
    const valid = validate

    // clear the input when error

    const isArray = Array.isArray(error_message);

    console.log(error_message);

    const invalid_class_name = `block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border-2 appearance-none  focus:outline-none focus:ring-0 peer focus:border-grey-500 border-red-300`;
    const valid_class_name = `block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border-2 appearance-none  focus:outline-none focus:ring-0 peer focus:border-grey-500 border-grey-300`;
    return (
        <div className="mb-2">
            <div class="relative mt-3">
                {valid ?
                    (
                        <input
                            type={type}
                            id={id}
                            class={valid_class_name}
                            placeholder=" "
                            onChange={handler}
                            onCopy={preventCopy ? (e) => e.preventDefault() : null}
                            {...props}
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
                            {...props}
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
                        {show ? <EyeOff /> : <Eye />}
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
                {valid ?
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

export function DatePicker({ id, handler, props, setDate}) {
    return (
        <div class="relative">
            <input
                type="date"
                id={id}
                min={new Date().toLocaleDateString("sv")}
                defaultValue={new Date().toLocaleDateString("sv")}
                class="block px-2.5 py-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border-2 border-gray-50 appearance-none  focus:outline-none focus:ring-2 focus:ring-blue-300 peer focus:border-blue-300 border-gray-300 shadow-lg"
                onChange={(e)=> setDate(e.target.value)}
                {...props}
            />
        </div>
    );
}

export function ExpandableInputText({ id, placeholder, type, props, dropdownlist }) {
    const [show, setShow] = useState(false);
    const [showList, setShowList] = useState(false);
    const [list, setList] = useState(dropdownlist);

    const [inputValue, setInputValue] = useState("");

    const handleOnClickOtherLocation = (e) => {
        if (e.target == document.getElementById(id) || e.target == document.querySelector(".dropdownlist")) {
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
                    {show ? (

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

export function DropDownSearch({ dest, setTo }) {
    const [showDropDown, setShowDropDown] = useState(false);
    const dropBox = useRef(null);
    const [text, setText] = useState(dest);
    useEffect(() => {
        // close dropdown when click outside
        const checkIfClickedOutside = e => {
            // If the menu is open and the clicked target is not within the menu,
            // then close the menu
            if (showDropDown && dropBox.current && !dropBox.current.contains(e.target)) {
                setShowDropDown(false)
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [showDropDown])

    return (
        <div className="w-full shadow-md relative">
            <div ref={dropBox} className="relative w-full">
                {showDropDown ? <DropDownBox show={setShowDropDown} setDest={setTo} dest={dest} setText={setText} /> : null}
            </div>
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg width="20px" height="20px" viewBox="0 0 58.568 58.568" xmlns="http://www.w3.org/2000/svg">
                    <path id="flight_plane" data-name="flight plane" d="M1023.994,672.006c2.4-3.218,3.843-6.559,3.85-8.946a3.323,3.323,0,0,0-.453-1.828,1.706,1.706,0,0,0-.578-.584,3.265,3.265,0,0,0-1.852-.466c-2.381,0-5.723,1.442-8.942,3.849a77.166,77.166,0,0,0-8.806,8.487q-.917.966-1.934,2.031l-6.976-2.091.02-.02a1.566,1.566,0,0,0-.005-2.2l-1.259-1.261a1.571,1.571,0,0,0-1.11-.461,1.541,1.541,0,0,0-1.1.458l-1.885,1.886-1-.3a1.563,1.563,0,0,0-.125-2.063l-1.266-1.265a1.568,1.568,0,0,0-1.109-.457,1.534,1.534,0,0,0-1.1.458l-1.73,1.73-7.094-2.125a1.775,1.775,0,0,0-.507-.072,1.875,1.875,0,0,0-1.311.531l-2.494,2.494a1.463,1.463,0,0,0-.439,1.029,1.433,1.433,0,0,0,.761,1.284l14.918,8.334a2.607,2.607,0,0,1,.362.275l4.253,4.252c-3.978,4.191-7.522,8.25-10.284,11.781-.258.328-.5.649-.742.965l-11.541-1.048a1.573,1.573,0,0,0-.2-.012,2.127,2.127,0,0,0-1.429.591l-1.163,1.161a1.449,1.449,0,0,0-.446,1.029,1.418,1.418,0,0,0,.839,1.3l8.119,3.857a1.843,1.843,0,0,1,.311.223l.674.668a4.938,4.938,0,0,0-.325,1.561,2.053,2.053,0,0,0,.567,1.5l.029.026.008.005a2.056,2.056,0,0,0,1.493.56,4.964,4.964,0,0,0,1.548-.322l.684.682a1.956,1.956,0,0,1,.212.3l3.848,8.1a1.435,1.435,0,0,0,1.294.851h.008a1.446,1.446,0,0,0,1.026-.432l1.192-1.2a2.132,2.132,0,0,0,.569-1.426c0-.066,0-.117-.005-.144l-1.051-11.581c.317-.238.636-.484.965-.739,3.536-2.766,7.6-6.313,11.779-10.286l4.256,4.26a2.314,2.314,0,0,1,.278.365l8.318,14.891a1.451,1.451,0,0,0,2.322.342l2.512-2.51a1.9,1.9,0,0,0,.514-1.31,1.769,1.769,0,0,0-.069-.491l-2.125-7.095,1.729-1.733a1.563,1.563,0,0,0,0-2.205l-1.268-1.267a1.559,1.559,0,0,0-2.062-.129l-.3-.995,1.887-1.886a1.577,1.577,0,0,0,.455-1.107,1.54,1.54,0,0,0-.455-1.1l-1.262-1.262a1.563,1.563,0,0,0-2.217,0l-.013.012-2.089-6.976q1.082-1.032,2.062-1.96C1019.32,677.193,1022.053,674.6,1023.994,672.006Z" transform="translate(-969.276 -660.182)" />
                </svg>
            </div>
            <input type="text" id="search" className="bg-gray-50 border-2 border-gray-50 rounded-lg text-gray-900 text-sm focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 block w-full pl-10 px-2.5 py-3" placeholder="Where to?" required readOnly value={text} onClick={(e) => setShowDropDown(!showDropDown)} />
        </div>
    )
}