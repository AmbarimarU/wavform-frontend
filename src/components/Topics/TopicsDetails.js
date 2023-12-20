import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchTopicDetail, fetchKeys } from "../Api/Api";
import Piano from "../Piano/Piano";
import BarsAndNotesLesson from "../LessonsImages/BarsAndNotesLesson";
import TempoLessonImage from "../LessonsImages/TempoLessonImage";

function TopicsDetails({ user }) {
    const [singleTopic, setSingleTopic] = useState(null);
    const [strokes, setStrokes] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [sequence, setSequence] = useState("");
    const [keyStrokes, setKeyStrokes] = useState([]);
    let newKeys = "";
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
        if (id === "4") {
            const randomNoteSequence = () => {
                let notes = "AWSEDFTGYHUJK";
                let lengthN = 8;
                const chars = notes.split("");

                for (let i = chars.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [chars[i], chars[j]] = [chars[j], chars[i]];
                }

                const shuffledString = chars.slice(0, lengthN).join("");

                return shuffledString;
            };
            setSequence(randomNoteSequence());
        }
    }, [id]);

    useEffect(() => {
        const fetchStrokeKeys = async () => {
            try {
                const res = await fetchKeys(user.id);
                setKeyStrokes(res);
            } catch (error) {
                console.log(error);
            }
        };

        fetchStrokeKeys();
    }, [user, strokes, setKeyStrokes]);

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
    };

    const handlePreview = () => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
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
            return (
                <p dangerouslySetInnerHTML={{ __html: currentBulletPoint }}></p>
            );
        }
    }

   

    return (
      <div>
        {singleTopic && (
          <div>
            <div>
              <h1>{singleTopic.name}</h1>
            </div>

            <div>
              {showPiano && (
                <Piano
                  user={user}
                  setStrokes={setStrokes}
                  strokes={strokes}
                  setKeyStrokes={setKeyStrokes}
                />
              )}
            </div>
            <div>
              {showBarAndNotesImg && (
                <BarsAndNotesLesson currentIndex={currentIndex} />
              )}
            </div>
            <div>
              {showTempo && <TempoLessonImage currentIndex={currentIndex} />}
            </div>
            <div>
              {renderBulletPoints()}
              {singleTopic.name === "Piano Practice" && (
                <>
                  {sequence} <br />
                  <br /> Played Sequence: <br />{" "}
                  {user ? (
                    <>
                      <br />
                      {keyStrokes.length > 0 &&
                        keyStrokes.forEach((key) => {
                          newKeys += key.key_press;
                          // return (
                          //     <div
                          //         key={key.time_logged}
                          //         style={{
                          //             display:
                          //                 "inline-block",
                          //         }}
                          //     >
                          //         {key.key_press}
                          //     </div>
                          // );
                        })}
                      {newKeys}
                      {sequence === newKeys.slice(0, 8) && (
                        <>
                          <br />
                          <br />
                          You have successfully played the sequence
                        </>
                      )}
                      <br />
                    </>
                  ) : (
                    <>Please make an account to keep track of your progress</>
                  )}
                </>
              )}
            </div>
            {!sequence && (
              <>
                <button onClick={handlePreview} disabled={currentIndex === 0}>
                  &laquo; Prev
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentIndex >= bulletPoint.length - 1}
                >
                  Next &raquo;
                </button>
                {currentIndex === bulletPoint.length - 1 && (
                  <Link to="/musictool">
                    <button>Checkout Music Tool &raquo;</button>
                  </Link>
                )}
              </>
            )}
          </div>
        )}
      </div>
    );
}

export default TopicsDetails;