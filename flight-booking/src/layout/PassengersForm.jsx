import { useState } from 'react';
import phonecodes from '../db/phonecodes.json';
import { FloatingLabel } from "../component/Form";
import { useEffect } from 'react';

export default function PassengersForm({ setForm, form, setStep, step, setPassengers }) {
	const [selectArea, setSelectArea] = useState("+852");
	const [passengerBoxs, setPassengerBoxs] = useState([]);

	useEffect(() => {
		setPassengerBoxs([
			<PassengerInfo index={1} />]
		);
	}, []);

	const addPassenger = () => {
		setPassengerBoxs([...passengerBoxs, <PassengerInfo index={passengerBoxs.length + 1} />]);
	}

	const setFormHandler = (e) => {
		form.passenger = [];
		setForm(form);
		setStep(step + 1);
	}

	return (
		<div className={"mt-8 mx-auto flex flex-col w-3/5 animate-fade-in duration-1000"}>
			<div className="flex flex-col border p-8 border-blue-800 rounded-sm">
				<label className="text-2xl font-bold mx-auto flex flex-row text-blue-900">
					<svg className="mx-2 feather feather-phone" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
					Contact Details</label>
				<label className="text-sm mb-4"><label className="text-red-600">*</label> Required</label>

				<div className="flex flex-row items-center">
					<label className="flex flex-row w-1/4">
						Contact Email&nbsp;<label className="text-red-600">*</label>
					</label>
					<div className="grow relative">
						<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
							<svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
						</div>
						<input type="email" required id="input-group-1" className="border p-3 border-black text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-10  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@domain.com" />
					</div>
				</div>
				<br />
				<div className="flex flex-row items-center">
					<label className="flex flex-row w-1/4">
						Phone&nbsp;<label className="text-red-600">*</label>
					</label>
					<div className="relative mr-4">
						<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-500 dark:text-gray-400 feather feather-globe"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
						</div>
						<input type="text" list="areacode" className="border p-3 border-black text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block pl-10" value={selectArea} onChange={(e) => setSelectArea(e.target.value)} />
						<datalist id="areacode" hidden>
							{
								phonecodes.map((code) => (
									<option key={code.countryCode} value={code.phoneCode}>{code.countryNameEn + " ( " + code.phoneCode + " )"}</option>
								))
							}
						</datalist>
					</div>
					<div className="grow relative">
						<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
							<svg className="w-5 h-5 text-gray-500 dark:text-gray-400 feather feather-phone" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
						</div>
						<input type="tel" required id="input-group-1" className="border p-3 border-black text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-10  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Phone No." />
					</div>
				</div>
			</div>
			{passengerBoxs}
			<div className="w-full flex flex-row">
				<div className="flex flex-row justify-start mt-8">
					<button onClick={addPassenger} className="flex flew-row p-4 bg-blue-800 shadow-md hover:bg-blue-700 text-white font-bold rounded">
						<svg className="mr-4 feather feather-user-plus" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>Add Passenger</button>
				</div>
				<div className="flex grow flex-row justify-end mt-8">
					<button onClick={setFormHandler} className="flex flex-row ml-2 bg-blue-800 shadow-md hover:bg-blue-700 text-white font-bold p-4 rounded">
						Next
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-4 feather feather-chevrons-right"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>
					</button>
				</div>
			</div>
		</div>
	);
}

