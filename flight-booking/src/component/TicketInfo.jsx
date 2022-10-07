import { HKExpree_SVG } from "./SVGPath";

export default function TicketInfo({airline}) {
	return (
		<div className="flex flex-col justify-center items-center w-full">
			<div className="shadow-md flex flex-row w-full mb-2 border rounded-lg border-gray-200 bg-white">
				<div className="flex flex-col flex-2 p-2 w-8/12">
					<div className="flex flex-row items-center justify-center p-2 ">
						<HKExpree_SVG className="w-3"/>
						<div className="flex flex-col p-2">
							<p className="text-base font-bold">8:45 AM</p>
							<p className="text-xs">HKG - Oct 8</p>
						</div>
						<div className="flex flex-col flex-grow p-2 items-center">
							<p className="text-xs border-b border-gray-300 w-full text-center">12h 00m</p>
							<hr />
							<p className="text-sm">1 stop</p>
						</div>
						<div className="flex flex-col p-2">
							<p className="text-base font-bold">8:45 PM</p>
							<p className="text-xs">PKX - Oct 8</p>
						</div>
					</div>
					<p className="text-xs">Hong Kong Airlines, Beijing Capital Airlines</p>
				</div>
				<div className="flex flex-col flex-1 p-4 items-end my-2 border-l">
					<p className="text-xl font-bold">HKD4,511.74</p>
					<p className="text-sm mb-4">Total price for all travelers</p>
					<button className="w-full shadow-md h-10 border-4 border-amber-400 rounded-sm font-bold bg-amber-400 text-gray-700 hover:border-orange-300 hover:bg-orange-300 focus:ring-4 focus:outline-none focus:ring-orange-200">View Deal</button>
				</div>
			</div>
		</div>
	);
}