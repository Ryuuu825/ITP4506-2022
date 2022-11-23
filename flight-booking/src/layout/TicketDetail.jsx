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
			<div ref={detailBox} className="flex 3/5 flex-col bg-white m-auto p-4 rounded-md">
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
							<svg version="1.1" id="Layer_1" className="mr-4" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
								viewBox="0 0 512.001 512.001" style={{ "enableBackground": "new 0 0 512.001 512.001", "width": "30px" }}>
								<g>
									<g>
										<path d="M401.327,219.485l-14.728-66.726h-162.74L191.758,0L65.892,27.013l67.866,321.185h129.817v100.548
			c-26.888,5.439-49.761,23.809-60.696,49.862l30.801,12.927c5.666-13.502,16.643-23.583,29.895-28.228v28.695h33.404v-28.695
			c13.252,4.645,24.228,14.727,29.894,28.228l30.801-12.927c-10.934-26.053-33.808-44.423-60.695-49.862V348.197h149.13v-0.001
			V219.485H401.327z M237.881,219.483l-7.003-33.323h128.886l7.356,33.323H237.881z"/>
									</g>
								</g>
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
							<svg version="1.1" id="Layer_1" className="mr-4" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
								viewBox="0 0 490.429 490.429" style={{ "enableBackground": "new 0 0 490.429 490.429", "width": "30px" }}>
								<g>
									<g>
										<g>
											<path d="M136.041,415.881c-27.2,0-56.107-17.387-56.107-49.493v-241.6c0-29.547,18.773-50.24,45.653-50.24h163.2l-35.093,35.093
				c-4.267,4.053-4.373,10.88-0.213,15.04c4.053,4.267,10.88,4.373,15.04,0.213c0.107-0.107,0.213-0.213,0.213-0.213l53.333-53.333
				c4.16-4.16,4.16-10.88,0-15.04L268.734,2.975c-4.267-4.053-10.987-3.947-15.04,0.213c-3.947,4.16-3.947,10.667,0,14.827
				l35.2,35.093h-163.2c-38.933,0.107-67.093,30.187-67.093,71.68v241.6c0,39.68,34.027,70.827,77.44,70.827
				c5.867,0,10.667-4.8,10.667-10.667C146.708,420.681,141.908,415.881,136.041,415.881z"/>
											<path d="M364.628,53.215c-5.867,0-10.667,4.8-10.667,10.667c0,5.867,4.8,10.667,10.667,10.667
				c29.653,0,45.973,16.853,45.973,47.36v240.32c0,26.667-14.293,53.653-46.293,53.653H222.974l35.093-35.093
				c4.053-4.267,3.947-10.987-0.213-15.04c-4.16-3.947-10.667-3.947-14.827,0l-53.333,53.333c-4.16,4.16-4.16,10.88,0,15.04
				l53.333,53.333c4.267,4.053,10.987,3.947,15.04-0.213c3.947-4.16,3.947-10.667,0-14.827l-35.093-35.2h141.227
				c39.787,0,67.627-30.827,67.627-74.987v-240.32C431.934,79.561,406.121,53.215,364.628,53.215z"/>
										</g>
									</g>
								</g>
							</svg>
							<p className="text-sm grow">Booking change fee<br />(a fare difference may apply)</p>
							<p className="text-sm ml-4 text-right text-green-700 font-bold w-48">Complimentary</p>
						</div>
						<div className="flex flex-row items-center">
							<svg width="64px" height="64px" className="mr-4" viewBox="0 0 64 64" style={{ "fill": "black", "stroke": "#000", "strokeLinecap": "round", "strokeLinejoin": "round", "strokeWidth": "2px", "width": "30px" }} xmlns="http://www.w3.org/2000/svg"><defs>
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
							<svg version="1.1" id="Layer_1" className="mr-4" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
								viewBox="0 0 512.001 512.001" style={{ "enableBackground": "new 0 0 512.001 512.001", "width": "30px" }}>
								<g>
									<g>
										<path d="M401.327,219.485l-14.728-66.726h-162.74L191.758,0L65.892,27.013l67.866,321.185h129.817v100.548
			c-26.888,5.439-49.761,23.809-60.696,49.862l30.801,12.927c5.666-13.502,16.643-23.583,29.895-28.228v28.695h33.404v-28.695
			c13.252,4.645,24.228,14.727,29.894,28.228l30.801-12.927c-10.934-26.053-33.808-44.423-60.695-49.862V348.197h149.13v-0.001
			V219.485H401.327z M237.881,219.483l-7.003-33.323h128.886l7.356,33.323H237.881z"/>
									</g>
								</g>
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
							<svg version="1.1" id="Layer_1" className="mr-4" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
								viewBox="0 0 490.429 490.429" style={{ "enableBackground": "new 0 0 490.429 490.429", "width": "30px" }}>
								<g>
									<g>
										<g>
											<path d="M136.041,415.881c-27.2,0-56.107-17.387-56.107-49.493v-241.6c0-29.547,18.773-50.24,45.653-50.24h163.2l-35.093,35.093
				c-4.267,4.053-4.373,10.88-0.213,15.04c4.053,4.267,10.88,4.373,15.04,0.213c0.107-0.107,0.213-0.213,0.213-0.213l53.333-53.333
				c4.16-4.16,4.16-10.88,0-15.04L268.734,2.975c-4.267-4.053-10.987-3.947-15.04,0.213c-3.947,4.16-3.947,10.667,0,14.827
				l35.2,35.093h-163.2c-38.933,0.107-67.093,30.187-67.093,71.68v241.6c0,39.68,34.027,70.827,77.44,70.827
				c5.867,0,10.667-4.8,10.667-10.667C146.708,420.681,141.908,415.881,136.041,415.881z"/>
											<path d="M364.628,53.215c-5.867,0-10.667,4.8-10.667,10.667c0,5.867,4.8,10.667,10.667,10.667
				c29.653,0,45.973,16.853,45.973,47.36v240.32c0,26.667-14.293,53.653-46.293,53.653H222.974l35.093-35.093
				c4.053-4.267,3.947-10.987-0.213-15.04c-4.16-3.947-10.667-3.947-14.827,0l-53.333,53.333c-4.16,4.16-4.16,10.88,0,15.04
				l53.333,53.333c4.267,4.053,10.987,3.947,15.04-0.213c3.947-4.16,3.947-10.667,0-14.827l-35.093-35.2h141.227
				c39.787,0,67.627-30.827,67.627-74.987v-240.32C431.934,79.561,406.121,53.215,364.628,53.215z"/>
										</g>
									</g>
								</g>
							</svg>
							<p className="text-sm grow">Booking change fee<br />(a fare difference may apply)</p>
							<p className="text-sm ml-4 text-right text-green-700 font-bold w-48">Complimentary</p>
						</div>
						<div className="flex flex-row items-center">
							<svg width="64px" height="64px" className="mr-4" viewBox="0 0 64 64" style={{ "fill": "black", "stroke": "#000", "strokeLinecap": "round", "strokeLinejoin": "round", "strokeWidth": "2px", "width": "30px" }} xmlns="http://www.w3.org/2000/svg"><defs>
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