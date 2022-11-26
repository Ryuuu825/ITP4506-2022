export default function ToggleSwitch({ id , checked, onChange , content }) {
  return (
    <label for={id} class="flex items-center cursor-pointer relative mb-4">
    <input type="checkbox" id={id} class="sr-only" checked={checked} onChange={onChange} />
    <div class="toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full"></div>
    <span class="ml-3 text-gray-900 text-sm font-medium">
        {content}
    </span>
    </label>
  );
}