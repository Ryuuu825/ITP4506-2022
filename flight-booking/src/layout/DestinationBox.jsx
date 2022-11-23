import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DropDownBox from "../component/DropDownBox";
import airport from "../db/airport.json";

export default function DestinationBox({ setCurrentPage, setShow, dest, date, setDestForm, destForm }) {
	const [selectedDate, setSelectedDate] = useState(date);
	const [selectedDest, setSelectedDest] = useState(dest);
	const [showDropDown, setShowDropDown] = useState(false);
	const [fullField, setFullField] = useState(true);
	const [text, setText] = useState(dest+" - "+airport.find(d => d.code === dest).area);
	const navigate = useNavigate();
	const dropBox = useRef();

	useEffect(() => {
		// close dropdown when click outside
		const checkIfClickedOutside = e => {
			// If the menu is open and the clicked target is not within the menu,
			// then close the menu
			if (showDropDown && dropBox.current && !dropBox.current.contains(e.target)) {
				setShowDropDown(false)
			}
		}
		document.addEventListener("mousedown", checkIfClickedOutside)
		return () => {
			// Cleanup the event listener
			document.removeEventListener("mousedown", checkIfClickedOutside)
		}
	}, [showDropDown])

	const handleSearch = () => {
		if (selectedDest === "" || selectedDate === "") {
			setFullField(false);
			return;
		} else {
			setFullField(true);
			let subData = JSON.parse(JSON.stringify(destForm));
			subData.date = selectedDate;
			subData.dest = selectedDest;
			setCurrentPage(0);
			setShow(false);
			setDestForm(subData);
			navigate(`/search/${selectedDest}/${selectedDate}?page=1`);
		}
	}

	return (
		<div className="flex flex-col justify-center items-center w-full px-2 py-4">
			<div className="w-10/12 mb-10">
				<div className="flex mb-5 border-b-2">
					<svg width="30px" height="30px" viewBox="-5 -2 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin" className="jam jam-map-marker">
						<path fill="#1D4ED8" d='M12 7A5 5 0 1 0 2 7c0 1.726 1.66 5.031 5 9.653 3.34-4.622 5-7.927 5-9.653zM7 20C2.333 13.91 0 9.577 0 7a7 7 0 1 1 14 0c0 2.577-2.333 6.91-7 13zm0-9a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' />
					</svg>
					<p className="ml-1 text-lg font-bold">Destination</p>
				</div>
				<div>
					<div className="flex flex-col">
						<div className="flex">
							<svg width="20px" height="20px" viewBox="0 0 58.568 58.568" xmlns="http://www.w3.org/2000/svg">
								<path id="flight_plane" data-name="flight plane" d="M1023.994,672.006c2.4-3.218,3.843-6.559,3.85-8.946a3.323,3.323,0,0,0-.453-1.828,1.706,1.706,0,0,0-.578-.584,3.265,3.265,0,0,0-1.852-.466c-2.381,0-5.723,1.442-8.942,3.849a77.166,77.166,0,0,0-8.806,8.487q-.917.966-1.934,2.031l-6.976-2.091.02-.02a1.566,1.566,0,0,0-.005-2.2l-1.259-1.261a1.571,1.571,0,0,0-1.11-.461,1.541,1.541,0,0,0-1.1.458l-1.885,1.886-1-.3a1.563,1.563,0,0,0-.125-2.063l-1.266-1.265a1.568,1.568,0,0,0-1.109-.457,1.534,1.534,0,0,0-1.1.458l-1.73,1.73-7.094-2.125a1.775,1.775,0,0,0-.507-.072,1.875,1.875,0,0,0-1.311.531l-2.494,2.494a1.463,1.463,0,0,0-.439,1.029,1.433,1.433,0,0,0,.761,1.284l14.918,8.334a2.607,2.607,0,0,1,.362.275l4.253,4.252c-3.978,4.191-7.522,8.25-10.284,11.781-.258.328-.5.649-.742.965l-11.541-1.048a1.573,1.573,0,0,0-.2-.012,2.127,2.127,0,0,0-1.429.591l-1.163,1.161a1.449,1.449,0,0,0-.446,1.029,1.418,1.418,0,0,0,.839,1.3l8.119,3.857a1.843,1.843,0,0,1,.311.223l.674.668a4.938,4.938,0,0,0-.325,1.561,2.053,2.053,0,0,0,.567,1.5l.029.026.008.005a2.056,2.056,0,0,0,1.493.56,4.964,4.964,0,0,0,1.548-.322l.684.682a1.956,1.956,0,0,1,.212.3l3.848,8.1a1.435,1.435,0,0,0,1.294.851h.008a1.446,1.446,0,0,0,1.026-.432l1.192-1.2a2.132,2.132,0,0,0,.569-1.426c0-.066,0-.117-.005-.144l-1.051-11.581c.317-.238.636-.484.965-.739,3.536-2.766,7.6-6.313,11.779-10.286l4.256,4.26a2.314,2.314,0,0,1,.278.365l8.318,14.891a1.451,1.451,0,0,0,2.322.342l2.512-2.51a1.9,1.9,0,0,0,.514-1.31,1.769,1.769,0,0,0-.069-.491l-2.125-7.095,1.729-1.733a1.563,1.563,0,0,0,0-2.205l-1.268-1.267a1.559,1.559,0,0,0-2.062-.129l-.3-.995,1.887-1.886a1.577,1.577,0,0,0,.455-1.107,1.54,1.54,0,0,0-.455-1.1l-1.262-1.262a1.563,1.563,0,0,0-2.217,0l-.013.012-2.089-6.976q1.082-1.032,2.062-1.96C1019.32,677.193,1022.053,674.6,1023.994,672.006Z" transform="translate(-969.276 -660.182)" />
							</svg>
							<label htmlFor="search" className="ml-1 text-sm mb-2 font-bold">To:</label>
						</div>
						<div className="relative w-full mb-5 rounded-lg shadow-md">
							<div ref={dropBox} className="relative z-50">
								{showDropDown ? <DropDownBox setText={setText} show={setShowDropDown} setDest={setSelectedDest} dest={selectedDest} /> : null}
							</div>
							<div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
								<svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
							</div>
							<input type="text" id="search" className="bg-gray-50 border-4 border-orange-300 text-gray-900 text-sm focus:border-blue-300 focus:outline-none focus:ring-blue-300 block w-full pl-10 p-2.5" placeholder="Where to?" required readOnly value={text} onClick={(e) => setShowDropDown(!showDropDown)} />
						</div>

						<div className="flex">
							<svg xmlns="http://www.w3.org/2000/svg"
								width="20px" height="20px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52">
								<path d="M46.3,19.7H5.7c-0.9,0-1.6,0.7-1.6,1.6v23.5c0,2.6,2.1,4.7,4.7,4.7h34.4c2.6,0,4.7-2.1,4.7-4.7V21.3
												C47.9,20.4,47.2,19.7,46.3,19.7z M18.2,41.6c0,0.9-0.7,1.6-1.6,1.6h-3.1c-0.9,0-1.6-0.7-1.6-1.6v-3.1c0-0.9,0.7-1.6,1.6-1.6h3.1
												c0.9,0,1.6,0.7,1.6,1.6V41.6z M29.1,41.6c0,0.9-0.7,1.6-1.6,1.6h-3.1c-0.9,0-1.6-0.7-1.6-1.6v-3.1c0-0.9,0.7-1.6,1.6-1.6h3.1
												c0.9,0,1.6,0.7,1.6,1.6V41.6z M29.1,30.7c0,0.9-0.7,1.6-1.6,1.6h-3.1c-0.9,0-1.6-0.7-1.6-1.6v-3.1c0-0.9,0.7-1.6,1.6-1.6h3.1
												c0.9,0,1.6,0.7,1.6,1.6V30.7z M40.1,30.7c0,0.9-0.7,1.6-1.6,1.6h-3.1c-0.9,0-1.6-0.7-1.6-1.6v-3.1c0-0.9,0.7-1.6,1.6-1.6h3.1
												c0.9,0,1.6,0.7,1.6,1.6V30.7z M43.2,7.2h-3.9V5.6c0-1.7-1.4-3.1-3.1-3.1c-1.7,0-3.1,1.4-3.1,3.1v1.6H19V5.6c0-1.7-1.4-3.1-3.1-3.1
												s-3.1,1.4-3.1,3.1v1.6H8.8c-2.6,0-4.7,2.1-4.7,4.7v1.6c0,0.9,0.7,1.6,1.6,1.6h40.7c0.9,0,1.6-0.7,1.6-1.6v-1.6
												C47.9,9.3,45.8,7.2,43.2,7.2z"/>
							</svg>
							<label htmlFor="search_date" className="ml-1 text-sm mb-2 font-bold">Date:</label>
						</div>
						<div className="relative w-full mb-5 rounded-lg shadow-md">
							<div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
								<svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
							</div>
							<input type="date" id="search_date" min={new Date().toLocaleDateString("sv")} value={selectedDate} className="bg-gray-50 border-4 border-orange-300 text-gray-900 text-sm focus:border-blue-300 focus:outline-none focus:ring-blue-300 block w-full pl-10 p-2.5" required onChange={e => setSelectedDate(e.target.value)} />
						</div>
						<button onClick={handleSearch} className="w-full shadow-md rounded-lg inline-flex items-center py-2.5 px-3 text-sm font-medium text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
							<svg aria-hidden="true" className="-ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg><p className="items-center w-full">Search</p>
						</button>
						{fullField ? null :
							<div className="mt-2">
								<span className="text-red-500 text-sm font-bold">Please select airport and date
								</span>
							</div>
						}
					</div>
				</div>
			</div>
		</div >
	);
}