import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logOut } from "../utils/apiClient";

function Navbar() {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const signOut = () => {
    logOut();
    navigate('/');
  } 

  const goToDashboard = () => {
    const uid = localStorage.getItem('userId')
    if(uid === 'df8500db-898f-4fb5-9408-a0c98bcf607d')
      return navigate('/admin')
    navigate('/dashboard');
  }
  return (
    <header className="">
      {userId ? (
        <>
          <div className="absolute flex flex-row gap-4">
            <button onClick={() => goToDashboard()}>
              Dashboard
            </button>
            <button onClick={() => signOut()}>
              Log Out
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="absolute flex flex-row gap-4">
            <NavLink
              to="/register"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Register
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Log in
            </NavLink>
          </div>
        </>
      )}
    </header>
  );
}

export default Navbar;
