import React from 'react';
import './navbar.css';
import { Link } from "react-router-dom";
export const Navbar = () => {

   
    return (
        <nav>
            <div className="logo">
                <h1>ETT. <span>Tracking</span></h1>
            </div>
            <div className="list">
                <Link to={"/"}>Home</Link>
                <Link to={"/about"}>About</Link>
                <Link to={"/story"}>Story</Link>
            </div>
        </nav>
    );
};
