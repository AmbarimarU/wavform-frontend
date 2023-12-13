import { useState, useEffect } from "react";
import Tempo from "./tempo/Bullet Point 1 - tempo.gif";
import PulsingSpeaker from "./tempo/Bullet Point 2 - pulsing speaker.gif";

import "./TempoLessonImage.scss"

function TempoLessonImage({ currentIndex }) {
  const tempoImg = [Tempo, PulsingSpeaker];
  const [currentTempoImgIndex, setCurrentTempoImgIndex] = useState(0);

  const handleTempoPrev = () => {
    if (currentTempoImgIndex > 0) {
      setCurrentTempoImgIndex(currentTempoImgIndex - 1);
    }
  };

  const handleTempoNext = () => {
    if (currentTempoImgIndex < tempoImg.length - 1) {
      setCurrentTempoImgIndex(currentTempoImgIndex + 1);
    }
  };

  useEffect(() => {
    setCurrentTempoImgIndex(currentIndex);
}, [currentIndex])

  const isPrevDisable = currentTempoImgIndex === 0;
  const isNextDisable = currentTempoImgIndex >= tempoImg.length - 1;

  return (
    <div className="image-container">
      <img src={tempoImg[currentTempoImgIndex]} alt="" />

      <div>
        <button onClick={handleTempoPrev} disabled={isPrevDisable}>
          &laquo;
        </button>
        <button onClick={handleTempoNext} disabled={isNextDisable}>
          &raquo;
        </button>
      </div>
    </div>
  );
}

export default TempoLessonImage;
