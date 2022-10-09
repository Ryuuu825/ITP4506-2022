import FilterBox from "../layout/FilterBox";
import SortTab from "../layout/SortTab";
import Nav from "../layout/Nav";
import TicketInfo from "../component/TicketInfo";
import Pagination from "../component/Pagination";
import DestinationBox from "../layout/DestinationBox";
import Tickets from "../db/tickets.json";
import { useState, useEffect } from "react";

export default function SearchPage({ dest, date }) {
	const [data, setData] = useState(Tickets);
	const [destTicket, setDestTicket] = useState([]);

	useEffect(() => {
		filterTicket();
	}, []);

	
	const filterTicket = () => {
    const filteredTicket = data.filter(ticket => ticket.code.includes("JP"));
    setDestTicket(filteredTicket);
  };

	const filterBest = () => {
    const { autos } = this.state;
    const fordAutos = autos.filter(auto => auto.title.includes("Ford"));
    // const fordAutos = autoData.filter( (auto) => auto.title.includes("Ford"));

    this.setState({ filteredAutos: fordAutos });
  };

	const results = 169;
	const ticketInfos = [...Array(12).keys()];
	return (
		<div className="h-full bg-gray-100">
			<Nav />
			<div className="flex flex-row w-4/5 h-full mx-auto mt-3">
				<div className="flex flex-col w-3/12 mb-3">
					<div className="flex flex-col w-full bg-white mb-3 shadow-md rounded-lg">
						<DestinationBox />
					</div>
					<div className="flex flex-col w-full h-full bg-white shadow-md rounded-lg">
						<FilterBox locCount={[0, 10, 5, 9]} destCount={[0, 10, 5, 9]} dest={""} min={4203} max={18456} />
					</div>
				</div>
				<div className="flex flex-col ml-3 w-9/12">
					<SortTab />
					<div className="flex flex-col w-full h-full">
						{destTicket.map((d) => (
							d.ticket.map((t) => (
								<TicketInfo key={t.id} dest={d.code} ticket={t}/>
							))
						))}
					</div>
					<Pagination records={169} perPage={12} />
				</div>
			</div>
		</div>
	);
}