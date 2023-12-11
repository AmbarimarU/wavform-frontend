import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTopicDetail } from "../Api/Api";
import Piano from "../Piano/Piano";
import BarsAndNotesLesson from "../LessonsImages/BarsAndNotesLesson";
import TempoLessonImage from "../LessonsImages/TempoLessonImage";

function TopicsDetails() {
  const [singleTopic, setSingleTopic] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    const fetchSingleTopic = async () => {
      try {
        const res = await fetchTopicDetail(id);
        // console.log(res);

        setSingleTopic(res);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSingleTopic();
  }, [id]);

  // Format description to the next line
  // const formattedDesc = singleTopic?.description.replace(/\n/g, "<br />");
  // console.log(formattedDesc)

  const pianoTopics = [
    "Notes on the Piano and Octaves",
    "Intervals and Chords",
    "Scales",
    "Piano Practice",
  ];

  const barAndNoteTopic = ["Bars and Types of Notes"];
  const tempoTopic = ["Tempo"];

  const showPiano = pianoTopics.includes(singleTopic?.name);
  const showBarAndNotesImg = barAndNoteTopic.includes(singleTopic?.name);
  const showTempo = tempoTopic.includes(singleTopic?.name);

  const bulletPoint = singleTopic?.description.split("\n") || [];

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, bulletPoint.length - 1));
    if(currentIndex < bulletPoint.length - 1){
      setCurrentIndex(currentIndex + 1)
    }
  };

  const handlePreview = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  function renderBulletPoints() {
    const currentBulletPoint = bulletPoint[currentIndex];

    // Check if the current bullet point contains multiple bullet points
    const multiBulletPoints = currentBulletPoint.split("\n");

    if (multiBulletPoints.length > 1) {
      // return a new array of bullet point
      return multiBulletPoints.map((item, index) => (
        <p key={index} dangerouslySetInnerHTML={{ __html: item }}></p>
      ));
    } else {
      // return a single bullet point only
      return <p dangerouslySetInnerHTML={{ __html: currentBulletPoint }}></p>;
    }
  }

  const randomNoteSequence = () => {
    let notes = "CDEFGAB";

    const chars = notes.split("");

    for (let i = chars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }

    const shuffledString = chars.join("");

    return shuffledString;
  };

  return (
    <div>
      {singleTopic && (
        <div>
          <div>
            <h1>{singleTopic.name}</h1>
          </div>

          <div>{showPiano && <Piano />}</div>

          <div>{showBarAndNotesImg && <BarsAndNotesLesson />}</div>
          <div>{showTempo && <TempoLessonImage />}</div>
          <div>
            {/* <p dangerouslySetInnerHTML={{ __html: formattedDesc }}></p> */}

            {renderBulletPoints()}
            {singleTopic.name === "Piano Practice"
              ? randomNoteSequence()
              : null}
          </div>
          <button onClick={handlePreview} disabled={currentIndex === 0}>
            &laquo; Prev
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex >= bulletPoint.length - 1}
          >
            Next &raquo;
          </button>
        </div>
      )}
    </div>
  );
}

export default TopicsDetails;
