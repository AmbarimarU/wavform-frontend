import React from "react";
import "./Hero.scss";
function Hero() {
    return (
        <div className="hero">
            <div className="hero-container container">
                <div className="hero-content">
                    <h2 className="hero-title">
                        UNLOCK YOUR MUSICAL JOURNEY
                        <span className="hero-title-highlight">
                            We Make Learning Music <em>Easy</em> and{" "}
                            <em>Fun</em>!
                        </span>{" "}
                    </h2>
                    <p className="hero-description">
                        Immerse yourself in the musical playground of WavForm,
                        where our expertly curated lessons eliminate the
                        guesswork from learning music. Whether you're a beginner
                        or refining your skills, our immersive experience
                        seamlessly guides you through each step. Explore diverse
                        genres, master instruments, and find joy in creating
                        your own melody. Your musical adventure begins today!
                    </p>{" "}
                </div>
            </div>
        </div>
    );
}

export default Hero;
