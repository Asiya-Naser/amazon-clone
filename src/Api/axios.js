import axios from "axios";
const axiosInstance = axios.create({
  //local instance of firebase function
  // baseURL: "http://127.0.0.1:5001/clone-f0dcc/us-central1/api",
  baseURL: "https://amazon-api-deploy-u0x0.onrender.com/",
});

export {axiosInstance}