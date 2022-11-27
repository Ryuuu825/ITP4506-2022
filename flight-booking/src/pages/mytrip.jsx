import TicketDetail from "../layout/TicketDetail";
import Nav from "../layout/Nav";
import moment from "moment";
import Moment from "react-moment";
import { HKExpress_SVG } from "../component/SVGPath";

import jp from "../asserts/jp.jpg";
import uk from "../asserts/uk.jpg";
import kn from "../asserts/korea.jpg";
import tw from "../asserts/tw.jpg";
import mc from "../asserts/mc.png";

import "../styles/Button.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect } from "react";
import { useState } from "react";
import { Info } from "../component/feedback";
import airports from "../db/airport.json";
import { Link } from "react-router-dom";

function TicketInfo({
    dest,
    date,
    ticket,
    setIsShowDetail,
    setSelectInfo,
    checking,
}) {
    const fullOutTime = new Date(date + " " + ticket.outTime);
    const duration =
        moment(ticket.arrivalTime).diff(fullOutTime, "hours") +
        "h " +
        (moment(ticket.arrivalTime).diff(fullOutTime, "minutes") % 60) +
        "m";

    const ClickHandler = () => {
        setSelectInfo({ dest: dest, date: date, ticket: ticket });
        setIsShowDetail(true);
    };

    return (
        <div className="flex flex-col justify-center items-center w-full my-2">
            <div className="overflow-hidden shadow-md flex flex-row w-full mb-2 border rounded-2xl border-gray-200 bg-white h-[11rem]">
                <img
                    src={
                        // random image from 4 images
                        [jp, uk, kn, tw][Math.floor(Math.random() * 4)]
                    }
                    alt=""
                    className="w-2/12 object-cover overflow-hidden mr-5"
                />
                <div className="flex flex-col flex-2 p-2 w-8/12">
                    <div className="flex flex-row items-center justify-center p-2 ">
                        <HKExpress_SVG className="w-3" />
                        <div className="flex flex-col p-2">
                            <p className="text-base font-bold">
                                <Moment format="hh:mm A" date={fullOutTime} />
                            </p>
                            <p className="text-xs">
                                HKG - <Moment format="MMM DD">{date}</Moment>
                            </p>
                        </div>
                        <div className="flex flex-col flex-grow p-2 items-center">
                            <p className="text-xs border-b border-gray-300 w-full text-center">
                                {duration}
                            </p>
                            <hr />
                            <p className="text-xs">
                                {ticket.stop > 0
                                    ? ticket.stop + " stop"
                                    : "Direct"}
                            </p>
                        </div>
                        <div className="flex flex-col p-2">
                            <p className="text-base font-bold">
                                <Moment
                                    format="hh:mm A"
                                    date={ticket.arrivalTime}
                                />
                            </p>
                            <p className="text-xs">
                                {dest} -{" "}
                                <Moment format="MMM DD">
                                    {ticket.arrivalTime}
                                </Moment>
                            </p>
                        </div>
                    </div>
                    <i className="text-xs">
                        {ticket.airline.map(
                            (airline, index) =>
                                airline +
                                (index < ticket.airline.length - 1 ? ", " : "")
                        )}
                    </i>

                    {/* ref. no */}
                    <p className="text-xs text-gray-500 mt-auto hover:underline cursor-pointer">
                        Ref. No. {ticket.refNo}
                    </p>
                </div>
                <div className="flex flex-col flex-1 p-4 items-end my-2 border-l">
                    <p className="text-xl font-bold mb-auto mt-2">
                        HK$ {ticket.price.toLocaleString()}
                    </p>
                    {!moment(date).isSame(moment(), "day") ? (
                        <Link
                            className="w-full text-center flex justify-center items-center shadow-md h-10 border-4 border-amber-400 rounded-sm font-bold bg-amber-400 text-gray-700 hover:border-orange-300 hover:bg-orange-300 focus:ring-4 focus:outline-none focus:ring-orange-200"
                            onClick={ClickHandler}
                            to="/my/trip/details"
                        >
                            <div>
                                View Details
                            </div>
                        </Link>
                    ) : (
                        <button
                            className="disable w-full shadow-md h-10 border-4 border-amber-400 rounded-sm font-bold bg-amber-400 text-gray-700 hover:border-orange-300 hover:bg-orange-300 focus:ring-4 focus:outline-none focus:ring-orange-200"
                            onClick={ClickHandler}
                        >
                            Ready On Board
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
export default function MyTrip() {
    const bookings = [];
    const dest = ["TPE", "PVG", "KIX", "SHA", "ITM"];
    const [show, setShow] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShow(true);
        }, 2500);
    }, []);

    for (let i = 0; i < 10; i++) {
        let date = moment()
            .add(Math.floor(Math.random() * 10), "days")
            .format("YYYY-MM-DD");
        let outTime = moment()
            .add(Math.floor(Math.random() * 10), "hours")
            .format("HH:mm");
        bookings.push({
            dest: dest[Math.floor(Math.random() * dest.length)],
            date: date,
            ticket: {
                outTime: outTime,
                arrivalTime: moment(date + " " + outTime)
                    .add(Math.floor(Math.random() * 10 + 2), "hours")
                    .add(Math.floor(Math.random() * 60), "minutes")
                    .format("YYYY-MM-DD HH:mm"),
                stop: Math.floor(Math.random() * 2),
                airline: ["HK Express"],
                price: Math.floor(Math.random() * 3123) + 1000,
                refNo: Math.floor(Math.random() * 1000000000) + 1000000000,
            },
            checking: [true, false][Math.floor(Math.random() * 2)],
        });
    }

    return (
        <div className="w-full h-full bg-gray-100">
            <Nav />
            <div className=" p-14">
                <div className="text-2xl font-semibold">My Bookings</div>

                <div className="flex flex-row my-5 justify-between">
                    <div className="flex flex-row ">
                        <div className=" btn cursor-pointer rounded-3xl bg-primary text-white p-3 mr-4 px-4">
                            Upcoming
                        </div>

                        <div className="hover:bg-gray-400 hover:text-white cursor-pointer rounded-3xl bg-white text-black p-3 px-4 btn ">
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
                    {show ? (
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
                    ) : (
                        <Skeleton count={10} height={160} className="my-3" />
                    )}
                </ul>
            </div>{" "}
            {/* end of p-14 */}
        </div>
    );
}

