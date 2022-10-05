export default function PriceFilter({min, max, value}) {
	return (
		<div className="w-10/12">
			<label for="price-range" class="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Price</label>
			<input id="price-range" type="range" min={min} max={max} value={value} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
		</div>
	)
}