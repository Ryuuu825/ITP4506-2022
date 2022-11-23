import Nav from "../layout/Nav";
import TicketInfo from "../component/TicketInfo";
import Pagination from "../component/Pagination";
import DestinationBox from "../layout/DestinationBox";
import TicketRecords from "../db/tickets.json";
import { useState, useEffect } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import TicketDetail from "../layout/TicketDetail";

export default function TranscationPage() {
	const location = useLocation();
	let selectInfo = location.state.selectInfo;
	const date = selectInfo.date;
	const dest = selectInfo.dest;
	return (
		<div className="w-full h-full bg-gray-100">
			<Nav />
			<Breadcrumb data={{ date, dest }} page={'search'} />
			<div className="flex flex-row w-4/5 h-screen mx-auto my-4">
				<FlightBox />
			</div>
		</div>
	);
}

function FlightBox() {
	return (
		<div className="flex flex-col p-4 bg-white rounded-lg shadow-lg mb-3 w-full h-full">
			<ProgressNav />
		</div>
	);
}



function Breadcrumb({ page, data }) {
	const [crumb, setCrumb] = useState();
	return (
		<nav className="flex w-full px-5 py-3 text-gray-700 border-gray-200 shadow-md bg-white dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">
			<ol className="inline-flex items-center space-x-1 md:space-x-3">
				<li className="inline-flex items-center">
					<a href="#" className="hover:underline hover:font-bold hover:text-blue-700 inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
						<svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
						Home
					</a>
				</li>
				<li>
					<Link className="flex items-center" to={{ pathname: `/search/${data.dest}/${data.date}`, search: '?page=1' }}>
						<svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
						<label className="ml-1 hover:underline hover:font-bold hover:text-blue-700 cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white">Search Tickets</label>
					</Link>
				</li>
				<li>
					<div className="flex items-center">
						<svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
						<label className="ml-1 hover:underline hover:font-bold hover:text-blue-700 cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white">Transcation</label>
					</div>
				</li>
			</ol>
		</nav>
	)
}

function ProgressNav() {
	return (
		<div className="relative flex flex-row items-center px-8 py-4 w-full bg-white mb-3 border-b-2">
			<div className="flex bg-gray-100 px-8 py-4">
				<label className="rounded-full text-white w-6 h-6 text-center bg-blue-700" htmlFor="">1</label>
				<label className="font-bold" htmlFor="">&nbsp;Flight</label>
			</div>
			{/* <div className="border flex-1 rounded-full">
				<div className="bg-blue-700 w-full h-full"></div>
			</div> */}
			<div className="flex bg-gray-100 px-8 py-4">
				<label className="rounded-full text-white w-6 h-6 text-center bg-blue-700" htmlFor="">2</label>
				<label className="font-bold" htmlFor="">&nbsp;Passengers</label>
			</div>
			{/* <div className="border flex-1 rounded-full">
				<div className="bg-blue-700"></div>
			</div> */}
			<div className="flex bg-gray-100 px-8 py-4">
				<label className="rounded-full text-white w-6 h-6 text-center bg-blue-700" htmlFor="">3</label>
				<label className="font-bold" htmlFor="">&nbsp;Seats</label>
			</div>
			{/* <div className="border flex-1 rounded-full">
				<div className="bg-blue-700"></div>
			</div> */}
			<div className="flex bg-gray-100 px-8 py-4">
				<label className="rounded-full text-white w-6 h-6 text-center bg-blue-700" htmlFor="">4</label>
				<label className="font-bold" htmlFor="">&nbsp;Add-Ons</label>
			</div>
			{/* <div className="border flex-1 rounded-full">
				<div className="bg-blue-700"></div>
			</div> */}
			<div className="flex bg-gray-100 px-8 py-4">
				<label className="rounded-full text-white w-6 h-6 text-center bg-blue-700" htmlFor="">5</label>
				<label className="font-bold" htmlFor="">&nbsp;Payment</label>
			</div>
			<progress className="absolute w-10/12" value={70}></progress>
		</div>
	)
}