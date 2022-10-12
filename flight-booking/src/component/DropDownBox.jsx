import { useState, useEffect, useRef } from "react";
import data from "../db/airport.json";

export default function DropDownBox({ dest, show, onChange, setDest }) {
	const [isOpen, setIsOpen] = useState(false);
	const [selected, setSelected] = useState(dest);
	const [filter, setFilter] = useState(dest);
	const [filteredData, setFilteredData] = useState([]);
	const inputRef = useRef();

	useEffect(() => {
		setFilteredData(
			data.filter((item) => {
				return item.airport.toLowerCase().includes(filter.toLowerCase())
					|| item.area.toLowerCase().includes(filter.toLowerCase())
					|| item.code.toLowerCase().includes(filter.toLowerCase());
			})
		);
	}, [filter]);

	const handleInput = (e) => {
		setDest(e.target.value);
		setFilter(e.target.value);
		setIsOpen(true);
	};

	return (
		<div className="w-full scale-110 z-50 absolute bg-white border rounded-lg shadow-md p-4 text-gray-600">
			<input type="text" ref={inputRef} onChange={handleInput} defaultValue={dest} className="text-sm w-full p-2 rounded border-2 focus:border-blue-300 focus:ring-blue-300 border-blue-600" placeholder="Where to?" name="" id="" />
			<p className="text-sm pt-2 pb-4">Select airport</p>
			<div className="">
				{isOpen && filteredData.length > 0 ?
					filteredData.slice(0, 5).map((item) => (
						<AirportItem data={item} key={item.code} show={show} setSelected={setSelected} setSelectedDest={setDest} />
					)) : ""}
			</div>
		</div>
	);
}

function AirportItem({ data, show, setSelected, setSelectedDest }) {
	const clickHandler = () => {
		setSelected(data.code);
		setSelectedDest(data.code);
		show(false);
	};

	return (
		<div className="w-full p-2 border-t hover:bg-gray-100 text-sm text-gray-600" onClick={clickHandler}>
			<div>
				<span className="font-bold mr-1">{data.code}</span>
				<span className="">{data.airport}</span>
			</div>
			<div>
				<span className="">{data.area}</span>
			</div>
		</div>
	);
}