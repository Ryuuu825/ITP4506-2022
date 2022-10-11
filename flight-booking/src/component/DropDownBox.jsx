import { useState, useEffect, useRef } from "react";
import data from "../db/airport.json";

export default function DropDownBox({ dest, show, onChange, setDest }) {
	const [isOpen, setIsOpen] = useState(false);
	const [selected, setSelected] = useState(dest);
	const [filter, setFilter] = useState("");
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
		setFilter(e.target.value);
		setIsOpen(true);
	};

	const handleSelect = (item) => {
		onChange(selected);
	};
	return (
		<div className="w-80 z-50 absolute bg-white border rounded-lg shadow-md p-2.5" onBlur={() => console.log("children lost focus")}>
			<input type="text" ref={inputRef} onChange={handleInput} defaultValue={dest} className="w-full p-2.5 rounded border-1 border-blue-600" placeholder="Where to?" name="" id="" />
			<p className="text-sm pt-2 pb-4 font-light">Select airport</p>
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