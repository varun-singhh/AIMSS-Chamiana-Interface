import axios from "axios";
import ProgressBar from '@badrap/bar-of-progress';
import { Middleware } from 'redux';
import {Action} from '../actions/types'; // Import Action type if you have defined it

export const progress = new ProgressBar({
  size: 4,
  color: '#0384fc',
  className: 'z-50',
  delay: 100,
});

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

export const getDateFromString = (dateString: string) => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
  const year = date.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate
};




export const progressBarMiddleware: Middleware = () => next => (action: Action) => {
  if (action.type === 'START_FETCHING_DATA') {
    progress.start();
  } else if (action.type === 'FETCHING_DATA_COMPLETED') {
    progress.finish();
  }

  return next(action);
};
