import TicketDetail from "../layout/TicketDetail";
import Nav from "../layout/Nav";
import moment from "moment";
import Moment from "react-moment";
import { HKExpress_SVG } from "../component/SVGPath";

import  jp  from "../asserts/jp.jpg";
import  uk  from "../asserts/uk.jpg";
import  kn  from "../asserts/korea.jpg";
import  tw  from "../asserts/tw.jpg";


function TicketInfo({ dest, date, ticket, setIsShowDetail, setSelectInfo , checking }) {
	const fullOutTime = new Date(date + " " + ticket.outTime);
	const duration = moment(ticket.arrivalTime).diff(fullOutTime, "hours") + "h " + moment(ticket.arrivalTime).diff(fullOutTime, "minutes") % 60 + "m";

	const ClickHandler = () => {
		setSelectInfo({ "dest": dest, "date": date, "ticket": ticket });
		setIsShowDetail(true);
	}

	return (
		<div className="flex flex-col justify-center items-center w-full">
			<div className="overflow-hidden shadow-md flex flex-row w-full mb-2 border rounded-2xl border-gray-200 bg-white">
                <img src={
                    // random image from 4 images
                    [jp, uk, kn, tw][Math.floor(Math.random() * 4)]
                } alt="" className="w-2/12 object-cover overflow-hidden mr-5" />
				<div className="flex flex-col flex-2 p-2 w-8/12">
					<div className="flex flex-row items-center justify-center p-2 ">
						<HKExpress_SVG className="w-3" />
						<div className="flex flex-col p-2">
							<p className="text-base font-bold"><Moment format="hh:mm A" date={fullOutTime} /></p>
							<p className="text-xs">HKG - <Moment format="MMM DD">{date}</Moment></p>
						</div>
						<div className="flex flex-col flex-grow p-2 items-center">
							<p className="text-xs border-b border-gray-300 w-full text-center">
								{duration}
							</p>
							<hr />
							<p className="text-xs">{ticket.stop > 0 ? ticket.stop + " stop" : "Direct"}</p>
						</div>
						<div className="flex flex-col p-2">
							<p className="text-base font-bold"><Moment format="hh:mm A" date={ticket.arrivalTime} /></p>
							<p className="text-xs">{dest} - <Moment format="MMM DD">{ticket.arrivalTime}</Moment></p>
						</div>
					</div>
					<i className="text-xs">
						{ticket.airline.map((airline, index) => (
							airline + (index < ticket.airline.length - 1 ? ", " : "")
						))}
					</i>

                    {/* ref. no */}
                    <p className="text-xs text-gray-500 mt-auto hover:underline cursor-pointer">Ref. No. {ticket.refNo}</p>
				</div>
				<div className="flex flex-col flex-1 p-4 items-end my-2 border-l">
					<p className="text-xl font-bold mb-auto mt-2">HK$ {ticket.price.toLocaleString()}</p>
					{
                        ! moment(date).isSame(moment(), "day") 
                     ? (
                        <button className="w-full shadow-md h-10 border-4 border-amber-400 rounded-sm font-bold bg-amber-400 text-gray-700 hover:border-orange-300 hover:bg-orange-300 focus:ring-4 focus:outline-none focus:ring-orange-200" onClick={ClickHandler}>
                            View Details
                        </button>
                    ): (
                        <button className="disable w-full shadow-md h-10 border-4 border-amber-400 rounded-sm font-bold bg-amber-400 text-gray-700 hover:border-orange-300 hover:bg-orange-300 focus:ring-4 focus:outline-none focus:ring-orange-200" onClick={ClickHandler}>
                            Ready On Board
                        </button>
                    )}
				</div>
			</div>
		</div>
	);
}
export default function MyTrip() {

    const bookings = []
    const dest = ["TPE", "PVG", "KIX", "SHA", "ITM"];

    for (let i = 0; i < 10; i++) {
        let date = moment().add(Math.floor(Math.random() * 10), "days").format("YYYY-MM-DD");
        bookings.push({
            "dest": dest[Math.floor(Math.random() * dest.length)],
            "date": date,
            "ticket": {
                "outTime": moment().add(Math.floor(Math.random() * 10), "hours").format("HH:mm"),
                "arrivalTime": moment(date + " " + moment().add(Math.floor(Math.random() * 10), "hours").format("HH:mm")).add(Math.floor(Math.random() * 10), "hours").format("YYYY-MM-DD HH:mm"),
                "stop": Math.floor(Math.random() * 2),
                "airline": ["HK Express"],
                "price": Math.floor(Math.random() * 3123) + 1000,
                "refNo": Math.floor(Math.random() * 1000000000) + 1000000000
            },
            "checking": [true, false][Math.floor(Math.random() * 2)]
        })
    }
    return (
        <div className="w-full h-full bg-gray-100">
            <Nav />
            <div className=" p-14">
                <div className="text-2xl font-semibold">My Bookings</div>

                <div className="flex flex-row my-5 justify-between">
                    <div className="flex flex-row ">
                        <div className="rounded-3xl bg-primary text-white p-3 mr-4 px-4">
                            Upcoming
                        </div>

                        <div className="rounded-3xl bg-white text-black p-3 px-4">
                            Past
                        </div>
                    </div>

                    <div className="w-3/12">
                        {/* search boxes */}
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg
                                    className="w-5 h-5 text-gray-500"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                                </svg>
                            </div>
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="email"
                                    id="mobile-search"
                                    className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg   pl-10 p-2.5"
                                    placeholder="Search other flights booking"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-gray-600">
                    All flights booked by you will be shown here. You can cancel
                    your booking here.
                </div>

                <ul className="my-5">
                    {
                        bookings
                        .sort((a, b) => moment(a.date) - moment(b.date))
                        .map((booking, index) => (
                            <li key={index}>
                                <TicketInfo
                                    dest={booking.dest}
                                    date={booking.date}
                                    ticket={booking.ticket}
                                />
                            </li>
                        ))
                    }
                    
                </ul>
            </div>{" "}
            {/* end of p-14 */}
        </div>
    );
}
