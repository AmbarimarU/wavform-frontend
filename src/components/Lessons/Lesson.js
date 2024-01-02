import React, { useState, useRef, useEffect } from "react";
import data from "./Lessondata.json";
import HeroLesson from "../Hero/HeroLesson";
import Piano from "../Piano/Piano";
import * as FaIcons from "react-icons/fa";
import "./Lesson.scss";
import { fetchKeys } from "../Api/Api";
function Lesson({ user }) {
    const lesson = data.lessons[0];
    const [page, setPage] = useState(0);
    const [refTrack, setRefTrack] = useState(null);
    const [strokes, setStrokes] = useState(0);
    //const [sequence, setSequence] = useState("");
    const [keyStrokes, setKeyStrokes] = useState([]);
    useEffect(() => {
        const fetchStrokeKeys = async () => {
            try {
                const res = await fetchKeys(user.id);
                setKeyStrokes(res);
            } catch (error) {
                console.log(error);
            }
        };

        fetchStrokeKeys();
    }, [user, strokes, setKeyStrokes]);
    const topRef = useRef(null);
    const handleNext = () => {
        setPage((prev) => Math.min(prev + 1, lesson.titles.length - 1));
        setRefTrack(true);
    };

    const handlePrevious = () => {
        setPage((prev) => Math.max(prev - 1, 0));
        setRefTrack(true);
    };
    useEffect(() => {
        if (topRef.current) {
            topRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [page]);
    return (
        <div className="lesson">
            <HeroLesson lesson={lesson} />
            <div
                className="lesson-container container"
                ref={refTrack ? topRef : null}
            >
                <div className="lesson-menu">
                    <span className="lesson-menu-top">In This Lesson</span>
                    {lesson.titles.map((lesson, index) => (
                        <div
                            className={
                                index === page
                                    ? "lesson-side-selected"
                                    : "lesson-side"
                            }
                            key={index}
                        >
                            {lesson}
                        </div>
                    ))}
                </div>
                <div className="lesson-content">
                    <div className="lesson-body">
                        <div className="lesson-header">
                            <h2 className="lesson-header-top">
                                Follow Along with Our Interactive Piano
                            </h2>
                            Click the keys to play the notes, or use your
                            computer keyboard to play the keys.
                            <br />
                            <br />
                            <Piano
                                user={user}
                                setStrokes={setStrokes}
                                strokes={strokes}
                                setKeyStrokes={setKeyStrokes}
                            />
                        </div>
                        <div className="lesson-pane">
                            <h4>{lesson.titles[page]}</h4>
                            {lesson.information[page]}{" "}
                        </div>
                        <div className="lesson-bottom">
                            <div
                                onClick={handlePrevious}
                                style={{
                                    visibility: page > 0 ? "visible" : "hidden",
                                }}
                                className="lesson-buttons"
                            >
                                <div>
                                    <FaIcons.FaChevronLeft />
                                </div>
                                <div>
                                    <h6>Previous Section</h6>
                                    {lesson.titles[page - 1]}
                                </div>
                            </div>
                            <div
                                onClick={handleNext}
                                style={{
                                    visibility:
                                        page < lesson.titles.length - 1
                                            ? "visible"
                                            : "hidden",
                                    textAlign: "right",
                                }}
                                className="lesson-buttons"
                            >
                                <div>
                                    <h6>Next Section</h6>
                                    {lesson.titles[page + 1]}
                                </div>
                                <div>
                                    <FaIcons.FaChevronRight />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Lesson;
