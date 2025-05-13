import { Navigate, Outlet } from "react-router-dom";
import Login from "../pages/Login";

function PrivateRoute() {
    const isLoggedIn = localStorage.getItem('userId') !== null;

    return isLoggedIn ? <Outlet/> : <Navigate to='/login' replace/>
}

export default PrivateRoute