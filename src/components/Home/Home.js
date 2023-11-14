import React from "react";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Homes() {
    const navigate = useNavigate();
    function handleWelcomeNav() {
        navigate("/welcome");
    }
    return (
        <div className="home" style={{ backgroundColor: "#007ead" }}>
            <div className="container">
                <img src="./7.png" />
                <h1> WAVFORM </h1>
                <p>A New Tool For Music Production</p>
                <button onClick={handleWelcomeNav} className="enter">
                    <FaPlay
                        style={{
                            height: "30px",
                            "--fa-animation-duration": ".5s",
                            "--fa-beat-scale": "2.0",
                        }}
                    />
                </button>
            </div>
        </div>
    );
}

export default Homes;
