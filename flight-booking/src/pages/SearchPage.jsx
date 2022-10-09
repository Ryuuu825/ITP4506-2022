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
	let searchDate = {
		"date": "",
		"dest": "",
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

	const [records, setData] = useState(TicketRecords);
	const [isShow, setIsShow] = useState(false);
	const [tickets, setTickets] = useState([]);
	const [destForm, setDestForm] = useState(searchDate);
	const [maxPrice, setMaxPrice] = useState(0);
	const [minPrice, setMinPrice] = useState(0);

	useEffect(() => {
		dest = destForm.dest;
		date = destForm.date;
		filterTicket();
		setIsShow(true);
		console.log(tickets);
	}, [destForm]);

	let { dest, date } = useParams();

	let filter = (condition, data) => {
		return data.filter(item => {
			return Object.keys(condition).every(key => {
				return String(item[key]).toLowerCase().includes(
					String(condition[key]).trim().toLowerCase())
			})
		})
	}

	const filterTicket = () => {

		const condition = {
			"code": dest,
			"date": date,
		}
		// Filter by destination
		//const filteredTicket = records.filter(d => {d.code.includes("KIX")  && d.date.includes({ date })});
		const filteredTicket = filter(condition, records);
		console.log(filteredTicket);
		setTickets(filteredTicket);
		// get max price
		if(filteredTicket !== undefined && filteredTicket.length > 0) {
			let maxValue = Math.max.apply(null,
				filteredTicket[0].ticket.map(function (o) { return o.price; }));
			setMaxPrice(maxValue);
	
			// find min price
			let minValue = Math.min.apply(null,
				filteredTicket[0].ticket.map(function (o) { return o.price; }));
			setMinPrice(minValue);
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
						{tickets.map((d, index) => (
							d.ticket.slice(0, 12).map((t) => (
								<TicketInfo key={t.id} dest={d.code} ticket={t} date={d.date} />
							))
						))}
					</div>
					{isShow ? <Pagination records={tickets === undefined ? []: tickets[0]} perPage={12} /> : " "}
				</div>
			</div>
		</div>
	);
}