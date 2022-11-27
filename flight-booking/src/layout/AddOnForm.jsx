import { Button, Modal } from "flowbite-react";
import meal from "../asserts/food.jpg";
import car from "../asserts/carservice.jpg";
import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import phonecodes from '../db/phonecodes.json';

export default function AddOnForm({ passengers, setPassengers, setForm, form, setStep, step }) {
	const [showMeal, setShowMeal] = useState(false);
	const [showShuttle, setShowShuttle] = useState(false);
	const setNextFormHandler = (e) => {
		setStep(step + 1);
		form.addon = ["meal"];
		setForm(form);
	}

	const setPreFormHandler = (e) => {
		setStep(step - 1);
		form.addon = ["meal"];
		setForm(form);
	}

	return (
		<div className="w-full p-8 animate-fade-in duration-1000">
			{showMeal ? <MealMenu setShowMeal={setShowMeal} showMeal={showMeal} /> : " "}
			{showShuttle ? <ShuttleService setShowShuttle={setShowShuttle} showShuttle={showShuttle} /> : " "}
			<div className="w-4/5 flex flex-row mx-auto items-center">
				<h1 className="grow mb-4 text-3xl font-bold tracking-tight text-blue-900 dark:text-white">
					Add-Ons
				</h1>
				<h1 onClick={setNextFormHandler} className="underline cursor-pointer flex flex-row items-center mb-4 text-xl font-bold tracking-tight text-blue-900 dark:text-white">
					Skip this step
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="ml-2 feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
				</h1>
			</div>
			<div className="w-4/5 mx-auto pr-8 flex flex-row border rounded-xl shadow-md ">
				<img className="rounded-l-lg" src={meal} alt="" width={400} height={400} />
				<div className="flex grow flex-col m-4">
					<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
						Airline Meal Reservation
					</h5>
					<p className="font-normal text-gray-700 dark:text-gray-400">
						We will provide each passenger with a free in-flight meal. If there are additional needs, we can provide you with more in-flight meal options, and the price will vary according to your choice.
					</p>
					<div className="flex flex-row items-end justify-end mt-8 w-full h-full">
						<button onClick={() => setShowMeal(true)} className="hover:bg-blue-700 text-white font-bold w-3/5 py-4 bg-blue-800 uppercase">Choose Meal</button>
					</div>
				</div>
			</div>

			<div className="w-4/5 mx-auto pr-8 flex my-8 flex-row border rounded-xl shadow-md ">
				<img className="rounded-l-lg" src={car} alt="" width={400} height={400} />
				<div className="flex grow flex-col m-4">
					<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
						Airport Shuttle Service
					</h5>
					<p className="font-normal text-gray-700 dark:text-gray-400">
						We provide airport shuttle service, if necessary, please choose this additional service.
					</p>
					<div className="flex flex-row items-end justify-end mt-8 w-full h-full">
						<button onClick={() => setShowShuttle(true)} className="hover:bg-yellow-700 text-white font-bold w-3/5 py-4 bg-yellow-500 uppercase">Add Service</button>
					</div>
				</div>
			</div>
			<div className="w-4/5 mx-auto flex flex-row">
				<div className="flex flex-row justify-start mt-8">
					<button onClick={setPreFormHandler} className="flex flew-row p-4 bg-blue-800 shadow-md hover:bg-blue-700 text-white font-bold rounded">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="mr-4 feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>Back</button>
				</div>
				<div className="flex grow flex-row justify-end mt-8">
					<button onClick={setNextFormHandler} className="flex flex-row ml-2 bg-blue-800 shadow-md hover:bg-blue-700 text-white font-bold p-4 rounded">
						Next
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="ml-4 feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
					</button>
				</div>
			</div>
		</div>
	);
}

