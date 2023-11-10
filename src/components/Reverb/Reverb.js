import React, { useState } from "react";
import * as Tone from "tone";
import "./Reverb.scss";
function Reverb() {
    const initialValues = {
        timeValue: 1,
        sizeValue: 1,
        amountValue: 1,
    };

    const [values, setValues] = useState(initialValues);

    const applyReverb = () => {
        // Reverb effect
        const reverb = new Tone.Reverb({
            decay: values.timeValue / 10,
            preDelay: values.sizeValue / 10,
            wet: values.amountValue / 100,
        }).toDestination();

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
        setValues({ ...values, [name]: parseFloat(value) });
    };

    const resetValues = () => {
        setValues(initialValues);
    };

    return (
        <div className="reverb">
            <h2 className="reverb-header">Reverb</h2>
            <div className="reverb-header__timediv">
                <input
                    type="range"
                    min="1"
                    max="10"
                    value={values.timeValue}
                    className="reverb-slider"
                    name="timeValue"
                    onChange={valueHandler}
                />
            </div>
            <span className="reverb-time">Time</span>
            <div className="reverb-header__sizediv">
                <input
                    type="range"
                    min="1"
                    max="10"
                    value={values.sizeValue}
                    className="reverb-slider"
                    name="sizeValue"
                    onChange={valueHandler}
                />
            </div>
            <span className="reverb-size">Size</span>
            <div className="reverb-header__amountdiv">
                <input
                    type="range"
                    min="1"
                    max="100"
                    value={values.amountValue}
                    className="reverb-slider"
                    name="amountValue"
                    onChange={valueHandler}
                />
            </div>{" "}
            <span className="reverb-amount">Amount</span>
            <div className="reverb-header__btndiv">
                <button className="reverb-btn" onClick={resetValues}>
                    Reset
                </button>
                <button className="reverb-btn" onClick={applyReverb}>
                    Apply
                </button>
            </div>
        </div>
    );
}

export default Reverb;
