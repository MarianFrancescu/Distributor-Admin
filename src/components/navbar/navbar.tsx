import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './navbar.css';

function MyNavbar({menuOpen, setMenuOpen}: any) {

    const [isLoggedUser, setStatus] = useState(() => {
        const token = localStorage.getItem('admin-token');
        return token !== null ? true : false;
    });

    useEffect(() => {
        console.log('log', isLoggedUser);
    })

    const eraseToken = () => {
        localStorage.removeItem('admin-token');
        localStorage.removeItem('admin-id');
        setStatus(false);
    }

    const loggedUserView = () => {
        console.log(isLoggedUser)
        if(isLoggedUser) {
            return (
                <li>
                    <Link to='/login' onClick={eraseToken}>Logout</Link>
                </li>
            );
        } else {
            return (
                <li>
                    <Link to='/login'>Login</Link>
                </li>
            );
        }
    }

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
                {loggedUserView()}
            </div>
        </div>
    );
}

export default MyNavbar;