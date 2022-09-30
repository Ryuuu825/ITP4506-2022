export default function DropdownList({ label , list }) {
    return (
        <div class="absolute inset-y-0 right-0 flex items-center">
            <label for={label} class="sr-only">
                { label }
            </label>
            <select
                id={label}
                name={label}
                class="h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
                { list.map( item => <option>{ item }</option> ) }
            </select>
        </div>
    );
}
