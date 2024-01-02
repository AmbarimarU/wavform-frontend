import React, { useState } from "react";
import "./Lessons.scss";
import LessonsCard from "./LessonsCard";
import data from "./Lessondata.json";
import HeroHome from "../Hero/HeroHome";
function Lessons() {
    const [filteredLessons, setFilteredLessons] = useState(data.lessons);
    const filterLessons = (tag) => {
        if (tag === "All") {
            setFilteredLessons(data.lessons);
        } else {
            const filtered = data.lessons.filter((lesson) =>
                lesson.tags.includes(tag)
            );
            setFilteredLessons(filtered);
        }
    };
    return (
        <>
            <HeroHome />
            <div className="lessons">
                <div className="lessons-container container">
                    <div className="lessons-content">
                        <div className="lessons-header">
                            <h2>Lessons Library</h2>
                            <div className="lessons-buttons">
                                <button
                                    className="lessons-button"
                                    onClick={() => filterLessons("All")}
                                >
                                    All Lessons
                                </button>
                                <button
                                    className="lessons-button"
                                    onClick={() => filterLessons("In Progress")}
                                >
                                    In Progress
                                </button>
                                <button
                                    className="lessons-button"
                                    onClick={() => filterLessons("Not Started")}
                                >
                                    Not Started
                                </button>
                                <button
                                    className="lessons-button"
                                    onClick={() => filterLessons("Completed")}
                                >
                                    Completed
                                </button>
                            </div>
                        </div>
                        <div className="lessons-body">
                            {filteredLessons.map((lesson, index) => {
                                return (
                                    <LessonsCard lesson={lesson} key={index} />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Lessons;
