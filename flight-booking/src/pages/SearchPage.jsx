import FilterBox from "../layout/FilterBox";
import SortTab from "../layout/SortTab";
import Nav from "../layout/Nav";
import TicketInfo from "../component/TicketInfo";
import Pagination from "../component/Pagination";
import DestinationBox from "../layout/DestinationBox";
import Tickets from "../db/tickets.json";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import queryString from 'query-string';

export default function SearchPage() {
	const [data, setData] = useState(Tickets);
	const [isShow, setIsShow] = useState(false);
	const [destTicket, setDestTicket] = useState([]);
	const [destForm, setDestForm] = useState({});
	const [maxPrice, setMaxPrice] = useState(0);
	const [minPrice, setMinPrice] = useState(0);

	const location = useLocation();
	useEffect(() => {
		filterTicket();
		console.log(destTicket.length);
		setIsShow(true);
	}, []);

	let { dest, date } = queryString.parse(location.search);

	const filterTicket = () => {
		const filteredTicket = data.filter(d => d.code.includes("KIX"));
		setDestTicket(filteredTicket);
		let maxValue = Math.max.apply(null,
			filteredTicket[0].ticket.map(function (o) { return o.price; }));
		setMaxPrice(maxValue);
		let minValue = Math.min.apply(null,
			filteredTicket[0].ticket.map(function (o) { return o.price; }));
		setMinPrice(minValue);
	};

	return (
		<div className="h-full bg-gray-100">
			<Nav />
			<div className="flex flex-row w-4/5 h-full mx-auto mt-3">
				<form action="" className="flex flex-col w-3/12 mb-3">
					<div className="flex flex-col w-full bg-white mb-3 shadow-md rounded-lg">
						<DestinationBox dest={dest} date={date} setDestForm={setDestForm} />
					</div>
					<div className="flex flex-col w-full h-full bg-white shadow-md rounded-lg">
						{isShow ? <FilterBox ticketCount={destTicket[0]} locCount={[0, 10, 5, 9]} destCount={[0, 10, 5, 9]} dest={destTicket[0].code} min={minPrice} max={maxPrice} /> : ""}
					</div>
				</form>
				<div className="flex flex-col ml-3 w-9/12">
					<SortTab />
					<div className="flex flex-col w-full h-full">
						{destTicket.map((d, index) => (
							d.ticket.slice(0, 12).map((t) => (
								<TicketInfo key={t.id} dest={d.code} ticket={t} date={d.date} />
							))
						))}
					</div>
					{isShow ? <Pagination records={destTicket[0]} perPage={12} /> : " "}
				</div>
			</div>
		</div>
	);
}