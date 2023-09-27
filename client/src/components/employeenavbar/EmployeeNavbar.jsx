import React from 'react';
import './employeenavbar.css';
import { Link } from "react-router-dom";
export const EmployeeNavbar = () => {

   
    return (
        <nav>
            <div className="logo">
                <h1>ETT. <span>Tracking</span></h1>
            </div>
            <div className="list">
                <Link to={"/"}>Home</Link>
                <Link to={"/about"}>My profile</Link>
                <button>Logout</button>
            </div>
        </nav>
    );
};
