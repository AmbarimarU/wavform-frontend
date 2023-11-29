import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTopicDetail } from "../Api/Api";
import Piano from "../Piano/Piano";

function TopicsDetails() {
  const [singleTopic, setSingleTopic] = useState(null);
  const { id } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const bulletsPerPage = 8;

  useEffect(() => {
    const fetchSingleTopic = async () => {
      try {
        const res = await fetchTopicDetail(id);
        setSingleTopic(res);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSingleTopic();
  }, [id]);

  const bulletPoints = singleTopic?.description.split("\n") || [];

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + bulletsPerPage, bulletPoints.length - bulletsPerPage));
  };

  const handlePreview = () => {
    setCurrentIndex((prev) => Math.max(prev - bulletsPerPage, 0));
  };

  const displayedBulletPoints = bulletPoints.slice(currentIndex, currentIndex + bulletsPerPage);

  return (
    <div>
      {singleTopic && (
        <div>
          <div>
            <h1>{singleTopic.name}</h1>
          </div>
          <Piano />

          {displayedBulletPoints.map((bulletPoint, index) => (
            <p key={index} dangerouslySetInnerHTML={{ __html: bulletPoint }}></p>
          ))}
          <div>
            <button onClick={handlePreview} disabled={currentIndex === 0}>
              Preview
            </button>
            <button onClick={handleNext} disabled={currentIndex >= bulletPoints.length - bulletsPerPage}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TopicsDetails;
