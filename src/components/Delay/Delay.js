import { useState, useEffect } from "react";
import "./Delay.css";
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
            <h2 className="header">Delay</h2>
            <div className="slider1">
                <input
                    type="range"
                    min="0"
                    max="60"
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
                    min="0"
                    max="60"
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
                    min="-60"
                    max="6"
                    step="1"
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
                    onClick={(e) => {
                        setFormData(initialFormData);
                        player.stop();
                    }}
                />{" "}
                <input
                    type="submit"
                    className="button"
                    value="Apply"
                    onClick={(e) => applyDelay(e)}
                />
            </div>
        </div>
    );
}

export default Delay;
