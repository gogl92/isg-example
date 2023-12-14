import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-type": "application/json",
  },
});

export default apiClient;