export function ShuttleService({ setShowShuttle, showShuttle }) {
	const [totalPrice, setTotalPrice] = useState(0);
	const [selectArea, setSelectArea] = useState(0);
	const [selectDistrict, setSelectDistrict] = useState(0);
	const menuBox = useRef();
	useEffect(() => {
		// close dropdown when click outside
		const checkIfClickedOutside = e => {
			// If the menu is open and the clicked target is not within the menu,
			// then close the menu
			if (showShuttle && menuBox.current && !menuBox.current.contains(e.target)) {
				setShowShuttle(false)
			}
		}
		document.addEventListener("mousedown", checkIfClickedOutside)
		return () => {
			// Cleanup the event listener
			document.removeEventListener("mousedown", checkIfClickedOutside)
		}
	}, [showShuttle, totalPrice])

	const addShuttleHandler = () => {
		setShowShuttle(false)
	}

	const area = [
		["Select District"],
		["Select District", "Central and Western", "Eastern", "Southern", "Wan Chai"],
		["Select District", "Kowloon City", "Kwun Tong", "Sham Shui Po", "Wong Tai Sin", "Yau Tsim Mong"],
		["Select District", "Islands", "Kwai Tsing", "North", "Sai Kung", "Sha Tin", "Tai Po", "Tsuen Wan", "Tuen Mun", "Yuen Long"]
	]

	return (
		<div style={{ "backgroundColor": "rgba(0,0,0,0.5)" }} className="flex fixed top-0 left-0 w-full h-full p-8 justify-center items-center z-50 overflow-auto" >
			<div ref={menuBox} className="w-1/2 flex flex-col bg-white m-auto p-4 rounded-md">
				<div className="py-4 flex border-b">
					<label className="text-2xl font-bold flex-1">Airport Shuttle Service</label>
					<button onClick={() => setShowShuttle(false)}>
						<svg width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g data-name="Layer 2"><g data-name="close"><rect width="24" height="24" transform="rotate(180 12 12)" opacity="0" /><path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z" /></g></g></svg>
					</button>
				</div>
				<div className="p-4 w-full">
					<label className="text-2xl my-2 font-bold text-blue-900">Pick up location</label><br />
					<label className="text-sm mb-4"><label className="text-red-600">*</label> Required</label>
					<div className="flex flex-row mt-4 items-center">
						<label className="flex flex-row w-1/4">
							Region&nbsp;<label className="text-red-600">*</label>
						</label>
						<div className="relative mr-4">
							<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-500 dark:text-gray-400 feather feather-globe"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
							</div>
							<select type="text" className="border p-3 pr-8 border-black text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block pl-10" value={selectArea} onChange={(e) => setSelectArea(e.target.value)} >
								<option value={0}>Select Region</option>
								<option value={1}>Hong Kong Island</option>
								<option value={2}>Kowloon</option>
								<option value={3}>New Territories</option>
							</select>
						</div>
						<div className="grow relative mr-4">
							<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-500 dark:text-gray-400 feather feather-globe"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
							</div>
							<select type="text" className="border w-full p-3 pr-8 border-black text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block pl-10" value={selectDistrict} onChange={(e) => { setSelectDistrict(e.target.value); e.target.value==="Select District" ? setTotalPrice(0) : setTotalPrice(Math.floor((Math.random() + 0.5) * 300)) }} >
								{area[selectArea].map((item, index) => {
									return (
										<option key={index} value={item}>{item}</option>
									)
								})}
							</select>
						</div>
					</div>
					<div className="flex flex-row mt-4 items-center">
						<label className="flex flex-row w-1/4">
							Street&nbsp;<label className="text-red-600">*</label>
						</label>
						<div className="grow relative">
							<input type="text" required id="input-group-1" className="border p-3 border-black text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
						</div>
					</div>
					<div className="flex flex-row mt-4 items-center">
						<label className="flex flex-row w-1/4">
							Building&nbsp;<label className="text-red-600"></label>
						</label>
						<div className="grow relative">
							<input type="text" required id="input-group-1" className="border p-3 border-black text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
						</div>
					</div>
				</div>
				<div className="border-t p-4 flex justify-between">
					<div className="flex">
						<label className="text-xl font-bold">Total</label>
						<label className="text-xl ml-10 text-4xl font-bold">HK${totalPrice}</label>
					</div>
					<button onClick={addShuttleHandler} className="bg-blue-800 shadow-md hover:bg-blue-700 text-white font-bold p-4 rounded w-fit">Confirm</button>
				</div>
			</div>
		</div >
	);
}

