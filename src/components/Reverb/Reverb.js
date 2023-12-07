import React from "react";
import * as Tone from "tone";
import "./Reverb.scss";
function Reverb({
    setReverbValues,
    reverbValues,
    setReverb,
    reverb,
    handleMouseOver,
    handleMouseOut,
    displayTooltip,
    tooltipPosition,
}) {
    const moreInfo = ["reverb", "reverb-time", "reverb-size", "reverb-amount"];
    const moreInfoFaqs = [
        "Reverb is what gives sound space. Make your instrument sound like it is inside a room or church using this.",
        "Time is the amount of milliseconds before a sound reverberates, essentially like an echo.",
        "Size is how big of a space the reverb is trying to emulate, lower = room or garage, higher = church or cave.",
        "Amount is the ratio of reverb being used compared to the 'dry' signal, the sound with no reverb.",
    ];
    const initialValues = {
        timeValue: 1,
        sizeValue: 1,
        amountValue: 1,
    };

    // const [values, setValues] = useState(initialValues);

    const applyReverb = () => {
        // Reverb effect
        reverb.dispose();
        setReverb(
            new Tone.Reverb({
                decay: reverbValues?.timeValue / 10,
                preDelay: reverbValues?.sizeValue / 10,
                wet: reverbValues?.amountValue / 100,
            }).toDestination()
        );

        // Oscillator
        // const oscillator = new Tone.Oscillator(440, "sine").connect(reverb);

        // Start the oscillator
        // oscillator.start();

        // Stop the oscillator
        // setTimeout(() => {
        //     oscillator.stop();
        // }, 3000); // duration
    };

    //  // sound
    //   const playSound = () => {
    //     const synth = new Tone.Synth().toDestination();
    //     synth.triggerAttackRelease("C4", "8n");
    //   };

    const valueHandler = (e) => {
        const { name, value } = e.target;
        setReverbValues({ ...reverbValues, [name]: parseFloat(value) });
    };

    const resetValues = () => {
        setReverbValues(initialValues);
    };

    // useEffect(() => {
    //     reverb.decay.value = reverbValues.sizeValue * 0.1;
    //     reverb.preDelay.value = reverbValues.timeValue * 0.1;
    //     reverb.wet.value = reverbValues.amountValue * 0.01;
    // }, [reverbValues, reverb.decay, reverb.preDelay, reverb.wet]);

    return (
        <div className="reverb">
            <h2 className="reverb-header">
                Reverb{" "}
                <span
                    className="tooltip-trigger"
                    onMouseOver={() => handleMouseOver("reverb")}
                    onMouseOut={() => handleMouseOut("reverb")}
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
            <div className="reverb-header__timediv">
                <input
                    type="range"
                    min="1"
                    max="10"
                    value={reverbValues?.timeValue}
                    className="reverb-slider"
                    name="timeValue"
                    onChange={valueHandler}
                />
            </div>
            <span className="reverb-time">
                Time{" "}
                <span
                    className="tooltip-trigger"
                    onMouseOver={() => handleMouseOver("reverb-time")}
                    onMouseOut={() => handleMouseOut("reverb-time")}
                >
                    ?
                </span>
            </span>
            <div className="reverb-header__sizediv">
                <input
                    type="range"
                    min="1"
                    max="10"
                    value={reverbValues?.sizeValue}
                    className="reverb-slider"
                    name="sizeValue"
                    onChange={valueHandler}
                />
            </div>
            <span className="reverb-size">
                Size{" "}
                <span
                    className="tooltip-trigger"
                    onMouseOver={() => handleMouseOver("reverb-size")}
                    onMouseOut={() => handleMouseOut("reverb-size")}
                >
                    ?
                </span>
            </span>
            <div className="reverb-header__amountdiv">
                <input
                    type="range"
                    min="1"
                    max="100"
                    value={reverbValues?.amountValue}
                    className="reverb-slider"
                    name="amountValue"
                    onChange={valueHandler}
                />
            </div>{" "}
            <span className="reverb-amount">
                Amount{" "}
                <span
                    className="tooltip-trigger"
                    onMouseOver={() => handleMouseOver("reverb-amount")}
                    onMouseOut={() => handleMouseOut("reverb-amount")}
                >
                    ?
                </span>
            </span>
            <div className="reverb-header__btndiv">
                <button className="reverb_button" onClick={resetValues}>
                    Reset
                </button>
                <button className="reverb_button" onClick={applyReverb}>
                    Apply
                </button>
            </div>
        </div>
    );
}

export default Reverb;
