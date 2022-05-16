import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import './navbar.scss';
import { MyContext } from '../../App';

function MyNavbar({ menuOpen, setMenuOpen }: any) {
    const history = useNavigate();
    const { isLoggedUser, setUserStatus } = useContext(MyContext);

    const eraseToken = () => {
        localStorage.removeItem('admin-token');
        localStorage.removeItem('admin-id');
        setUserStatus(false);
        history('/login');
        window.location.reload();
    }

    const getUserToken = () => {
        return localStorage.getItem('admin-token') ? true : false;
    }

    const loggedUserView = () => {
        if (isLoggedUser || getUserToken()) {
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

    return (
        <div className={"navbar " + (menuOpen && "active")}>
            <div className="left-pannel">
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