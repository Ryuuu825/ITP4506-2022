import { Paragraph } from "../component/Text";
import { useState, useRef, useEffect } from "react";
import Moment from "react-moment";
import moment from 'moment';
import airports from "../db/airport.json";

export default function PaymentForm({ data, payment, setPayment, setStep, step }) {
	const fullOutTime = new Date(data.date + " " + data.ticket.outTime);
	const duration = moment(data.ticket.arrivalTime).diff(fullOutTime, "hours") + "h " + moment(data.ticket.arrivalTime).diff(fullOutTime, "minutes") % 60 + "m";

	const setNextFormHandler = (e) => {
		setStep(step + 1);
	}

	const setPreFormHandler = (e) => {
		setStep(step - 1);
	}

	return (
		<div className="flex w-4/5 mx-auto flex-col justify-start items-start">
			<h1 className="my-4 text-3xl font-bold tracking-tight text-blue-900 dark:text-white">
				Review your booking
			</h1>
			<div className="px-8 w-full">
				<Accordion
					title={`1. Flight HKG - ${data.dest}`}
					alwaysOpen={true}
					h={150}
					content={
						<div className="flex flex-row w-full">
							<div className="flex flex-col flex-2 p-2 w-full">
								<div className="flex flex-row items-center justify-center p-2 ">
									<div className="flex flex-col p-2">
										<p className="text-base font-bold"><Moment format="MMM DD">{data.date}</Moment></p>
										<p className="text-lg text-yellow-400 font-bold">HKG - <Moment format="hh:mm A" date={fullOutTime} /></p>
										<p className="text-base font-bold">Hong Kong</p>
									</div>
									<hr className="my-6 sm:mx-auto border-gray-700 lg:my-8" />
									<div className="flex flex-col flex-grow p-2 items-center">
										<svg width="50px" height="50px" viewBox="0 0 72 72" id="emoji" xmlns="http://www.w3.org/2000/svg">
											<g id="color">
												<polyline fill="#9b9b9a" stroke="none" points="24,39.7539 8.1194,34.5078 3.6819,35.8828 14.0221,45.2348" />
												<path fill="#d0cfce" stroke="none" d="M42.5887,30.7725l13.6352-4.637c0,0,13.4999-0.2289,10.3294,3.2551 c-3.1706,3.484-25.4249,12.196-32.0018,14.6509c-6.5769,2.455-14.7118,3.7502-20.337,3.8592 c-4.9236,0.0953,0.5896-2.8912,0.5896-2.8912s6.2557-3.55,9.0249-4.7568l2.6347-1.9489" />
												<polyline fill="#9b9b9a" stroke="none" points="47.0508,35.4288 22.4454,32.6408 20.3515,34.1342 37.7611,40.3461" />
												<path fill="#9b9b9a" stroke="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5597" d="M21.3658,40.2489" />
												<path fill="#9b9b9a" stroke="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5597" d="M14.0356,44.2409" />
											</g>
											<g id="hair" />
											<g id="skin" />
											<g id="skin-shadow" />
											<g id="line">
												<polyline fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5597" points="19.9738,39.1394 7.5418,34.7361 4.4746,35.8087 12.6436,43.1314" />
												<path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5597" d="M26.6131,39.0394" />
												<path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5597" d="M21.3658,40.2489" />
												<path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5597" d="M14.0356,44.2409" />
												<polyline fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5597" points="47.0508,34.6931 22.4454,32.6408 20.3515,34.1342 37.1065,40.1126" />
												<path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5597" d="M43.174,31.3231l11.1493-4.4864c1.3266-0.5338,2.7434-0.7839,4.1727-0.74c3.6995,0.1136,10.3898,0.6672,8.0573,3.2304 c-3.1706,3.4839-25.4249,12.196-32.0018,14.6509s-14.7118,3.7502-20.337,3.8591c-4.9236,0.0953,0.5896-2.8912,0.5896-2.8912 s6.2557-3.55,9.0249-4.7568l2.7841-1.2132" />
											</g>
										</svg>
										<p className="text-sm w-full text-center border-t-2 border-blue-800 pt-2">OC110</p>
										<p className="text-xs">{data.ticket.stop > 0 ? data.ticket.stop + " stop" : "Direct" + " - " + duration}</p>
									</div>
									<div className="flex flex-col p-2">
										<p className="text-base font-bold"><Moment format="MMM DD">{data.ticket.arrivalTime}</Moment></p>
										<p className="text-lg text-yellow-400 font-bold">{data.dest} - <Moment format="hh:mm A" date={data.ticket.arrivalTime} /></p>
										<p className="text-base font-bold">{(airports.filter(d => d.code == data.dest)[0]).area.split(",")[0]}</p>
									</div>
								</div>
							</div>
						</div>
					}
				/>

				<Accordion
					title={`2. Passengers and Seats`}
					h={200}
					content={
						<div className="flex flex-row">
							<div className="flex flex-col mr-4 w-1/2 border-gray-800 shadow-lg border-gray-600 rounded-md">
								<label className="font-bold border-b-2 bg-blue-800 text-white rounded-t-md p-2">Adult 1:</label>
								<div className="flex w-full py-2 px-4">
									<label className="font-bold w-1/2">Name:&nbsp;</label><label className="ml-10 underline">Mr Ben Poon</label>
								</div>
								<div className="flex w-full py-2 px-4">
									<label className="font-bold w-1/2">Seat:&nbsp;</label><label className="ml-10 underline">10A</label>
								</div>
							</div>
							<div className="flex flex-col mr-4 w-1/2 border-gray-800 shadow-lg border-gray-600 rounded-md">
								<label className="font-bold border-b-2 bg-blue-800 text-white rounded-t-md p-2">Child 1:</label>
								<div className="flex w-full px-4 py-2">
									<label className="font-bold w-1/2">Name:&nbsp;</label><label className="ml-10 underline">Mr Kee Lee</label>
								</div>
								<div className="flex w-full px-4 py-2">
									<label className="font-bold w-1/2">Date of Birth:&nbsp;</label><label className="ml-10 underline">2011 - 01 - 02</label>
								</div>
								<div className="flex w-full px-4 py-2">
									<label className="font-bold w-1/2">Seat:&nbsp;</label><label className="ml-10 underline">10B</label>
								</div>
							</div>
						</div>
					}
				/>

				<Accordion
					title={`3. Add-ons`}
					h={350}
					content={
						<div className="flex flex-row">
							<div className="flex flex-col mr-4 w-full border-gray-800 shadow-lg border-gray-600 rounded-md">
								<label className="font-bold border-b-2 bg-blue-800 text-white rounded-t-md p-2">Meal Reservation:</label>
								<div className="flex flex-col w-full mt-2 pb-2 border-b px-4">
									<label className="font-bold">Food 1:&nbsp;</label>
									<label className="ml-10 text-xm">Hong Kong-style seafood curry rice</label>
									<label className="font-bold">Extra Fare: </label><label className="ml-10">HK$ 0</label>
								</div>
								<div className="flex flex-col w-full mt-2 px-4">
									<label className="font-bold">Food 2:&nbsp;</label>
									<label className="ml-10 text-xm">Piri piri ling fish with grilled lime and mojo verde sauce, charred baby corn, steamed kale, coconut rice</label>
									<label className="font-bold">Extra Fare: </label><label className="ml-10">HK$ 100</label>
								</div>
							</div>
						</div>
					}
				/>

				<Accordion
					title={`4. Cost Breakdown`}
					h={200}
					content={
						<>
							<Paragraph>
								If you've got a trip in mind but you're not
								ready to book yet, you can save your search and
								we'll send you an email when the price drops.
							</Paragraph>
							<Paragraph>
								You can also follow us on
								<span className="text-primary">
								</span>
								to get the latest news and updates.
							</Paragraph>
						</>
					}
				/>
			</div>
			<div className="w-full mx-auto flex flex-row">
				<div className="flex flex-row justify-start mt-8">
					<button onClick={setPreFormHandler} className="flex flew-row p-4 bg-blue-800 shadow-md hover:bg-blue-700 text-white font-bold rounded">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="mr-4 feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>Back</button>
				</div>
				<div className="flex grow flex-row justify-end mt-8">
					<button onClick={setNextFormHandler} className="flex flex-row ml-2 bg-blue-800 shadow-md hover:bg-blue-700 text-white font-bold p-4 rounded">
						Make Payment
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="ml-4 feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
					</button>
				</div>
			</div>
		</div>
	);
}

