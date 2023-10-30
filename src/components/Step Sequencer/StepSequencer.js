import React, { useState } from 'react'
import * as Tone from 'tone'

// const testSampler = new Tone.Sampler().toDestination();


function StepSequencer() {
    const samplerObj = {
        urls: {
            A0: "A0.mp3",
            C1: "C1.mp3",
            "D#1": "Ds1.mp3",
            "F#1": "Fs1.mp3",
            A1: "A1.mp3",
            C2: "C2.mp3",
            "D#2": "Ds2.mp3",
            "F#2": "Fs2.mp3",
            A2: "A2.mp3",
            C3: "C3.mp3",
            "D#3": "Ds3.mp3",
            "F#3": "Fs3.mp3",
            A3: "A3.mp3",
            C4: "C4.mp3",
            "D#4": "Ds4.mp3",
            "F#4": "Fs4.mp3",
            A4: "A4.mp3",
            C5: "C5.mp3",
            "D#5": "Ds5.mp3",
            "F#5": "Fs5.mp3",
            A5: "A5.mp3",
            C6: "C6.mp3",
            "D#6": "Ds6.mp3",
            "F#6": "Fs6.mp3",
            A6: "A6.mp3",
            C7: "C7.mp3",
            "D#7": "Ds7.mp3",
            "F#7": "Fs7.mp3",
            A7: "A7.mp3",
            C8: "C8.mp3"
        },
        release: 1,
        baseUrl: "https://tonejs.github.io/audio/salamander/"
    }

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
                isActive: false
            });
            }
            rows.push(row);
        }
        
        // we now have 6 rows each containing 8 eighth notes
        return rows;
    };

    const makeSamplers = (count) => {

        // each synth can only play one note at a time.
        // for simplicity, we'll create one synth for each note available
        // this allows for easy polyphony (multiple notes playing at the same time)
        
        const samplers = [];
        
        for (let i = 0; i < count; i++) {  
            let sampler = new Tone.Sampler(samplerObj).toDestination();
            samplers.push(sampler);
        }
        
        return samplers;
    };

    const configLoop = (tempo) => {

        // This is our callback function. It will execute repeatedly 
        const repeat = (time) => {
            
            grid.forEach((row, index) => {
            // as the index increments we are moving *down* the rows
            // One note per row and one synth per note means that each row corresponds to a synth
            let sampler = samplers[index];
            // beat is used to keep track of what subdivision we are on
            // there are eight *beats* or subdivisions for this sequencer
            let note = row[beat];
            
            if (note.isActive) {
                // triggerAttackRelease() plays a specific pitch for a specific duration
                
                sampler.triggerAttackRelease(note.note, "8n", time);
            }
            });
            // increment the counter
            beat = (beat + 1) % 8;
        };
        
        // set the tempo in beats per minute.
        Tone.Transport.bpm.value = tempo;
        // telling the transport to execute our callback function every eight note.
        Tone.Transport.scheduleRepeat(repeat, "8n");
    };

    const handleNoteClick = (clickedRowIndex, clickedNoteIndex, e) => {
        // iterating through the grid
        grid.forEach((row, rowIndex) => {
          // iterate through each note in current row
          row.forEach((note, noteIndex) => {
            // toggle the note in the grid that corresponds to the clicked button.
            if (clickedRowIndex === rowIndex && clickedNoteIndex === noteIndex) {
              note.isActive = !note.isActive;
              

            }
          });
        });
    };

    const handlePlayButton = (e) => {
        if (!started) {
        // Only exectued the first time the button is clicked
        // initializing Tone, setting the volume, and setting up the loop
        
        Tone.start();
        Tone.getDestination().volume.rampTo(-10, 0.001)
        configLoop();
        started = true;
        }
    
        // toggle Tone.Trasport and the flag variable.
        if (playing) {
        e.target.innerText = "Play";
        Tone.Transport.stop();
        playing = false;
        } else {
        e.target.innerText = "Stop";
        Tone.Transport.start();
        playing = true;
        }
    }

    const notes = ["F4", "D#4", "D4", "C4", "A#3", "G#3", "G3", "F3"];

    const grid = makeGrid(notes)
    const samplers  = makeSamplers(notes.count)
    let playing = false;
    let started = false;

    return (
        <div className='sequencer'>
            {grid.forEach((row, rowIndex) => {
                return (
                    <div id={rowIndex} className={sequencer-row}>
                        {row.forEach((note, noteIndex) => {
                            <button className="note" onClick={() => handleNoteClick(rowIndex, noteIndex, e)}></button>
                        })}
                    </div>
                )
            })}
        </div>
    )
}

export default StepSequencer