import { useState } from "react";
import "./Delay.css";
function Delay() {
    const initialFormData = {
        dTime: 75,
        dAmount: 50,
        dFeedback: 100,
    };
    const [formData, setFormData] = useState(initialFormData);
    return (
        <div className="delay">
            <h2 className="header">Delay</h2>
            <div className="slider1">
                <input
                    type="range"
                    min="1"
                    max="100"
                    value={formData.dTime}
                    name="dTime"
                    className="slider"
                    onChange={(e) =>
                        setFormData((prevFormData) => ({
                            ...prevFormData,
                            [e.target.name]: e.target.value,
                        }))
                    }
                />
            </div>
            <span className="time">Time</span>
            <div className="slider2">
                <input
                    type="range"
                    min="1"
                    max="100"
                    value={formData.dFeedback}
                    className="slider"
                    name="dFeedback"
                    onChange={(e) =>
                        setFormData((prevFormData) => ({
                            ...prevFormData,
                            [e.target.name]: e.target.value,
                        }))
                    }
                />
            </div>
            <span className="feedback">Feedback</span>
            <div className="slider3">
                <input
                    type="range"
                    min="1"
                    max="100"
                    value={formData.dAmount}
                    className="slider"
                    name="dAmount"
                    onChange={(e) =>
                        setFormData((prevFormData) => ({
                            ...prevFormData,
                            [e.target.name]: e.target.value,
                        }))
                    }
                />
            </div>
            <span className="amount">Amount</span>
            <div className="submit">
                <input
                    type="submit"
                    value="Reset"
                    className="button"
                    onClick={(e) => setFormData(initialFormData)}
                />{" "}
                <input type="submit" className="button" value="Apply" />
            </div>
        </div>
    );
}

export default Delay;
