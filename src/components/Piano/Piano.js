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
        <div className="piano">
            <h1 className="piano-header">Piano</h1>
            <div className="piano-keyboard">
                {keyboard.notes.map((note, index) => {
                    const key = keyboard.colors[index]
                        ? "piano-black-key"
                        : "piano-white-key";
                    return (
                        <div
                            key={note}
                            className={key}
                            onMouseDown={() => playNote(note)}
                            onMouseUp={() => releaseNote()}
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
