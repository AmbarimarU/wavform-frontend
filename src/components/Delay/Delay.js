import { useState, useEffect } from "react";
import "./Delay.scss";
import * as Tone from "tone";
function Delay() {
    const initialFormData = {
        dTime: 0,
        dAmount: 0,
        dFeedback: 0,
    };
    const [formData, setFormData] = useState(initialFormData);
    //const [isPlaying, setIsPlaying] = useState(false);
    async function loadAudio() {
        try {
            await player.load("https://tonejs.github.io/audio/loop/FWDL.mp3");
        } catch (error) {
            console.error("Error loading audio file:", error);
        }
    }

    const player = new Tone.Player();
    player.volume.value = formData.dAmount;
    const feedbackDelay = new Tone.FeedbackDelay({
        delayTime: formData.dTime * 0.01,
        feedback: formData.dFeedback * 0.01,
    });
    player.connect(feedbackDelay);
    feedbackDelay.toDestination();
    const applyDelay = (e) => {
        e.preventDefault();
        if (Tone.context.state === "suspended") {
            Tone.context.resume().then(() => {
                player.start();
            });
        } else {
            player.start();
        }
    };

    useEffect(() => {
        loadAudio();
    }, [player]);

    useEffect(() => {
        feedbackDelay.delayTime.value = formData.dTime * 0.01;
        feedbackDelay.feedback.value = formData.dFeedback * 0.01;
    }, [formData, feedbackDelay.delayTime, feedbackDelay.feedback]);
    return (
        <div className="delay">
            <h2 className="delay_header">Delay</h2>
            <div className="delay_slider1">
                <input
                    type="range"
                    min="0"
                    max="60"
                    value={formData.dTime}
                    name="dTime"
                    className="delay_slider"
                    onChange={(e) =>
                        setFormData((prevFormData) => ({
                            ...prevFormData,
                            [e.target.name]: e.target.value,
                        }))
                    }
                />
            </div>
            <span className="delay_time">Time</span>
            <div className="delay_slider2">
                <input
                    type="range"
                    min="0"
                    max="60"
                    value={formData.dFeedback}
                    className="delay_slider"
                    name="dFeedback"
                    onChange={(e) =>
                        setFormData((prevFormData) => ({
                            ...prevFormData,
                            [e.target.name]: e.target.value,
                        }))
                    }
                />
            </div>
            <span className="delay_feedback">Feedback</span>
            <div className="delay_slider3">
                <input
                    type="range"
                    min="-60"
                    max="6"
                    step="1"
                    value={formData.dAmount}
                    className="delay_slider"
                    name="dAmount"
                    onChange={(e) =>
                        setFormData((prevFormData) => ({
                            ...prevFormData,
                            [e.target.name]: e.target.value,
                        }))
                    }
                />
            </div>
            <span className="delay_amount">Amount</span>
            <div className="delay_submit">
                <button
                    className="delay_button"
                    onClick={(e) => {
                        setFormData(initialFormData);
                        player.stop();
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
