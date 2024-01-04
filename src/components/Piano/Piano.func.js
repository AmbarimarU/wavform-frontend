import * as Tone from "tone";
import { insertKey } from "../Api/Api";

// const pianoSamples = {
//     name: "Casio",
//     notes: ["A1", "A2", "B1", "C2", "D2"],
//     url: "https://tonejs.github.io/audio/casio/",
// };
const pianoSamples = {
    A1: require("./audio/piano/A1.mp3"),
    A2: require("./audio/piano/A2.mp3"),
    A3: require("./audio/piano/A3.mp3"),
    A4: require("./audio/piano/A4.mp3"),
    A5: require("./audio/piano/A5.mp3"),
};
const sustainedNotes = [];
const sampler = new Tone.Sampler(pianoSamples).toDestination();

/*
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
    ]*/
const keyboard = {
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

async function insertNote(note, user) {
    try {
        insertKey(note, user);
    } catch (e) {
        console.log(e);
    }
}
const sustainNote = (note) => {
    if (!sustainedNotes.includes(note)) {
        sustainedNotes.push(note);
        playNote(note);
    }
};

// New function to handle keyup events for releasing sustained notes
const releaseSustainedNote = (note) => {
    const index = sustainedNotes.indexOf(note);
    if (index !== -1) {
        sustainedNotes.splice(index, 1);
        releaseNote(note); // Release the note when key is released
    }
};

// Function to play a key using keyboard events
const playKey = (event, user = null, strokes, setStrokes) => {
    if (event.type === "keydown") {
        for (let i = 0; i < keyboard.notes.length; i++) {
            if (event.keyCode === keyboard.keys[i]) {
                sustainNote(keyboard.notes[i]);
            }
        }
    } else if (event.type === "keyup") {
        for (let i = 0; i < keyboard.notes.length; i++) {
            if (event.keyCode === keyboard.keys[i]) {
                releaseSustainedNote(keyboard.notes[i]);
            }
        }
    }
};
const releaseKey = (event) => {
    for (let i = 0; i < keyboard.notes.length; i++) {
        if (event.keyCode === keyboard.keys[i]) {
            releaseSustainedNote(keyboard.notes[i]);
        }
        // if (document.getElementById(keyboard.notes[i])) {
        //     document.getElementById(keyboard.notes[i]).style = "";
        //     sampler.triggerRelease(keyboard.notes[i]);
        // }
    }
    //synth.triggerRelease(".0001");
};
const playNote = async (
    note,
    user = null,
    index = null,
    strokes,
    setStrokes
) => {
    if (document.getElementById(note)) {
        document.getElementById(note).style.backgroundColor =
            "var(--color-primary-dark)";
        sampler.triggerAttack(note);
        //synth.triggerAttack(note, "8n");
        if (user !== null) {
            let stroke = strokes;
            stroke++;
            setStrokes(stroke);
            await insertNote(keyboard.letters[index], user);
        }
    }
};

const releaseNote = (index) => {
    const indexOf = keyboard.notes.indexOf(index);
    document.getElementById(keyboard.notes[indexOf]).style.backgroundColor =
        keyboard.colors[indexOf] ? "black" : "white";
    // synth.triggerRelease(".1");
    sampler.triggerRelease(keyboard.notes[indexOf]);
};

// const playKey = (event, user = null, strokes, setStrokes) => {
//     for (let i = 0; i < keyboard.notes.length; i++) {
//         if (event.keyCode === keyboard.keys[i]) {
//             playNote(keyboard.notes[i], user, i, strokes, setStrokes);
//         }
//     }
// };

export { keyboard, playNote, releaseNote, releaseKey, playKey };
