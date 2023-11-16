import axios from "axios";
import { getUrl } from "./Api";
const AxiosInstance = axios.create({
    baseURL: getUrl(),
    timeout: 50000,
});

export default AxiosInstance;
