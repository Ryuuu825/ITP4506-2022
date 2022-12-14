import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SeatForm({ passengers, setPassengers, setForm, form, setStep, step }) {
	const [seatCount, setSeatCount] = useState(2);
	const [selectedSeat, setSelectedSeat] = useState(form.seats);
	const [unAvailSeat, setUnAvailSeat] = useState([]);
	const [selectState, setSelectState] = useState(1);
	const [selectElement, setSelectElement] = useState([{ "state": 1, "element": null, "seat": "" }, { "state": 2, "element": null, "seat": "" }]);

	useEffect(() => {
		for (let i = 10; i < document.getElementsByTagName('input').length; i++) {
			if (i === 18 || i === 24) continue;
			let r = Math.random(2);
			if (r < 0.5) {
				if (selectedSeat.indexOf(document.getElementsByTagName('input')[i].value) !== -1) {
					document.getElementsByTagName('input')[i].className = "text-sm text-white text-center w-8 h-8 bg-green-800 cursor-pointer border-2 rounded border-green-600";
					continue;
				}
				document.getElementsByTagName('input')[i].className = "text-sm text-center w-8 h-8 bg-gray-200 cursor-pointer border-2 rounded border-gray-600";
				setUnAvailSeat([...unAvailSeat, document.getElementsByTagName('input')[i].value]);
			}
		}
	}, [])

	const selectSeat = (e) => {
		const choose = "text-sm text-white text-center w-8 h-8 bg-green-800 cursor-pointer border-2 rounded border-green-600";
		const avail = "text-sm text-white text-center bg-blue-800 w-8 h-8 border-2 cursor-pointer rounded border-blue-600";
		const unavail = "text-sm text-center w-8 h-8 bg-gray-200 cursor-pointer border-2 rounded border-gray-600";
		if (e.target.className === choose) {
			toast.warning("You have already selected this seat");
			return;
		}

		else if (e.target.className === avail && seatCount >= 0 && selectState > 0) {
			e.target.className = choose;
			let count = seatCount;
			if (selectElement[selectState - 1].element !== null) {
				count += 1;
				console.log(selectElement[selectState - 1].element);
				selectElement[selectState - 1].element.className = avail;
				selectElement[selectState - 1].element = e.target;
			}
			selectedSeat[selectState - 1] = e.target.value;
			setSelectedSeat(selectedSeat);
			if(selectState === 1 && selectedSeat[1] === undefined) setSelectState(2);
			else setSelectState(0);
			selectElement[selectState - 1].element = e.target;
			selectElement[selectState - 1].seat = e.target.value;
			setSelectElement(selectElement);
			setSeatCount(count - 1);
			form.seats = selectedSeat;
			setForm(form);
		} else if (e.target.className === unavail) {
			toast.error("This seat has be reserved");
		} else {
			toast.error("Please choose a passenger first if you want to change the seat for a passenger");
		}
	}

	const setNextFormHandler = (e) => {
		setStep(step + 1);
	}

	const setPreFormHandler = (e) => {
		setStep(step - 1);
	}

	return (
		<div className="w-3/5 mx-auto mt-8 animate-fade-in duration-1000">
			<label className='text-2xl w-full justify-center font-bold mx-auto flex flex-row text-blue-900'>
				<svg version="1.1" className="-scale-x-100 mx-2" fill="currentColor" width="24" height="24" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
					viewBox="0 0 240.235 240.235" style={{ "enableBackground": "new 0 0 240.235 240.235" }}>
					<path d="M211.744,6.089C208.081,2.163,203.03,0,197.52,0h-15.143c-11.16,0-21.811,8.942-23.74,19.934l-0.955,5.436
	c-0.96,5.47,0.332,10.651,3.639,14.589c3.307,3.938,8.186,6.106,13.74,6.106h19.561c2.714,0,5.339-0.542,7.778-1.504l-2.079,17.761
	c-2.001-0.841-4.198-1.289-6.507-1.289h-22.318c-9.561,0-18.952,7.609-20.936,16.961l-19.732,93.027l-93.099-6.69
	c-5.031-0.36-9.231,1.345-11.835,4.693c-2.439,3.136-3.152,7.343-2.009,11.847l10.824,42.618
	c2.345,9.233,12.004,16.746,21.53,16.746h78.049h1.191h39.729c9.653,0,18.336-7.811,19.354-17.411l15.272-143.981
	c0.087-0.823,0.097-1.634,0.069-2.437l5.227-44.648c0.738-1.923,1.207-3.967,1.354-6.087l0.346-4.97
	C217.214,15.205,215.407,10.016,211.744,6.089z"/>
				</svg>Choose Seat</label>
			<div className="w-full flex flex-col justify-start">
				<p className='font-bold text-lg mt-4'>Click the card to select a seat for the passenger</p>
				<div className="flex flex-row mt-2">
					<div onClick={() => setSelectState(1)} className="flex flex-col mr-4 w-1/2 shadow-md rounded-md">
						<div className='flex w-full flex-row justify-between'>
							<label className="font-bold bg-blue-800 text-white grow rounded-tl-md p-2">Adult 1:</label>
							<label className="font-bold bg-blue-800 text-white rounded-tr-md p-2">{selectState === 1 ? "Selecting seat..." : ""}</label>
						</div>
						<div className={selectState === 1 ? "flex w-full px-4 py-2 border-x border-blue-800" : "flex w-full px-4 py-2"}>
							<label className="font-bold w-1/2">Name:&nbsp;</label><label className="ml-10 underline">Mr Ben Poon</label>
						</div>
						<div className={selectState === 1 ? "flex w-full px-4 py-2 border-x border-b-2 rounded-b-lg border-blue-800" : "flex w-full px-4 py-2"}>
							<label className="font-bold w-1/2">Seat:&nbsp;</label><label className="ml-10 underline">{selectElement[0].seat}</label>
						</div>
					</div>
					<div onClick={() => setSelectState(2)} className="flex flex-col mr-4 w-1/2 shadow-md rounded-md">
						<div className='flex w-full flex-row justify-between'>
							<label className="font-bold bg-blue-800 text-white grow rounded-tl-md p-2">Child 1:</label>
							<label className="font-bold bg-blue-800 text-white rounded-tr-md p-2">{selectState === 2 ? "Selecting seat..." : ""}</label>
						</div>
						<div className={selectState === 2 ? "flex w-full px-4 py-2 border-x border-blue-800" : "flex w-full px-4 py-2"}>
							<label className="font-bold w-1/2">Name:&nbsp;</label><label className="ml-10 underline">Mr Kee Lee</label>
						</div>
						<div className={selectState === 2 ? "flex w-full px-4 py-2 border-x border-b-2 rounded-b-lg border-blue-800" : "flex w-full px-4 py-2"}>
							<label className="font-bold w-1/2">Seat:&nbsp;</label><label className="ml-10 underline">{selectElement[1].seat}</label>
						</div>
					</div>
				</div>
				<p className='text-base py-4 border-b'>You still need to choose {seatCount} seats</p>
			</div>
			<div className='w-fit mt-4 flex mx-auto flex-row justify-center items-center'>
				<div className='flex flex-row items-center mr-2'>
					<input disabled className='text-sm w-8 h-8 bg-blue-800 cursor-pointer border-2 rounded border-gray-600' />
					<p className='text-sm font-medium mx-2'>Available</p>
				</div>
				<div className='flex flex-row items-center mr-2'>
					<input disabled className='text-sm w-8 h-8 bg-green-700 cursor-pointer border-2 rounded border-gray-600' />
					<p className='text-sm font-medium mx-2'>Selected</p>
				</div>
				<div className='flex flex-row items-center'>
					<input disabled className='text-sm w-8 h-8 bg-gray-200 cursor-pointer border-2 rounded border-gray-600' />
					<p className='text-sm font-medium mx-2'>Reserved</p>
				</div>
			</div>
			<div className='flex flex-row items-center justify-center mt-4'>
				<div className='w-fit flex flex-row mx-auto justify-center items-center'>
					<div className='mr-4'>**</div>
					<div className="flex flex-row">
						<div className="mr-2"><div className='w-8 h-8 rounded border-gray-600 text-center cursor-pointer'>A</div></div>
						<div className="mr-8"><div className='w-8 h-8 rounded border-gray-600 text-center cursor-pointer'>B</div></div>
					</div>
					<div className="flex flex-row">
						<div className="mr-2"><div className='w-8 h-8 rounded border-gray-600 text-center cursor-pointer'>C</div></div>
						<div className="mr-2"><div className='w-8 h-8 rounded border-gray-600 text-center cursor-pointer'>D</div></div>
						<div className="mr-2"><div className='w-8 h-8 rounded border-gray-600 text-center cursor-pointer'>E</div></div>
						<div className="mr-8"><div className='w-8 h-8 rounded border-gray-600 text-center cursor-pointer'>F</div></div>
					</div>
					<div className="flex flex-row">
						<div className="mr-2"><div className='text-center w-8 h-8 rounded border-gray-600 cursor-pointer'>G</div></div>
						<div><div className='text-center w-8 h-8 rounded border-gray-600 cursor-pointer'>H</div></div>
					</div>
				</div>
			</div>
			<div className='flex flex-col justify-center'>
				{[...Array(34).keys()].map((code) => (
					code >= 10 ?
						<div key={code} className='w-fit flex flex-row mx-auto justify-center items-center mt-1'>
							<div className='mr-4'>{code}</div>
							<div className="flex flex-row">
								<div onClick={selectSeat} className="mr-2"><input disabled value={code.toString() + "A"} className='text-sm text-white text-center bg-blue-800 w-8 h-8 border-2 cursor-pointer rounded border-blue-600' /></div>
								<div onClick={selectSeat} className="mr-8"><input disabled value={code.toString() + "B"} className='text-sm text-white text-center bg-blue-800 w-8 h-8 border-2 cursor-pointer rounded border-blue-600' /></div>
							</div>
							<div className="flex flex-row">
								<div onClick={selectSeat} className="mr-2"><input disabled value={code.toString() + "C"} className='text-sm text-white text-center bg-blue-800 w-8 h-8 border-2 cursor-pointer rounded border-blue-600' /></div>
								<div onClick={selectSeat} className="mr-2"><input disabled value={code.toString() + "D"} className='text-sm text-white text-center bg-blue-800 w-8 h-8 border-2 cursor-pointer rounded border-blue-600' /></div>
								<div onClick={selectSeat} className="mr-2"><input disabled value={code.toString() + "E"} className='text-sm text-white text-center bg-blue-800 w-8 h-8 border-2 cursor-pointer rounded border-blue-600' /></div>
								<div onClick={selectSeat} className="mr-8"><input disabled value={code.toString() + "F"} className='text-sm text-white text-center bg-blue-800 w-8 h-8 border-2 cursor-pointer rounded border-blue-600' /></div>
							</div>
							<div className="flex flex-row">
								<div onClick={selectSeat} className="mr-2"><input disabled value={code.toString() + "G"} className='text-sm text-white text-center bg-blue-800 w-8 h-8 border-2 cursor-pointer rounded border-blue-600' /></div>
								<div onClick={selectSeat}><input value={code.toString() + "H"} disabled className='text-sm text-white text-center bg-blue-800 w-8 h-8 border-2 cursor-pointer rounded border-blue-600' /></div>
							</div>
						</div>
						: ""
				))}
			</div>

			<div className="w-full flex flex-row">
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
		</div >
	);
}