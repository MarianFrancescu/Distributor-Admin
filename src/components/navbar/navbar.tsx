import React, { useContext } from "react";
import { Link } from "react-router-dom";
import './navbar.scss';
import { MyContext } from '../../App';

function MyNavbar({menuOpen, setMenuOpen}: any) {

    const {isLoggedUser, setUserStatus} = useContext(MyContext);

    const eraseToken = () => {
        localStorage.removeItem('admin-token');
        localStorage.removeItem('admin-id');
        setUserStatus(false);
    }

    const getUserToken = () => {
        return localStorage.getItem('admin-token') ? true : false;
    } 

    const loggedUserView = () => {
        if(isLoggedUser || getUserToken()) {
            return (
                <li className="link">
                    <Link className="text" to='/login' onClick={eraseToken}>Logout</Link>
                </li>
            );
        } else {
            return (
                <li className="link">
                    <Link className="text" to='/login'>Login</Link>
                </li>
            );
        }
    }

    return(
        <div className={"navbar " + (menuOpen && "active")}>
            <div className="left-pannel"> 
                {/* <div className="open-nav link" onClick={()=>setMenuOpen(!menuOpen)}>
                        <span className="line-dashboard text">Dashboard</span>
                </div> 
                <li>
                    <Link to='/dashboard'>Dasboard</Link>
                </li> */}
            </div>
            <div className="center-pannel">
                <li className="link">
                    <Link className="text" to='/'>Home</Link>    
                </li>
            </div>
            <div className="right-pannel">
                {loggedUserView()}
            </div>
        </div>
    );
}

export default MyNavbar;