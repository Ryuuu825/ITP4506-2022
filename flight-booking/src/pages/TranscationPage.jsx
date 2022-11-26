import Nav from "../layout/Nav";
import TicketInfo from "../component/TicketInfo";
import Pagination from "../component/Pagination";
import DestinationBox from "../layout/DestinationBox";
import TicketRecords from "../db/tickets.json";
import { useState, useEffect } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import TicketDetail from "../layout/TicketDetail";
import { HKExpress_SVG, AirChina_SVG } from "../component/SVGPath";
import Moment from "react-moment";
import moment from 'moment';
import airports from "../db/airport.json";
import PassengersForm from "../layout/PassengersForm";
import { useRef } from "react";
import SeatForm from "../layout/SeatForm";
import AddOnForm from "../layout/AddOnForm";

export default function TranscationPage() {
	const location = useLocation();
	const [topFixed, setTopFixed] = useState(null);
	let selectInfo = location.state.selectInfo;
	const date = selectInfo.date;
	const dest = selectInfo.dest;
	const [passengers, setPassengers] = useState({
		"adults": [], "children": [], "infants": []
	});
	const topbox = useRef();
	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		}
	}, []);

	const handleScroll = () => {
		if (window.scrollY >= 200) {
			setTopFixed(true);
		} else {
			setTopFixed(false);
		}
	}

	return (
		<div className="w-full h-full bg-gray-100 pb-2">
			<Breadcrumb data={{ date, dest }} page={'search'} />
			{topFixed ? <div className="fixed w-full z-50 top-0 left-0"><TopBox refs={topbox} data={selectInfo} /></div> : <TopBox data={selectInfo} />}
			<div style={{ "marginTop": topFixed ? "189px" : "0px" }}></div>
			<div className={"flex flex-row w-4/5 mx-auto my-4"}>
				<TranscationBox data={selectInfo} passengers={passengers} setPassengers={setPassengers} />
			</div>
		</div>
	);
}

function TranscationBox({ data, passengers, setPassengers }) {
	const [step, setStep] = useState(1);
	const [form, setForm] = useState(null);
	const [formData, setFormData] = useState({
		"passengers": [],
		"seats": [],
		"addOns": []
	});

	useEffect(() => {
		if (step === 1) {
			window.scrollTo({ top: 0, behavior: 'smooth' });
			setForm(<PassengersForm form={formData} setForm={setFormData} setStep={setStep} step={step} data={data} setPassengers={setPassengers} passengers={passengers} />);
		} else if (step === 2) {
			window.scrollTo({ top: 0, behavior: 'smooth' });
			setForm(<SeatForm data={data} form={formData} setForm={setFormData} passengers={passengers} setPassengers={setPassengers} setStep={setStep} step={step} />);
		} else if (step === 3) {
			window.scrollTo({ top: 0, behavior: 'smooth' });
			setForm(<AddOnForm data={data} passengers={passengers} setPassengers={setPassengers} setStep={setStep} step={step}/>);
		}
	}, [step]);

	return (
		<div className="flex flex-col p-4 pb-8 bg-white rounded-lg shadow-lg mb-3 w-full h-full">
			<ProgressNav setStep={setStep} step={step} />
			{form}
		</div>
	);
}

