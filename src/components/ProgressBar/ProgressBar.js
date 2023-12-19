import React from "react";
import "./ProgressBar.css";

function ProgressBar({ percent, maxComplete = 100 }) {
  const filledWidth = `${percent}%`;
  const remainingWidth = `${maxComplete - percent}%`;

  return (
    <div className="progress-container">
      <div className="progress">
        <div className="progress-filled" style={{ width: filledWidth }}>
          <div className="progress-remaining">{remainingWidth}</div>
        </div>
      </div>
      {percent === maxComplete && (
        <div className="completion-label">{percent}% Complete</div>
      )}
    </div>
  );
}

export default ProgressBar;