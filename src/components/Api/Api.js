import Axios from "./Axios";
function getUrl() {
    return process.env.NODE_ENV === "development"
        ? "http://localhost:3001"
        : "https://wavform-backend.onrender.com/";
}
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
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export { getAllLessons, getUrl, fetchLessons };
