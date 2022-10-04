import { Link, NavLink } from 'react-router-dom';
export default function Nav({name})
{
    return (
        <nav className="bg-gray-800">
            <ul>
                <li>
                    <NavLink to="/" className="text-white p-3" style={({isActive}) => { return isActive ? {color : "red"} : {color : "white"}}}>Home</NavLink>
                    <NavLink to="/Test" className="text-white p-3" style={({isActive}) => { return isActive ? {color : "red"} : {}}}>Test</NavLink>
                </li>
            </ul>
        </nav>

    )
}