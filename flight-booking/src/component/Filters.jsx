import { CheckBox } from "./Form"

export function PriceFilter({ min, max, value }) {
	return (
		<div className="w-10/12 mb-10">
			<div className="flex">
				<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 100 100" enable-background="new 0 0 100 100">
					<path d="M54.284,44.798V34.688c3.297,0.807,6.52,2.344,9.157,4.762l0.011-0.015c0.197,0.157,0.436,0.265,0.708,0.265
		c0.358,0,0.665-0.173,0.877-0.428l0.015,0.003l4.262-6.008l-0.01-0.005c0.175-0.202,0.291-0.458,0.291-0.746
		c0-0.34-0.153-0.638-0.387-0.849c-3.953-3.651-9-5.843-14.924-6.502v-5.806h-0.001c0-0.637-0.516-1.153-1.153-1.153h-4.578
		c-0.637,0-1.153,0.516-1.153,1.153v5.659c-9.89,1.025-15.75,7.326-15.75,14.725c0,9.963,8.205,12.82,15.75,14.652v11.354
		c-4.845-0.868-8.827-3.379-11.536-6.19c-0.019-0.021-0.039-0.039-0.06-0.058c-0.016-0.017-0.036-0.034-0.052-0.051l-0.008,0.011
		c-0.199-0.162-0.442-0.273-0.719-0.273c-0.436,0-0.802,0.251-0.998,0.608l-0.014-0.002l-4.125,6.124l0.005,0.01
		c-0.176,0.202-0.292,0.458-0.292,0.748c0,0.367,0.182,0.679,0.448,0.89l-0.011,0.016c4.029,4.029,9.67,6.959,17.362,7.619v5.44
		c0,0.637,0.516,1.153,1.153,1.153h0h4.578c0.637,0,1.153-0.517,1.153-1.153h0.001V75.2c10.769-1.1,16.117-7.398,16.117-15.531
		C70.401,49.634,61.903,46.702,54.284,44.798z M47.398,43.112c-3.003-0.951-5.055-2.051-5.055-4.176c0-2.49,1.832-4.248,5.055-4.688
		V43.112z M54.284,65.896v-9.816c3.224,1.025,5.495,2.199,5.495,4.615C59.779,63.04,58.02,65.163,54.284,65.896z"/>
				</svg>
				<label for="price-range" class="ml-1 block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Price: </label>
			</div>
			<input id="price-range" type="range" min={min} max={max} value={value} className="w-full range" />
		</div>
	)
}

export function FlightTime() {
	return (
		<div className="w-10/12 mb-10">
			<div className="flex">
				<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M9 7H11V12H16V14H9V7Z" fill="black" />
					<path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z" fill="black" />
				</svg>
				<label class="ml-1 block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Flight Times:</label>
			</div>
			<div className="flex items-center">
				<CheckBox context={"10:00 - 18:00"} />
				<label className="grow text-end text-sm">0</label>
			</div>
			<div className="flex items-center">
				<CheckBox context={"10:00 - 18:00"} />
				<label className="grow text-end text-sm">0</label>
			</div>
			<div className="flex items-center">
				<CheckBox context={"10:00 - 18:00"} />
				<label className="grow text-end text-sm">0</label>
			</div>
			<div className="flex items-center">
				<CheckBox context={"10:00 - 18:00"} />
				<label className="grow text-end text-sm">0</label>
			</div>
			<div className="flex items-center">
				<CheckBox context={"10:00 - 18:00"} />
				<label className="grow text-end text-sm">0</label>
			</div>
			<div className="flex items-center">
				<CheckBox context={"10:00 - 18:00"} />
				<label className="grow text-end text-sm">0</label>
			</div>
		</div>
	)
}