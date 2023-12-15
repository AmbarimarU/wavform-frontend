import { useState, useEffect } from "react";
import Bar from "./Bars-And-Types-Of-Notes/Bullet Point 1 - Bar.png";
import TimeSignature from "./Bars-And-Types-Of-Notes/Bullet Point 2 - Time Signature.png";
import TypesOfNotes from "./Bars-And-Types-Of-Notes/Bullet Point 3 - Different Types Of Notes.jpeg";
import QuarterAndEighthNotes from "./Bars-And-Types-Of-Notes/Bullet Point 4 - Quarter Notes and Eighth Notes.png";

import "./BarsAndNotesLesson.scss"

function BarsAndNotesLesson({ currentIndex }) {
  // an array to store the images
  const barAndNotesImg = [
    Bar,
    TimeSignature,
    TypesOfNotes,
    QuarterAndEighthNotes,
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // const handleImagePrev = () => {
  //   // if the prev is equal to 0, return the image.length - 1 else return the prev - 1 (decrement)
  //   if (currentImageIndex > 0) {
  //     setCurrentImageIndex(currentImageIndex - 1);
  //   }
  // };

  // const handleImageNext = () => {
  //   // if the next is equal to the image.length - 1, return 0 else return next + 1 (increament 1)
  //   if (currentImageIndex < barAndNotesImg.length - 1) {
  //     setCurrentImageIndex(currentImageIndex + 1);
  //   }
  // };

  useEffect(() => {
      setCurrentImageIndex(currentIndex);
  }, [currentIndex])
  

  return (
    <div className="image-container">
      {/* <img src={Bar} alt="" />
      <img src={TimeSignature} alt="" />
      <img src={TypesOfNotes} alt="" />
      <img src={QuarterAndEighthNotes} alt="" /> */}

      <img src={barAndNotesImg[currentImageIndex]} alt="" />

      {/* <div>
        <button onClick={handleImagePrev} disabled={currentImageIndex === 0}>
          &laquo;
        </button>

        <button
          onClick={handleImageNext}
          disabled={currentImageIndex >= barAndNotesImg.length - 1}
        >
          &raquo;
        </button>
      </div> */}
    </div>
  );
}

export default BarsAndNotesLesson;
