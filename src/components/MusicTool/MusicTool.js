import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./MusicTool.scss";
import * as Tone from "tone";
import Modal from "./Modal";
const Reverb = React.lazy(() => import("../Reverb/Reverb"));
const Sequencer = React.lazy(() => import("../Step Sequencer/StepSequencer"));
const Delay = React.lazy(() => import("../Delay/Delay"));

function MusicTool() {
  const [displayTooltip, setDisplayTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const modal = useRef(null);
  const musicToolTutorialInfo = [
    {
      title: "How to Use the Music Tool",
      info: `Welcome to the music tool. In this tutorial, we will explain every section and what they mean/how to use it, 
      going over all the parts of the sequencer as well as the effects.`,
      gif: require("./MusicToolTutorialGifs/initial showing of the sequencer.gif"),
    },
    {
      title: "Horizontal and Vertical Axis",
      info: `The vertical axis shows which notes are going to be played in each row of the sequencer, and the horizontal axis
        shows at which beat the notes will be played. So, the rows are different notes, and the columns are time.`,
      gif: require("./MusicToolTutorialGifs/showing the y and x axis.gif"),
    },
    {
      title: "Switching Between Instruments",
      info: `This button over the top of the sequencer will switch between the 3 instruments, the synth and the 2 samplers. The sequences created on each
      instrument will play simultaneously. For more information on what synths and samplers are, go to our help page.`,
      gif: require("./MusicToolTutorialGifs/instrument changing.gif"),
    },
    {
      title: "Changing the Instrument Sounds",
      info: `You can use the dropdown next to the instrument change button to change the sounds of each instrument. So, for the synth, it would be
        the type of oscillator being used. For the samplers, there are a selection of sounds, including harp, electric piano, bells and drums. Also, 
        the instrument sounds can only be changed while the sequencer is stopped.`,
      gif: require("./MusicToolTutorialGifs/instrument dropdown.gif"),
    },
    {
      title: "Changing the Octave",
      info: `Next to the instrument switch button, you can switch between the octaves for each instrument, going from 2 octaves above to 2 below. As you can see,
        the notes will change along with the octave. Also, like the instrument sounds, it can only be changed while the sequencer is stopped.`,
      gif: require("./MusicToolTutorialGifs/octave.gif"),
    },
    {
      title: "Placing Events on the Sequencer",
      info: `Each instrument has its own sequencer. To place events on the sequencer, just click one of the boxes and it will turn blue. That means at that
        corresponding time/column, a note will play. The note that plays depends on which row the event is in.`,
      gif: require("./MusicToolTutorialGifs/demonstrating where the sounds will fall.gif"),
    },
    {
      title: "Play/Stop Button",
      info: `Last but not least for the sequencer, the play/stop button will play or stop the sequences for all instruments simultaneously.`,
      gif: require("./MusicToolTutorialGifs/play stop button.gif"),
    },
    {
      title: "Reverb",
      info: `The reverb will give the sounds a sense of space, with the size and time influencing the quality of the sound. The amount determines the ratio of 
        dry sound (no reverb) to wet sound (full reverb). To apply it, adjust the parameters to your liking and press the apply button. For more information on what
        reverb is, check the tooltips or check our help page.`,
      gif: require("./MusicToolTutorialGifs/reverb demo.gif"),
    },
    {
      title: "Delay",
      info: `The delay causes the sounds to echo a certain amount of times, creating potentially interesting and unexpected counterplay between sounds. The time parameter
        determines the time between each echo, and the feedback parameter determines how many times it will echo. You can adjust these on the fly as the sequencer is playing.`,
      gif: require("./MusicToolTutorialGifs/delay demo.gif"),
    },
    {
      title: "Tutorial Completed!",
      info: `You have completed the Music Tool tutorial! Play around with all the sequencers and effects and see what sounds you can make. If you want more in depth explanations
      of all the components, see our help page, the button is below the sequencer, right next to the play button.`,
      gif: require("./MusicToolTutorialGifs/final showing of the sequencer.gif"),
    },
  ];

  const handleNext = () => {
    setCurrentIndex((prev) =>
      Math.min(prev + 1, musicToolTutorialInfo.length - 1)
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  //const [beat, setBeat] = useState(0);
  const handleMouseOver = (section, e) => {
    const offsetX = -150;
    const offsetY = -120;

    setTooltipPosition({ x: e.pageX + offsetX, y: e.pageY + offsetY });

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

  const [instrumentChanges, setInstrumentChanges] = useState({
    synth: 0,
    sampler1: 0,
    sampler2: 0,
  });

  const [octaves, setOctaves] = useState({
    synth: 0,
    sampler1: 0,
    sampler2: 0,
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
    // eslint-disable-next-line
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
    // eslint-disable-next-line
  }, [
    reverb,
    delay,
    synthArray,
    samplerArray1,
    samplerArray2,
    oscillatorType,
    octaves,
  ]);

  const handlePlayButton = async (e) => {
    //setBeat(0);
    // toggle Tone.Trasport and the flag variable.
    if (sequencer.playing) {
      Tone.Transport.stop();
      setSequencer({
        ...sequencer,
        playing: false,
        beat: 0,
      });
      setIsPlaying(false);
    } else {
      // currentBeat = sequencer.beat
      Tone.Transport.start();
      setSequencer({
        ...sequencer,
        playing: true,
      });
      setIsPlaying(true);
    }
  };

  // eslint-disable-next-line

  const handleOctaveChange = (e) => {
    let id = e.target.id;
    if (id === "synth-octave") {
      setOctaves({
        ...octaves,
        synth: e.target.value,
      });
    } else if (id === "sampler1-octave") {
      if (
        samplerType1.slice(0, 1) !== "8" &&
        samplerType1.slice(0, 1) !== "9"
      ) {
        setOctaves({
          ...octaves,
          sampler1: e.target.value,
        });
      } else {
        setOctaves({
          ...octaves,
          sampler1: 0,
        });
      }
    } else {
      if (
        samplerType2.slice(0, 1) !== "8" &&
        samplerType2.slice(0, 1) !== "9"
      ) {
        setOctaves({
          ...octaves,
          sampler2: e.target.value,
        });
      } else {
        setOctaves({
          ...octaves,
          sampler2: 0,
        });
      }
    }
  };

  const navToMusicHelp = () => {
    navigate("/musictoolhelp");
  };
  const notes = {
    "octave-2": ["F2", "D#2", "D2", "C2", "A#1", "G#1", "G1", "F1"],
    "octave-1": ["F3", "D#3", "D3", "C3", "A#2", "G#2", "G2", "F2"],
    octave0: ["F4", "D#4", "D4", "C4", "A#3", "G#3", "G3", "F3"],
    octave1: ["F5", "D#5", "D5", "C5", "A#4", "G#4", "G4", "F4"],
    octave2: ["F6", "D#6", "D6", "C6", "A#5", "G#5", "G5", "F5"],
    drums0: [
      "Clap",
      "Hat Closed",
      "Hat Open",
      "Kick",
      "Rim Shot",
      "Snare",
      "Tom Hi",
      "Tom Low",
    ],
  };

  const [activeSequencer, setActiveSequencer] = useState("Synth");
  const [samplerType1, setSamplerType1] = useState("Piano");
  const [samplerType2, setSamplerType2] = useState("Harp");

  const renderNotes = () => {
    if (activeSequencer === "Synth") {
      const octave = octaves.synth; // Replace this with your desired octave
      const synthKey = "octave" + octave;
      if (notes[synthKey]) {
        return notes[synthKey].map((note, index) => (
          <span key={index}>
            {note}
            <br />
          </span>
        ));
      }
    } else if (activeSequencer === "Sampler1") {
      if (
        samplerType1.slice(0, 1) !== "8" &&
        samplerType1.slice(0, 1) !== "9"
      ) {
        const octave = octaves.sampler1;
        const synthKey = "octave" + octave;
        if (notes[synthKey]) {
          return notes[synthKey].map((note, index) => (
            <span key={index}>
              {note}
              <br />
            </span>
          ));
        }
      } else {
        const octave = 0;
        const synthKey = "drums" + octave;
        if (notes[synthKey]) {
          return notes[synthKey].map((note, index) => (
            <span key={index}>
              {note}
              <br />
            </span>
          ));
        }
      }
    } else {
      if (
        samplerType2.slice(0, 1) !== "8" &&
        samplerType2.slice(0, 1) !== "9"
      ) {
        const octave = octaves.sampler2;
        const synthKey = "octave" + octave;
        if (notes[synthKey]) {
          return notes[synthKey].map((note, index) => (
            <span key={index}>
              {note}
              <br />
            </span>
          ));
        }
      } else {
        const octave = 0;
        const synthKey = "drums" + octave;
        if (notes[synthKey]) {
          return notes[synthKey].map((note, index) => (
            <span key={index}>
              {note}
              <br />
            </span>
          ));
        }
      }
    }
  };
  const renderBeat = () => {
    const arrayOfBeats = [1, 2, 3, 4, 5, 6, 7, 8];
    return arrayOfBeats.map((note) => {
      /*if (beat + 1 === note) {
                return (
                    <div key={note} className="redBeat">
                        {note}
                    </div>
                );
            } else {*/
      return (
        <div key={note} className="beat">
          {note}
        </div>
      );
      //}
    });
  };
  return (
    <>
      <div className="musictool">
        <button onClick={() => modal.current.open()}>Tutorial</button>
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
                document.getElementsByClassName("sampler1_octave")[0];
              let sampler2Octave =
                document.getElementsByClassName("sampler2_octave")[0];

              let synthDropdown =
                document.getElementsByClassName("synth_dropdown")[0];
              let sampler1Dropdown =
                document.getElementsByClassName("sampler1_dropdown")[0];
              let sampler2Dropdown =
                document.getElementsByClassName("sampler2_dropdown")[0];
              if (e.target.innerText === "Synth") {
                e.target.innerText = "Sampler 1";
                setActiveSequencer("Sampler1");
                synthSequencer.style.visibility = "hidden";
                synthOctave.style.visibility = "hidden";
                synthDropdown.style.visibility = "hidden";

                sampler2Octave.style.visibility = "hidden";
                sampler2Sequencer.style.visibility = "hidden";
                sampler2Dropdown.style.visibility = "hidden";

                sampler1Sequencer.style.visibility = "visible";
                sampler1Octave.style.visibility = "visible";
                sampler1Dropdown.style.visibility = "visible";
              } else if (e.target.innerText === "Sampler 1") {
                e.target.innerText = "Sampler 2";
                setActiveSequencer("Sampler2");
                synthSequencer.style.visibility = "hidden";
                synthOctave.style.visibility = "hidden";
                synthDropdown.style.visibility = "hidden";

                sampler1Sequencer.style.visibility = "hidden";
                sampler1Octave.style.visibility = "hidden";
                sampler1Dropdown.style.visibility = "hidden";

                sampler2Sequencer.style.visibility = "visible";
                sampler2Octave.style.visibility = "visible";
                sampler2Dropdown.style.visibility = "visible";
              } else {
                e.target.innerText = "Synth";
                setActiveSequencer("Synth");
                sampler1Sequencer.style.visibility = "hidden";
                sampler1Octave.style.visibility = "hidden";
                sampler1Dropdown.style.visibility = "hidden";

                sampler2Sequencer.style.visibility = "hidden";
                sampler2Octave.style.visibility = "hidden";
                sampler2Dropdown.style.visibility = "hidden";

                synthSequencer.style.visibility = "visible";
                synthOctave.style.visibility = "visible";
                synthDropdown.style.visibility = "visible";
              }
            }}
          >
            Synth
          </button>
          <div className="select-container">
            <select
              className="synth_dropdown"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
              }}
              onChange={(e) => {
                synths = synthArray;
                for (let i = 0; i < synths.length; i++) {
                  synths[i].set({
                    oscillator: { type: e.target.value },
                  });
                }
                setSynthArray(synths);
                setOscillatorType(e.target.value);

                setInstrumentChanges({
                  synth: instrumentChanges.synth + 1,
                });
              }}
              disabled={isPlaying ? 1 : 0}
            >
              <option>sine</option>
              <option>triangle</option>
              <option>square</option>
              <option>sawtooth</option>
            </select>
            <select
              style={{
                visibility: "hidden",
                position: "absolute",
                top: 0,
                left: 0,
              }}
              className="sampler1_dropdown"
              onChange={(e) => {
                // let samplers = samplerArray1;
                // for (let i = 0; i < samplers.length; i++) {
                //     samplers[i].dispose()
                // };

                let newSamplers = [];

                for (let i = 0; i < sequencer.notes.length; i++) {
                  let newSampler = new Tone.Sampler(
                    samples[e.target.value.toLowerCase()]
                  ).chain(delay, reverb, Tone.Destination);

                  newSamplers.push(newSampler);
                }

                setSamplerArray1(newSamplers);
                setSamplerType1(e.target.value);
                setInstrumentChanges({
                  sampler1: instrumentChanges.sampler1 + 1,
                });
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
              style={{
                visibility: "hidden",
                position: "absolute",
                top: 0,
                left: 0,
              }}
              className="sampler2_dropdown"
              onChange={(e) => {
                let newSamplers = [];
                for (let i = 0; i < sequencer.notes.length; i++) {
                  let newSampler = new Tone.Sampler(
                    samples[e.target.value.toLowerCase()]
                  ).chain(delay, reverb, Tone.Destination);
                  newSamplers.push(newSampler);
                }

                setSamplerArray2(newSamplers);
                setSamplerType2(e.target.value);
                setInstrumentChanges({
                  sampler2: instrumentChanges.sampler2 + 1,
                });
              }}
              disabled={isPlaying ? 1 : 0}
              defaultValue="Harp"
            >
              <option>Piano</option>
              <option>Bell</option>
              <option>Epiano</option>
              <option>Harp</option>
              <option>Vox</option>
              <option>808</option>
              <option>909</option>
            </select>
          </div>
        </div>
        <div className="musictool_side2">{renderNotes()}</div>
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
            instrumentChanges1={instrumentChanges.sampler1}
            instrumentChanges2={instrumentChanges.sampler2}
            octaveChanges1={octaves.sampler1}
            octaveChanges2={octaves.sampler2}
            //setBeat={setBeat}
          />
        </div>
        <div className="musictool_sequencer2" style={{ visibility: "hidden" }}>
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
            disabled={isPlaying ? 1 : 0}
          />
          <Sequencer
            instrumentArray={samplerArray1}
            sequencer={sequencer}
            setSequencer={setSequencer}
            grid={grid2}
            setGrid={setGrid2}
            octave={octaves.sampler1}
            instrumentChanges1={instrumentChanges.synth}
            instrumentChanges2={instrumentChanges.sampler2}
            octaveChanges1={octaves.synth}
            octaveChanges2={octaves.sampler2}
            //setBeat={setBeat}
          />
        </div>

        <div className="musictool_sequencer3" style={{ visibility: "hidden" }}>
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
            disabled={isPlaying ? 1 : 0}
          />
          <Sequencer
            instrumentArray={samplerArray2}
            sequencer={sequencer}
            setSequencer={setSequencer}
            grid={grid3}
            setGrid={setGrid3}
            octave={octaves.sampler2}
            instrumentChanges1={instrumentChanges.synth}
            instrumentChanges2={instrumentChanges.sampler1}
            octaveChanges1={octaves.sampler1}
            octaveChanges2={octaves.synth}
            //setBeat={setBeat}
          />
        </div>
        <div className="musictool_bottom">{renderBeat(3)}</div>
        <div className="musictool_bottom2">
          <button
            className="sequencer-button"
            onClick={(e) => handlePlayButton(e)}
          >
            {isPlaying ? "Stop" : "Play"}
          </button>

          <button className="musictool_help" onClick={navToMusicHelp}>
            Help?
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
      <Modal ref={modal}>
        <div className="musictool-tutorial">
          <section className="musictool-tutorial_gif">
            <img src={musicToolTutorialInfo[currentIndex].gif} alt=""/>
          </section>
          <h2>{musicToolTutorialInfo[currentIndex].title}</h2>
          <p>{musicToolTutorialInfo[currentIndex].info}</p>
          <br />
          <button onClick={handlePrev} disabled={currentIndex === 0}>
            &laquo; Prev
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex >= musicToolTutorialInfo.length - 1}
          >&laquo; Next</button>
        </div>
      </Modal>
    </>
  );
}

export default MusicTool;
