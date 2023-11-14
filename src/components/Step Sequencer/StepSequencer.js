import React, { useState, useEffect } from "react";
import * as Tone from "tone";

import "./StepSequencer.scss";

// const testSampler = new Tone.Sampler().toDestination();

function StepSequencer({ synthArray, sequencer, setSequencer, setIsPlaying }) {
  // const [sequencer, setSequencer] = useState({
  //   beat: 0,
  //   notes: ["F4", "D#4", "D4", "C4", "A#3", "G#3", "G3", "F3"],
  //   playing: false,
  //   started: false,
  //   tempo: 120,
  // });

  const [beat, setBeat] = useState(0);

  const [grid, setGrid] = useState([]);

  const makeGrid = (notes) => {
    // our "notation" will consist of an array with 6 sub arrays
    // each sub array corresponds to one row of our sequencer

    // declare the parent array to hold each row subarray
    const rows = [];

    for (const note of notes) {
      // declare the subarray
      const row = [];
      // each subarray contains multiple objects that have an assigned note
      // and a boolean to flag whether they are active.
      // each element in the subarray corresponds to one eighth note.
      for (let i = 0; i < 8; i++) {
        row.push({
          note: note,
          isActive: false,
        });
      }
      rows.push(row);
    }

    // we now have 6 rows each containing 8 eighth notes
    return rows;
  };

  useEffect(() => {
    setGrid(makeGrid(sequencer.notes));
  }, []);

  // const makeSynths = (count) => {
  //     // each synth can only play one note at a time.
  //     // for simplicity, we'll create one synth for each note available
  //     // this allows for easy polyphony (multiple notes playing at the same time)

  //     const synths = [];

  //     for (let i = 0; i < count; i++) {
  //         let synth = new Tone.Synth({
  //             oscillator: { type: "square8" },
  //         }).toDestination();
  //         synths.push(synth);
  //     }

  //     return synths;
  // };

  let currentBeat = sequencer.beat;

  // This is our callback function. It will execute repeatedly
  const repeat = (time) => {
    grid.forEach((row, index) => {
      // as the index increments we are moving *down* the rows
      // One note per row and one synth per note means that each row corresponds to a synth
      let synth = synthArray[index];
      // beat is used to keep track of what subdivision we are on
      // there are eight *beats* or subdivisions for this sequencer
      let note = row[currentBeat];

      if (note.isActive) {
        // triggerAttackRelease() plays a specific pitch for a specific duration

        synth.triggerAttackRelease(note.note, "8n", time);
      }
    });
    // increment the counter

    currentBeat = (currentBeat + 1) % 8;

    console.log(currentBeat);
  };

  const configLoop = (tempo) => {
    // set the tempo in beats per minute.
    Tone.Transport.bpm.value = tempo;
    // telling the transport to execute our callback function every eight note.
    Tone.Transport.scheduleRepeat(repeat, "8n");
  };

  useEffect(() => {
    if (sequencer.started) {
      Tone.Transport.cancel();
      Tone.Transport.bpm.value = sequencer.tempo;
      Tone.Transport.scheduleRepeat(repeat, "8n");
    }
  }, [synthArray]);

  const handleNoteClick = (clickedRowIndex, clickedNoteIndex, e) => {
    // iterating through the grid
    grid.forEach((row, rowIndex) => {
      // iterate through each note in current row
      row.forEach((note, noteIndex) => {
        // toggle the note in the grid that corresponds to the clicked button.
        if (clickedRowIndex === rowIndex && clickedNoteIndex === noteIndex) {
          // setGrid(grid[rowIndex][noteIndex] = !note.isActive)

          e.target["data-active"] = String(!note.isActive);

          note.isActive = !note.isActive;
        }
      });
    });
  };

  useEffect(() => {
    if (!sequencer.started && sequencer.playing) {
      setSequencer({
        ...sequencer,
        started: true,
      });
    }
  }, [sequencer]);

  const handlePlayButton = async (e) => {
    if (!sequencer.started) {
      // Only executed the first time the button is clicked
      // initializing Tone, setting the volume, and setting up the loop

      await Tone.start();
      Tone.getDestination().volume.rampTo(-10, 0.001);
      configLoop(sequencer.tempo);
      //   setSequencer({
      //     ...sequencer,
      //     started: true,
      // });
    }

    // toggle Tone.Trasport and the flag variable.
    if (sequencer.playing) {
      e.target.innerText = "Play";
      Tone.Transport.stop();
      setSequencer({
        ...sequencer,
        playing: false,
      });
      setIsPlaying(false);

      //   testBeat = 0;
    } else {
      console.log("stop - playing");
      e.target.innerText = "Stop";
      Tone.Transport.start();
      setSequencer({
        ...sequencer,
        playing: true,
      });
      setIsPlaying(true);
    }
  };

  // const synths = makeSynths(8);

  return (
    <>
      <div className="sequencer">
        {grid.map((row, rowIndex) => {
          return (
            <div key={rowIndex} className="sequencer-row">
              {row.map((note, noteIndex) => {
                return (
                  <button
                    key={String(rowIndex) + String(noteIndex)}
                    data-index-number={String(rowIndex) + String(noteIndex)}
                    data-active={String(note.isActive)}
                    className="sequencer-note"
                    style={{ backgroundColor: "white" }}
                    onClick={(e) => {
                      handleNoteClick(rowIndex, noteIndex, e);

                      if (e.target.style["background-color"] === "white") {
                        e.target.style["background-color"] = "blue";
                      } else {
                        e.target.style["background-color"] = "white";
                      }
                    }}
                  ></button>
                );
              })}
            </div>
          );
        })}
      </div>

      <div className="sequencer-bottom">
        <button
          className="sequencer-button"
          onClick={(e) => handlePlayButton(e)}
        >
          Play
        </button>
      </div>
    </>
  );
}

export default StepSequencer;
