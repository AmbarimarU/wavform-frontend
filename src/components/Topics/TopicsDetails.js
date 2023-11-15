import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function TopicsDetails() {
  const [singleTopic, setSingleTopic] = useState(null);
  const { id } = useParams();

  let api = process.env.REACT_APP_API_URL;

  const fetchSingleTopic = async () => {
    try {
      const response = await axios.get(`${api}/topics/topic/${id}`);
      // console.log(response.data);

      setSingleTopic(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    fetchSingleTopic();
  }, []);

  return (
    <div>
      {singleTopic && (
        <div>
          <div>
            <h1>{singleTopic.name}</h1>
          </div>

          <div>
            <p>{singleTopic.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default TopicsDetails;
