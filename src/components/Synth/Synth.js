import React, { useState } from "react";
//import * as Tone from "tone";
import "./Synth.css";

function Synth() {
    //const [synth, setSynth] = useState(null);
    const [note, setNote] = useState("A4");
    const [oscillatorType, setOscillatorType] = useState("sine");

    const synthTypes = ["sine", "square", "triangle", "sawtooth"];

    const notes = [
        "A1",
        "B1",
        "C1",
        "D1",
        "E1",
        "F1",
        "G1",
        "A2",
        "B2",
        "C2",
        "D2",
        "E2",
        "F2",
        "G2",
        "A3",
        "B3",
        "C3",
        "D3",
        "E3",
        "F3",
        "G3",
        "A4",
        "B4",
        "C4",
        "D4",
        "E4",
        "F4",
        "G4",
        "A5",
        "B5",
        "C5",
        "D5",
        "E5",
        "F5",
        "G5",
        "A6",
        "B6",
        "C6",
        "D6",
        "E6",
        "F6",
        "G6",
        "A7",
        "B7",
        "C7",
        "D7",
        "E7",
        "F7",
        "G7",
        "A8",
        "B8",
        "C8",
        "D8",
        "E8",
        "F8",
        "G8",
    ];

    // const createSynth = () => {
    //     const newSynth = new Tone.Synth({
    //         oscillator: {
    //             type: oscillatorType,
    //         },
    //         envelope: {
    //             attack: 0.8,
    //             decay: 0.5,
    //             sustain: 0.6,
    //             release: 1,
    //         },
    //     }).toDestination();

    //     newSynth.triggerAttackRelease(note, 1);
    //     setSynth(newSynth);
    // };

    return (
        <div className="synth-container">
            <div>
                <label>Choose Oscillator Type:</label>
                {synthTypes.map((type) => (
                    <button
                        key={type}
                        className={
                            oscillatorType === type
                                ? "active-button"
                                : "buttons"
                        }
                        onClick={() => setOscillatorType(type)}
                    >
                        {type}
                    </button>
                ))}
            </div>
            <div>
                <label>Select Note:</label>
                <select value={note} onChange={(e) => setNote(e.target.value)}>
                    {notes.map((selectedNote) => (
                        <option key={selectedNote} value={selectedNote}>
                            {selectedNote}
                        </option>
                    ))}
                </select>
            </div>
            {/* onClick={createSynth}*/}
            <button className="buttons">Play</button>
            <div> Current Note: {note} </div>
            <div>Current Wavform: {oscillatorType} </div>
        </div>
    );
}

export default Synth;
