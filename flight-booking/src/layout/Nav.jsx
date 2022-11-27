import { Link, NavLink } from "react-router-dom";
import {
    DropDown,
    DropDownItemDivider,
    DropDownList,
    DropDownListItem,
} from "../component/DropDown";
import { useApp } from "../hook/Main";
import PageLogo from "../component/Logo";

export default function Nav({ name }) {
    const app = useApp();
    return (
        <div className="bg-white h-24 border-b-2 ">
            <div className="flex flex-row justify-between align-middle p-3 items-center">
                <NavLink className="flex items-center justify-center " to="/">
                    <PageLogo />
                </NavLink>
                <div className="ml-auto text-blue-800">
                    <ul className="flex flex-row justify-around items-center pt-2">
                        <li className="mx-3">
                            <NavLink
                                to="/"
                                className="text-xl text-gray-800 font-semibold"
                                style={({ isActive }) => {
                                    return isActive ? { color: "#1E429F" } : {};
                                }}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="mx-3">
                            <NavLink
                                className="text-xl text-gray-800"
                                style={({ isActive }) => {
                                    return isActive ? { color: "#1E429F" } : {};
                                }}
                                to="/my/trip"
                            >
                                My trips
                            </NavLink>
                        </li>
                        <li className="mx-3">
                            <NavLink
                                className="text-xl text-gray-800"
                                style={({ isActive }) => {
                                    return isActive ? { color: "#1E429F" } : {};
                                }}
                            >
                                Helps
                            </NavLink>
                        </li>
                        <li className="">
                            {/* A hor line */}
                            <div className="h-6 border-l-2 border-black ml-3"></div>
                        </li>
                        <li className="mx-3 w-24">
                            {app.login ? (
                                <DropDown>
                                    <div className="mx-auto flex flex-row justify-center align-middle items-center select-none">
                                        <img
                                            className="w-10 h-10 rounded-full mr-2"
                                            src="https://avatars.githubusercontent.com/u/85796869?v=4"
                                            alt="profile"
                                        />
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
                                        {/* The profile */}
                                        <DropDownListItem
                                            context={
                                                <div className="flex flex-row justify-between items-center">
                                                    <div className="flex flex-row items-center">
                                                        <div className="ml-3">
                                                            <p className="">
                                                                Signed in as
                                                            </p>
                                                            <p className="text-lg font-semibold">
                                                                {app.userName}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        />
                                        <DropDownItemDivider />
                                        <DropDownListItem
                                            context={"List of Saved flightss"}
                                        />
                                        <DropDownListItem
                                            context={"Your stars"}
                                        />
                                        <DropDownListItem
                                            context={"Your trips"}
                                        />
                                        <DropDownItemDivider />
                                        <DropDownListItem
                                            context={"Try Premium"}
                                        />
                                        <DropDownListItem context={"Help"} />
                                        <DropDownListItem
                                            context={"Settings"}
                                        />
                                        <DropDownItemDivider />
                                        <DropDownListItem
                                            context={"Sign out"}
                                            handler=
                                            {() => {
                                                app.setLogin(false);
                                                // reload page
                                                window.location.reload();
                                            }}
                                            />
                                    </DropDownList>
                                </DropDown>
                            ) : (
                                <NavLink
                                    className="text-xl text-gray-800 relative"
                                    to="/login"
                                >
                                    <div className="mx-auto text-center">
                                        Login
                                    </div>
                                </NavLink>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
