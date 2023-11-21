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

  const [grid, setGrid] = useState([]);

  const initialReverbValues = {
    timeValue: 1,
    sizeValue: 1,
    amountValue: 1,
  };

  const [reverbValues, setReverbValues] = useState(initialReverbValues);

  const initialDelayValues = {
    dTime: 0,
    dAmount: 0,
    dFeedback: 0,
  };
  const [delayValues, setDelayValues] = useState(initialDelayValues);

  const [reverb, setReverb] = useState(
    new Tone.Reverb({
      decay: reverbValues.timeValue / 10,
      preDelay: reverbValues.sizeValue / 10,
      wet: reverbValues.amountValue / 100,
    }).toDestination()
  );

  const [delay, setDelay] = useState(
    new Tone.FeedbackDelay({
      delayTime: delayValues.dTime * 0.01,
      feedback: delayValues.dFeedback * 0.01,
    })
  );

  const [synthArray, setSynthArray] = useState([]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [oscillatorType, setOscillatorType] = useState("sine");
  let synths = [];

  const createSynths = (count) => {
    synths = [];

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
      }).chain(delay, reverb, Tone.Destination);
      synths.push(newSynth);
    }

    setSynthArray(synths);
  };

  useEffect(() => {
    createSynths(8);
  }, []);

  useEffect(() => {
    setSynthArray([]);
    createSynths(8);
  }, [oscillatorType]);

  useEffect(() => {
    if (sequencer.started) {
      for (let i = 0; i < synthArray.length; i++) {
        synthArray[i].chain(delay, reverb, Tone.Destination);
      }
    }
  }, [reverb, delay, synthArray]);

  return (
    <div className="musictool">
      <div className="musictool_header">
        <select
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
          disabled={isPlaying ? 1 : 0}
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
          setIsPlaying={setIsPlaying}
          grid={grid}
          setGrid={setGrid}
        />
      </div>
      <div className="musictool_effects">
        <h3>Effects</h3>
      </div>
      <div className="musictool_reverb">
        <Reverb
          reverbValues={reverbValues}
          setReverbValues={setReverbValues}
          setReverb={setReverb}
          reverb={reverb}
        />
      </div>
      <div className="musictool_delay">
        <Delay
          delay={delay}
          setDelay={setDelay}
          delayValues={delayValues}
          setDelayValues={setDelayValues}
        />
      </div>
    </div>
  );
}

export default MusicTool;