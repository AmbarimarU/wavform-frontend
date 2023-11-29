import axios from "axios";
import { getUrl } from "./Api";
const AxiosInstance = axios.create({
    baseURL: getUrl(),
    timeout: 50000,
    headers:{
        Accept: "application/json:charset=UTF=8",
        Authorization: setTokenHeaders()
    }
});

function setTokenHeaders(){
    let token= window.localStorage.getItem("jwtToken");

    if (token){
        return `Bearer ${token}`
    } else{
        return
    }
}

export default AxiosInstance;
