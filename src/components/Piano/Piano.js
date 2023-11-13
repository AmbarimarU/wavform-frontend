import "./Piano.scss";
import { playNote, releaseNote, playKey, keyboard } from "./Piano.func.js";
import * as Tone from "tone";
import { useEffect } from "react";
window.addEventListener("keydown", playKey);
window.addEventListener("keyup", releaseNote);

function Piano() {
    useEffect(() => {
        Tone.start();
    }, []);

    return (
        <div className="pianoPage">
            <h1>Piano</h1>
            <div className="piano">
                {keyboard.notes.map((note, index) => {
                    const key = keyboard.colors[index]
                        ? "black-key"
                        : "white-key";
                    return (
                        <div
                            className={key}
                            onMouseDown={() => playNote(note)}
                            onMouseUp={() => releaseNote(note)}
                        >
                            {keyboard.letters[index]}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Piano;
