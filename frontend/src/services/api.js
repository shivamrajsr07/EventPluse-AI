import axios from "axios";

const API = axios.create({
  baseURL: "https://shivamrajsr07-eventpulse-ai.hf.space",
  timeout: 10000,
});

export default API;