import axios from "axios";
import { userServiceBaseURL } from "../utils/auth";
import {
  LOADING,
  GET_DOCTOR_DETAILS,
  ERROR_DOCTOR_DETAILS,
  GET_ALL_DOCTORS,
  ERROR_GET_ALL_DOCTORS,
} from "./types";
import { Dispatch } from "redux";

export const getDoctorDetails = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: LOADING });

    const res = await axios.get(userServiceBaseURL + "doctor?id=" + id, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({
      type: GET_DOCTOR_DETAILS,
      payload: res.data?.data,
    });
  } catch (error: any) {
    dispatch({
      type: ERROR_DOCTOR_DETAILS,
      payload: error.response?.data,
    });
  }
};

export const getAllDoctorsDetails = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: LOADING });

    const res = await axios.get(userServiceBaseURL + "doctors", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({
      type: GET_ALL_DOCTORS,
      payload: res.data?.data,
    });
  } catch (error: any) {
    dispatch({
      type: ERROR_GET_ALL_DOCTORS,
      payload: error.response?.data,
    });
  }
};
