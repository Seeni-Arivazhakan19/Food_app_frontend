import axios from "axios";

const URL = axios.create({
    baseURL: "http://localhost:8080/",
});

export default URL;