function PassengerInfo({ index }) {
	const [selectedAge, setSelectedAge] = useState(1);
	const [selectedSex, setSelectedSex] = useState('');
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [year, setYear] = useState("");

	const gender = ["Mr", "Mrs", "Miss", "Mdm", "Ms", "Mstr", "Dr", "Prof", "Others"]
	useEffect(() => {
		if (selectedAge === 2) {
			setYear((new Date().getFullYear() - 2) + "");
		} else if (selectedAge === 3) {
			setYear(new Date().getFullYear() + "");
		}
	}, [selectedAge]);

	const onChangeFirstName = (e) => {
		setFirstName(e.target.value);
	}

	const onChangeLastName = (e) => {
		setLastName(e.target.value);
	}
	
	return (
		<div className="mt-8 flex flex-col border p-8 border-blue-800 animate-fade-in">
			<label className="flex flex-row items-center text-2xl text-blue-900 font-bold mx-auto">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-2 feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
				Passengers - {index}</label>
			<label className="text-sm mb-4"><label className="text-red-600">*</label> Required</label>
			<div className="w-full">
				<div className="flex flex-row items-center">
					<label className="flex flex-row w-1/4">
						Name&nbsp;<label className="text-red-600">*</label>
					</label>
					<div className="w-3/4 flex flex-row">
						<select required onChange={(e) => setSelectedSex(e.target.value)} value={selectedSex} className="border p-3 pr-8 border-black text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
							{
								gender.map((v, k) => (
									<option key={k} value={v}>{v}</option>
								))
							}
						</select>
						<input onChange={onChangeFirstName} type="text" className="ml-2 text-sm grow border p-3 rounded-sm" placeholder="First Name" required />
						<input onChange={onChangeLastName} type="text" className="ml-2 text-sm grow border p-3 rounded-sm" placeholder="Last Name" required />
					</div>
				</div>
				<br />
				<div className="flex flex-row items-center">
					<label className="flex flex-row w-1/4">
						Age Group&nbsp;<label className="text-red-600">*</label>
					</label>
					<div className="flex flex-row w-3/4">
						<div className="flex-1">
							<input required className="hidden" id="radio_1" type="radio" name="radio" />
							<label onClick={() => setSelectedAge(1)} className={selectedAge === 1 ? "text-white bg-blue-800 flex flex-col p-3 border items-center rounded-l-full border-black cursor-pointer" : "hover:text-white hover:bg-blue-800 flex flex-col p-3 border items-center rounded-l-full border-black cursor-pointer"} htmlFor="radio_1">
								<span className="text-xs font-semibold">Adult</span>
							</label>
						</div>
						<div className="flex-1">
							<input required className="hidden" id="radio_2" type="radio" name="radio" />
							<label onClick={() => setSelectedAge(2)} className={selectedAge === 2 ? "text-white bg-blue-800 flex flex-col p-3 border-y items-center border-black cursor-pointer" : "hover:text-white hover:bg-blue-800 flex flex-col p-3 border-y items-center border-black cursor-pointer"} htmlFor="radio_2">
								<span className="text-xs font-semibold">Child</span>
							</label>
						</div>
						<div className="flex-1">
							<input required className="hidden" id="radio_3" type="radio" name="radio" />
							<label onClick={() => setSelectedAge(3)} className={selectedAge === 3 ? "text-white bg-blue-800 flex flex-col p-3 border items-center rounded-r-full border-black cursor-pointer" : "hover:text-white hover:bg-blue-800 flex flex-col p-3 border items-center rounded-r-full border-black cursor-pointer"} htmlFor="radio_3">
								<span className="text-xs font-semibold">Infant</span>
							</label>
						</div>
					</div>
				</div>
				<br />
				{
					selectedAge === 2 || selectedAge === 3 ?
						<div className="flex flex-row items-center animate-fade-in">
							<label className="flex flex-row w-1/4">
								Date of Birthday&nbsp;<label className="text-red-600">*</label>
							</label>
							<div className="w-3/4 flex flex-row">
								{selectedAge === 2 ? <select onChange={(e) => setYear(e.target.value)} value={year} className="border p-3 pr-8 border-black text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
									{
										[...Array(10).keys()].map((v,k) => (
											<option key={k} value={2020 - v}>{2020 - v}</option>
										))
									}
								</select> :
									<select onChange={(e) => setYear(e.target.value)} value={year} className="border p-3 pr-8 border-black text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
										{
											[...Array(2).keys()].map((v, k) => (
												<option key={k} value={2022 - v}>{2022 - v}</option>
											))
										}
									</select>}
								<input className='grow ml-2 text-sm' required pattern="\d{4}-\d{2}-\d{2}" type="date" min={year + "-01-01"} max={year === "2022" ? new Date().toISOString().split('T')[0] : year + "-12-31"} />
							</div>
						</div> : ""
				}
			</div>
		</div>
	);
}