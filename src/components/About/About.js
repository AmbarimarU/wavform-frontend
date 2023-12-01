import React, { useEffect, useState } from "react";
import { getAllCreators } from "../Api/Api";
import "./About.css";

function About() {
  const [creatorsArray, setCreatorsArray] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [creatorPerPage, setCreatorPerPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      try {
        let res = await getAllCreators();
        setCreatorsArray(res);
      } catch (e) {
        console.error("Error fetching creators:", e);
      }
    }
    fetchData();
  }, []);

  const handlePrev = () => {
    setActiveIndex((prevIndex) => {
      const newIndex =
        (prevIndex - creatorPerPage + creatorsArray.length) %
        creatorsArray.length;
      return newIndex;
    });
  };

  const handleNext = () => {
    setActiveIndex((nextIndex) => {
      const newIndex = (nextIndex + creatorPerPage) % creatorsArray.length;
      return newIndex;
    });
  };

  return (
    <div>
      <div className="carousel">
        <div className="carousel-inner">
          {creatorsArray
            .slice(activeIndex, activeIndex + creatorPerPage)
            .map((creator, index) => (
              <div
                key={creator.id}
                className={
                  index === 0 ? "carousel-item active" : "carousel-item"
                }
              >
                <p>{creator.name}</p>
              </div>
            ))}
        </div>
        <button className="carousel-control-prev" onClick={handlePrev}>
          &lt;
        </button>
        <button className="carousel-control-next" onClick={handleNext}>
          &gt;
        </button>
      </div>
    </div>
  );
}

export default About;
