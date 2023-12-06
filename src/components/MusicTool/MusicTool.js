import React, { useState, useEffect } from "react";
import "./MusicTool.scss";
import * as Tone from "tone";
const Synth = React.lazy(() => import("../Synth/Synth"));
const Reverb = React.lazy(() => import("../Reverb/Reverb"));
const Sequencer = React.lazy(() => import("../Step Sequencer/StepSequencer"));
const Delay = React.lazy(() => import("../Delay/Delay"));
const Sampler = React.lazy(() => import("../Sampler/NotesSampler"));

function MusicTool() {
    const [displayTooltip, setDisplayTooltip] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const handleMouseMove = (e) => {
        const offsetX = -150;
        const offsetY = -100;

        setTooltipPosition({ x: e.pageX + offsetX, y: e.pageY + offsetY });
    };

    useEffect(() => {
        document.addEventListener("mousemove", handleMouseMove);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);
    const handleMouseOver = (section) => {
        setDisplayTooltip((prevState) => ({
            ...prevState,
            [section]: true,
        }));
    };

    const handleMouseOut = (section) => {
        setDisplayTooltip((prevState) => ({
            ...prevState,
            [section]: false,
        }));
    };
    const [sequencer, setSequencer] = useState({
        beat: 0,
        notes: ["F4", "D#4", "D4", "C4", "A#3", "G#3", "G3", "F3"],
        playing: false,
        started: false,
        tempo: 120,
        transposition: 0,
    });

    const [octaves, setOctaves] = useState({
        synth: 0,
        sampler1: 0,
        sampler2: -1,
    });

    const [grid1, setGrid1] = useState([]);
    const [grid2, setGrid2] = useState([]);
    const [grid3, setGrid3] = useState([]);

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
        loadSamplers(8);
    }, []);

    //   useEffect(() => {
    //     setSynthArray([]);
    //     createSynths(8);
    //   }, [oscillatorType]);

    const [samplerArray1, setSamplerArray1] = useState([]);
    const [samplerArray2, setSamplerArray2] = useState([]);

    const samples = {
        piano: {
            A1: require("./audio/piano/A1.mp3"),
            A2: require("./audio/piano/A2.mp3"),
            A3: require("./audio/piano/A3.mp3"),
            A4: require("./audio/piano/A4.mp3"),
            A5: require("./audio/piano/A5.mp3"),
        },
        epiano: {
            A1: require("./audio/epiano/A1.mp3"),
            A2: require("./audio/epiano/A2.mp3"),
            A3: require("./audio/epiano/A3.mp3"),
            A4: require("./audio/epiano/A4.mp3"),
            A5: require("./audio/epiano/A5.mp3"),
        },
        bell: {
            A1: require("./audio/bell/A1.mp3"),
            A2: require("./audio/bell/A2.mp3"),
            A3: require("./audio/bell/A3.mp3"),
            A4: require("./audio/bell/A4.mp3"),
            A5: require("./audio/bell/A5.mp3"),
        },
        harp: {
            A1: require("./audio/harp/A1.mp3"),
            A2: require("./audio/harp/A2.mp3"),
            A3: require("./audio/harp/A3.mp3"),
            A4: require("./audio/harp/A4.mp3"),
            A5: require("./audio/harp/A5.mp3"),
        },
        vox: {
            A1: require("./audio/vox/A1.mp3"),
            A2: require("./audio/vox/A2.mp3"),
            A3: require("./audio/vox/A3.mp3"),
            A4: require("./audio/vox/A4.mp3"),
            A5: require("./audio/vox/A5.mp3"),
        },
        808: {
            F4: require("./audio/808/808 Clap.wav"),
            "D#4": require("./audio/808/808 Hat.wav"),
            D4: require("./audio/808/808 Kick.wav"),
            C4: require("./audio/808/808 Maraca.wav"),
            "A#3": require("./audio/808/808 Rimshot.wav"),
            "G#3": require("./audio/808/808 Snare.wav"),
            G3: require("./audio/808/808 Tom Hi.wav"),
            F3: require("./audio/808/808 Tom Low.wav"),
        },
        909: {
            F4: require("./audio/909/909 Clap.wav"),
            "D#4": require("./audio/909/909 Hat Closed.wav"),
            D4: require("./audio/909/909 Hat Open.wav"),
            C4: require("./audio/909/909 Kick.wav"),
            "A#3": require("./audio/909/909 Rim Shot.wav"),
            "G#3": require("./audio/909/909 Snare.wav"),
            G3: require("./audio/909/909 Tom Hi .wav"),
            F3: require("./audio/909/909 Tom Low.wav"),
        },
    };

    const loadSamplers = (count) => {
        let samplers = [];

        for (let i = 0; i < count; i++) {
            let newSampler = new Tone.Sampler(samples.piano).chain(
                delay,
                reverb,
                Tone.Destination
            );
            samplers.push(newSampler);
        }

        setSamplerArray1(samplers);

        samplers = [];

        for (let i = 0; i < count; i++) {
            let newSampler = new Tone.Sampler(samples.harp).chain(
                delay,
                reverb,
                Tone.Destination
            );
            samplers.push(newSampler);
        }

        setSamplerArray2(samplers);
    };

    useEffect(() => {
        if (sequencer.started) {
            for (let i = 0; i < synthArray.length; i++) {
                synthArray[i].chain(delay, reverb, Tone.Destination);
                samplerArray1[i].chain(delay, reverb, Tone.Destination);
                samplerArray2[i].chain(delay, reverb, Tone.Destination);
            }
        }
    }, [
        reverb,
        delay,
        synthArray,
        samplerArray1,
        samplerArray2,
        oscillatorType,
    ]);

    const handlePlayButton = async (e) => {
        // toggle Tone.Trasport and the flag variable.
        if (sequencer.playing) {
            Tone.Transport.stop();
            setSequencer({
                ...sequencer,
                playing: false,
            });
            setIsPlaying(false);
        } else {
            Tone.Transport.start();
            setSequencer({
                ...sequencer,
                playing: true,
            });
            setIsPlaying(true);
        }
    };

    useEffect(() => {
        if (sequencer.started && sequencer.playing) {
            Tone.Transport.stop();
            Tone.Transport.start();
        }
    }, [octaves]);

    const handleOctaveChange = (e) => {
        let id = e.target.id;

        if (id === "synth-octave") {
            setOctaves({
                ...octaves,
                synth: e.target.value,
            });
        } else if (id === "sampler1-octave") {
            setOctaves({
                ...octaves,
                sampler1: e.target.value,
            });
        } else {
            setOctaves({
                ...octaves,
                sampler2: e.target.value,
            });
        }
    };

    return (
        <div className="musictool">
            <div className="musictool_header">
                <button
                    className="musictool_selector"
                    onClick={(e) => {
                        let synthSequencer = document.getElementsByClassName(
                            "musictool_sequencer"
                        )[0];
                        let sampler1Sequencer = document.getElementsByClassName(
                            "musictool_sequencer2"
                        )[0];
                        let sampler2Sequencer = document.getElementsByClassName(
                            "musictool_sequencer3"
                        )[0];

                        let synthOctave =
                            document.getElementsByClassName("synth_octave")[0];
                        let sampler1Octave =
                            document.getElementsByClassName(
                                "sampler1_octave"
                            )[0];
                        let sampler2Octave =
                            document.getElementsByClassName(
                                "sampler2_octave"
                            )[0];

                        if (e.target.innerText === "Synth") {
                            e.target.innerText = "Sampler 1";

                            synthSequencer.style.visibility = "hidden";
                            sampler2Sequencer.style.visibility = "hidden";

                            synthOctave.style.visibility = "hidden";
                            sampler2Octave.style.visibility = "hidden";

                            sampler1Sequencer.style.visibility = "visible";
                            sampler1Octave.style.visibility = "visible";
                        } else if (e.target.innerText === "Sampler 1") {
                            e.target.innerText = "Sampler 2";

                            synthSequencer.style.visibility = "hidden";
                            sampler1Sequencer.style.visibility = "hidden";

                            synthOctave.style.visibility = "hidden";
                            sampler1Octave.style.visibility = "hidden";

                            sampler2Sequencer.style.visibility = "visible";
                            sampler2Octave.style.visibility = "visible";
                        } else {
                            e.target.innerText = "Synth";

                            sampler1Sequencer.style.visibility = "hidden";
                            sampler2Sequencer.style.visibility = "hidden";

                            sampler1Octave.style.visibility = "hidden";
                            sampler2Octave.style.visibility = "hidden";

                            synthSequencer.style.visibility = "visible";
                            synthOctave.style.visibility = "visible";
                        }
                    }}
                >
                    Synth
                </button>
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
                <select
                    onChange={(e) => {
                        let oldSamplers = samplerArray1;

                        for (let sampler of oldSamplers) {
                            sampler.dispose();
                        }

                        let newSamplers = [];

                        for (let i = 0; i < sequencer.notes.length; i++) {
                            let newSampler = new Tone.Sampler(
                                samples[e.target.value.toLowerCase()]
                            ).chain(delay, reverb, Tone.Destination);
                            newSamplers.push(newSampler);
                        }
                        setSamplerArray1(newSamplers);
                    }}
                    disabled={isPlaying ? 1 : 0}
                >
                    <option>Piano</option>
                    <option>Bell</option>
                    <option>Epiano</option>
                    <option>Harp</option>
                    <option>Vox</option>
                    <option>808</option>
                    <option>909</option>
                </select>
                <select
                    onChange={(e) => {
                        let oldSamplers = samplerArray2;

                        for (let sampler of oldSamplers) {
                            sampler.dispose();
                        }

                        let newSamplers = [];

                        for (let i = 0; i < sequencer.notes.length; i++) {
                            let newSampler = new Tone.Sampler(
                                samples[e.target.value.toLowerCase()]
                            ).chain(delay, reverb, Tone.Destination);
                            newSamplers.push(newSampler);
                        }
                        setSamplerArray2(newSamplers);
                    }}
                    disabled={isPlaying ? 1 : 0}
                >
                    <option>Piano</option>
                    <option>Bell</option>
                    <option>Epiano</option>
                    <option selected="selected">Harp</option>
                    <option>Vox</option>
                    <option>808</option>
                    <option>909</option>
                </select>
            </div>
            <div className="musictool_side">Notes / Sounds</div>
            <div className="musictool_sequencer">
                {" "}
                <label htmlFor="synth-octave">Octave</label>
                <input
                    id="synth-octave"
                    className="synth_octave"
                    type="number"
                    min="-2"
                    max="2"
                    value={octaves.synth}
                    onInput={(e) => handleOctaveChange(e)}
                    disabled={isPlaying ? 1 : 0}
                />
                <Sequencer
                    instrumentArray={synthArray}
                    sequencer={sequencer}
                    setSequencer={setSequencer}
                    grid={grid1}
                    setGrid={setGrid1}
                    octave={octaves.synth}
                />
            </div>
            <div className="musictool_sequencer2">
                {" "}
                <label htmlFor="sampler1-octave">Octave</label>
                <input
                    id="sampler1-octave"
                    className="sampler1_octave"
                    type="number"
                    min="-2"
                    max="2"
                    value={octaves.sampler1}
                    onInput={(e) => handleOctaveChange(e)}
                />
                <Sequencer
                    instrumentArray={samplerArray1}
                    sequencer={sequencer}
                    setSequencer={setSequencer}
                    grid={grid2}
                    setGrid={setGrid2}
                    octave={octaves.sampler1}
                />
            </div>
            <div className="musictool_sequencer3">
                {" "}
                <label htmlFor="sampler2-octave">Octave</label>
                <input
                    id="sampler2-octave"
                    className="sampler2_octave"
                    type="number"
                    min="-2"
                    max="2"
                    value={octaves.sampler2}
                    onInput={(e) => handleOctaveChange(e)}
                />
                <Sequencer
                    instrumentArray={samplerArray2}
                    sequencer={sequencer}
                    setSequencer={setSequencer}
                    grid={grid3}
                    setGrid={setGrid3}
                    octave={octaves.sampler2}
                />
            </div>
            <div className="musictool_bottom">
                <button
                    className="sequencer-button"
                    onClick={(e) => handlePlayButton(e)}
                >
                    {isPlaying ? "Stop" : "Play"}
                </button>
            </div>
            <div className="musictool_reverb">
                <Reverb
                    reverbValues={reverbValues}
                    setReverbValues={setReverbValues}
                    setReverb={setReverb}
                    reverb={reverb}
                    handleMouseOver={handleMouseOver}
                    handleMouseOut={handleMouseOut}
                    displayTooltip={displayTooltip}
                    tooltipPosition={tooltipPosition}
                />
            </div>
            <div className="musictool_delay">
                <Delay
                    delay={delay}
                    setDelay={setDelay}
                    delayValues={delayValues}
                    setDelayValues={setDelayValues}
                    handleMouseOver={handleMouseOver}
                    handleMouseOut={handleMouseOut}
                    displayTooltip={displayTooltip}
                    tooltipPosition={tooltipPosition}
                />
            </div>
        </div>
    );
}

export default MusicTool;
