import React from "react";
import "./MusicTool.scss";
const Synth = React.lazy(() => import("../Synth/Synth"));
const Reverb = React.lazy(() => import("../Reverb/Reverb"));
const Sequencer = React.lazy(() => import("../Step Sequencer/StepSequencer"));
const Delay = React.lazy(() => import("../Delay/Delay"));
const Sampler = React.lazy(() => import("../Sampler/NotesSampler"));

function MusicTool() {
    return (
        <div className="musictool">
            <div className="musictool_header">
                <select>
                    <option>Synth</option>
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
                <Sequencer />
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
