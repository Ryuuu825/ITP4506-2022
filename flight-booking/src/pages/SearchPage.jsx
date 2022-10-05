import FilterBox from "../layout/FilterBox";
import SortTab from "../layout/SortTab";
import Nav from "../layout/Nav";
import TicketInfo from "../component/TicketInfo";

export default function SearchPage() {
	return (
		<div className="h-full bg-gray-100">
			<Nav />
			<div className="flex flex-row w-8/12 h-full mx-auto mt-3">
				<div className="flex flex-col w-3/12 bg-white">
					<FilterBox />
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
					</div>
				</div>
			</div>
		</div>
	);
}