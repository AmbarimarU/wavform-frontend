import React from "react";
import "./ProgressBar.css";

// In ProgressBar.js
function ProgressBar({ percent }) {
  const filledWidth = `${percent}%`;

  console.log("Percent in ProgressBar:", percent); // Log percent

  return (
    <div className="progress-bar-container">
      {percent !== undefined && (
        <>
          <div className="progress-bar">
            <div
              className="progress-bar-filled"
              style={{ width: filledWidth }}
            />
          </div>
          <div className="completion-label">{percent}% Complete</div>
        </>
      )}
    </div>
  );
}

export default ProgressBar;
