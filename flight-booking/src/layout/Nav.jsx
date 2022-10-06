import { Link, NavLink } from "react-router-dom";
import { DropDown, DropDownItemDivider, DropDownList, DropDownListItem } from "../component/DropDown";
import { useApp } from "../hook/Main";
import PageLogo from "../component/Logo";

export default function Nav({ name }) {
    const app = useApp();
    console.log(app.login)
    return (
        <div className="bg-white h-24 border-b-2 ">
            <div className="flex flex-row justify-between align-middle p-3">
                <div className="flex items-center justify-center ">
                    <PageLogo />
                </div>
                <div className="ml-auto">
                    <ul className="flex flex-row justify-around items-center pt-6">
                        <li className="mx-3">
                            <NavLink
                                to="/"
                                className="text-xl text-gray-800 font-semibold"
                                style={({ isActive }) => {
                                    return isActive
                                        ? { color: "#3058D2" }
                                        : {};
                                }}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="mx-3">
                            <NavLink
                                className="text-xl text-gray-800"
                                style={({ isActive }) => {
                                    return isActive
                                        ? { color: "#3058D2" }
                                        : {};
                                }}
                                to="/about"
                            >
                                My trips
                            </NavLink>
                        </li>
                        <li className="mx-3">
                            <NavLink
                                className="text-xl text-gray-800"
                                style={({ isActive }) => {
                                    return isActive
                                        ? { color: "#3058D2" }
                                        : {};
                                }}
                                to="/contact"
                            >
                                Helps
                            </NavLink>
                        </li>
                        <li className="mx-3 w-24">
                            {app.login ? (
                                <DropDown>
                                    <svg
                                        class="w-6 h-6 mx-auto"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/20s00/svg"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        ></path>
                                    </svg>

                                    <DropDownList target>
                                        <DropDownListItem context={"List of Saved flightss"} />
                                        <DropDownItemDivider />
                                        <DropDownListItem context={"Logout"}
                                            handler={() => {
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
                                    <div class="mx-auto text-center">
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
