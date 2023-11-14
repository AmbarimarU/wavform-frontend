import React, { useState, useEffect } from "react";
import * as Tone from "tone";
import "./Reverb.scss";
function Reverb({ setReverbValues, reverbValues, setReverb, reverb }) {
    const initialValues = {
        timeValue: 1,
        sizeValue: 1,
        amountValue: 1,
    };

    // const [values, setValues] = useState(initialValues);

    const applyReverb = () => {
        // Reverb effect
        reverb.dispose()
        setReverb(new Tone.Reverb({
            decay: reverbValues?.timeValue / 10,
            preDelay: reverbValues?.sizeValue / 10,
            wet: reverbValues?.amountValue / 100,
        }).toDestination());

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
            <h2 className="reverb-header">Reverb</h2>
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
            <span className="reverb-time">Time</span>
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
            <span className="reverb-size">Size</span>
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