function ProgressNav({ setStep, step }) {
	return (
		<div className="w-10/12 mx-auto pb-2 border-b">
			<div className="mx-4 p-4 mb-6">
				<div className="flex items-center">
					<div className="flex items-center text-white relative">
						<div
							className="cursor-pointer rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2"
							style={{
								backgroundColor:
									step === 1
										? "rgb(48 88 210)"
										: "white",
								color:
									step === 1
										? "white"
										: step >= 1
											? "rgb(48 88 210)"
											: "grey",
								borderColor:
									step >= 1
										? "rgb(48 88 210)"
										: "rgb(209 213 219)",
							}}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="100%"
								height="100%"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="feather feather-user-plus "
							>
								<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
								<circle
									cx="8.5"
									cy="7"
									r="4"
								></circle>
								<line
									x1="20"
									y1="8"
									x2="20"
									y2="14"
								></line>
								<line
									x1="23"
									y1="11"
									x2="17"
									y2="11"
								></line>
							</svg>
						</div>
						<div
							className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase"
							style={{
								color:
									step >= 1
										? "rgb(48 88 210)"
										: "grey",
							}}
						>
							Passengers
						</div>
					</div>
					<div
						className="flex-auto border-t-2 transition duration-500 ease-in-out "
						style={{
							borderColor:
								step > 1
									? "rgb(48 88 210)"
									: "rgb(209 213 219)",
						}}
					></div>
					<div className="flex items-center text-gray-500 relative">
						<div
							className="cursor-pointer rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 "
							style={{
								backgroundColor:
									step === 2
										? "rgb(48 88 210)"
										: "white",
								color:
									step === 2
										? "white"
										: step >= 2
											? "rgb(48 88 210)"
											: "grey",
								borderColor:
									step >= 2
										? "rgb(48 88 210)"
										: "rgb(209 213 219)",
							}}
						>
							<svg version="1.1" className="-scale-x-100" fill="currentColor" width="100%" height="100%" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
								viewBox="0 0 240.235 240.235" style={{ "enableBackground": "new 0 0 240.235 240.235" }}>
								<path d="M211.744,6.089C208.081,2.163,203.03,0,197.52,0h-15.143c-11.16,0-21.811,8.942-23.74,19.934l-0.955,5.436
	c-0.96,5.47,0.332,10.651,3.639,14.589c3.307,3.938,8.186,6.106,13.74,6.106h19.561c2.714,0,5.339-0.542,7.778-1.504l-2.079,17.761
	c-2.001-0.841-4.198-1.289-6.507-1.289h-22.318c-9.561,0-18.952,7.609-20.936,16.961l-19.732,93.027l-93.099-6.69
	c-5.031-0.36-9.231,1.345-11.835,4.693c-2.439,3.136-3.152,7.343-2.009,11.847l10.824,42.618
	c2.345,9.233,12.004,16.746,21.53,16.746h78.049h1.191h39.729c9.653,0,18.336-7.811,19.354-17.411l15.272-143.981
	c0.087-0.823,0.097-1.634,0.069-2.437l5.227-44.648c0.738-1.923,1.207-3.967,1.354-6.087l0.346-4.97
	C217.214,15.205,215.407,10.016,211.744,6.089z"/>
							</svg>
						</div>
						<div
							className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase "
							style={{
								color:
									step >= 2
										? "rgb(48 88 210)"
										: "grey",
							}}
						>
							Seats
						</div>
					</div>
					<div
						className="flex-auto border-t-2 transition duration-500 ease-in-out "
						style={{
							borderColor:
								step > 2
									? "rgb(48 88 210)"
									: "rgb(209 213 219)",
						}}
					></div>
					<div className="flex items-center text-gray-500 relative">
						<div
							className="cursor-pointer rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 "
							style={{
								backgroundColor:
									step === 3
										? "rgb(48 88 210)"
										: "white",
								color:
									step === 3
										? "white"
										: step >= 3
											? "rgb(48 88 210)"
											: "grey",
								borderColor:
									step >= 3
										? "rgb(48 88 210)"
										: "rgb(209 213 219)",
							}}
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
						</div>
						<div
							className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase "
							style={{
								color:
									step >= 3
										? "rgb(48 88 210)"
										: "grey",
							}}
						>
							Add-ons
						</div>
					</div>
					<div
						className="flex-auto border-t-2 transition duration-500 ease-in-out "
						style={{
							borderColor:
								step > 3
									? "rgb(48 88 210)"
									: "rgb(209 213 219)",
						}}
					></div>
					<div className="flex items-center text-gray-500 relative">
						<div
							className="cursor-pointer rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 "
							style={{
								backgroundColor:
									step === 4
										? "rgb(48 88 210)"
										: "white",
								color:
									step === 4
										? "white"
										: step >= 4
											? "rgb(48 88 210)"
											: "grey",
								borderColor:
									step >= 4
										? "rgb(48 88 210)"
										: "rgb(209 213 219)",
							}}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="100%"
								height="100%"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="feather feather-dollar-sign "
							>
								<line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
							</svg>
						</div>
						<div
							className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase "
							style={{
								color:
									step >= 4
										? "rgb(48 88 210)"
										: "grey",
							}}
						>
							Payment
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

function TopBox({ data }) {
	const fullOutTime = new Date(data.date + " " + data.ticket.outTime);
	const duration = moment(data.ticket.arrivalTime).diff(fullOutTime, "hours") + "h " + moment(data.ticket.arrivalTime).diff(fullOutTime, "minutes") % 60 + "m";
	const [showDetail, setShowDetail] = useState(false);

	const showDetailHandler = () => {
		setShowDetail(!showDetail);
		setHeight(showDetail ? 135 : 370);
	}

	const [height, setHeight] = useState(135);

	return (
		<div  className="overflow-hidden flex flex-col justify-center border-t shadow-gray-400 text-gray-200 items-center w-full transition-height duration-1000 ease-in-out"
			style={{ "backgroundColor": "#003366" , "height": height + "px" }}
		>
			<div className="flex flex-row w-4/5">
				<label className="text-xl font-bold m-auto border px-4 py-2">Flight</label>
				<div className="flex flex-col flex-2 p-2 w-8/12">
					<div className="flex flex-row items-center justify-center p-2 ">
						<div className="flex flex-col p-2">
							<p className="text-base font-bold"><Moment format="MMM DD">{data.date}</Moment></p>
							<p className="text-lg text-yellow-400 font-bold">HKG - <Moment format="hh:mm A" date={fullOutTime} /></p>
							<p className="text-base font-bold">Hong Kong</p>
						</div>
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
							<p className="text-sm">OC110</p>
							<p className="text-xs">{data.ticket.stop > 0 ? data.ticket.stop + " stop" : "Direct" + " - " + duration}</p>
						</div>
						<div className="flex flex-col p-2">
							<p className="text-base font-bold"><Moment format="MMM DD">{data.ticket.arrivalTime}</Moment></p>
							<p className="text-lg text-yellow-400 font-bold">{data.dest} - <Moment format="hh:mm A" date={data.ticket.arrivalTime} /></p>
							<p className="text-base font-bold">{(airports.filter(d => d.code == data.dest)[0]).area.split(",")[0]}</p>
						</div>
					</div>
					{showDetail ?
						<div className="flex flex-col animate-fade-in">
							<div className="flex flex-col border-t border-white p-2 justify-between">
								<div className="flex flex-row">
									<div className="flex flex-col flex-1 pr-4 mr-4">
										<div className="flex flex-row items-center">
											<svg version="1.1" fill="currentColor" className="mr-4 my-1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
												viewBox="0 0 128 128" style={{ "enableBackground": "new 0 0 128 128", "width": "30px" }}>
												<g>
													<path d="M79.9,23.4c0-4-3.5-6.5-7.8-6.5c0,0-16.4,0-16.3,0c-4.2,0-7.8,2.5-7.8,6.5v11H32.7v76.5h62.6V34.4H79.9V23.4z M74.2,34.4
		H53.7V23.1h20.5V34.4z"/>
													<path d="M7.2,45.8c0,0.2,0,53.3,0,53.3c0,7.4,5.6,11.7,11.4,11.7H27V34.2h-8.4C12.7,34.2,7.2,39.2,7.2,45.8z" />
													<path d="M109.4,34.2H101v76.6h8.4c5.8,0,11.4-4.3,11.4-11.7c0,0,0-53.1,0-53.3C120.8,39.2,115.3,34.2,109.4,34.2z" />
												</g>
											</svg>
											<p className="text-sm grow">Baggage</p>
											<p className="text-sm font-bold ml-4">30kg</p>
										</div>
										<div className="flex flex-row items-center">
											<svg version="1.1" className="-scale-x-100 mr-4 my-1" fill="currentColor" width="30px" height="30px" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
												viewBox="0 0 240.235 240.235" style={{ "enableBackground": "new 0 0 240.235 240.235" }}>
												<path d="M211.744,6.089C208.081,2.163,203.03,0,197.52,0h-15.143c-11.16,0-21.811,8.942-23.74,19.934l-0.955,5.436
	c-0.96,5.47,0.332,10.651,3.639,14.589c3.307,3.938,8.186,6.106,13.74,6.106h19.561c2.714,0,5.339-0.542,7.778-1.504l-2.079,17.761
	c-2.001-0.841-4.198-1.289-6.507-1.289h-22.318c-9.561,0-18.952,7.609-20.936,16.961l-19.732,93.027l-93.099-6.69
	c-5.031-0.36-9.231,1.345-11.835,4.693c-2.439,3.136-3.152,7.343-2.009,11.847l10.824,42.618
	c2.345,9.233,12.004,16.746,21.53,16.746h78.049h1.191h39.729c9.653,0,18.336-7.811,19.354-17.411l15.272-143.981
	c0.087-0.823,0.097-1.634,0.069-2.437l5.227-44.648c0.738-1.923,1.207-3.967,1.354-6.087l0.346-4.97
	C217.214,15.205,215.407,10.016,211.744,6.089z"/>
											</svg>
											<p className="text-sm grow">Seat selection</p>
											<p className="text-sm ml-4 text-right text-yellow-400 font-bold w-48">Complimentary (Standard & Forward Zone Seats)</p>
										</div>
										<div className="flex flex-row items-center">
											<svg version="1.1" fill="currentColor" className="mr-4 my-1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
												viewBox="0 0 512 512" style={{ "enableBackground": "new 0 0 512 512", "width": "30px" }}>
												<g>
													<g>
														<path d="M256,204.274c-57.645,0-104.542,46.897-104.542,104.542c0,57.645,46.897,104.542,104.542,104.542
			c57.645,0,104.542-46.897,104.542-104.542C360.542,251.172,313.644,204.274,256,204.274z M291.315,368.754L256,333.438
			l-33.65,33.65l-22.165-22.165l33.65-33.65l-35.315-35.315l22.165-22.165L256,289.108l33.65-33.65l22.165,22.165l-33.65,33.65
			l35.315,35.315L291.315,368.754z"/>
													</g>
												</g>
												<g>
													<g>
														<rect x="433.633" y="23.6" width="78.367" height="72.095" />
													</g>
												</g>
												<g>
													<g>
														<rect y="23.6" width="402.286" height="72.095" />
													</g>
												</g>
												<g>
													<g>
														<path d="M0,127.042V488.4h512V127.042H0z M256,444.705c-74.93,0-135.889-60.959-135.889-135.889S181.07,172.927,256,172.927
			s135.889,60.959,135.889,135.889S330.93,444.705,256,444.705z"/>
													</g>
												</g>
											</svg>
											<p className="text-sm grow">Booking cancellation fee</p>
											<p className="text-sm font-bold ml-4">HK$ 780</p>
										</div>
										<div className="flex flex-row items-center">
											<svg xmlns="http://www.w3.org/2000/svg" className="mr-4 my-1 feather feather-refresh-ccw" width="30px" height="30px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"></polyline><polyline points="23 20 23 14 17 14"></polyline><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path></svg>
											<p className="text-sm grow">Booking change fee<br />(a fare difference may apply)</p>
											<p className="text-sm ml-4 text-right text-yellow-400 font-bold w-48">Complimentary</p>
										</div>
										<div className="flex flex-row items-center">
											<svg width="30px" height="30px" fill="currentColor" className="mr-4 my-1" viewBox="0 0 64 64" style={{ "stroke": "#000", "strokeLinecap": "round", "strokeLinejoin": "round", "strokeWidth": "2px" }} xmlns="http://www.w3.org/2000/svg"><defs>
											</defs><title /><g data-name="Layer 40" id="Layer_40"><rect height="36.11" rx="2.83" ry="2.83" width="61.63" x="1.2" y="1.14" /><polygon style={{ "fill": "white", "stroke": "black", "strokeLinecap": "round", "strokeLinejoin": "round", "strokeWidth": "2px" }} points="45.54 28.3 36.44 19.2 45.54 10.1 41.03 5.59 31.93 14.68 22.83 5.59 18.32 10.1 27.42 19.2 18.32 28.3 22.83 32.81 31.93 23.71 41.03 32.81 45.54 28.3" /><rect height="25.67" width="6.5" x="28.71" y="37.25" /></g></svg>
											<p className="text-sm grow">Not show fee</p>
											<p className="text-sm ml-4 text-right font-bold w-48">HK$ 780</p>
										</div>
									</div>
								</div>
							</div>
						</div> : null}
				</div>
				<div className="flex flex-col flex-1 pl-4 my-2 border-l">
					<div className="w-full flex justify-end items-center flex-row font-bold text-sm text-yellow-400">
						<label className="hover:underline cursor-pointer" onClick={showDetailHandler}>{showDetail ? "Hide" : "View"} details</label>
						<svg className={showDetail ? "rotate-180 feather feather-chevron-down" : "feather feather-chevron-down"} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
					</div>
					<div className="flex flex-col flex-1 justify-start">
						<p>ECONOMY</p>
						<p className="text-3xl font-bold">HK$ {data.ticket.price.toLocaleString()}</p>
						<p className="text-sm mb-4">Total price for all travelers</p>
						{showDetail ? <div className="h-auto flex flex-col animate-fade-in">
							<p className="flex flex-row"><label className="font-bold grow">Ticket (1 adult)</label> <label htmlFor="">HK$ {data.ticket.price.toLocaleString()}</label></p>
							<p className="flex flex-row"><label className="font-bold grow">Flight fare</label>	<label htmlFor="">HK$ {(data.ticket.price - 582).toLocaleString()}</label></p>
							<p className="flex flex-row"><label className="font-bold grow">Taxes and fees</label> <label htmlFor="">HK$ 582</label></p>
						</div> : null}
					</div>
				</div>
			</div>
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
