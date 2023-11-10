import React, { useState, useEffect } from "react";
import "./MusicTool.scss";
import * as Tone from "tone";

const Synth = React.lazy(() => import("../Synth/Synth"));
const Reverb = React.lazy(() => import("../Reverb/Reverb"));
const Sequencer = React.lazy(() => import("../Step Sequencer/StepSequencer"));
const Delay = React.lazy(() => import("../Delay/Delay"));
const Sampler = React.lazy(() => import("../Sampler/NotesSampler"));

function MusicTool() {
    const [sequencer, setSequencer] = useState({
        beat: 0,
        notes: ["F4", "D#4", "D4", "C4", "A#3", "G#3", "G3", "F3"],
        playing: false,
        started: false,
        tempo: 120,
    });

    const [synthArray, setSynthArray] = useState([]);

    const [oscillatorType, setOscillatorType] = useState("sine");
    let synths = [];

    const player = new Tone.Player();
    const createSynths = (count) => {
        const newSynths = [];
        for (let i = 0; i < count; i++) {
            const newSynth = new Tone.Synth({
                oscillator: {
                    type: oscillatorType,
                },
                envelope: {
                    attack: 0.8,
                    decay: 0.5,
                    sustain: 0.6,
                    release: 1,
                },
            }).toDestination();
            newSynths.push(newSynth);
        }

        setSynthArray(newSynths);
    };

    useEffect(() => {
        createSynths(8);
    }, []);

    useEffect(() => {
        setSynthArray([]);
        createSynths(8);
    }, [oscillatorType]);

    return (
        <div className="musictool">
            <div className="musictool_header">
                <select
                    name="handler"
                    onChange={(e) => {
                        synths = synthArray;
                        for (let i = 0; i < synths.length; i++) {
                            synths[i].set({
                                oscillator: { type: e.target.value },
                            });
                        }
                        setSynthArray(synths);
                        setOscillatorType(e.target.value);
                    }}
                >
                    <option>sine</option>
                    <option>triangle</option>
                    <option>square</option>
                    <option>sawtooth</option>
                </select>
                <select>
                    <option>Sampler</option>
                </select>
                <select>
                    <option>Drums/Sounds</option>
                </select>
            </div>
            <div className="musictool_side">Notes / Sounds</div>
            <div className="musictool_sequencer">
                <Sequencer
                    synthArray={synthArray}
                    sequencer={sequencer}
                    setSequencer={setSequencer}
                    player={player}
                    createSynths={createSynths}
                    setSynthArray={setSynthArray}
                />
            </div>
            <div className="musictool_effects">
                <h3>Effects</h3>
            </div>
            <div className="musictool_reverb">
                <Reverb />
            </div>
            <div className="musictool_delay">
                <Delay />
            </div>
        </div>
    );
}

export default MusicTool;
