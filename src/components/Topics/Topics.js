import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchTopics } from "../Api/Api";

function Topics() {
  const { lessonId } = useParams();
  // console.log(lessonId);
  const [topicsArray, setTopicsArray] = useState([]);

  useEffect(() => {
    async function fetchTopicsData() {
      try {
        const res = await fetchTopics(lessonId);
        // console.log(res)

        setTopicsArray(res);
      } catch (error) {
        console.log(error);
      }
    }

    fetchTopicsData();
  }, [lessonId]);

  return (
    <div>
      <h1>Topics</h1>

      {topicsArray.map((topic) => {
        return (
          <ul key={topic.id}>
            <li>
              <Link to={`/topics/topic/${topic.id}`}>{topic.name}</Link>
            </li>
          </ul>
        );
      })}
    </div>
  );
}

export default Topics;
