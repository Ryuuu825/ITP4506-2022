import { useRef } from "react";
import { useState, useEffect } from "react"
import { Timepicker } from 'react-timepicker';
import 'react-timepicker/timepicker.css';

export function PriceFilter({ setIsFilterPrice, setCurrentPage, min, max, setDestForm, destForm, setParams, params }) {
	const [price, setPrice] = useState(max);

	useEffect(() => {
		setPrice(max);
	}, [max]);

	const priceHandler = (e) => {
		setPrice(e.target.value);
		let subData = JSON.parse(JSON.stringify(destForm));
		subData.min = min;
		subData.max = Number(e.target.value);
		setCurrentPage(0);
		setParams({ page: 1 });
		(max === Number(e.target.value)) ? setIsFilterPrice(true) : setIsFilterPrice(true);
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
			<input type="range" min={min} max={max} defaultValue={price} onChange={priceHandler} className="w-full" />
		</div>
	);
}

export function FlightTime({ setIsFilterTime, setCurrentPage, dest, locCount, destCount, destForm, setDestForm, setParams, params }) {
	const [arriveTime, setArriveTime] = useState();
	const [departTime, setDepartTime] = useState();
	const [showDepartPicker, setShowDepartPicker] = useState(false);
	const [showArrivePicker, setShowArrivePicker] = useState(false);
	const departpicker = useRef()
	const arrivepicker = useRef()
	const depTimeHandler = (e) => {
		let subData = JSON.parse(JSON.stringify(destForm));
		subData.depTime[e.target.id] = e.target.value === "true" ? false : true;
		setCurrentPage(0);
		setParams({ page: 1 });
		(subData.arrTime.every((e) => e === false)
			&& subData.depTime.every((e) => e === false))
			? setIsFilterTime(false) : setIsFilterTime(true);

		setDestForm(subData);
	}

	const arrTimeHandler = (e) => {
		let subData = JSON.parse(JSON.stringify(destForm));
		subData.arrTime[e.target.id] = e.target.value === "true" ? false : true;
		setCurrentPage(0);
		setParams({ page: 1 });
		(subData.arrTime.every((e) => e === false)
			&& subData.depTime.every((e) => e === false))
			? setIsFilterTime(false) : setIsFilterTime(true);
		setDestForm(subData);
	}

	useEffect(() => {
		// close dropdown when click outside
		const checkIfClickedOutside = e => {
			// If the menu is open and the clicked target is not within the menu,
			// then close the menu
			if (showDepartPicker && departpicker.current && !departpicker.current.contains(e.target)) {
				setShowDepartPicker(false)
			}

			if (showArrivePicker && arrivepicker.current && !arrivepicker.current.contains(e.target)) {
				setShowArrivePicker(false)
			}
		}
		document.addEventListener("mousedown", checkIfClickedOutside)
		return () => {
			// Cleanup the event listener
			document.removeEventListener("mousedown", checkIfClickedOutside)
		}
	}, [showDepartPicker, showArrivePicker])

	const timeHandler = (h, m) => {
		console.log(h, m);
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

			<label htmlFor="" className="text-sm">Departure Time from HKG</label>
			<div className="relative mb-2" ref={departpicker}>
				<div className="flex absolute inset-y-0 right-2 items-center pl-3 pointer-events-none">
					<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M9 7H11V12H16V14H9V7Z" fill="black" />
						<path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z" fill="black" />
					</svg>
				</div>
				<input type="text" onClick={(e) => { setShowDepartPicker(!showDepartPicker); }} readOnly value={departTime} className="w-full h-30 border-4 border-blue-300 bg-gray-50" />
				{showDepartPicker ? <FlightTimePicker depart={true} setDestForm={setDestForm} destForm={destForm} setTime={setDepartTime} setShow={setShowDepartPicker} title={"Departure Time from HKG"} /> : null}
			</div>
			<label htmlFor="" className="text-sm">Arrival Time to {dest}</label>
			<div className="relative mb-8" ref={arrivepicker}>
				<div className="flex absolute inset-y-0 right-2 items-center pl-3 pointer-events-none">
					<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M9 7H11V12H16V14H9V7Z" fill="black" />
						<path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z" fill="black" />
					</svg>
				</div>
				<input type="text" onClick={(e) => { setShowArrivePicker(!showArrivePicker); }} readOnly value={arriveTime} className="w-full h-30 border-4 border-blue-300 bg-gray-50" />
				{showArrivePicker ? <FlightTimePicker arrive={true} setDestForm={setDestForm} destForm={destForm} setTime={setArriveTime} setShow={setShowArrivePicker} title={`Arrival Time to ${dest}`} /> : null}
			</div>
			<div className="flex">
				<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M9 7H11V12H16V14H9V7Z" fill="black" />
					<path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z" fill="black" />
				</svg>
				<label className="ml-1 block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Flight Times Range:</label>
			</div>
			<FilterAcordion alwaysOpen={true} title={"Depart from HKG"} children={
				<>
					{timeSlots.map((value, index) => {
						return (
							<div className="flex items-center" key={index} onChange={depTimeHandler}>
								<CheckBox context={value} disabled={locCount[index]} id={index} />
								<label className="grow text-end text-xs">{locCount[index]}</label>
							</div>
						);
					})}
				</>} />
			<FilterAcordion title={`Arrives to ${dest}`} children={
				<>
					{timeSlots.map((value, index) => {
						return (
							<div className="flex items-center" key={index} onChange={arrTimeHandler}>
								<CheckBox context={value} disabled={destCount[index]} id={index} />
								<label className="grow text-end text-xs">{destCount[index]}</label>
							</div>
						);
					})}
				</>} />

			<div className="flex mt-4">
				<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
					viewBox="0 0 297 297" style={{ "enableBackground": "new 0 0 297 297", "width": "30px", height: "20" }}>
					<path d="M207.173,138.996c-8.419-20.15-26.921-34.547-49.169-37.897V55.836c0-5.248-4.255-9.504-9.504-9.504
	s-9.504,4.256-9.504,9.504v45.263c-22.248,3.351-40.75,17.747-49.168,37.897H9.504C4.256,138.996,0,143.251,0,148.5
	c0,5.248,4.256,9.504,9.504,9.504h6.033c0.894,8.664,8.236,15.444,17.133,15.444c8.897,0,16.238-6.78,17.134-15.444h35.425
	c-0.182,1.957-0.286,3.936-0.286,5.94c0,31.815,23.5,58.243,54.054,62.845v14.375c0,5.248,4.255,9.504,9.504,9.504
	s9.504-4.256,9.504-9.504v-14.375c30.554-4.602,54.054-31.029,54.054-62.845c0-2.004-0.105-3.983-0.286-5.94h35.426
	c0.895,8.664,8.235,15.444,17.133,15.444c8.897,0,16.238-6.78,17.133-15.444h6.033c5.248,0,9.504-4.256,9.504-9.504
	c0-5.249-4.256-9.504-9.504-9.504H207.173z M148.5,119.394c24.564,0,44.55,19.985,44.55,44.551c0,0.05-0.004,0.098-0.004,0.148
	c-17.316-6.013-52.182-14.188-89.091-0.335C104.057,139.278,123.998,119.394,148.5,119.394z M148.5,208.494
	c-17.917,0-33.387-10.638-40.453-25.923c33.702-13.663,66.752-4.83,80.79,0.257C181.717,197.977,166.317,208.494,148.5,208.494z"/>
				</svg>
				<label className="ml-1 block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Airplane:</label>
			</div>
			<FilterAcordion alwaysOpen={true} title={`Narrow-body jet`} children={
				<>
					{['Airbus A320neo', 'Boeing 757', 'Airbus A220', 'Other'].map((value, index) => {
						return (
							<div className="flex items-center" key={index} onChange={arrTimeHandler}>
								<CheckBox context={value} disabled={index + 1} id={index} />
								<label className="grow text-end text-xs">{index + 1}</label>
							</div>
						);
					})}
				</>} />

			<FilterAcordion title={`Wide-body jet`} children={
				<>
					{['Airbus A350', 'Boeing 777', 'Boeing 787', 'Other'].map((value, index) => {
						return (
							<div className="flex items-center" key={index} onChange={arrTimeHandler}>
								<CheckBox context={value} disabled={index + 1} id={index} />
								<label className="grow text-end text-xs">{index + 1}</label>
							</div>
						);
					})}
				</>} />
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
export function FlightTimePicker({ depart, arrive, destForm, setDestForm, setTime, setShow, title }) {
	const [hour, setHour] = useState("00");
	const [minute, setMinute] = useState("00");
	const timeHandler = (h, m) => {
		console.log(h, m);
		setHour(h < 10 ? "0" + h : h);
		setMinute(m < 10 ? "0" + m : m);
	}

	const setFlightTime = (e) => {
		setShow(false);
		let subData = JSON.parse(JSON.stringify(destForm));
		if (depart) {
			subData.dTime = hour + ":" + minute;
		} else if (arrive) {
			subData.aTime = hour + ":" + minute;
		}
		setTime(hour + ":" + minute);

		setDestForm(subData);
	}

	return (
		<div className="absolute bg-white p-4 border rounded-xl shadow-md z-50">
			<div className="my-2 flex"><strong>{title}</strong></div>
			<Timepicker onChange={timeHandler} />
			<button onClick={setFlightTime} className="w-full shadow-md rounded-lg inline-flex items-center justify-center py-2.5 px-3 text-sm font-medium text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
				Confirm
			</button>
		</div>
	);
}

export function FlightTimeRange() {
	return (
		<div className="flex w-full m-auto items-center h-12 justify-center">
			<div className="py-1 relative min-w-full">
				<div className="h-2 bg-gray-200 rounded-full">
					<div className="absolute h-2 rounded-full bg-blue-700 w-0" style={{ "width": "24.1935%", "left": "11.2903%" }}></div>
					<div className="absolute h-4 flex items-center justify-center w-4 rounded-full bg-white shadow border border-gray-300 -ml-2 top-0 cursor-pointer" style={{ "left": "11.2903%" }}>
						<div className="relative -mt-2 w-1">
							<div className="absolute z-10 opacity-100 bottom-100 mb-2 left-0 min-w-full" style={{ "marginLeft": "-25px" }}>
								<div className="relative shadow-md">
									<div className="bg-black -mt-8 text-white truncate text-xs rounded py-1 px-4">$ 15</div>
									<svg className="absolute text-black w-full h-2 left-0 top-100" x="0px" y="0px" viewBox="0 0 255 255">
										<polygon className="fill-current" points="0,0 127.5,127.5 255,0"></polygon>
									</svg>
								</div>
							</div>
						</div>
					</div>
					<div className="absolute h-4 flex items-center justify-center w-4 rounded-full bg-white shadow border border-gray-300 -ml-2 top-0 cursor-pointer" style={{ "left": "35.4839%" }}>
						<div className="relative -mt-2 w-1">
							<div className="absolute z-10 opacity-100 bottom-100 mb-2 left-0 min-w-full" style={{ "marginLeft": "-25px" }}>
								<div className="relative shadow-md">
									<div className="bg-black -mt-8 text-white truncate text-xs rounded py-1 px-4">$ 30</div>
									<svg className="absolute text-black w-full h-2 left-0 top-100" x="0px" y="0px" viewBox="0 0 255 255">
										<polygon className="fill-current" points="0,0 127.5,127.5 255,0"></polygon>
									</svg>
								</div>
							</div>
						</div>
					</div>
					<div className="absolute text-gray-800 -ml-1 bottom-0 left-0 -mb-6">00:00</div>
					<div className="absolute text-gray-800 -mr-1 bottom-0 right-0 -mb-6">24:00</div>
				</div>
			</div>
		</div>
	);
}

export function FilterAcordion({ title, children, alwaysOpen }) {
	const [open, setOpen] = useState(false);
	const [height, setHeight] = useState(0);

	const contentRef = useRef(null);

	useEffect(() => {
		if (alwaysOpen) {
			setOpen(true);
		}
		setHeight(contentRef.current.scrollHeight);
	}, []);

	const toggleAccordion = () => {
		setOpen(!open);
	};


	return (
		<div className="w-full flex flex-col" >
			<button
				className={"w-full flex flex-row my-1 border-b"}
				onClick={toggleAccordion}
			>
				<p className="ml-1 block mb-2 flex-1 text-start text-sm text-gray-900 dark:text-gray-300">{title}</p>
				<span className="ml-3">
					{!open ? (
						<svg
							className="w-5 h-5 "
							// display only when parent is hovered
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M19 9l-7 7-7-7"
							></path>
						</svg>
					) : (
						<svg
							className="w-5 h-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M5 15l7-7 7 7"
							></path>
						</svg>
					)}
				</span>
			</button>
			<div
				ref={contentRef}
				style={{ height: `${open ? "150" : "0"}px` }}
				className="transition-height duration-500 ease-in-out overflow-hidden w-full"
			>
				{open ? <div className="w-full z-50 px-2">{children}</div> : <div className="w-full z-50 p-2 invisible">{children}</div>}
			</div>
		</div>
	);
}

export function AirplaneFilter() {
	return (
		<div>

		</div>
	);
}
