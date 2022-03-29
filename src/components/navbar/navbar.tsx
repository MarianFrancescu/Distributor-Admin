import React from "react";
import { Link } from "react-router-dom";
import './navbar.css';

function MyNavbar({menuOpen, setMenuOpen}: any) {
    return(
        <div className={"navbar " + (menuOpen && "active")}>
            <div className="left-pannel"> 
                <div className="open-nav" onClick={()=>setMenuOpen(!menuOpen)}>
                        <span className="line-dashboard">Dashboard</span>
                    </div>
                {/* <li>
                    <Link to='/dashboard'>Dasboard</Link>
                </li> */}
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