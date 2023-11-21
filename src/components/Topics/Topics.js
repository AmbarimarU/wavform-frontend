import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Topics() {
  const { lessonId } = useParams();
  // console.log(lessonId);
  const [topicsArray, setTopicsArray] = useState([]);
  let api = process.env.REACT_APP_API_URL;

  const fetchTopicsData = async () => {
    try {
      const response = await axios.get(`${api}/topics/lessons/${lessonId}`);

      const topics = response.data;
      console.log(topics);

      setTopicsArray(topics);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTopicsData();
  }, []);

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
