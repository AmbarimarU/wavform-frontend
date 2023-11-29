import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTopicDetail } from "../Api/Api";
import Piano from "../Piano/Piano";

function TopicsDetails() {
  const [singleTopic, setSingleTopic] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchSingleTopic = async () => {
      try {
        const res = await fetchTopicDetail(id);
        // console.log(res);

        setSingleTopic(res);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSingleTopic();
  }, [id]);

  // Format description to the next line
  const formattedDesc = singleTopic?.description.replace(/\n/g, "<br />");
  // console.log(formattedDesc)

  return (
    <div>
      {singleTopic && (
        <div>
          <div>
            <h1>{singleTopic.name}</h1>
          </div>

          <div>
            <p dangerouslySetInnerHTML={{ __html: formattedDesc }}></p>
          </div>
        </div>
      )}
    </div>
  );
}

export default TopicsDetails;
