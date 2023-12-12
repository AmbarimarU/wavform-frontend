import * as Tone from "tone";
import { insertKey } from "../Api/Api";

const pianoSamples = {
    name: "Casio",
    notes: ["A1", "A2", "B1", "C2", "D2"],
    url: "https://tonejs.github.io/audio/casio/",
};

let urlsObj = {};

pianoSamples.notes.forEach((note) => {
    urlsObj[note] = `${note}.mp3`;
});
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

const synth = new Tone.Synth().toDestination();
async function insertNote(note, user) {
    try {
        insertKey(note, user);
    } catch (e) {
        console.log(e);
    }
}

const playNote = async (
    note,
    user = null,
    index = null,
    strokes,
    setStrokes
) => {
    if (document.getElementById(note)) {
        document.getElementById(note).style.backgroundColor = "blue";
        synth.triggerAttack(note, "8n");
        if (user !== null) {
            let stroke = strokes;
            stroke++;
            setStrokes(stroke);
            await insertNote(keyboard.letters[index], user);
        }
    }
};

const releaseNote = (index) => {
    document.getElementById(keyboard.notes[index]).style = "";
    synth.triggerRelease(".1");
};

const releaseKey = () => {
    for (let i = 0; i < keyboard.notes.length; i++) {
        if (document.getElementById(keyboard.notes[i]))
            document.getElementById(keyboard.notes[i]).style = "";
    }
    synth.triggerRelease(".0001");
};

const playKey = (event, user = null, strokes, setStrokes) => {
    for (let i = 0; i < keyboard.notes.length; i++) {
        if (event.keyCode === keyboard.keys[i]) {
            playNote(keyboard.notes[i], user, i, strokes, setStrokes);
        }
    }
};

export { keyboard, playNote, releaseNote, releaseKey, playKey };
