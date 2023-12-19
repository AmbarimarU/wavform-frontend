import { useEffect, useState } from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
import { fetchTopics } from "../Api/Api";
import { Link, useParams } from "react-router-dom";
import "./LessonCard.css";

function LessonCard() {
  const [topicData, setTopicData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function fetchTopicsData() {
      try {
        const res = await fetchTopics(id);
        console.log(res);
        setTopicData(res);
      } catch (error) {
        console.log(error);
      }
    }

    fetchTopicsData();
  }, [id]);

  return (
    <div className="card">
      {/* <div className="lesson-card">
        <h3>{title}</h3>
        <ProgressBar percent={0} maxComplete={100} />
        <ProgressBar percent={completion} />
      </div> */}

      {topicData.map((topic, index) => {
        return (
         <div key={index}>
          <Link to={`/topics/${topic.id}`}>
            <h3 key={topic.id}>{topic.name}</h3>
          </Link>
          <ProgressBar />
         </div>
          
        );
      })}
    </div>
  );
}
export default LessonCard;
