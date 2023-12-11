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

async function fetchAllUsers() {
    try {
        let result = await getAllUsers();
        console.log(result);
    } catch (error) {
        console.log(error);
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

//user api

const getAllUsers = async () => {
    try {
        const result = await Axios.get("/users");
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
};

const createUsers = async (userData) => {
    try {
        const result = await Axios.post("/users/create-user", userData);
        console.log(result.data);
        return result.data;
    } catch (error) {
        console.error(error);
    }
};

const loginUsers = async (userData) => {
    try {
        const result = await Axios.post("/users/login", userData);
        console.log(result);
        return result;
    } catch (error) {
        console.error(error);
    }
};
async function getSession() {
    try {
        let result = await Axios.get("/session");
        return result.data;
    } catch (e) {
        alert(e.response.data.error);
        return;
    }
}
async function insertKey(note, user) {
    try {
        let result = await Axios.post("/keys", { user: user, key_press: note });
        return result.data;
    } catch (e) {
        alert(e.response.data.error);
        return;
    }
}
async function deleteKey(user) {
    try {
        await Axios.delete("/keys", { data: { user: user } });
        //return result.data;
    } catch (e) {
        alert(e.response.data.error);
        return;
    }
}
async function fetchKeys(user) {
    try {
        let result = await Axios.get(`/keys/${user}`);
        return result.data;
    } catch (e) {
        //alert(e.response.data.error);
        return;
    }
}
export {
    getAllLessons,
    getUrl,
    fetchLessons,
    getAllTopics,
    fetchTopics,
    getSingleTopic,
    fetchTopicDetail,
    getAllCreators,
    getAllUsers,
    createUsers,
    loginUsers,
    fetchAllUsers,
    getSession,
    insertKey,
    deleteKey,
    fetchKeys,
};
