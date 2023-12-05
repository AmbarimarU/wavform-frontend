import { useState, useEffect } from "react";
import "./Delay.scss";
import * as Tone from "tone";
function Delay({
    delay,
    setDelay,
    delayValues,
    setDelayValues,
    handleMouseOver,
    handleMouseOut,
    displayTooltip,
    tooltipPosition,
}) {
    const moreInfo = ["delay", "delay-time", "delay-feedback", "delay-amount"];
    const moreInfoFaqs = [
        "Additional information goes here for delay!",
        "Additional information goes here for delay time!",
        "Additional information goes here for delay feedback!",
        "Additional information goes here for delay amount!",
    ];
    const initialDelayValues = {
        dTime: 0,
        dAmount: 0,
        dFeedback: 0,
    };
    // const [formData, setFormData] = useState(initialFormData);
    //const [isPlaying, setIsPlaying] = useState(false);
    // async function loadAudio() {
    //     try {
    //         await player.load("https://tonejs.github.io/audio/loop/FWDL.mp3");
    //     } catch (error) {
    //         console.error("Error loading audio file:", error);
    //     }
    // }

    // const player = new Tone.Player();
    // player.volume.value = formData.dAmount;
    // const feedbackDelay = new Tone.FeedbackDelay({
    //     delayTime: formData.dTime * 0.01,
    //     feedback: formData.dFeedback * 0.01,
    // });
    // player.connect(feedbackDelay);
    // feedbackDelay.toDestination();
    const applyDelay = (e) => {
        e.preventDefault();
        // if (Tone.context.state === "suspended") {
        //     Tone.context.resume().then(() => {
        //         player.start();
        //     });
        // } else {
        //     player.start();
        // }
        delay.dispose();
        setDelay(
            new Tone.FeedbackDelay({
                delayTime: delayValues.dTime * 0.01,
                feedback: delayValues.dFeedback * 0.01,
            })
        );
    };

    // useEffect(() => {
    //     loadAudio();
    // }, [player]);

    useEffect(() => {
        delay.delayTime.value = delayValues.dTime * 0.01;
        delay.feedback.value = delayValues.dFeedback * 0.01;
    }, [delayValues, delay.delayTime, delay.feedback]);
    return (
        <div className="delay">
            <h2 className="delay_header">
                Delay{" "}
                <span
                    className="tooltip-trigger"
                    onMouseOver={() => handleMouseOver("delay")}
                    onMouseOut={() => handleMouseOut("delay")}
                >
                    ?
                </span>
            </h2>
            {moreInfo &&
                moreInfo.map((page, index) => (
                    <div
                        className="tooltip-box"
                        id="tooltip-box"
                        key={page}
                        style={{
                            display: `${
                                displayTooltip[page] ? "block" : "none"
                            }`,
                            position: "absolute",
                            backgroundColor: "#f9f9f9",
                            border: "1px solid #ccc",
                            padding: "10px",
                            borderRadius: "5px",
                            boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
                            zIndex: "9999",
                            left: `${tooltipPosition.x}px`,
                            top: `${tooltipPosition.y}px`,
                        }}
                    >
                        <p>{moreInfoFaqs[index]}</p>
                    </div>
                ))}
            <div className="delay_slider1">
                <input
                    type="range"
                    min="0"
                    max="60"
                    value={delayValues.dTime}
                    name="dTime"
                    className="delay_slider"
                    onChange={(e) =>
                        setDelayValues((prevFormData) => ({
                            ...prevFormData,
                            [e.target.name]: e.target.value,
                        }))
                    }
                />
            </div>
            <span className="delay_time">
                Time{" "}
                <span
                    className="tooltip-trigger"
                    onMouseOver={() => handleMouseOver("delay-time")}
                    onMouseOut={() => handleMouseOut("delay-time")}
                >
                    ?
                </span>
            </span>
            <div className="delay_slider2">
                <input
                    type="range"
                    min="0"
                    max="60"
                    value={delayValues.dFeedback}
                    className="delay_slider"
                    name="dFeedback"
                    onChange={(e) =>
                        setDelayValues((prevFormData) => ({
                            ...prevFormData,
                            [e.target.name]: e.target.value,
                        }))
                    }
                />
            </div>
            <span className="delay_feedback">
                Feedback{" "}
                <span
                    className="tooltip-trigger"
                    onMouseOver={() => handleMouseOver("delay-feedback")}
                    onMouseOut={() => handleMouseOut("delay-feedback")}
                >
                    ?
                </span>
            </span>
            <div className="delay_slider3">
                <input
                    type="range"
                    min="-60"
                    max="6"
                    step="1"
                    value={delayValues.dAmount}
                    className="delay_slider"
                    name="dAmount"
                    onChange={(e) =>
                        setDelayValues((prevFormData) => ({
                            ...prevFormData,
                            [e.target.name]: e.target.value,
                        }))
                    }
                />
            </div>
            <span className="delay_amount">
                Amount{" "}
                <span
                    className="tooltip-trigger"
                    onMouseOver={() => handleMouseOver("delay-amount")}
                    onMouseOut={() => handleMouseOut("delay-amount")}
                >
                    ?
                </span>
            </span>
            <div className="delay_submit">
                <button
                    className="delay_button"
                    onClick={(e) => {
                        setDelayValues(initialDelayValues);
                        // player.stop();
                    }}
                >
                    Reset
                </button>{" "}
                <button className="delay_button" onClick={(e) => applyDelay(e)}>
                    Apply
                </button>
            </div>
        </div>
    );
}

export default Delay;