export function Accordion({ title, content, h, alwaysOpen }) {
	const [open, setOpen] = useState(false);
	const [height, setHeight] = useState(0);

	const contentRef = useRef(null);

	useEffect(() => {
		if (alwaysOpen) {
			setOpen(true);
		}
		setHeight(contentRef.current.scrollHeight);
	}, []);

	const toggleAccordion = () => {
		setOpen(!open);
	};


	return (
		<div className="w-full flex flex-col" >
			<button
				className={"w-full flex flex-row items-center py-3 border-b"}
				onClick={toggleAccordion}
			>
				<p className="peer text-2xl font-semibold mt-3  text-left mr-auto">{title}</p>
				<span className="mr-3">
					{!open ? (
						<svg
							className="w-6 h-6 "
							// display only when parent is hovered
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M19 9l-7 7-7-7"
							></path>
						</svg>
					) : (
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M5 15l7-7 7 7"
							></path>
						</svg>
					)}
				</span>
			</button>
			<div
				ref={contentRef}
				style={{ height: `${open ? h : "0"}px` }}
				className="transition-height duration-500 ease-in-out overflow-hidden w-full"

			>
				<div className="text-black font-normal text-xl pt-2 " >
					{open ? <div className="w-11/12 ml-5 mb-5 relative" >{content}</div> : ""}
				</div>
			</div>
		</div>
	);
}