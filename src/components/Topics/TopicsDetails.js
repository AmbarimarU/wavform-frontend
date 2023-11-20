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

  // Format description to the next line
  const formattedDesc = singleTopic?.description.replace(/\n/g, '<br />');

  return (
    <div>
      {singleTopic && (
        <div>
          <div>
            <h1>{singleTopic.name}</h1>
          </div>
          
          <div>
            <p dangerouslySetInnerHTML={{__html: formattedDesc}}></p>
          </div>
        </div>
      )}
    </div>
  );
}

export default TopicsDetails;
