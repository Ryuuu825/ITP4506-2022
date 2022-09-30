import Dropdown from './DropDown';

export function InputText({label , prefix , placeholder , dropdown_list , size})
{
    return (
        <div>
            <label for={label ?? "Name"} class="block text-sm font-medium text-white">{ label ?? "Name" }</label>
            <div class="relative mt-1 rounded-md shadow-sm">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span class="text-gray-500 sm:text-sm">
                    { prefix }
                </span>
                </div>
                <input type="text" name={label ?? "Name"} id={label ?? "Name"} class="text-black block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder={placeholder}>
                </input>
                { dropdown_list && <Dropdown label={label ?? "NameDropDown"} list={dropdown_list} /> }
            </div>
        </div>
    )
}