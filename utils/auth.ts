import axios, { AxiosRequestConfig } from "axios";

export const baseURL = "http://localhost:8000/api/";
export const authBaseURL = "http://localhost:2222/api/";

const setAuthToken = (token: string | null): void => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
