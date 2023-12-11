import "./Piano.scss";
import { useEffect } from "react";
import { deleteKey } from "../Api/Api";
import {
    playNote,
    releaseNote,
    playKey,
    keyboard,
    releaseKey,
} from "./Piano.func.js";

function Piano({ user, setStrokes, strokes, setKeyStrokes }) {
    useEffect(() => {
        const handleKeyDown = (event) => {
            playKey(event, user.id, strokes, setStrokes);
        };

        const handleKeyUp = (event) => {
            releaseKey(event);
        };
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [user, strokes, setStrokes]);
    useEffect(() => {
        async function deleteKeys() {
            await deleteKey(user.id);
        }
        setKeyStrokes([]);
        deleteKeys();
    }, [user]);

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
                            onMouseDown={() =>
                                playNote(
                                    note,
                                    user.id,
                                    index,
                                    strokes,
                                    setStrokes
                                )
                            }
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
