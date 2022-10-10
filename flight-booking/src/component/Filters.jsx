import { useState,useEffect } from "react"

export function PriceFilter({ min, max, setDestForm, destForm }) {
	const [price, setPrice] = useState(0);
	useEffect (() => {
		setPrice(max);
	}, [max]);
	const priceHandler = (e) => {
		setPrice(e.target.value);
		let subData = JSON.parse(JSON.stringify(destForm));
		subData.min = min;
		subData.max = e.target.value;
		setDestForm(subData);
	}

	return (
		<div className="w-10/12 mb-10">
			<div className="flex">
				<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 100 100" enableBackground="new 0 0 100 100">
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
				<label htmlFor="price-range" className="ml-1 block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Ticket Price: </label>
			</div>
			<div className="flex">
				<label className="flex-1 text-xs">HK${min}</label>
				<label className="flex-1 text-xs text-end">HK${price}</label>
			</div>
			<input type="range" min={min} max={max} defaultValue={max} onChange={priceHandler} className="w-full" />
		</div>
	);
}

export function FlightTime({ dest, locCount, destCount, destForm, setDestForm }) {
	const depTimeHandler = (e) => {
		let subData = JSON.parse(JSON.stringify(destForm));
		console.log("checked:", e.target.value);
		subData.depTime[e.target.id] = e.target.value === "true" ? false : true;
		setDestForm(subData);
	}

	const arrTimeHandler = (e) => {
		let subData = JSON.parse(JSON.stringify(destForm));
		console.log("checked:", e.target.value);
		subData.arrTime[e.target.id] = e.target.value === "true" ? false : true;
		setDestForm(subData);
	}

	const timeSlots = ["12:00 AM - 05:59 AM", "06:00 AM - 11:59 AM", "12:00 PM - 05:59 PM", "06:00 PM - 11:59 PM"];
	return (
		<div className="w-10/12 mb-10">
			<div className="flex">
				<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M9 7H11V12H16V14H9V7Z" fill="black" />
					<path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z" fill="black" />
				</svg>
				<label className="ml-1 block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Flight Times:</label>
			</div>

			<label htmlFor="" className="text-sm">Depart from Hong Kong</label>
			{timeSlots.map((value, index) => {
				return (
					<div className="flex items-center" key={index} onChange={depTimeHandler}>
						<CheckBox context={value} disabled={locCount[index]} id={index} />
						<label className="grow text-end text-xs">{locCount[index]}</label>
					</div>
				);
			})}
			<br />
			<label htmlFor="" className="text-sm"> Arrives to {dest}</label>
			{timeSlots.map((value, index) => {
				return (
					<div className="flex items-center" key={index} onChange={arrTimeHandler}>
						<CheckBox context={value} disabled={destCount[index]} id={index} />
						<label className="grow text-end text-xs">{destCount[index]}</label>
					</div>
				);
			})}
		</div>
	)
}

export function CheckBox({ id, context, disabled }) {
	const [checked, setChecked] = useState(false);

	return (
		<div className="flex items-center mb-2 mt-2">
			<input
				disabled={disabled > 0 ? false : true}
				id={id}
				type="checkbox"
				value={checked}
				onChange={() => setChecked(!checked)}
				className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500  focus:ring-2 "
			/>
			<label
				htmlFor={id}
				className="ml-2 text-xs font-medium text-black-900"
			>
				{context}
			</label>
		</div>
	);
}