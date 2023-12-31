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
            if (user) {
                playKey(event, user.id, strokes, setStrokes);
            } else {
                playKey(event, null, strokes, setStrokes);
            }
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
        if (user) deleteKeys();
        // eslint-disable-next-line
    }, [user]);

    return (
        <div className="piano">
            <h1 className="piano-header">Piano</h1>
            <div className="piano-keyboard">
                {keyboard.notes.map((note, index) => {
                    const key = keyboard.colors[index]
                        ? "piano-black-key"
                        : "piano-white-key";
                    const noteText = keyboard.notes[index];
                    const letter = keyboard.letters[index];

                    return (
                        <div
                            className={key}
                            key={note}
                            id={note}
                            onMouseDown={() => {
                                if (user) {
                                    playNote(
                                        note,
                                        user.id,
                                        index,
                                        strokes,
                                        setStrokes
                                    );
                                } else {
                                    playNote(
                                        note,
                                        null,
                                        index,
                                        strokes,
                                        setStrokes
                                    );
                                }
                            }}
                            onMouseUp={() => {
                                releaseNote(note);
                            }}
                            style={{
                                position: "relative",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                justifyItems: "center",
                            }}
                        >
                            <span
                                style={{
                                    alignSelf: "flex-start",
                                    width: "100%",
                                }}
                            >
                                {letter}
                            </span>
                            <span
                                style={{ alignSelf: "flex-end", width: "100%" }}
                            >
                                {noteText}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Piano;
