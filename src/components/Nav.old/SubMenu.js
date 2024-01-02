import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SidebarLabel = styled.span`
    margin-left: 16px;
`;

const DropdownLink = styled(Link)`
    background: #252831;
    height: 60px;
    padding-left: 3rem;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #f5f5f5;
    font-size: 18px;

    &:hover {
        background: #007ead;
        cursor: pointer;
    }
`;

const SubMenu = ({ item, showSidebar }) => {
    const [subnav, setSubnav] = useState(false);

    const showSubnav = () => setSubnav(!subnav);

    return (
        <>
            {/*<SidebarLink to={item.path} onClick={item.subNav && showSubnav}>*/}
            <div className="linkStyle">
                <div>
                    <Link
                        className="links"
                        to={item.path}
                        onClick={() => {
                            item.subNav && setSubnav(false);
                            showSidebar();
                        }}
                    >
                        {item.icon}
                        <SidebarLabel>{item.title}</SidebarLabel>
                    </Link>
                </div>
                <div onClick={item.subNav && showSubnav}>
                    {item.subNav && subnav
                        ? item.iconOpened
                        : item.subNav
                        ? item.iconClosed
                        : null}
                </div>
            </div>
            {/*</SidebarLink>*/}
            {subnav &&
                item.subNav.map((item, index) => {
                    return (
                        <DropdownLink
                            to={item.path}
                            key={index}
                            onClick={() => {
                                showSidebar();
                                showSubnav();
                            }}
                        >
                            {item.icon}
                            <SidebarLabel>{item.title}</SidebarLabel>
                        </DropdownLink>
                    );
                })}
        </>
    );
};

export default SubMenu;
