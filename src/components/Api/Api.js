import Axios from "./Axios";

function getUrl() {
  return process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : "https://wavform-backend.onrender.com/";
}
//about api 

async function getAllCreators() {
  try {
    let result = await Axios.get("/about");
    return result.data;
    //console.log(result.data);
  } catch (e) {
    alert(e.response.data.error);
    return;
  }
}



// Lessons api

async function getAllLessons() {
  try {
    let result = await Axios.get("/lessons");
    return result;
  } catch (e) {
    alert(e.response.data.error);
    return;
  }
}

const fetchLessons = async () => {
  try {
    const response = await Axios.get(`/lessons`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};


// Topics api

async function getAllTopics(lessonId) {
  try {
    let result = await Axios.get(`/topics/lessons/${lessonId}`);

    return result;
  } catch (e) {
    alert(e.response.data.error);
    return;
  }
}

const fetchTopics = async (lessonId) => {
  try {
    const response = await Axios.get(`/topics/lessons/${lessonId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

async function getSingleTopic(id) {
  try {
    let result = await Axios.get(`/topics/topic/${id}`);

    // console.log(result.data);
    return result.data;
  } catch (e) {
    alert(e.response.data.error);
    return;
  }
}

const fetchTopicDetail = async (id) => {
  try {
    const response = await Axios.get(`/topics/topic/${id}`);
    return response.data;
     //console.log(response.data)
  } catch (error) {
    console.log(error);
  }
};

export {
  getAllLessons,
  getUrl,
  fetchLessons,
  getAllTopics,
  fetchTopics,
  getSingleTopic,
  fetchTopicDetail,
  getAllCreators,
};
