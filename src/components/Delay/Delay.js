import { useEffect } from "react";
import "./Delay.scss";
//import * as Tone from "tone";
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
    //const moreInfo = ["delay", "delay-time", "delay-feedback", "delay-amount"];
    // const moreInfoFaqs = [
    //     "Delay causes your sound to echo a certain amount of times. It can create some cool sounds!",
    //     "Time is the amount of time (milliseconds) between each echo.",
    //     "Feedback makes the echos happen more than once, creating a long 'tail' of sound.",
    //     "Additional information goes here for delay amount!",
    // ];
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
    // const applyDelay = (e) => {
    //     e.preventDefault();
    //     // if (Tone.context.state === "suspended") {
    //     //     Tone.context.resume().then(() => {
    //     //         player.start();
    //     //     });
    //     // } else {
    //     //     player.start();
    //     // }
    //     delay.dispose();
    //     setDelay(
    //         new Tone.FeedbackDelay({
    //             delayTime: delayValues.dTime * 0.01,
    //             feedback: delayValues.dFeedback * 0.01,
    //         })
    //     );
    // };

    // useEffect(() => {
    //     loadAudio();
    // }, [player]);

    useEffect(() => {
        delay.delayTime.value = delayValues.dTime * 0.01;
        delay.feedback.value = delayValues.dFeedback * 0.01;
    }, [delayValues, delay.delayTime, delay.feedback]);
    return (
        <div className="delay">
            <h6 className="delay_header">
                Delay{" "}
                <div class="tooltip-container">
                    <span class="tooltip-trigger">?</span>
                    <span class="toolbox">
                        Delay is like an echo. It repeats the sound after a
                        certain amount of time.
                        <br />
                        <br />
                        <span style={{ fontWeight: "bold" }}>Time:</span> The
                        amount of milliseconds before a sound repeats.
                        <br />
                        <br />
                        <span style={{ fontWeight: "bold" }}>
                            Feedback:
                        </span>{" "}
                        The amount of time the sound repeats.
                        <br />
                    </span>
                </div>
            </h6>
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
            <span className="delay_time">Time </span>
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
            <span className="delay_feedback">Feedback </span>
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
            </div>
        </div>
    );
}

export default Delay;
