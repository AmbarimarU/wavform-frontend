import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Lessons() {
  const [lessonsArray, setlessonsArray] = useState([]);

  const fetchLessons = async () => {
    let api = process.env.REACT_APP_API_URL;
    try {
      const response = await axios.get(`${api}/lessons`);

      console.log(response.data);
      setlessonsArray(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  return (
    <div>
      {lessonsArray.map((lesson) => {
        return (
          <Link key={lesson.id} to={`/topics/${lesson.id}`}>
            <button>{lesson.name}</button>
          </Link>
        );
      })}
    </div>
  );
}

export default Lessons;