export function BookingDetails() {
    const dest = ["TPE", "PVG", "KIX", "SHA", "ITM"];
    let date = moment()
        .add(Math.floor(Math.random() * 10), "days")
        .format("YYYY-MM-DD");
    let outTime = moment()
        .add(Math.floor(Math.random() * 10), "hours")
        .format("HH:mm");
    const data = {
        dest: dest[Math.floor(Math.random() * dest.length)],
        date: date,
        ticket: {
            outTime: outTime,
            arrivalTime: moment(date + " " + outTime)
                .add(Math.floor(Math.random() * 10 + 2), "hours")
                .add(Math.floor(Math.random() * 60), "minutes")
                .format("YYYY-MM-DD HH:mm"),
            stop: Math.floor(Math.random() * 2),
            airline: ["HK Express"],
            price: Math.floor(Math.random() * 3123) + 1000,
            refNo: Math.floor(Math.random() * 1000000000) + 1000000000,
        },
        checking: [true, false][Math.floor(Math.random() * 2)],
    };
    const fullOutTime = new Date(data.date + " " + data.ticket.outTime);
    const duration =
        moment(data.ticket.arrivalTime).diff(fullOutTime, "hours") +
        "h " +
        (moment(data.ticket.arrivalTime).diff(fullOutTime, "minutes") % 60) +
        "m";

    const PassengerInfo = ({ id, name, sex, dob, contact }) => {
        const isInfant = moment().diff(dob, "years") < 2;
        const isChild = moment().diff(dob, "years") < 12;

        return (
            <div>
                <div className="flex flex-row items-center justify-between my-3">
                    <div className="flex flex-row items-center">
                        <div className="px-2 py-0.5 mr-3 bg-gray-100">{id}</div>
                        <div className="flex flex-col justify-start">
                            <p className="text-base font-bold">{name}</p>
                            <p className="text-sm text-gray-500">
                                {sex}
                                {
                                    // Date of Birth: 01/01/"
                                    isInfant || isChild
                                        ? " , Date of Birth: " +
                                          moment(dob).format("DD/MM/YYYY")
                                        : ""
                                }
                            </p>
                        </div>
                    </div>
                    <div className="px-9 py-0.5 bg-gray-200">
                        <p className="text-sm text-gray-500">
                            {isInfant ? "Infant" : isChild ? "Child" : "Adult"}
                        </p>
                    </div>
                </div>
                <div className="flex flex-row items-center border-b pl-10 text-sm text-gray-600 ">
                    <div className="  ">
                        <div>
                            Seat :
                            <span className="text-primary ml-2 my-0.5 font-semibold hover:underline cursor-pointer">
                                10
                                {
                                    // id: 1 A, id: 2 B, id: 3 C, id: 4 D, id: 5 E, id: 6 F, id: 7 G, id: 8 H, id: 9 J, id: 10 K
                                    [
                                        "A",
                                        "B",
                                        "C",
                                        "D",
                                        "E",
                                        "F",
                                        "G",
                                        "H",
                                        "J",
                                        "K",
                                    ][id - 1]
                                }
                            </span>
                        </div>
                    </div>
                    <div className="mx-3">
                        Meal:
                        <span className="text-black ml-2 font-semibold hover:underline cursor-pointer">
                            {
                                [
                                    "Hong Kong-style seafood curry rice",
                                    "Hong Kong-style roast pork rice",
                                    ,
                                    "No meal",
                                    "Vegetarian meal",
                                ][Math.floor(Math.random() * 4)]
                            }
                        </span>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="w-full h-full bg-gray-100">
            <Nav />
            <div className="p-14 pl-24">
                <div className="text-3xl font-bold pb-4 border-b border-gray-500">
                    Booking Details
                </div>
                <div className=" mt-4 flex flex-row justify-between align-middle items-center">
                    <div className="text-lg">
                        Reference Number:{" "}
                        <span className="text-primary hover:underline cursor-pointer">
                            1234567890
                        </span>
                    </div>
                    <div className="text-gray-500">
                        <span className="text-gray-500 hover:underline cursor-pointer">
                            Print e-ticket (PDF)
                        </span>{" "}
                    </div>
                </div>

                <div className="mt-3 ">
                    <Info
                        message={
                            "Please note that the booking reference number is required for all enquiries and changes to your booking."
                        }
                        dismissable
                    />
                </div>

                <div className="mt-3 text-base flex flex-row justify-between">
                    <div>Flights:</div>

                    <div className="flex flex-row">
                        <div className="hover:text-black cursor-pointer flex flex-row text-gray-400">
                            <svg
                                class="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M5 13l4 4L19 7"
                                ></path>
                            </svg>
                            Confirm Flight
                        </div>
                        <div className="hover:text-black cursor-pointer ml-4 flex flex-row text-gray-400">
                            <svg
                                class="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                ></path>
                            </svg>
                            Change Flight
                        </div>
                        <div className="hover:text-red-500 cursor-pointer ml-4 text-red-800 flex flex-row">
                            <svg
                                class="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"
                                ></path>
                            </svg>
                            Cancel Flight
                        </div>
                    </div>
                </div>

                <div className="mt-5 flex flex-row justify-between">
                    <div className="w-9/12 mr-5 mb-5">
                        <div className="flex flex-row w-full bg-gray-100">
                            <div className="flex bg-white flex-col flex-2 p-2 w-full">
                                <div className="flex flex-row items-center justify-center p-2 ">
                                    <div className="flex flex-col p-2">
                                        <p className="text-base font-bold">
                                            <Moment format="MMM DD">
                                                {data.date}
                                            </Moment>
                                        </p>
                                        <p className="text-lg text-yellow-400 font-bold">
                                            HKG -{" "}
                                            <Moment
                                                format="hh:mm A"
                                                date={fullOutTime}
                                            />
                                        </p>
                                        <p className="text-base font-bold">
                                            Hong Kong
                                        </p>
                                    </div>
                                    <hr className="my-6 sm:mx-auto border-gray-700 lg:my-8" />
                                    <div className="flex flex-col flex-grow p-2 items-center">
                                        <svg
                                            width="50px"
                                            height="50px"
                                            viewBox="0 0 72 72"
                                            id="emoji"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g id="color">
                                                <polyline
                                                    fill="#9b9b9a"
                                                    stroke="none"
                                                    points="24,39.7539 8.1194,34.5078 3.6819,35.8828 14.0221,45.2348"
                                                />
                                                <path
                                                    fill="#d0cfce"
                                                    stroke="none"
                                                    d="M42.5887,30.7725l13.6352-4.637c0,0,13.4999-0.2289,10.3294,3.2551 c-3.1706,3.484-25.4249,12.196-32.0018,14.6509c-6.5769,2.455-14.7118,3.7502-20.337,3.8592 c-4.9236,0.0953,0.5896-2.8912,0.5896-2.8912s6.2557-3.55,9.0249-4.7568l2.6347-1.9489"
                                                />
                                                <polyline
                                                    fill="#9b9b9a"
                                                    stroke="none"
                                                    points="47.0508,35.4288 22.4454,32.6408 20.3515,34.1342 37.7611,40.3461"
                                                />
                                                <path
                                                    fill="#9b9b9a"
                                                    stroke="none"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeMiterlimit="10"
                                                    strokeWidth="1.5597"
                                                    d="M21.3658,40.2489"
                                                />
                                                <path
                                                    fill="#9b9b9a"
                                                    stroke="none"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeMiterlimit="10"
                                                    strokeWidth="1.5597"
                                                    d="M14.0356,44.2409"
                                                />
                                            </g>
                                            <g id="hair" />
                                            <g id="skin" />
                                            <g id="skin-shadow" />
                                            <g id="line">
                                                <polyline
                                                    fill="none"
                                                    stroke="#000000"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeMiterlimit="10"
                                                    strokeWidth="1.5597"
                                                    points="19.9738,39.1394 7.5418,34.7361 4.4746,35.8087 12.6436,43.1314"
                                                />
                                                <path
                                                    fill="none"
                                                    stroke="#000000"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeMiterlimit="10"
                                                    strokeWidth="1.5597"
                                                    d="M26.6131,39.0394"
                                                />
                                                <path
                                                    fill="none"
                                                    stroke="#000000"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeMiterlimit="10"
                                                    strokeWidth="1.5597"
                                                    d="M21.3658,40.2489"
                                                />
                                                <path
                                                    fill="none"
                                                    stroke="#000000"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeMiterlimit="10"
                                                    strokeWidth="1.5597"
                                                    d="M14.0356,44.2409"
                                                />
                                                <polyline
                                                    fill="none"
                                                    stroke="#000000"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeMiterlimit="10"
                                                    strokeWidth="1.5597"
                                                    points="47.0508,34.6931 22.4454,32.6408 20.3515,34.1342 37.1065,40.1126"
                                                />
                                                <path
                                                    fill="none"
                                                    stroke="#000000"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeMiterlimit="10"
                                                    strokeWidth="1.5597"
                                                    d="M43.174,31.3231l11.1493-4.4864c1.3266-0.5338,2.7434-0.7839,4.1727-0.74c3.6995,0.1136,10.3898,0.6672,8.0573,3.2304 c-3.1706,3.4839-25.4249,12.196-32.0018,14.6509s-14.7118,3.7502-20.337,3.8591c-4.9236,0.0953,0.5896-2.8912,0.5896-2.8912 s6.2557-3.55,9.0249-4.7568l2.7841-1.2132"
                                                />
                                            </g>
                                        </svg>
                                        <p className="text-sm w-full text-center border-t-2 border-blue-800 pt-2">
                                            OC110
                                        </p>
                                        <p className="text-xs">
                                            {data.ticket.stop > 0
                                                ? data.ticket.stop + " stop"
                                                : "Direct" + " - " + duration}
                                        </p>
                                    </div>
                                    <div className="flex flex-col p-2">
                                        <p className="text-base font-bold">
                                            <Moment format="MMM DD">
                                                {data.ticket.arrivalTime}
                                            </Moment>
                                        </p>
                                        <p className="text-lg text-yellow-400 font-bold">
                                            {data.dest} -{" "}
                                            <Moment
                                                format="hh:mm A"
                                                date={data.ticket.arrivalTime}
                                            />
                                        </p>
                                        <p className="text-base font-bold">
                                            {
                                                airports
                                                    .filter(
                                                        (d) =>
                                                            d.code == data.dest
                                                    )[0]
                                                    .area.split(",")[0]
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white my-5">
                            {/* passenger info */}
                            <div className="flex flex-col p-4">
                                <div className="mb-3">
                                    <p className="text-lg font-bold">
                                        Passengers Info
                                    </p>
                                </div>

                                <div className="flex flex-col ">
                                    {[
                                        {
                                            name: "Mr. Lai",
                                            sex: "Male",
                                            DOB: moment("20010320", "YYYYMMDD"),
                                        },
                                        {
                                            name: "Miss. Tse",
                                            sex: "Female",
                                            // DOB: "04/06/1970",
                                            DOB: moment("19700604", "YYYYMMDD"),
                                        },
                                        {
                                            name: "May",
                                            sex: "Female",
                                            DOB: moment().subtract(1, "year"),
                                        },
                                        {
                                            name: "Eva",
                                            sex: "Female",
                                            DOB: moment().subtract(11, "year"),
                                        },
                                    ].map((d, i) => {
                                        return (
                                            <PassengerInfo
                                                key={i}
                                                id={i + 1}
                                                name={d.name}
                                                sex={d.sex}
                                                dob={d.DOB}
                                                contact={
                                                    d.contact ? d.contact : null
                                                }
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white my-5">
                            {/* contact info */}
                            <div className="flex flex-col p-4">
                                <div className="mb-3">
                                    <p className="text-lg font-bold">
                                        Contact Info
                                    </p>
                                </div>

                                <div className="flex flex-row flex-wrap ">
                                    <div className="w-5/12 mx-2 flex flex-col mb-3">
                                        <label
                                            className="text-sm font-bold"
                                            htmlFor="email"
                                        >
                                            Contact Name
                                        </label>

                                        <input
                                            className="bg-gray-100 border-2 border-gray-300 p-2 rounded-md"
                                            name="email"
                                            value={"Lai Jai Ming"}
                                            disabled
                                        />
                                    </div>
                                    <div className="w-6/12 mx-2 flex flex-col mb-3">
                                        <label
                                            className="text-sm font-bold"
                                            htmlFor="email"
                                        >
                                            Mobile Phone
                                        </label>
                                        <div className="flex flex-row">
                                            <select
                                                className="bg-gray-100 mr-1 border-2 w-3/12 inline-block border-gray-300 p-2 rounded-md"
                                                name="email"
                                                value={"852"}
                                                disabled
                                            >
                                                <option value="852">852</option>
                                            </select>
                                            <input
                                                className="bg-gray-100 border-2 w-7/12 border-gray-300 p-2 rounded-md"
                                                name="email"
                                                value={"210123456@stu.ive.edu.hk"}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="w-5/12 mx-2 flex flex-col mb-3">
                                        <label
                                            className="text-sm font-bold"
                                            htmlFor="email"
                                        >
                                            Email
                                        </label>
                                        <input
                                            className="bg-gray-100 border-2 border-gray-300 p-2 rounded-md"
                                            name="email"
                                            value={"210123456@stu.ive.edu.hk"}
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white my-5">
                            {/* baggage */}
                            <div className="flex flex-col p-4">
                                <div className="mb-3">
                                    <p className="text-lg font-bold">
                                        Baggage
                                    </p>
                                </div>
                                <p>
                                    You are allowed to carry{" "}
                                    <span className="font-bold">2</span> pieces
                                    of baggage with a maximum weight of{" "}
                                    <span className="font-bold">{
                                        [30, 35, 40, 50]
                                        [Math.random() * 4 | 0]
                                    }
                                    kg</span> per
                                    piece.
                                </p>
                                {/* ask if user want to buy more */}
                                <div className="text-gray-500 mt-3">
                                    Want to buy more baggage?{" "}
                                    <span className="text-primary cursor-pointer font-bold">
                                        Click here
                                    </span>
                                </div>
                                    
                            </div>

                        </div>

                        <div className="bg-white my-5">
                            {/* payment */}
                            <div className="flex flex-col p-4">
                                <div className="mb-3">
                                    <p className="text-lg font-bold">
                                        Payment
                                    </p>
                                </div>
                                <div className="w-full">
                                     <table className="w-full border ">
                                        <thead className="bg-gray-50">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="p-4 text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Date
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="p-4 text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                       Amount
                                                    </th>
                                                    <th

                                                        scope="col"
                                                        className="p-4 text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Card Number
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="w-full text-center">
                                                <tr className="hover:bg-gray-100">
                                                    <td className="p-3">12/09/2022</td>
                                                    <td className="p-3">HKD 40,000</td>
                                                    <td className="p-3">
                                                        <div className="flex flex-row justify-center items-center">
                                                            <img src={mc} alt="" className="mr-2" />
                                                            <span>
                                                            1234 5678 **** ****
                                                            </span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                     </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-[28%]">
                        <div className="flex flex-col border bg-white pl-5 p-3 h-fit">
                            {/* price */}

                            <div className="text-xl flex flex-row justify-between mb-10">
                                Total Price:
                                <div className="text-primary">HKD 40,000</div>
                            </div>

                            {/* Total paid */}
                            <div className="text-sm flex flex-row justify-between text-black">
                                Total Paid:
                                <div className="text-primary">HKD 40,000</div>
                            </div>

                            {/*
                            Flight fare
                            HK$ 5,348

                            Taxes and fees
                            HK$ 1164

                            Add-ons fare
                            HK$ 100
                        */}

                            <div className="text-sm flex flex-row justify-between text-gray-500">
                                Flight fare:
                                <div className="text-gray-500">HK$ 5,348</div>
                            </div>

                            <div className="text-sm flex flex-row justify-between text-gray-500">
                                Taxes and fees:
                                <div className="text-gray-500">HK$ 1164</div>
                            </div>

                            <div className="text-sm flex flex-row justify-between text-gray-500">
                                Add-ons fare:
                                <div className="text-gray-500">HK$ 100</div>
                            </div>

                            <div className="mb-10 mt-10 border"></div>

                            {/* some policy */}

                            <div className="text-sm flex flex-col text-gray-500 pl-5">
                                <div className="w-full">
                                    <div
                                        className="
                                    w-1.5 h-1.5 rounded-full bg-gray-500 mr-2 inline-block mb-0.5
                                "
                                    ></div>
                                    IVE Airline does not charge any additional
                                    fees.
                                </div>

                                <div className="items-center w-full">
                                    <div
                                        className="
                                    mt-3 w-1.5 h-1.5 rounded-full bg-gray-500 mr-2 inline-block mb-0.5
                                "
                                    ></div>
                                    Due to the current situation, the flight may
                                    be delayed or cancelled. And the flight fare
                                    will be refunded.
                                </div>
                            </div>

                            <div className="my-5"></div>
                        </div>

                        <div className="bg-white my-5">
                            {/* support */}
                            <div className="flex flex-col p-4">
                                <div className="mb-3">
                                    <p className="text-lg font-bold">
                                        Need Help?
                                    </p>
                                </div>

                                <div className="flex flex-col ">
                                    <div className="flex flex-row items-center">
                                        <div className="w-8 h-8 rounded-full bg-gray-500 mr-2">
                                            <svg
                                                class="w-5 h-5 mx-auto mt-1.5 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                ></path>
                                            </svg>
                                        </div>
                                        <div className="text-sm">
                                            <p className="font-bold">
                                                Customer Service
                                            </p>
                                            <p className="text-gray-500">
                                                24/7 support
                                            </p>

                                            <p className="text-gray-500">
                                                +852 1234 5678
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
