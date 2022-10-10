import FilterBox from "../layout/FilterBox";
import SortTab from "../layout/SortTab";
import Nav from "../layout/Nav";
import TicketInfo from "../component/TicketInfo";
import Pagination from "../component/Pagination";
import DestinationBox from "../layout/DestinationBox";
import TicketRecords from "../db/tickets.json";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function SearchPage() {

	const [records, setData] = useState(TicketRecords);
	const [isShow, setIsShow] = useState(false);
	const [tickets, setTickets] = useState([]);
	const [maxPrice, setMaxPrice] = useState(0);
	const [minPrice, setMinPrice] = useState(0);
	const [currentPage, setCurrentPage] = useState(0);
	const [startIndex, setStartIndex] = useState(0);
	const [endIndex, setEndIndex] = useState(12);
	let { dest, date } = useParams();

	let searchDate = {
		"date": dest,
		"dest": date,
		"min": 0,
		"max": 0,
		"depTime": [
			false,
			false,
			false,
			false
		],
		"arrTime": [
			false,
			false,
			false,
			false
		]
	};
	const [destForm, setDestForm] = useState(searchDate);

	useEffect(() => {
		filterTicket();
		setIsShow(true);
		console.log(tickets);
	}, [destForm, currentPage]);

	const filterTicket = () => {
		// Filter by destination
		const filteredTicket = records.filter(d => {
			return d.code.includes(dest) && d.date.includes(date)
		});
		// const filteredTicket = filter(condition, records);
		setTickets(filteredTicket);
		// get max price
		if (filteredTicket !== undefined && filteredTicket.length > 0) {
			let maxValue = Math.max.apply(null,
				filteredTicket[0].ticket.map((o) => { return o.price; }));
			setMaxPrice(maxValue);

			// find min price
			let minValue = Math.min.apply(null,
				filteredTicket[0].ticket.map((o) => { return o.price; }));
			setMinPrice(minValue);
		}else {
			setMaxPrice(0);
			setMinPrice(0);
		}
	};

	return (
		<div className="h-full bg-gray-100">
			<Nav />
			<div className="flex flex-row w-4/5 h-full mx-auto mt-3">
				<form action="" className="flex flex-col w-3/12 mb-3">
					<div className="flex flex-col w-full bg-white mb-3 shadow-md rounded-lg">
						<DestinationBox dest={dest} date={date} setDestForm={setDestForm} destForm={destForm} />
					</div>
					<div className="flex flex-col w-full h-full bg-white shadow-md rounded-lg">
						{isShow ? <FilterBox ticketCount={tickets[0]} locCount={[0, 10, 5, 9]} destCount={[0, 10, 5, 9]} dest={destForm.code} min={minPrice} max={maxPrice} setDestForm={setDestForm} destForm={destForm} /> : ""}
					</div>
				</form>
				<div className="flex flex-col ml-3 w-9/12">
					<SortTab />
					<div className="flex flex-col w-full">
						{tickets.length > 0 ? tickets.map((d, index) => (
							d.ticket.slice(startIndex+(currentPage*12), endIndex+(currentPage*12)).map((t) => (
								<TicketInfo key={t.id} dest={d.code} ticket={t} date={d.date} />
							))))
							: <div className="shadow-md flex items-center justify-center w-full mb-2 border rounded-lg border-gray-200 bg-white h-24">
								<span>No Record Found</span>
							</div>
						}
					</div>
					{isShow ? <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} setStartIndex={setStartIndex} setEndIndex={setEndIndex} records={tickets === undefined ? [] : tickets[0]} perPage={12} /> : " "}
				</div>
			</div>
		</div>
	);
}