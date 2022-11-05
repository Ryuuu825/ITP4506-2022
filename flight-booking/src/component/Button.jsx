import { useRef } from "react";

export function Button(
    { content, onClick, color, hovercolor, disable, style, id },
    props
) {
    if (!color) color = "primary";
    let className =
        "p-3 rounded-lg text-white font-normal focus:ring-2 focus:ring-gray-50 bg-primary hover:bg-primary-800 w-full ";
    className = className.concat(" ", style);
    if (disable) {
        className = className.concat(
            " disabled:opacity-50 disabled:cursor-not-allowed"
        );
    }

    // className = "bg-primary p-3 rounded-lg text-white font-normal my-5 hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed ".concat(style);
    return (
        <button
            onClick={onClick}
            className={className}
            disabled={disable}
            id={id}
            {...props}
        >
            {content ? content : props.children}
        </button>
    );
}

export function LoadingButton(
    { content, onClick, color, hovercolor, disable, style, id },
    props
) {
    if (!color) color = "primary";
    let className =
        "p-3 rounded-lg text-white font-normal focus:ring-2 focus:ring-gray-50 bg-primary hover:bg-primary-800 w-full ";
    className = className.concat(" ", style);
    if (disable) {
        className = className.concat(
            " disabled:opacity-50 disabled:cursor-not-allowed"
        );
    }

    const onClickHandler = () => {
        spinner.current.classList.remove("hidden");

        setTimeout(() => {
            spinner.current.classList.add("hidden");
            onClick()
        }, 1000  );
    };


    const spinner = useRef(null);

    // className = "bg-primary p-3 rounded-lg text-white font-normal my-5 hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed ".concat(style);
    return (
        <button
            onClick={onClickHandler}
            className={className}
            disabled={disable}
            id={id}
            {...props}
        >
            {/* spinner */}
            <div className="flex flex-row justify-center">
                <div role="status" ref={spinner} className="hidden">
                    <svg
                        aria-hidden="true"
                        class="mr-2 w-5 h-5 text-gray-100 animate-spin fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                        />
                    </svg>
                </div>
                <div>{content ? content : props.children}</div>
            </div>
        </button>
    );
}

export function Floating({ path, onClick, color }) {
    return (
        <div class="flex space-x-2 justify-center">
            <div>
                <button
                    type="button"
                    onClick={onClick}
                    class="inline-block rounded-full bg-blue-600 text-white leading-normal uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-12 h-12"
                >
                    {path}
                </button>
            </div>
        </div>
    );
}
