export function ButtonBadge({ onClick,  disabled , context , number }) {
    return (
        <div class="flex space-x-2 justify-center">
            <button
                type="button"
                class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-600 hover:shadow-lg focus:bg-blue-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
                onClick={onClick}
                disabled={disabled}
            >
                {context}
                <span class="inline-block py-1 px-1.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-red-600 text-white rounded ml-2">
                    {number}
                </span>
            </button>
        </div>
    );
}

export function TextBadge({ context , color , size }) {
    const default_class = "mx-3 inline-block py-1.5 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold  text-white rounded";
    const color_class = `bg-${color}-600`;

    const class_name = default_class.concat(" ", color_class);
    return (
        <span class={class_name} > {context} </span>
    );
}

export function Pills({ context , color , size }) {
    const default_class = "text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold text-white rounded-full"
    const color_class = `bg-${color}-600 `;

    const class_name = default_class.concat(" ", color_class);
    return (
        <span class={class_name} > {context} </span>
    );
}