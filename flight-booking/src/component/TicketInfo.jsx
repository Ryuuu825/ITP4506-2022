import { HKExpree_SVG } from "./SVGPath";

export default function TicketInfo({ dest, date, ticket }) {
	return (
		<div className="flex flex-col justify-center items-center w-full">
			<div className="shadow-md flex flex-row w-full mb-2 border rounded-lg border-gray-200 bg-white">
				<div className="flex flex-col flex-2 p-2 w-8/12">
					<div className="flex flex-row items-center justify-center p-2 ">
						<HKExpree_SVG className="w-3" />
						<div className="flex flex-col p-2">
							<p className="text-base font-bold">{ticket.outTime}</p>
							<p className="text-xs">HKG - {date.toLocaleString("Oct 1")}</p>
						</div>
						<div className="flex flex-col flex-grow p-2 items-center">
							<p className="text-xs border-b border-gray-300 w-full text-center">{ticket.duration}</p>
							<hr />
							<p className="text-sm">{ticket.stop > 0 ? ticket.stop + " stop" : "Direct"}</p>
						</div>
						<div className="flex flex-col p-2">
							<p className="text-base font-bold">{ticket.arrivalTime}</p>
							<p className="text-xs">{dest} - {ticket.arrivalDate}</p>
						</div>
					</div>
					<i className="text-xs">
						{ticket.airline.map((airline,index) => (
							airline + (index < ticket.airline.length - 1 ? ", " : "")
						))}
					</i>
				</div>
				<div className="flex flex-col flex-1 p-4 items-end my-2 border-l">
					<p className="text-xl font-bold">HK$ {ticket.price.toLocaleString()}</p>
					<p className="text-sm mb-4">Total price for all travelers</p>
					<button className="w-full shadow-md h-10 border-4 border-amber-400 rounded-sm font-bold bg-amber-400 text-gray-700 hover:border-orange-300 hover:bg-orange-300 focus:ring-4 focus:outline-none focus:ring-orange-200">View Deal</button>
				</div>
			</div>
		</div>
	);
}