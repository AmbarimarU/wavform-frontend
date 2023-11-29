import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function ToggleNavBar({ children }) {
    const location = useLocation();

    const [showNavBar, setShowNavBar] = useState(false);

    useEffect(() => {
        console.log("This location:", location);
        if (location.pathname === "/") {
            setShowNavBar(false);
        } else {
            setShowNavBar(true);
        }
    }, [location]);

    return <div className="toggle">{showNavBar && children}</div>;
}

export default ToggleNavBar;
