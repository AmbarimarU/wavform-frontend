import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Nav.css";
function Nav() {
    return (
        <div className="header-container">
            <div className="logo">
                <Link to="/">
                    {" "}
                    <img src="./7.png" alt="" />{" "}
                </Link>
            </div>
            <div className="nav-links">
                <>
                    {" "}
                    <NavLink
                        to="/welcome"
                        className={({ isActive }) =>
                            isActive ? "active-nav-link" : undefined
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            isActive ? "active-nav-link" : undefined
                        }
                    >
                        About
                    </NavLink>
                    <NavLink
                        to="/signup"
                        className={({ isActive }) =>
                            isActive ? "active-nav-link" : undefined
                        }
                    >
                        Sign up
                    </NavLink>
                    <NavLink
                        to="/login"
                        className={({ isActive }) =>
                            isActive ? "active-nav-link" : undefined
                        }
                    >
                        Login
                    </NavLink>
                </>
            </div>
        </div>
    );
}

export default Nav;