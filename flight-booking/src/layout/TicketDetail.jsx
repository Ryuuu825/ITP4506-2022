import Moment from "react-moment";
import moment from 'moment';
import { useState, useRef, useEffect } from "react";
import airports from "../db/airport.json";
import { HKExpress_SVG } from "../component/SVGPath";
import { Link, useNavigate } from "react-router-dom";

export default function TicketDetail({ selectInfo, setIsShowDetail, showDetail }) {
	const detailBox = useRef();
	const airport = airports.filter(d => d.code == selectInfo.dest)[0];
	useEffect(() => {
		// close dropdown when click outside
		const checkIfClickedOutside = e => {
			// If the menu is open and the clicked target is not within the menu,
			// then close the menu
			if (showDetail && detailBox.current && !detailBox.current.contains(e.target)) {
				setIsShowDetail(false)
			}
		}
		document.addEventListener("mousedown", checkIfClickedOutside)
		return () => {
			// Cleanup the event listener
			document.removeEventListener("mousedown", checkIfClickedOutside)
		}
	}, [setIsShowDetail])

	return (
		<div className="flex w-full h-full p-8 justify-center items-center z-50 overflow-auto">
			<div ref={detailBox} className="flex flex-col bg-white m-auto p-4 rounded-md">
				<div className="py-4 flex border-b">
					<label className="text-2xl font-bold flex-1">Your flight to {(airport.area).split(",")[0]}</label>
					<button onClick={() => setIsShowDetail(false)}>
						<svg width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g data-name="Layer 2"><g data-name="close"><rect width="24" height="24" transform="rotate(180 12 12)" opacity="0" /><path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z" /></g></g></svg>
					</button>
				</div>
				<FlightDetail selectInfo={selectInfo} airport={airport} />
				<div className="mx-4">
					<label className="text-xl font-bold">Fare</label><br />
					<EconomyBox selectInfo={selectInfo} />
					<br />
					<PreEconomyBox selectInfo={selectInfo} />
					<br />
				</div>
			</div>
		</div>
	);
}


function FlightDetail({ selectInfo, airport }) {
	const fullOutTime = new Date(selectInfo.date + " " + selectInfo.ticket.outTime);
	const duration = moment(selectInfo.ticket.arrivalTime).diff(fullOutTime, "hours") + "h " + moment(selectInfo.ticket.arrivalTime).diff(fullOutTime, "minutes") % 60 + "m";
	return (
		<div className="m-4 border-b">
			<label className="text-xl font-bold">Flight to {(airport.area).split(",")[0]}</label><br />
			<label className="text-gray-500 text-sm">{selectInfo.ticket.stop == 0 ? "Direct " : selectInfo.ticket.stop + " stop"}</label>·<label className="text-gray-500 text-sm">{" " + duration}</label>
			<div className="flex flex-row py-2">
				<div className="flex flex-col flex-1 py-2">
					<div className="flex flex-row py-2">
						<div className="flex flex-col items-center mr-2">
							<div className="rounded-full border-2 border-gray-700 w-5 h-5"></div>
							<div className="mt-2 border bg-gray-500 border-gray-500 h-8"></div>
						</div>
						<div className="flex flex-col">
							<p className="text-sm leading-none"><Moment format="MMM DD">{selectInfo.date}</Moment> · <Moment format="hh:mm A" date={fullOutTime} /></p>
							<p className="text-base font-bold">HKG · Hong Kong Airlines</p>
						</div>
					</div>
					<div className="flex flex-row">
						<div className="flex flex-col items-center mr-2">
							<div className="rounded-full border-2 border-gray-700 w-5 h-5"></div>
						</div>
						<div className="flex flex-col">
							<p className="text-sm leading-none"><Moment format="MMM DD">{selectInfo.ticket.arrivalTime}</Moment> · <Moment format="hh:mm A" date={selectInfo.ticket.arrivalTime} /></p>
							<p className="text-base font-bold">{selectInfo.dest + " · " + airport.airport}</p>
						</div>
					</div>
				</div>

				<div className="flex flex-1 flex-row justify-center">
					<HKExpress_SVG className="w-3" />
					<div className="flex flex-col ml-2">
						<p>Hong Kong Express</p>
						<p>Flight No.:&nbsp;<label className="underline">UO110</label></p>
						<p>Flight Time:&nbsp;<label className="underline">{duration}</label></p>
					</div>
				</div>
			</div>
		</div>
	);
}

