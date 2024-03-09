import { Reducer } from "redux";
import {
  ERROR_UPLOADING_FORM,
  ERROR_FETCHING_FORM,
  ERROR_CREATING_FORM,
  LOADING,
  ERROR_DELETING_FORM,
  REGISTER_USER_FAILED,
  REQUEST_OTP_FAILED,
  USER_LOGIN_FAILED,
} from "../actions/types";

interface ErrorState {
  loading: boolean;
  data: any | null;
  message: string | null;
}

const initialState: ErrorState = {
  loading: false,
  data: null,
  message: null,
};

const errorReducer: Reducer<ErrorState> = (state = initialState, action) => {
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
        loading: false,
        loggedIn: false,
        data: action.payload,
        message: "failed to register user",
      };
    case REQUEST_OTP_FAILED:
      return {
        loading: false,
        loggedIn: false,
        data: action.payload,
        message: "failed to send otp",
      };
    case USER_LOGIN_FAILED:
      return {
        loading: false,
        loggedIn: false,
        data: action.payload,
        message: "failed to login",
      };
    default:
      return state;
  }
};

export default errorReducer;
