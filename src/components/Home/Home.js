import React from "react";
//   import wavform from './7h5r .gif'
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Homes() {
    const navigate = useNavigate();
    function handleWelcomeNav() {
        navigate("/welcome");
    }
    return (
        <div className="home" style={{ backgroundColor: "rgb(40, 40, 40)" }}>
            <div className="container">
                {/* <img src={wavform} alt="wavform" />
                <h1 className="home-heading"> WAVFORM </h1> */}
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
