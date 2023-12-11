import "./Piano.scss";
import {
    playNote,
    releaseNote,
    playKey,
    keyboard,
    releaseKey,
} from "./Piano.func.js";
window.addEventListener("keydown", playKey);
window.addEventListener("keyup", releaseKey);

function Piano() {
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
                            id={note}
                            className={key}
                            onMouseDown={() => playNote(note)}
                            onMouseUp={() => releaseNote(index)}
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
