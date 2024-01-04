import React from "react";
import "./HeroLesson.scss";
function HeroStudio() {
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
            url(https://images.unsplash.com/photo-1618609377864-68609b857e90?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
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
                    <h2 className="lessonhero-title">The Studio</h2>
                    <p className="lessonhero-description">
                        Unlead your musical genius witih the Studio! Dive into
                        melody and sequence creation, fine-tune instruments, and
                        add the perfect touch with reverb and delay. Elevate
                        your sound, today!
                    </p>{" "}
                </div>
            </div>
        </div>
    );
}

export default HeroStudio;
