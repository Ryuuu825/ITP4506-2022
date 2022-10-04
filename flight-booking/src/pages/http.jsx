// a 404 page like Github
import { NavLink , Outlet , useNavigate } from 'react-router-dom';

export function NotFound() {
   

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-9xl font-bold">404</h1>
            <p className="text-2xl font-semibold">Page Not Found</p>
            <NavLink to="/" className="bg-gray-800 text-white p-3 rounded-lg hover:bg-gray-700 mt-3">Home</NavLink>
        </div>
    )
} 

export function NotAllowed() {
    const navigate = useNavigate();
    // get the previous page
    const prevPage = navigate(-1);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-9xl font-bold">403</h1>
            <p className="text-3xl font-semibold text-red-600">You are not allowed to access this page</p>
            <button className="bg-gray-800 text-white p-3 rounded-lg hover:bg-gray-700 mt-3" onClick={() => navigate(prevPage)}>Back</button>

        </div>
    )
}

