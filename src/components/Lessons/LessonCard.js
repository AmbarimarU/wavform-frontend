import { useEffect, useState } from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
import { fetchTopics } from "../Api/Api";
import { Link, useParams } from "react-router-dom";
import "./LessonCard.css";


function LessonCard({ completion }) {
  const [topicData, setTopicData] = useState([]);
  // const [isCompleted, setIsCompleted] = useState(0);
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
  
  useEffect(() => {
    const updateOverallProgress = () => {
      const overallProgress = topicData.reduce((total, topic) => {
        const completion = topic.progress ? topic.progress.completion : 0;
        return total + (isNaN(completion) ? 0 : completion);
      }, 0);

      const averageProgress =
        topicData.length > 0 ? overallProgress / topicData.length : 0;

      localStorage.setItem(
        `overall-completion-${id}`,
        Math.round(averageProgress)
      );
    };

    updateOverallProgress();
  }, [topicData, id]);
  
  return (
    <div className="card">
      {/* <div className="lesson-card">
        <h3>{title}</h3>
        <ProgressBar percent={0} maxComplete={100} />
        <ProgressBar percent={completion} />
      </div> */}


      {/* {topicData.map((topic, index) => {
        const completion = topic.progress ? topic.progress.completion : 0;
        console.log(completion)
        
        return (
         <div key={index}>
          <Link to={`/topics/${topic.id}`}>
            <h3 key={topic.id}>{topic.name}</h3>
          </Link>

          <ProgressBar percent={completion || completionPercentage}/>
         </div>
          
        );
      })} */}

      {topicData.map((topic, index) => {
        const completion = topic.progress ? topic.progress.completion : 0;
        // const progressTracker =
        //   completion || parseInt(localStorage.getItem(`completion-${id}`));

        return (
          <div key={index}>
            <Link to={`/topics/${topic.id}`}>
              <h3 key={topic.id}>{topic.name}</h3>
            </Link>
            <ProgressBar percent={completion} />
          </div>
        );
      })}
    </div>
  );
}
export default LessonCard;
