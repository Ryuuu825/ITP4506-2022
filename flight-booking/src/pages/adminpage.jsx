import { Chart as ChartJS, registerables } from "chart.js";
import { Chart, Line } from "react-chartjs-2";
import { useApp } from "../hook/Main";
import {
    DropDown,
    DropDownItemDivider,
    DropDownList,
    DropDownListItem,
} from "../component/DropDown";

import logo from "../logo.svg";
import React, { useState } from "react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FloatingLabel } from "../component/Form";
import { Button } from "flowbite-react";

import { Modal } from "flowbite-react";

let SidebarCurrentPos = 0;

function Sidebar() {
    return (
        <aside
            id="sidebar"
            className="fixed z-10 h-max top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75"
            aria-label="Sidebar"
        >
            <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
                <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                    <div className="flex-1 px-3 bg-white divide-y space-y-1">
                        <ul className="space-y-2 pb-2">
                            <li>
                                <form
                                    action="#"
                                    method="GET"
                                    className="lg:hidden"
                                >
                                    <label
                                        for="mobile-search"
                                        className="sr-only"
                                    >
                                        Search
                                    </label>
                                    <div className="relative">
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
                                        <input
                                            type="text"
                                            name="email"
                                            id="mobile-search"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-600 focus:ring-cyan-600 block w-full pl-10 p-2.5"
                                            placeholder="Search"
                                        />
                                    </div>
                                </form>
                            </li>
                            <li>
                                <Link
                                    to="/admin"
                                    className="cursor-pointer text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group"
                                >
                                    <svg
                                        className="w-6 h-6  text-gray-500 group-hover:text-gray-900 transition duration-75"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                                        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                                    </svg>
                                    <span className="ml-3 select-none">
                                        Dashboard
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <a className="cursor-pointer text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
                                    <svg
                                        className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                                        <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                                    </svg>
                                    <span className="ml-3 flex-1 whitespace-nowrap select-none">
                                        Inbox
                                    </span>
                                    <span className="bg-primary select-none text-white ml-3 text-sm font-medium inline-flex items-center justify-center px-2 rounded-full">
                                        3
                                    </span>
                                </a>
                            </li>
                            <li>
                                <Link
                                    to="/admin/users"
                                    className="cursor-pointer text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group "
                                >
                                    <svg
                                        className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                            clip-rule="evenodd"
                                        ></path>
                                    </svg>
                                    <span className="ml-3 flex-1 whitespace-nowrap select-none">
                                        Users
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <a className="text-base cursor-pointer text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
                                    <svg
                                        className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                                            clip-rule="evenodd"
                                        ></path>
                                    </svg>
                                    <span className="ml-3 flex-1 whitespace-nowrap select-none">
                                        Flights
                                    </span>
                                </a>
                            </li>
                        </ul>
                        <div className="space-y-2 pt-2">
                            <a className="text-base cursor-pointer text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2">
                                <svg
                                    className="w-5 h-5 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="gem"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M378.7 32H133.3L256 182.7L378.7 32zM512 192l-107.4-141.3L289.6 192H512zM107.4 50.67L0 192h222.4L107.4 50.67zM244.3 474.9C247.3 478.2 251.6 480 256 480s8.653-1.828 11.67-5.062L510.6 224H1.365L244.3 474.9z"
                                    ></path>
                                </svg>
                                <span className="ml-4 select-none">
                                    Settings
                                </span>
                            </a>

                            <a className="text-base cursor-pointer text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2">
                                <svg
                                    className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                                <span className="ml-3 select-none">Help</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}

function Nav() {
    const app = useApp();
    return (
        <nav className="bg-white border-b border-gray-200 fixed z-30 w-full">
            <div className="px-3 py-3 lg:px-5 lg:pl-3 bg-gray-100">
                <div className="flex items-center justify-between ">
                    <div className="flex items-center justify-start ">
                        <button
                            id="toggleSidebarMobile"
                            aria-expanded="true"
                            aria-controls="sidebar"
                            className="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded"
                        >
                            <svg
                                id="toggleSidebarMobileHamburger"
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                            <svg
                                id="toggleSidebarMobileClose"
                                className="w-6 h-6 hidden"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                        </button>
                        <a
                            href="#"
                            className="text-xl font-bold flex items-center lg:ml-2.5"
                        >
                            <img
                                src={logo}
                                className="h-6 mr-2"
                                alt="Windster Logo"
                            />
                            <span className="self-center whitespace-nowrap">
                                IVE Airline Admin Panel
                            </span>
                        </a>
                        <form
                            action="#"
                            method="GET"
                            className="hidden lg:block lg:pl-32"
                        >
                            <label for="topbar-search" className="sr-only">
                                Search
                            </label>
                            <div className="mt-1 relative lg:w-64">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg
                                        className="w-5 h-5 text-gray-500"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                            clip-rule="evenodd"
                                        ></path>
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    name="email"
                                    id="topbar-search"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full pl-10 p-2.5"
                                    placeholder="Search"
                                />
                            </div>
                        </form>
                    </div>
                    <div className="flex items-center ">
                        <button
                            id="toggleSidebarMobileSearch"
                            type="button"
                            className="lg:hidden text-gray-500 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg"
                        >
                            <span className="sr-only">Search</span>
                            <svg
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                        </button>

                        <DropDown>
                            <div className="border p-2 rounded-2xl bg-white  mx-auto flex flex-row justify-center align-middle items-center select-none">
                                <img
                                    className="w-10 h-10 rounded-full mr-2"
                                    src="https://avatars.githubusercontent.com/u/85796869?v=4"
                                    alt="profile"
                                />
                                <div className="flex flex-row justify-between items-center ">
                                    <div className="flex flex-row items-center">
                                        <div className="ml-3">
                                            <p className="text-lg font-semibold mr-3">
                                                {app.userName || "User"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <svg
                                    class="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 28 28"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M19 9l-7 7-7-7"
                                    ></path>
                                </svg>
                            </div>

                            <DropDownList target>
                                <DropDownListItem
                                    context={"List of Saved flightss"}
                                />
                                <DropDownListItem context={"Your stars"} />
                                <DropDownListItem context={"Your trips"} />
                                <DropDownItemDivider />
                                <DropDownListItem context={"Try Premium"} />
                                <DropDownListItem context={"Help"} />
                                <DropDownListItem context={"Settings"} />
                                <DropDownItemDivider />
                                <DropDownListItem
                                    context={"Sign out"}
                                    handler={() => {
                                        app.setLogin(false);
                                        // reload page
                                        window.location.reload();
                                    }}
                                />
                            </DropDownList>
                        </DropDown>
                    </div>
                </div>
            </div>
        </nav>
    );
}

function Template({ children }) {
    return (
        <div>
            <Nav />
            <div className="flex overflow-hidden bg-white pt-16">
                <Sidebar />
                <div
                    className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10"
                    id="sidebarBackdrop"
                ></div>
                <div
                    id="main-content"
                    className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64"
                >
                    <main className="h-[95vh] w-full">
                        <div className="pt-6 px-4 h-full w-full">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

export function AdminPageIndex() {
    ChartJS.register(...registerables);

    const name = useRef();

    const CTX = () => {
        return (
            <div>
                <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
                    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-2">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex-shrink-0">
                                <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                                    $34,343,456
                                </span>
                                <h3 className="text-base font-normal text-gray-500">
                                    Sales this month
                                </h3>
                            </div>
                            <div className="flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                                12.5%
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                        <div id="main-chart">
                            {/* use chartjs */}

                            <div className="chart-container">
                                <h2
                                    style={{ textAlign: "center" }}
                                    className="text-2xl"
                                >
                                    Sales of Flight Tickets
                                </h2>
                                <Line
                                    data={{
                                        labels: [
                                            "January",
                                            "February",
                                            "March",
                                            "April",
                                            "May",
                                            "June",
                                            "July",
                                            "August",
                                            "September",
                                            "October",
                                            "November",
                                            "December",
                                        ],
                                        datasets: [
                                            {
                                                label: "Economy",
                                                backgroundColor:
                                                    "rgba(255,99,132,0.2)",
                                                borderColor:
                                                    "rgba(255,99,132,1)",
                                                borderWidth: 1,
                                                hoverBackgroundColor:
                                                    "rgba(255,99,132,0.4)",
                                                hoverBorderColor:
                                                    "rgba(255,99,132,1)",
                                                data: [
                                                    32, 39, 10, 23, 25, 70, 100,
                                                    60, 50, 30, 50, 110,
                                                ],
                                            },
                                            {
                                                label: "Business",
                                                backgroundColor:
                                                    "rgba(54, 162, 235, 0.2)",
                                                borderColor:
                                                    "rgba(54, 162, 235, 1)",
                                                borderWidth: 1,
                                                hoverBackgroundColor:
                                                    "rgba(54, 162, 235, 0.4)",
                                                hoverBorderColor:
                                                    "rgba(54, 162, 235, 1)",
                                                data: [
                                                    24, 30, 20, 17, 20, 60, 80,
                                                    50, 56, 27, 37, 92,
                                                ],
                                            },
                                        ],
                                    }}
                                    width={100}
                                    height={50}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                        <div className="mb-4 flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    Popular Flight Searches
                                </h3>
                                <span className="text-base font-normal text-gray-500">
                                    This is a list of the most popular flight
                                    searches
                                </span>
                            </div>
                            <div className="flex-shrink-0">
                                <a className="text-sm font-medium text-primary-700 hover:bg-gray-100 rounded-lg p-2">
                                    View all
                                </a>
                            </div>
                        </div>
                        <div className="flex flex-col mt-8">
                            <div className="overflow-x-auto rounded-lg">
                                <div className="align-middle inline-block min-w-full">
                                    <div className="shadow overflow-hidden sm:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Destination
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        No. of Searches
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white overflow-hidden h-50">
                                                {[
                                                    {
                                                        destination: "London",
                                                        searches: Math.round(
                                                            Math.random() * 1000
                                                        ),
                                                    },
                                                    {
                                                        destination: "New York",
                                                        searches: Math.round(
                                                            Math.random() * 1000
                                                        ),
                                                    },
                                                    {
                                                        destination: "Paris",
                                                        searches: Math.round(
                                                            Math.random() * 1000
                                                        ),
                                                    },
                                                    {
                                                        destination: "Tokyo",
                                                        searches: Math.round(
                                                            Math.random() * 1000
                                                        ),
                                                    },
                                                    {
                                                        destination: "Sydney",
                                                        searches: Math.round(
                                                            Math.random() * 1000
                                                        ),
                                                    },
                                                    {
                                                        destination: "Dubai",
                                                        searches: Math.round(
                                                            Math.random() * 1000
                                                        ),
                                                    },
                                                    {
                                                        destination:
                                                            "Singapore",
                                                        searches: Math.round(
                                                            Math.random() * 1000
                                                        ),
                                                    },
                                                    {
                                                        destination:
                                                            "Hong Kong",
                                                        searches: Math.round(
                                                            Math.random() * 1000
                                                        ),
                                                    },
                                                    {
                                                        destination: "Rome",
                                                        searches: Math.round(
                                                            Math.random() * 1000
                                                        ),
                                                    },
                                                ]
                                                    .sort(
                                                        (a, b) =>
                                                            b.searches -
                                                            a.searches
                                                    )
                                                    .map((item, index) => {
                                                        if (index % 2 == 0) {
                                                            return (
                                                                <tr key={index}>
                                                                    <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                                                        {
                                                                            item.destination
                                                                        }
                                                                    </td>
                                                                    <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                                                        {
                                                                            item.searches
                                                                        }
                                                                    </td>
                                                                </tr>
                                                            );
                                                        } else {
                                                            return (
                                                                <tr
                                                                    key={index}
                                                                    className="bg-gray-50"
                                                                >
                                                                    <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                                                        {
                                                                            item.destination
                                                                        }
                                                                    </td>
                                                                    <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                                                        {
                                                                            item.searches
                                                                        }
                                                                    </td>
                                                                </tr>
                                                            );
                                                        }
                                                    })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                                    {Math.round(Math.random() * 100 + 23)}
                                </span>
                                <h3 className="text-base font-normal text-gray-500">
                                    User signups this week
                                </h3>
                            </div>
                            <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                                14.6%
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                                    {Math.round(Math.random() * 100 + 34023)}
                                </span>
                                <h3 className="text-base font-normal text-gray-500">
                                    Visitors this week
                                </h3>
                            </div>
                            <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                                32.9%
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                                    {Math.round(Math.random() * 100 + 37789)}
                                </span>
                                <h3 className="text-base font-normal text-gray-500">
                                    URL clicks this week
                                </h3>
                            </div>
                            <div className="ml-5 w-0 flex items-center justify-end flex-1 text-red-500 text-base font-bold">
                                -2.7%
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4">
                    <div className="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold leading-none text-gray-900">
                                Assigned to me
                            </h3>
                            <a
                                href="#"
                                className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg inline-flex items-center p-2"
                            >
                                View all
                            </a>
                        </div>
                        <div className="flow-root">
                            <ul
                                role="list"
                                className="divide-y divide-gray-200"
                            >
                                <li className="py-3 sm:py-4 hover:bg-gray-100 p-3 rounded-lg">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            <img
                                                className="h-8 w-8 rounded-full"
                                                src="https://demo.themesberg.com/windster/images/users/neil-sims.png"
                                                alt="Neil image"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                Please update the price for the
                                                new Business class ticket
                                            </p>
                                            <p className="text-sm text-gray-500 truncate">
                                                Neil Sims
                                            </p>
                                        </div>
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                            <svg
                                                className="w-5 h-5 mr-2"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                                                    clip-rule="evenodd"
                                                ></path>
                                            </svg>
                                            2 days
                                        </div>
                                    </div>
                                </li>
                                <li className="py-3 sm:py-4 hover:bg-gray-100 p-3 rounded-lg">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            <img
                                                className="h-8 w-8 rounded-full"
                                                src="https://demo.themesberg.com/windster/images/users/bonnie-green.png"
                                                alt="Neil image"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="pr-1 text-sm font-medium text-gray-900 truncate flex flex-row">
                                                Reset the password for the staff{" "}
                                                <div
                                                    ref={name}
                                                    onClick={function () {
                                                        const NAME =
                                                            "Bonnie Green";
                                                        name.current.innerHTML =
                                                            NAME;
                                                        name.current.classList.add(
                                                            "underline"
                                                        );
                                                    }}
                                                    className="ml-1 text-cyan-600 cursor-pointer select-none"
                                                >
                                                    [name hidden]
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-500 truncate">
                                                Neil Sims
                                            </p>
                                        </div>
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                            <svg
                                                className="w-5 h-5 mr-2"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                                                    clip-rule="evenodd"
                                                ></path>
                                            </svg>
                                            4 days
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                        <h3 className="text-xl leading-none font-bold text-gray-900 mb-10">
                            Acquisition Overview
                        </h3>
                        <div className="block w-full overflow-x-auto">
                            <table className="items-center w-full bg-transparent border-collapse">
                                <thead>
                                    <tr>
                                        <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                                            Top Channels
                                        </th>
                                        <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                                            Users
                                        </th>
                                        <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap min-w-140-px"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    <tr className="text-gray-500">
                                        <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                                            Organic Search
                                        </th>
                                        <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                                            5,649
                                        </td>
                                        <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                                            <div className="flex items-center">
                                                <span className="mr-2 text-xs font-medium">
                                                    30%
                                                </span>
                                                <div className="relative w-full">
                                                    <div className="w-full bg-gray-200 rounded-sm h-2">
                                                        <div className="bg-cyan-600 h-2 rounded-sm w-1/3"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="text-gray-500">
                                        <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                                            Referral
                                        </th>
                                        <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                                            4,025
                                        </td>
                                        <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                                            <div className="flex items-center">
                                                <span className="mr-2 text-xs font-medium">
                                                    24%
                                                </span>
                                                <div className="relative w-full">
                                                    <div className="w-full bg-gray-200 rounded-sm h-2">
                                                        <div className="bg-orange-300 h-2 rounded-sm w-[24%]"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="text-gray-500">
                                        <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                                            Direct
                                        </th>
                                        <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                                            3,105
                                        </td>
                                        <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                                            <div className="flex items-center">
                                                <span className="mr-2 text-xs font-medium">
                                                    18%
                                                </span>
                                                <div className="relative w-full">
                                                    <div className="w-full bg-gray-200 rounded-sm h-2">
                                                        <div className="bg-teal-400 h-2 rounded-sm w-[18%]"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="text-gray-500">
                                        <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                                            Social
                                        </th>
                                        <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                                            1251
                                        </td>
                                        <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                                            <div className="flex items-center">
                                                <span className="mr-2 text-xs font-medium">
                                                    12%
                                                </span>
                                                <div className="relative w-full">
                                                    <div className="w-full bg-gray-200 rounded-sm h-2">
                                                        <div className="bg-pink-600 h-2 rounded-sm w-[12%]"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="text-gray-500">
                                        <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                                            Other
                                        </th>
                                        <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                                            734
                                        </td>
                                        <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                                            <div className="flex items-center">
                                                <span className="mr-2 text-xs font-medium">
                                                    9%
                                                </span>
                                                <div className="relative w-full">
                                                    <div className="w-full bg-gray-200 rounded-sm h-2">
                                                        <div className="bg-indigo-600 h-2 rounded-sm w[9%]"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="text-gray-500">
                                        <th className="border-t-0 align-middle text-sm font-normal whitespace-nowrap p-4 pb-0 text-left">
                                            Email
                                        </th>
                                        <td className="border-t-0 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4 pb-0">
                                            456
                                        </td>
                                        <td className="border-t-0 align-middle text-xs whitespace-nowrap p-4 pb-0">
                                            <div className="flex items-center">
                                                <span className="mr-2 text-xs font-medium">
                                                    7%
                                                </span>
                                                <div className="relative w-full">
                                                    <div className="w-full bg-gray-200 rounded-sm h-2">
                                                        <div className="bg-purple-500 h-2 rounded-sm w[7%]"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    return (
        <Template>
            <CTX />
        </Template>
    );
}

export function AdminPageAccountManagement() {
    const table = useRef(null);

    const names = ["John Doe", "User", "User23"];

    const states = ["Active", "Offline"];

    const emailStarts = ["john", "user", "user123"];

    const emailEnds = [
        "@gmail.com",
        "@yahoo.com",
        "@hotmail.com",
        "@vtc.edu.hk.com",
    ];

    const [items, setItems] = useState([
        {
            name: "Admin",
            state: "Active",
            role: "Admin",
            email: "123@gmail.com",
        },
        {
            name: "Admin123",
            state: "Active",
            role: "Admin",
            email: "456@gmail.com",
        },
        {
            name: "Operator",
            state: "Active",
            role: "Operator",
            email: "staff-1@ive-airline.org",
        },
        {
            name: "Operator12321",
            state: "Active",
            role: "Operator",
            email: "staff-123@ive-airline.org",
        },
        {
            name: "Operator176",
            state: "Offline",
            role: "Operator",
            email: "staff-13233@ive-airline.org",
        },
        {
            name: "Lee Kai Ming",
            state: "Offline",
            role: "Operator",
            email: "ken@stu.vtc.edu.hk",
        },
        {
            name: "Pan Bin Bin",
            state: "Active",
            role: "Admin",
            email: "staff-1@ive-airline.org",
        },
        {
            name: "Cheng Yat Ming",
            state: "Active",
            role: "Admin",
            email: "adminkj@ive.vtc.edu.hk",
        },
        {
            name: "Cheng Siu Ming",
            state: "Active",
            role: "Operator",
            email: "aOperatorkj@ive.vtc.edu.hk",
        },
        {
            name: "Chan Tsz Yan",
            state: "Active",
            role: "User",
            email: "users@ive.vtc.edu.hk",
        },
        {
            name: "Test Admin",
            state: "Active",
            role: "Admin",
            email: "testcasefile@ive.vtc.edu.hk",
        },
        {
            name: "Lai Yat Jai",
            state: "Active",
            role: "Operator",
            email: "laijar@ive.vtc.edu.hk",
        },
    ]);
    useEffect(() => {}, [items]);

    const Row = ({ name, email, state, role, emailRef, modal }) => {
        const [showDropDown, setShowDropDown] = useState(false);
        const d = useRef(null);
        // click outside to close dropdown
        useEffect(() => {
            const handleClickOutside = (event) => {
                if (
                    // if click anywhere is not d
                    d.current &&
                    !d.current.contains(event.target) &&
                    showDropDown
                ) {
                    setShowDropDown(false);
                }
            };
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [showDropDown]);

        return (
            <tr className="hover:bg-gray-100 select-none">
                <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                    {name}
                </th>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                    <div className="flex flex-row items-center">
                        {state === "Active" ? (
                            <div
                                className=" bg-green-700
                    rounded-full w-3 h-3 mr-2"
                            ></div>
                        ) : (
                            <div
                                className=" bg-red-700
                    rounded-full w-3 h-3 mr-2"
                            ></div>
                        )}
                        {state}
                    </div>
                </td>
                <td class="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {role}
                </td>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {email}
                </td>
                <td class="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <div
                        ref={d}
                        className="cursor-pointer"
                        onClick={() => {
                            setShowDropDown(!showDropDown);
                        }}
                    >
                        <svg
                            class="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                sctroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                            ></path>
                        </svg>
                        {showDropDown && (
                            <div className="absolute bg-white rounded-md shadow-md w-32 mt-2">
                                <div
                                    className="cursor-pointer hover:bg-gray-100 p-2"
                                    onClick={() => {
                                        emailRef.current = email;
                                        modal(true);
                                    }}
                                >
                                    Delete
                                </div>
                                <div
                                    className="cursor-pointer hover:bg-gray-100 p-2"
                                    onClick={() => {}}
                                >
                                    Edit
                                </div>
                            </div>
                        )}
                    </div>
                </td>
            </tr>
        );
    };

    const CTX = () => {
        const [showModal, setShowModal] = useState(false);
        const [confirmDeleteUserModal, setConfirmDeleteUserModal] = useState(false);
        
        const email = useRef(null);

        return (
            <>
                <main>
                    <div className="body-font text-4xl p-3 font-semibold  text-blueGray-700">
                        Users
                    </div>

                    <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                        <div class="rounded-t mb-0 px-4 py-3 border-0">
                            <div class="flex flex-row flex-wrap items-center justify-between">
                                <div class="relative px-4 max-w-full ">
                                    <h3 class="font-semibold text-base text-blueGray-700">
                                        Account Management
                                    </h3>
                                </div>
                                <div class="relative px-4 max-w-full">
                                    <Button class=" bg-primary cursor-pointer flex flex-row items-center text-white active:primary text-xs font-bold uppercase px-3 py-1.5 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        onClick={() => {
                                            setShowModal(true);
                                        }}
                                    >
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
                                                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                                            ></path>
                                        </svg>
                                        <span class="ml-2">Add User</span>
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div class="block w-full overflow-scroll h-[75vh]">
                        <Modal show={showModal} onClose={()=>{setShowModal(false)}}>
                            <Modal.Header>
                                <div class="text-3xl pt-3 leading-6 font-bold text-gray-900">
                                    Add Operator Account
                                </div>
                            </Modal.Header>
                            <Modal.Body className="bg-gray-50">
                                <AdminPageAccountManagement_AddUser />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button color="gray" onClick={() => {
                                        setShowModal(false);
                                    }}>
                                    Back
                                </Button>
                                <Button 
                                    className="bg-primary"
                                    onClick={() => {
                                        setShowModal(false);
                                    }}
                                >Create</Button>
                            </Modal.Footer>
                        </Modal>

                        <Modal show={confirmDeleteUserModal} onClose={()=>{setConfirmDeleteUserModal(false)}}>
                            <Modal.Header>
                                Are you sure you want to delete this user?
                            </Modal.Header>
                            <Modal.Footer>
                                
                                <Button color="gray"
                                    onClick={() => {
                                        setConfirmDeleteUserModal(false);
                                    }}
                                >
                                    Back
                                </Button>
                                <Button 
                                    className="bg-red-700 hover:bg-red-800"
                                    onClick={() => {
                                        setConfirmDeleteUserModal(false);
                                        setItems(items.filter((item) => item.email !== email.current));
                                    }}
                                >Delete</Button>
                            </Modal.Footer>
                        </Modal>
                            <table class="items-center bg-transparent w-full border-collapse ">
                                <thead>
                                    <tr>
                                        <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            <div className="flex flex-row items-center">
                                                <span className="mr-1">
                                                    Users
                                                </span>
                                                <div
                                                    className="cursor-pointer"
                                                    onClick={() => {
                                                        const temp = [...items];
                                                        temp.sort((a, b) => {
                                                            if (a.name < b.name)
                                                                return -1;
                                                            if (a.name > b.name)
                                                                return 1;
                                                            return 0;
                                                        });
                                                        setItems(temp);
                                                    }}
                                                >
                                                    <svg
                                                        class="w-4 h-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M19 9l-7 7-7-7"
                                                        ></path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </th>
                                        <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            <div className="flex flex-row items-center">
                                                <span className="mr-1">
                                                    State
                                                </span>
                                                <div
                                                    className="cursor-pointer"
                                                    onClick={() => {
                                                        // sort the state

                                                        const temp = [...items];
                                                        temp.sort((a, b) => {
                                                            if (
                                                                a.state <
                                                                b.state
                                                            ) {
                                                                return -1;
                                                            }
                                                            if (
                                                                a.state >
                                                                b.state
                                                            ) {
                                                                return 1;
                                                            }
                                                            return 0;
                                                        });

                                                        setItems(temp);
                                                    }}
                                                >
                                                    <svg
                                                        class="w-4 h-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M19 9l-7 7-7-7"
                                                        ></path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </th>
                                        <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            <div className="flex flex-row items-center">
                                                <span className="mr-1">
                                                    Role
                                                </span>
                                                <div
                                                    className="cursor-pointer"
                                                    onClick={() => {
                                                        const temp = [...items];
                                                        temp.sort((a, b) => {
                                                            if (a.role < b.role)
                                                                return -1;
                                                            if (a.role > b.role)
                                                                return 1;
                                                            return 0;
                                                        });
                                                        setItems(temp);
                                                    }}
                                                >
                                                    <svg
                                                        class="w-4 h-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M19 9l-7 7-7-7"
                                                        ></path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </th>
                                        <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            <div className="flex flex-row items-center">
                                                <span className="mr-1">
                                                    Email
                                                </span>
                                                <div
                                                    className="cursor-pointer"
                                                    onClick={() => {
                                                        const temp = [...items];
                                                        temp.sort((a, b) => {
                                                            if (
                                                                a.email <
                                                                b.email
                                                            )
                                                                return -1;
                                                            if (
                                                                a.email >
                                                                b.email
                                                            )
                                                                return 1;
                                                            return 0;
                                                        });
                                                        setItems(temp);
                                                    }}
                                                >
                                                    <svg
                                                        class="w-4 h-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M19 9l-7 7-7-7"
                                                        ></path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </th>
                                        <th class=" bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody ref={table} className="">
                                    {items.map((item, index) => {
                                        return (
                                            <Row
                                                key={index}
                                                name={item.name}
                                                state={item.state}
                                                role={item.role}
                                                email={item.email}
                                                emailRef={email}
                                                modal={setConfirmDeleteUserModal}
                                            />
                                        );
                                    })}
                                </tbody>
                            </table>
                            {/* Load more */}
                            <div
                                className="w-full flex justify-center py-5 "
                                onClick={() => {
                                    const temp = [];
                                    for (let i = 0; i < 5; i++) {
                                        // random generate a new user
                                        const newUser = {
                                            name: names[
                                                Math.floor(
                                                    Math.random() * names.length
                                                )
                                            ],
                                            state: states[
                                                Math.floor(
                                                    Math.random() *
                                                        states.length
                                                )
                                            ],
                                            role: "Users",
                                            email:
                                                emailStarts[
                                                    Math.floor(
                                                        Math.random() *
                                                            emailStarts.length
                                                    )
                                                ] +
                                                emailEnds[
                                                    Math.floor(
                                                        Math.random() *
                                                            emailEnds.length
                                                    )
                                                ],
                                        };

                                        // add to the table
                                        temp.push(newUser);
                                    }

                                    setItems([...items, ...temp]);
                                }}
                            >
                                <div className="bg-primary w-fit select-none hover:bg-primary-800 text-white font-bold py-2 px-4 rounded absolute bottom-4 shadow-2xl">
                                    Load More
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </>
        );
    };
    return (
        <Template>
            <CTX />
        </Template>
    );
}

export function AdminPageAccountManagement_AddUser() {
    const CTX = () => {
        const email = useRef("");
        const password = useRef("");
        const [emailValid, setEmailValid] = useState(true);

        // pwCheckListItem
        const [pwCheckListItem1Status, setPwCheckListItem1Status] = useState(0);
        const [pwCheckListItem2Status, setPwCheckListItem2Status] = useState(0);
        const [pwCheckListItem3Status, setPwCheckListItem3Status] = useState(0);
        const [pwCheckListItem4Status, setPwCheckListItem4Status] = useState(0);
        const [pwCheckListItem5Status, setPwCheckListItem5Status] = useState(0);

        const [tooltipStatus, setTooltipStatus] = useState(0);
        const Kick = () => {
            return (
                <>
                    <svg
                        class="h-4 w-4 text-green"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        {" "}
                        <path stroke="none" d="M0 0h24v24H0z" />{" "}
                        <path d="M5 12l5 5l10 -10" />
                    </svg>
                </>
            );
        };

        const Cross = () => {
            return (
                <>
                    <svg
                        class="h-4 w-4 text-red-500"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        {" "}
                        <path stroke="none" d="M0 0h24v24H0z" />{" "}
                        <line x1="18" y1="6" x2="6" y2="18" />{" "}
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </>
            );
        };

        const Checker = ({ type, message }) => {
            return (
                <>
                    {type ? (
                        <div className="flex valid">
                            <Kick />
                            <p className="ml-2 text-xs leading-4  pb-3">
                                {message}
                            </p>
                        </div>
                    ) : (
                        <div className="flex invalid">
                            <Cross />
                            <p className="ml-2 text-xs leading-4 invalid pb-3">
                                {message}
                            </p>
                        </div>
                    )}
                </>
            );
        };

        useEffect(() => {
            const onMouseClickOnOther = (e) => {
                if (!document.getElementById("r_password").contains(e.target)) {
                    setTooltipStatus(0);
                }
            };
            window.addEventListener("click", onMouseClickOnOther);

            return () => {
                window.removeEventListener("click", onMouseClickOnOther);
            };
        }, []);

        return (
            <>
                <div className="h-full w-full ">
                    
                    <div className="h-full w-full flex justify-center items-center">
                        <div className="w-full h-3/4">
                                <div className="flex h-full w-full bg-gray-50  rounded-lg mt-4">
                                    {/* email, password, role (radio) */}
                                    <div className="flex flex-col mx-auto h-full p-4 w-3/4">
                                        <div className="flex flex-col w-full mt-5">
                                            <div>
                                                <div className="text-xl font-bold">
                                                    Email
                                                </div>
                                                <div className="w-full">
                                                    <FloatingLabel
                                                        placeholder={"Email"}
                                                        type="email"
                                                        handler={(e) => {
                                                            email.current =
                                                                e.value;
                                                        }}
                                                        validate={emailValid}
                                                        error_message="Email format is not valid"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <div className="text-xl font-bold mt-5">
                                                    Password
                                                </div>
                                                <div
                                                    className="w-full relative"
                                                    id="password"
                                                    onMouseEnter={() => {
                                                        setTooltipStatus(1);
                                                    }}
                                                >
                                                    <FloatingLabel
                                                        placeholder={"Password"}
                                                        type="password"
                                                        id={"r_password"}
                                                        handler={(e) => {
                                                            setPwCheckListItem1Status(
                                                                false
                                                            );
                                                            setPwCheckListItem2Status(
                                                                false
                                                            );
                                                            setPwCheckListItem3Status(
                                                                false
                                                            );
                                                            setPwCheckListItem4Status(
                                                                false
                                                            );
                                                            setPwCheckListItem5Status(
                                                                false
                                                            );

                                                            if (
                                                                e.target.value
                                                                    .length >= 8
                                                            ) {
                                                                setPwCheckListItem1Status(
                                                                    true
                                                                );
                                                            }

                                                            if (
                                                                e.target.value.match(
                                                                    /[a-z]/g
                                                                )
                                                            ) {
                                                                setPwCheckListItem3Status(
                                                                    true
                                                                );
                                                            }
                                                            if (
                                                                e.target.value.match(
                                                                    /[A-Z]/g
                                                                )
                                                            ) {
                                                                setPwCheckListItem2Status(
                                                                    true
                                                                );
                                                            }

                                                            if (
                                                                e.target.value.match(
                                                                    /[0-9]/g
                                                                )
                                                            ) {
                                                                setPwCheckListItem4Status(
                                                                    true
                                                                );
                                                            }

                                                            if (
                                                                e.target.value.match(
                                                                    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/
                                                                )
                                                            ) {
                                                                setPwCheckListItem5Status(
                                                                    true
                                                                );
                                                            }

                                                            password.current =
                                                                e.target.value;
                                                        }}
                                                        validate={true}
                                                        error_message="Password must be at least 8 characters"
                                                    />
                                                    {tooltipStatus == 1 && (
                                                        <div
                                                            role="tooltip"
                                                            className="z-20 -mt-20 w-64 absolute transition duration-150 ease-in-out  left-full  ml-8 shadow-lg bg-gray-100 p-4 rounded"
                                                        >
                                                            <svg
                                                                className="absolute left-0 -ml-2 bottom-0 top-0 h-full "
                                                                width="9px"
                                                                height="16px"
                                                                viewBox="0 0 9 16"
                                                                version="1.1"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                            >
                                                                <g
                                                                    id="Page-1"
                                                                    stroke="none"
                                                                    strokeWidth={
                                                                        1
                                                                    }
                                                                    fill="none"
                                                                    fillRule="evenodd"
                                                                >
                                                                    <g
                                                                        id="Tooltips-"
                                                                        transform="translate(-874.000000, -1029.000000)"
                                                                        fill="rgb(243 244 246)"
                                                                    >
                                                                        <g
                                                                            id="Group-3-Copy-16"
                                                                            transform="translate(850.000000, 975.000000)"
                                                                        >
                                                                            <g
                                                                                id="Group-2"
                                                                                transform="translate(24.000000, 0.000000)"
                                                                            >
                                                                                <polygon
                                                                                    id="Triangle"
                                                                                    transform="translate(4.500000, 62.000000) rotate(-90.000000) translate(-4.500000, -62.000000) "
                                                                                    points="4.5 57.5 12.5 66.5 -3.5 66.5"
                                                                                />
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </svg>
                                                            <div className="font-bold text-black pb-3 ">
                                                                Password must be
                                                                at least
                                                            </div>
                                                            <Checker
                                                                message={
                                                                    "8 characters"
                                                                }
                                                                type={
                                                                    pwCheckListItem1Status
                                                                }
                                                            />
                                                            <Checker
                                                                message={
                                                                    "1 uppercase letter"
                                                                }
                                                                type={
                                                                    pwCheckListItem2Status
                                                                }
                                                            />
                                                            <Checker
                                                                message={
                                                                    "1 lowercase letter"
                                                                }
                                                                type={
                                                                    pwCheckListItem3Status
                                                                }
                                                            />
                                                            <Checker
                                                                message={
                                                                    "1 number"
                                                                }
                                                                type={
                                                                    pwCheckListItem4Status
                                                                }
                                                            />
                                                            <Checker
                                                                message={
                                                                    "1 special character"
                                                                }
                                                                type={
                                                                    pwCheckListItem5Status
                                                                }
                                                            />
                                                        </div>
                                                    )}{" "}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </>
        );
    };

    return (
        <CTX />
    );
}
