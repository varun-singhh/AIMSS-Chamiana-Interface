import axios from "axios";
import ProgressBar from "@badrap/bar-of-progress";
import Cookies from "js-cookie";

export const baseURL = "http://localhost:8001/api/";

export const authBaseURL = "http://localhost:2222/api/";

export const userServiceBaseURL = "http://localhost:8000/";

export const setAuthToken = (token: string | null): void => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export const getDateFromString = (dateString: string) => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
  const year = date.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
};

export const progress = new ProgressBar({
  size: 4,
  color: "#0384fc",
  className: "z-50",
  delay: 100,
});

export const clearCookie = () => {
  const cookies = Cookies.get();
  Object.keys(cookies).forEach((cookieName) => {
    Cookies.remove(cookieName);
  });
};
