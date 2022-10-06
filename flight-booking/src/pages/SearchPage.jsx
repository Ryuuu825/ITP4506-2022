import FilterBox from "../layout/FilterBox";
import SortTab from "../layout/SortTab";
import Nav from "../layout/Nav";
import TicketInfo from "../component/TicketInfo";
import Pagination from "../component/Pagination";
import DestinationBox from "../layout/DestinationBox";

export default function SearchPage() {
	return (
		<div className="h-full bg-gray-100">
			<Nav />
			<div className="flex flex-row w-4/5 h-full mx-auto mt-3">
				<div className="flex flex-col w-3/12 mb-3">
					<div className="flex flex-col w-full bg-white mb-3 shadow-md rounded-lg">
						<DestinationBox />
					</div>
					<div className="flex flex-col w-full h-full bg-white shadow-md rounded-lg">
						<FilterBox />
					</div>
				</div>
				<div className="flex flex-col ml-3 w-9/12">
					<SortTab />
					<div className="flex flex-col w-full h-full">
						<TicketInfo />
						<TicketInfo />
						<TicketInfo />
						<TicketInfo />
						<TicketInfo />
						<TicketInfo />
						<TicketInfo />
						<TicketInfo />
						<TicketInfo />
						<TicketInfo />
						<TicketInfo />
						<TicketInfo />
					</div>
					<Pagination />
				</div>
			</div>
		</div>
	);
}