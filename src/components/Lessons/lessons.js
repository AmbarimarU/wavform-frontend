import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchLessons } from "../Api/Api";
import "./Lessons.css";

function Lessons() {
    const [lessonsArray, setlessonsArray] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                let res = await fetchLessons();
                setlessonsArray(res);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="lessons">
            {lessonsArray.map((lesson) => {
                return (
                    <Link key={lesson.id} to={`/topics/${lesson.id}`}>
                        <button className="lessons-button">
                            {lesson.name}
                        </button>
                    </Link>
                );
            })}
        </div>
    );
}

export default Lessons;
