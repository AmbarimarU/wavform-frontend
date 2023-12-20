import React from "react";
// import { useNavigate } from "react-router-dom";
// import useAuthHooks from "../Hooks/Auth/useAuthHooks";
import "./Welcome.css";
import LessonCard from "../Lessons/LessonCard";

function Welcome() {
  //   const navigate = useNavigate();
  // const [user, ,] = useAuthHooks();

  // function handleLessonsNav() {
  //     navigate("/lessons");
  // }

  // function handleMusicToolNav() {
  //     navigate("/musictool");
  // }

  // function handleSignupNav() {
  //     if (user) {
  //         navigate("/profile");
  //     } else {
  //         navigate("/signup");
  //     }
  // }

  return (
    <div className="welcome">
      <div className="welcome-heading">
        <h2 className="welcome-h2">Welcome to Wavform</h2>
        <p>Please Make A Selection</p>
      </div>
      {/* <div className="button-container">
        <div className="btn-group">
          <button onClick={handleLessonsNav} className="welcome-buttons">
            Lesson/Topics
          </button>
          <p className="welcome-button-on-hover">
            Lesson and Topics that will introduce you to music production and
            show you how to use the music tool
          </p>
        </div>
        <div className="btn-group">
          <button onClick={handleMusicToolNav} className="welcome-buttons">
            Music Tool
          </button>
          <p className="welcome-button-on-hover">
            Already know what you're doing? Head straight to Music Tool
          </p>
        </div>
        <div className="btn-group">
          <button onClick={handleSignupNav} className="welcome-buttons">
            {user ? "Profile" : "Sign-up"}
          </button>
          <p className="welcome-button-on-hover">
            {" "}
            {user
              ? "Checkout Your Saved Sequences!!"
              : "Sign up to save music sequences and so much more!!"}{" "}
          </p>
        </div>
      </div> */}

      <LessonCard />
    </div>
  );
}

export default Welcome;
