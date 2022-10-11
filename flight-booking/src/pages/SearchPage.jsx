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
	const [isShow, setIsShow] = useState(false);
	const [isFilterPrice, setIsFilterPrice] = useState(false);
	const [isFilterTime, setIsFilterTime] = useState(false);
	const [filteredTickets, setFilteredTickets] = useState([]);
	const [maxPrice, setMaxPrice] = useState(0);
	const [minPrice, setMinPrice] = useState(0);
	const [currentPage, setCurrentPage] = useState(0);
	const [startIndex, setStartIndex] = useState(0);
	const [endIndex, setEndIndex] = useState(12);
	const [displayItem, setDisplayItem] = useState([]);
	let { dest, date } = useParams();

	let searchDate = {
		"date": date,
		"dest": dest,
		"min": 0,
		"max": 9999999,
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
		// Filter by destination
		const filteredTicket = TicketRecords.filter(d => {
			return d.code.includes(dest) && d.date.includes(date)
		})

		if (filteredTicket !== undefined && filteredTicket.length > 0) {
			// get max price
			setMaxPrice(Math.max(...filteredTicket[0].ticket.map(d => d.price)));

			// Filter by price
			const filteredTicketByFilterPrice = filteredTicket[0].ticket.filter(d => {
				return isFilterPrice ? (d.price >= destForm.min && d.price <= destForm.max) : true;
			});
			// Filter by departure time, arrival time
			const filteredTicketByFilterTime = filteredTicketByFilterPrice.filter(d => {
				return isFilterTime ? (
					(destForm.depTime[0] === true ? (d.outTime >= "00:00" && d.outTime <= "05:59") : false)
					|| (destForm.depTime[1] === true ? (d.outTime >= "06:00" && d.outTime <= "11:59") : false)
					|| (destForm.depTime[2] === true ? (d.outTime >= "12:00" && d.outTime <= "17:59") : false)
					|| (destForm.depTime[3] === true ? (d.outTime >= "18:00" && d.outTime <= "23:59") : false)
					|| (destForm.arrTime[0] === true ? (((d.arrivalTime).split(" "))[1] >= "00:00" && ((d.arrivalTime).split(" "))[1] <= "05:59") : false)
					|| (destForm.arrTime[1] === true ? (((d.arrivalTime).split(" "))[1] >= "06:00" && ((d.arrivalTime).split(" "))[1] <= "11:59") : false)
					|| (destForm.arrTime[2] === true ? (((d.arrivalTime).split(" "))[1] >= "12:00" && ((d.arrivalTime).split(" "))[1] <= "17:59") : false)
					|| (destForm.arrTime[3] === true ? (((d.arrivalTime).split(" "))[1] >= "18:00" && ((d.arrivalTime).split(" "))[1] <= "23:59") : false)
				) : true;
			});

			// find min price
			setMinPrice((isFilterTime ? Math.min(...filteredTicketByFilterTime.map(d => d.price)) : Math.min(...filteredTicket[0].ticket.map(d => d.price))));

			setDisplayItem(filteredTicketByFilterTime);

		} else {
			setMaxPrice(0);
			setMinPrice(0);
			setDisplayItem([]);
		}

		setIsShow(true);
	}, [destForm, currentPage, isFilterTime, isFilterPrice]);

	return (
		<div className="h-full bg-gray-100">
			<Nav />
			<div className="flex flex-row w-4/5 h-full mx-auto mt-3">
				<form action="" className="flex flex-col w-3/12 mb-3">
					<div className="flex flex-col w-full bg-white mb-3 shadow-md rounded-lg">
						<DestinationBox setShow={setIsShow} setCurrentPage={setCurrentPage} dest={dest} date={date} setDestForm={setDestForm} destForm={destForm} />
					</div>
					<div className="flex flex-col w-full h-full bg-white shadow-md rounded-lg">
						{isShow ? <FilterBox setIsFilterPrice={setIsFilterPrice} setIsFilterTime={setIsFilterTime} setCurrentPage={setCurrentPage} ticketCount={displayItem.length} locCount={[0, 13, 2, 0]} destCount={[1, 0, 0, 14]} dest={destForm.code} min={minPrice} max={maxPrice} setDestForm={setDestForm} destForm={destForm} /> :
							<div className="flex flex-col w-full h-screen bg-white shadow-md rounded-lg"></div>}
					</div>
				</form>
				<div className="flex flex-col ml-3 w-9/12">
					<SortTab />
					<div className="flex flex-col w-full">
						{displayItem.length > 0 && isShow ?
							// displayItem.map((d, index) => (
							displayItem.slice(startIndex + (currentPage * 12), endIndex + (currentPage * 12)).map((t) => (
								<TicketInfo key={t.id} dest={dest} ticket={t} date={date} />
								// ))
							))
							: <div className="shadow-md flex items-center justify-center w-full mb-2 border rounded-lg border-gray-200 bg-white h-24">
								<span>No Record Found</span>
							</div>
						}
					</div>
					{isShow ? <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} setStartIndex={setStartIndex} setEndIndex={setEndIndex} records={displayItem === undefined ? [] : displayItem} perPage={12} /> : " "}
				</div>
			</div>
		</div>
	);
}