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
  ERROR_DOCTOR_DETAILS,
  ERROR_GET_ALL_DOCTORS,
  ERROR_CREATE_DOCTOR,
  CLEAR_ERR_STATE,
  ERROR_PATIENT_DETAILS,
  ERROR_CREATE_PATIENT,
  ERROR_GET_ALL_PATIENTS,
  ERR_LOADING,
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
    case ERR_LOADING:
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
    case ERROR_DOCTOR_DETAILS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        message: "error fetching doctor details",
      };
    case ERROR_CREATE_DOCTOR:
      return {
        ...state,
        loading: false,
        data: action.payload,
        message: "error creating new doctor",
      };
    case ERROR_GET_ALL_DOCTORS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        message: "error fetching all doctors details",
      };
    case ERROR_PATIENT_DETAILS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        message: "error fetching patient details",
      };
    case ERROR_CREATE_PATIENT:
      return {
        ...state,
        loading: false,
        data: action.payload,
        message: "error creating new patient",
      };
    case ERROR_GET_ALL_PATIENTS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        message: "error fetching all patients details",
      };
    case CLEAR_ERR_STATE:
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

export default errorReducer;
