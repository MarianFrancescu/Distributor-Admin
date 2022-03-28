import React from "react";
import { Link } from "react-router-dom";
import './navbar.css';

function MyNavbar() {
    return(
        <div className="navbar">
            <div className="left-pannel"> 
                <li>
                    <Link to='/dashboard'>Dasboard</Link>
                </li>
            </div>
            <div className="center-pannel">
                <li>
                    <Link to='/'>Home</Link>    
                </li>
            </div>
            <div className="right-pannel">
                <li>
                    <Link to='/Login'>Login</Link>
                </li>
            </div>
        </div>
    );
}

export default MyNavbar;