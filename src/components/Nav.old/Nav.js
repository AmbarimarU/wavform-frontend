import React from "react";
import { Link, NavLink } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";

import "./Nav.css";

function Nav({ user, logout, showSidebar, sidebar, setSidebar }) {
    return (
        <IconContext.Provider value={{ color: "#fff" }}>
            <div className="header-container">
                <button onClick={showSidebar} className="nav-icon">
                    <FaIcons.FaBars />
                </button>
                <div className="logo">
                    <Link
                        to="/"
                        onClick={() => {
                            setSidebar(false);
                        }}
                    >
                        {" "}
                        <img src="./4.png" alt="" />{" "}
                    </Link>
                </div>
                <h1 className="title"> Wavform </h1>
                <div
                    className="sidebar-nav"
                    style={{ left: sidebar ? "0" : "-100%" }}
                >
                    <div className="sidebar-wrap">
                        <button onClick={showSidebar} className="nav-icon">
                            <AiIcons.AiOutlineClose />
                        </button>
                        {SidebarData.map((item, index) => {
                            return (
                                <SubMenu
                                    item={item}
                                    key={index}
                                    showSidebar={showSidebar}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className="nav-links">
                    {user ? (
                        <>
                            {" "}
                            <NavLink
                                to="/welcome"
                                className={({ isActive }) =>
                                    isActive ? "active-nav-link" : undefined
                                }
                                onClick={() => {
                                    setSidebar(false);
                                }}
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/about"
                                className={({ isActive }) =>
                                    isActive ? "active-nav-link" : undefined
                                }
                                onClick={() => {
                                    setSidebar(false);
                                }}
                            >
                                About
                            </NavLink>
                            <NavLink
                                to="/profile"
                                className={({ isActive }) =>
                                    isActive ? "active-nav-link" : undefined
                                }
                                onClick={() => {
                                    setSidebar(false);
                                }}
                            >
                                Hello {user.username} <FaIcons.FaRegUser />
                            </NavLink>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive ? "active-nav-link" : undefined
                                }
                                onClick={() => {
                                    setSidebar(false);
                                    logout();
                                }}
                            >
                                Logout
                            </NavLink>
                        </>
                    ) : (
                        <>
                            {" "}
                            <NavLink
                                to="/welcome"
                                className={({ isActive }) =>
                                    isActive ? "active-nav-link" : undefined
                                }
                                onClick={() => {
                                    setSidebar(false);
                                }}
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/about"
                                className={({ isActive }) =>
                                    isActive ? "active-nav-link" : undefined
                                }
                                onClick={() => {
                                    setSidebar(false);
                                }}
                            >
                                About
                            </NavLink>
                            <NavLink
                                to="/signup"
                                className={({ isActive }) =>
                                    isActive ? "active-nav-link" : undefined
                                }
                                onClick={() => {
                                    setSidebar(false);
                                }}
                            >
                                Sign up
                            </NavLink>
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    isActive ? "active-nav-link" : undefined
                                }
                                onClick={() => {
                                    setSidebar(false);
                                }}
                            >
                                Login
                            </NavLink>
                        </>
                    )}
                </div>
            </div>
        </IconContext.Provider>
    );
}

export default Nav;
