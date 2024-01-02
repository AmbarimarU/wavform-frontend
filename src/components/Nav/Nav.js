import React from "react";
import { Link, NavLink } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import "./Nav.scss";
import logo from "./images/header.png";
function Nav({ user, logout, showSidebar, sidebar, setSidebar }) {
    return (
        <header className="nav-header">
            <div className="nav-container container">
                <nav className="nav-navigation">
                    <div className="nav-logo nav-links">
                        <a href="/">WAVFORM</a>
                        <img src={logo} style={{ height: "20px" }} alt="Logo" />
                    </div>
                    <ul className="nav-links">
                        {user ? (
                            <>
                                <li>
                                    <NavLink
                                        to="/about"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "active-nav-link"
                                                : undefined
                                        }
                                        onClick={() => {
                                            setSidebar(false);
                                        }}
                                    >
                                        About
                                    </NavLink>
                                </li>
                                <li>
                                    <Link
                                        to="/lessons"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "active-nav-link"
                                                : undefined
                                        }
                                        onClick={() => {
                                            setSidebar(false);
                                        }}
                                    >
                                        Lessons
                                    </Link>
                                </li>
                                <li>
                                    <NavLink
                                        to="/musictool"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "active-nav-link"
                                                : undefined
                                        }
                                        onClick={() => {
                                            setSidebar(false);
                                        }}
                                    >
                                        The Studio
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/profile"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "active-nav-link"
                                                : undefined
                                        }
                                        onClick={() => {
                                            setSidebar(false);
                                        }}
                                    >
                                        Hello {user.username}{" "}
                                        <FaIcons.FaRegUser />
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "active-nav-link"
                                                : undefined
                                        }
                                        onClick={() => {
                                            setSidebar(false);
                                            logout();
                                        }}
                                    >
                                        Logout
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <NavLink
                                        to="/about"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "active-nav-link"
                                                : undefined
                                        }
                                        onClick={() => {
                                            setSidebar(false);
                                        }}
                                    >
                                        About
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/lessons"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "active-nav-link"
                                                : undefined
                                        }
                                        onClick={() => {
                                            setSidebar(false);
                                        }}
                                    >
                                        Lessons
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/musictool"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "active-nav-link"
                                                : undefined
                                        }
                                        onClick={() => {
                                            setSidebar(false);
                                        }}
                                    >
                                        The Studio
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/signup"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "active-nav-link"
                                                : undefined
                                        }
                                        onClick={() => {
                                            setSidebar(false);
                                        }}
                                    >
                                        Sign up
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/login"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "active-nav-link"
                                                : undefined
                                        }
                                        onClick={() => {
                                            setSidebar(false);
                                        }}
                                    >
                                        Login
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Nav;
