function InputDropDownList({ label , list }) {
    return (
        <div className="absolute inset-y-0 right-0 flex items-center">
            <label htmlFor={label} className="sr-only">
                { label }
            </label>
            <select
                name={label}
                className="h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
                { list.map( item => <option>{ item }</option> ) }
            </select>
        </div>
    );
}

export function InputText({label , prefix , placeholder , dropdown_list , size})
{
    return (
        <div>
            <label htmlFor={label ?? "Name"} className="block text-sm font-medium text-white">{ label ?? "Name" }</label>
            <div className="relative mt-1 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm">
                    { prefix }
                </span>
                </div>
                <input type="text" name={label ?? "Name"} id={label ?? "Name"} className="text-black block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder={placeholder}>
                </input>
                { dropdown_list && <InputDropDownList htmlFor={label ?? "NameDropDown"} list={dropdown_list} /> }
            </div>
        </div>
    )
}