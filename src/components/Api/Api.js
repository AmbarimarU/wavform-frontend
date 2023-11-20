import Axios from "./Axios";
function getUrl() {
    return process.env.NODE_ENV === "development"
        ? "http://localhost:3001"
        : "https://cars-backend-hu7s.onrender.com";
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
export { getAllLessons, getUrl };