export function EconomyBox({ selectInfo }) {
	const navigate = useNavigate();
	const toTranscationHandler = () => {
		navigate("/transcation", { state: { selectInfo: selectInfo } });
	}
	return (
		<div className="flex flex-col">
			<label className="text-base font-bold p-3 text-white bg-green-800">ECONOMY FLEXI FARE CONDITIONS</label>
			<div className="flex flex-col border-2 border-green-800 p-2 justify-between">
				<div className="flex flex-row py-4">
					<div className="flex flex-col flex-1 pr-4 mr-4 border-r">
						<div className="flex flex-row items-center">
							<svg version="1.1" className="mr-4" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
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
							<svg version="1.1" className="-scale-x-100 mr-4" fill="currentColor" width="30px" height="30px" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
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
							<p className="text-sm ml-4 text-right text-green-700 font-bold w-48">Complimentary (Standard & Forward Zone Seats)</p>
						</div>
					</div>
					<div className="flex flex-col flex-1  pr-4 mr-4 border-r">
						<div className="flex flex-row items-center">
							<svg version="1.1" className="mr-4" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
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

							<svg xmlns="http://www.w3.org/2000/svg" className="mr-4 feather feather-refresh-ccw" width="40px" height="30px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"></polyline><polyline points="23 20 23 14 17 14"></polyline><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path></svg>
							<p className="text-sm grow">Booking change fee<br />(a fare difference may apply)</p>
							<p className="text-sm ml-4 text-right text-green-700 font-bold w-48">Complimentary</p>
						</div>
						<div className="flex flex-row items-center">
							<svg width="30px" height="30px" className="mr-4" viewBox="0 0 64 64" style={{ "fill": "black", "stroke": "#000", "strokeLinecap": "round", "strokeLinejoin": "round", "strokeWidth": "2px", "width": "30px" }} xmlns="http://www.w3.org/2000/svg"><defs>
							</defs><title /><g data-name="Layer 40" id="Layer_40"><rect height="36.11" rx="2.83" ry="2.83" width="61.63" x="1.2" y="1.14" /><polygon style={{ "fill": "white", "stroke": "black", "strokeLinecap": "round", "strokeLinejoin": "round", "strokeWidth": "2px" }} points="45.54 28.3 36.44 19.2 45.54 10.1 41.03 5.59 31.93 14.68 22.83 5.59 18.32 10.1 27.42 19.2 18.32 28.3 22.83 32.81 31.93 23.71 41.03 32.81 45.54 28.3" /><rect height="25.67" width="6.5" x="28.71" y="37.25" /></g></svg>
							<p className="text-sm grow">Not show fee</p>
							<p className="text-sm ml-4 text-right font-bold w-48">HK$ 780</p>
						</div>
					</div>
					<div className="flex flex-1 flex-col">
						<p className="text-base ">Per Adult</p>
						<p className="text-2xl my-4 font-bold mx-auto">HK$ {selectInfo.ticket.price.toLocaleString()}</p>
						<button onClick={toTranscationHandler} className="w-full shadow-lg h-12 border-2 text-green-800 border-green-800 rounded-sm font-bold text-gray-700 hover:text-white hover:border-green-800 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-500">SELECT</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export function PreEconomyBox({ selectInfo }) {
	const navigate = useNavigate();
	const toTranscationHandler = () => {
		navigate('/transcation', { state: { selectInfo: selectInfo } });
	};

	return (
		<div className="flex flex-col">
			<label className="text-base font-bold p-3 text-white bg-gray-800">PREMIUM ECONOMY FLEXI FARE CONDITIONS</label>
			<div className="flex flex-col border-2 border-gray-800 p-2 justify-between">
				<div className="flex flex-row py-4">
					<div className="flex flex-col flex-1 pr-4 mr-4 border-r">
						<div className="flex flex-row items-center">
							<svg version="1.1" className="mr-4" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
								viewBox="0 0 128 128" style={{ "enableBackground": "new 0 0 128 128", "width": "30px" }}>
								<g>
									<path d="M79.9,23.4c0-4-3.5-6.5-7.8-6.5c0,0-16.4,0-16.3,0c-4.2,0-7.8,2.5-7.8,6.5v11H32.7v76.5h62.6V34.4H79.9V23.4z M74.2,34.4
		H53.7V23.1h20.5V34.4z"/>
									<path d="M7.2,45.8c0,0.2,0,53.3,0,53.3c0,7.4,5.6,11.7,11.4,11.7H27V34.2h-8.4C12.7,34.2,7.2,39.2,7.2,45.8z" />
									<path d="M109.4,34.2H101v76.6h8.4c5.8,0,11.4-4.3,11.4-11.7c0,0,0-53.1,0-53.3C120.8,39.2,115.3,34.2,109.4,34.2z" />
								</g>
							</svg>
							<p className="text-sm grow">Baggage</p>
							<p className="text-sm font-bold ml-4">35kg</p>
						</div>
						<div className="flex flex-row items-center">
							<svg version="1.1" className="-scale-x-100 mr-4" fill="currentColor" width="30px" height="30px" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
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
							<p className="text-sm ml-4 text-right text-green-800 font-bold w-48">Complimentary (Standard & Forward Zone Seats)</p>
						</div>
					</div>
					<div className="flex flex-col flex-1  pr-4 mr-4 border-r">
						<div className="flex flex-row items-center">
							<svg version="1.1" className="mr-4" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
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

							<svg xmlns="http://www.w3.org/2000/svg" className="mr-4 feather feather-refresh-ccw" width="40px" height="30px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"></polyline><polyline points="23 20 23 14 17 14"></polyline><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path></svg>
							<p className="text-sm grow">Booking change fee<br />(a fare difference may apply)</p>
							<p className="text-sm ml-4 text-right text-green-700 font-bold w-48">Complimentary</p>
						</div>
						<div className="flex flex-row items-center">
							<svg width="30px" height="30px" className="mr-4" viewBox="0 0 64 64" style={{ "fill": "black", "stroke": "#000", "strokeLinecap": "round", "strokeLinejoin": "round", "strokeWidth": "2px" }} xmlns="http://www.w3.org/2000/svg"><defs>
							</defs><title /><g data-name="Layer 40" id="Layer_40"><rect height="36.11" rx="2.83" ry="2.83" width="61.63" x="1.2" y="1.14" /><polygon style={{ "fill": "white", "stroke": "black", "strokeLinecap": "round", "strokeLinejoin": "round", "strokeWidth": "2px" }} points="45.54 28.3 36.44 19.2 45.54 10.1 41.03 5.59 31.93 14.68 22.83 5.59 18.32 10.1 27.42 19.2 18.32 28.3 22.83 32.81 31.93 23.71 41.03 32.81 45.54 28.3" /><rect height="25.67" width="6.5" x="28.71" y="37.25" /></g></svg>
							<p className="text-sm grow">Not show fee</p>
							<p className="text-sm ml-4 text-right font-bold w-48">HK$ 1340</p>
						</div>
					</div>
					<div className="flex flex-1 flex-col">
						<p className="text-base ">Per Adult</p>
						<p className="text-xs">Only for Adult Travellers</p>
						<p className="text-2xl my-4 font-bold mx-auto">HK$ {(selectInfo.ticket.price * 1.7).toLocaleString()}</p>
						<button onClick={toTranscationHandler} className="w-full shadow-lg h-12 border-2 text-gray-800 border-gray-800 rounded-sm font-bold text-gray-800 hover:text-white hover:border-gray-800 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-500">SELECT</button>
					</div>
				</div>
			</div>
		</div>
	);
}