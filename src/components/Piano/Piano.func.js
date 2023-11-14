import * as Tone from "tone";

export const keyboard = {
    notes: [
        "C4",
        "Db4",
        "D4",
        "Eb4",
        "E4",
        "F4",
        "Gb4",
        "G4",
        "Ab4",
        "A4",
        "Bb4",
        "B4",
        "C5",
    ],
    keys: [65, 87, 83, 69, 68, 70, 84, 71, 89, 72, 85, 74, 75],
    letters: ["A", "W", "S", "E", "D", "F", "T", "G", "Y", "H", "U", "J", "K"],
    colors: [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0],
};

const synth = new Tone.Synth().toDestination();
export const playNote = (note) => {
    document.getElementById(note).style.backgroundColor = "blue";
    synth.triggerAttack(note, "8n");
};

export const releaseNote = (index) => {
    document.getElementById(keyboard.notes[index]).style = "";
    synth.triggerRelease(".1");
};

export const releaseKey = () => {
    for (let i = 0; i < keyboard.notes.length; i++) {
        document.getElementById(keyboard.notes[i]).style = "";
    }
    synth.triggerRelease(".0001");
};

export const playKey = (event) => {
    for (let i = 0; i < keyboard.notes.length; i++) {
        if (event.keyCode === keyboard.keys[i]) {
            playNote(keyboard.notes[i]);
        }
    }
};
