import React, { useEffect, useState } from "react";
import * as Vex from "vexflow";
import MusicNotes from "./MusicNotes";
// import * as Tone from "tone";

const MusicBar = () => {
    const [selectedMusicalNotes, setSelectedMusicalNotes] = useState([]);
    const [generateNotation, setGenerateNotation] = useState(false);
    // const [isPlaying, setIsPlaying] = useState(false);

    function musicNotation() {
        if (generateNotation) {
            const VF = Vex.Flow;
            const container = document.getElementById("music-bar");
            container.innerHTML = "";

            const renderer = new VF.Renderer(
                container,
                VF.Renderer.Backends.SVG
            );
            renderer.resize(800, 800);
            const context = renderer.getContext();
            context.setFont("Arial", 10, "").setBackgroundFillStyle("#f0f0f0");

            const stave = new VF.Stave(10, 0, 700);
            stave.addClef("treble").addTimeSignature("4/4");

            const notes = selectedMusicalNotes.map(
                (note) =>
                    new VF.StaveNote({
                        keys: [`${note.note.toUpperCase()}/4`],
                        duration: note.duration,
                    })
            );
            console.log("notes: ", notes);

            const totalDuration = selectedMusicalNotes.reduce(
                (total, note) => total + getNoteDurationValue(note.duration),
                0
            );

            function getNoteDurationValue(duration) {
                const durationMap = {
                    w: 4, // Whole note
                    h: 2, // Half note
                    q: 1, // Quarter note
                    8: 0.5, // Eighth note
                };

                return durationMap[duration] || 1;
            }

            const voice = new VF.Voice({
                num_beats: totalDuration,
                beat_value: 4,
            });
            voice.addTickables(notes);

            // const formatter = new VF.Formatter()
            //   .joinVoices([voice])
            //   .format([voice], 500);
            // voice.draw(context, stave);

            stave.setContext(context).draw();

            // Tone.js integration
            // const synth = new Tone.Synth().toDestination();
            // const notesToPlay = selectedMusicalNotes.map((note) => ({
            //   note: `${note.note.toLowerCase()}/4`,
            //   duration: `:${note.duration}`,
            // }));

            // if (isPlaying) {
            //   notesToPlay.forEach((note) => {
            //     synth.triggerAttackRelease(note.note, note.duration);
            //   }, "+0.1");
            // }
            setGenerateNotation(false);
        }
    }

    useEffect(() => {
        musicNotation();
    }, [generateNotation, selectedMusicalNotes]);

    const handleGenerateNotation = () => {
        setGenerateNotation(true);
    };

    return (
        <>
            <MusicNotes
                onSelectedNotes={(notes) => setSelectedMusicalNotes(notes)}
            />
            <button onClick={handleGenerateNotation}>
                {generateNotation ? "Generating..." : "Generate Notation"}
            </button>
            <svg id="music-bar"></svg>
            {/* <button onClick={()=> setIsPlaying(!isPlaying)}>{isPlaying ? "Stop" : "Play"}</button> */}
        </>
    );
};

export default MusicBar;
