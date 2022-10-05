import { Link, NavLink } from 'react-router-dom';
import logo from '../logo.svg';

export default function Nav({name})
{
    return (
        <div className="bg-white-800 h-24 border-b-2 mb-3">
            <div className="flex flex-row justify-between align-middle p-3">
                <div className="flex items-center justify-center ">
                    <img src={logo} className="w-16 h-16" alt="logo" />
                    <span className="text-3xl text-dark-800 font-semibold">
                        IVE airline
                    </span>
                </div>
                <div className="ml-auto">
                    <ul className="flex flex-row justify-around items-center pt-4">
                        <li className="mx-3">
                            <NavLink
                                to="/"
                                className="text-xl text-dark-800 font-semibold"
                                style={({isActive}) => { return isActive ? {color : "#3058D2"} : {color : "black"}}}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="mx-3">

                            <NavLink
                                className="text-xl text-dark-800"
                                style={({isActive}) => { return isActive ? {color : "#3058D2"} : {color : "black"}}}
                                to="/about"
                            >
                                My trips
                            </NavLink>
                        </li>
                        <li className="mx-3">
                            <NavLink
                                className="text-xl text-dark-800"
                                style={({isActive}) => { return isActive ? {color : "#3058D2"} : {color : "black"}}}
                                to="/contact"
                            >
                                Helps 
                            </NavLink>
                        </li>

                        <li className="mx-3 border p-1 px-4 bg-primary  rounded-lg ">
                            <NavLink
                                className="text-xl text-white"
                                to="/login"
                            >
                                Login 
                            </NavLink>
                        </li>
                    </ul>

                </div>
            </div>
        </div>

    )
}