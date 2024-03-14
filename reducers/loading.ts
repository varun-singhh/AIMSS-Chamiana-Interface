import { Reducer } from "redux";
import { LOADING } from "../actions/types";

interface LoadState {
  loading: boolean;
}

const initialState: LoadState = {
  loading: false,
};

const loadingReducer: Reducer<LoadState> = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case ERROR_FETCHING_FORM:
      return {
        ...state,
        loading: false,
        data: action.payload,
        message: "failed to fetch form",
      };
    case ERROR_UPLOADING_FORM:
      return {
        ...state,
        loading: false,
        data: action.payload,
        message: "failed to upload form",
      };
    case ERROR_CREATING_FORM:
      return {
        ...state,
        loading: false,
        message: "failed to upload form, please try again",
      };
    case ERROR_DELETING_FORM:
      return {
        ...state,
        loading: false,
        data: action.payload,
        message: "failed to delete form, please try again",
      };
    case REGISTER_USER_FAILED:
      return {
        ...state,
        loading: false,
        loggedIn: false,
        data: action.payload,
        message: "failed to register user",
      };
    case REQUEST_OTP_FAILED:
      return {
        ...state,
        loading: false,
        loggedIn: false,
        data: action.payload,
        message: "failed to send otp",
      };
    case USER_LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        loggedIn: false,
        data: action.payload,
        message: "failed to login",
      };
    case CLEAR_STATE:
      return {
        ...state,
        loading: false,
        loggedIn: false,
        data: null,
        message: null,
      };
    default:
      return state;
  }
};

export default loadingReducer;
