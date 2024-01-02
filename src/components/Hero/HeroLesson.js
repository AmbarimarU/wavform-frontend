import React from "react";
import "./HeroLesson.scss";
function HeroLesson({ lesson }) {
    const newtags = [lesson.tags[0], lesson.category, "Music Theory"];
    const heroStyle = {
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        lineHeight: "1.5",
    };

    const backgroundImageStyle = {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundImage: `linear-gradient(
                to right,
                rgba(0, 0, 0, 0.8) 40%,
                transparent
            ),
            url(${lesson.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: "-1",
        maxHeight: "315px",
    };
    return (
        <div className="lessonhero" style={{ heroStyle }}>
            <div className="lessonhero-container container">
                <div className="lessonhero-content">
                    <div style={backgroundImageStyle}></div>
                    <h2 className="lessonhero-title">{lesson.title}</h2>
                    <p className="lessonhero-description">
                        {lesson.description}
                    </p>{" "}
                    <ul className="list-inline">
                        {newtags.map((tag, index) => (
                            <li className="list-inline-item" key={index}>
                                <span
                                    className="lessonhero-first-upper"
                                    style={{
                                        backgroundColor:
                                            "var(--color-secondary)",
                                        border: "1px solid var(--color-secondary)",
                                        color: "var(--color-white)",
                                        borderRadius: "16px",
                                        fontSize: "12px",
                                        fontWeight: "bold",
                                        padding: "4px 8px",
                                        margin: "2px",
                                        display: "inline-block",
                                    }}
                                >
                                    {tag}{" "}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default HeroLesson;