export function MealMenu({ setShowMeal, showMeal }) {
	const [totalPrice, setTotalPrice] = useState(0);
	const [selectCount, setSelectCount] = useState(0);
	const menuBox = useRef();
	useEffect(() => {
		// close dropdown when click outside
		const checkIfClickedOutside = e => {
			// If the menu is open and the clicked target is not within the menu,
			// then close the menu
			if (showMeal && menuBox.current && !menuBox.current.contains(e.target)) {
				setShowMeal(false)
			}
		}
		document.addEventListener("mousedown", checkIfClickedOutside)
		return () => {
			// Cleanup the event listener
			document.removeEventListener("mousedown", checkIfClickedOutside)
		}
	}, [showMeal, totalPrice])

	const addMealHandler = () => {
		setShowMeal(false)
	}

	return (
		<div style={{ "backgroundColor": "rgba(0,0,0,0.5)" }} className="flex fixed top-0 left-0 w-full h-full p-8 justify-center items-center z-50 overflow-auto">
			<div ref={menuBox} className="w-10/12 flex flex-col bg-white m-auto p-4 rounded-md">
				<div className="py-4 flex border-b">
					<label className="text-2xl font-bold flex-1">Airline Meal</label>
					<button onClick={() => setShowMeal(false)}>
						<svg width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g data-name="Layer 2"><g data-name="close"><rect width="24" height="24" transform="rotate(180 12 12)" opacity="0" /><path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z" /></g></g></svg>
					</button>
				</div>
				<div className="m-4">
					<div className="w-full flex flex-row items-center">
						<label className="text-xl font-bold mr-2">Standard Meal</label><br />
						<label className="text-base font-bold">(You can only choose a maximum of 2 standard meals)</label><br />
					</div>
					<div className="grid grid-cols-2 gap-4 my-4">
						<Meal name={`Braised pork ribs in chu hou sauce, potatoes and steamed jasmine rice `}
							price={0} totalPrice={totalPrice} setTotalPrice={setTotalPrice} selectCount={selectCount} setSelectCount={setSelectCount} />
						<Meal name={`Hong Kong-style beef curry, broccoli and steamed jasmine rice `}
							price={0} totalPrice={totalPrice} setTotalPrice={setTotalPrice} selectCount={selectCount} setSelectCount={setSelectCount} />
						<Meal name={`Steamed basa fish with preserved cabbage, Shanghainese pak choy and steamed jasmine rice  `}
							price={0} totalPrice={totalPrice} setTotalPrice={setTotalPrice} selectCount={selectCount} setSelectCount={setSelectCount} />
						<Meal name={`Soy-braised chicken with Chinese sausage on steamed jasmine rice `}
							price={0} totalPrice={totalPrice} setTotalPrice={setTotalPrice} selectCount={selectCount} setSelectCount={setSelectCount} />
						<Meal name={`Hong Kong-style seafood curry rice `}
							price={0} totalPrice={totalPrice} setTotalPrice={setTotalPrice} selectCount={selectCount} setSelectCount={setSelectCount} />
					</div>
					<label className="text-xl font-bold">Extra Meal</label><br />
					<div className="grid grid-cols-2 gap-4">
						<Meal name={`Szechuan chicken, pak choy, paired with steamed Jasmine rice`}
							price={50} totalPrice={totalPrice} extra={true} setTotalPrice={setTotalPrice} selectCount={selectCount} setSelectCount={setSelectCount} />
						<Meal name={`Seared US beef steak, onion marmalade, roasted root vegetables, parsley potato mash, and mushroom jus`}
							price={50} totalPrice={totalPrice} extra={true} setTotalPrice={setTotalPrice} selectCount={selectCount} setSelectCount={setSelectCount} />
						<Meal name={`Paccheri with zucchini, eggplant, and tomato`}
							price={50} totalPrice={totalPrice} extra={true} setTotalPrice={setTotalPrice} selectCount={selectCount} setSelectCount={setSelectCount} />
						<Meal name={`Piri piri ling fish with grilled lime and mojo verde sauce, charred baby corn, steamed kale, coconut rice`}
							price={100} totalPrice={totalPrice} extra={true} setTotalPrice={setTotalPrice} selectCount={selectCount} setSelectCount={setSelectCount} />
						<Meal name={`Australian prime beef fillet with red wine sauce, roasted Brussels sprouts, crispy pancetta, baby carrots`}
							price={150} totalPrice={totalPrice} extra={true} setTotalPrice={setTotalPrice} selectCount={selectCount} setSelectCount={setSelectCount} />
					</div>
				</div>
				<div className="border-t p-4 flex justify-between">
					<div className="flex">
						<label className="text-xl font-bold">Total</label>
						<label className="text-xl ml-10 text-4xl font-bold">HK${totalPrice}</label>
					</div>
					<button onClick={addMealHandler} className="bg-blue-800 shadow-md hover:bg-blue-700 text-white font-bold p-4 rounded w-fit">Confirm</button>
				</div>
			</div>
		</div>
	);
}

export function Meal({ name, price, totalPrice, setTotalPrice, max, selectCount, setSelectCount, extra }) {
	const [count, setCount] = useState(0);
	const addMealHandler = () => {
		if (extra) {
			setCount(count + 1);
			setTotalPrice(totalPrice + price);
		} else if (selectCount < 2) {
			setCount(count + 1);
			setSelectCount(selectCount + 1);
			setTotalPrice(totalPrice + price);
		} else {
			toast.warning('You are not allowed to choose more than 2 standard meals');
		}
	}
	const removeMealHandler = () => {
		if (extra && count > 0) {
			setCount(count - 1);
			setTotalPrice(totalPrice - price);
		}
		else if (selectCount > 0 && count > 0) {
			setCount(count - 1);
			setSelectCount(selectCount - 1);
			setTotalPrice(totalPrice - price);
		}
	}
	const imgs = [meal]
	return (
		<div className="w-full h-40 mr-1 my-1 flex flex-row border rounded-xl shadow-md ">
			<img className="rounded-l-lg h-full" src={imgs[Math.floor(Math.random() * imgs.length)]} alt="" />
			<div className="flex grow flex-col m-4">
				<h5 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">
					{name}
				</h5>
				<p className="font-normal mt-2 text-gray-700 dark:text-gray-400">
					HK${price}
				</p>
				<div className="w-full h-full items-end flex justify-end">
					<button onClick={removeMealHandler} className="w-10 h-8 hover:bg-blue-700 bg-blue-800 text-white text-2xl">-</button>
					<label className="text-base mx-4">{count}</label>
					<button onClick={addMealHandler} className="w-10 h-8 hover:bg-blue-700 bg-blue-800 text-white text-2xl">+</button>
				</div>
			</div>
		</div>
	)
}