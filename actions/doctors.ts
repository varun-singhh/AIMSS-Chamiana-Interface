import axios from "axios";
import { userServiceBaseURL } from "../utils/auth";
import {
  LOADING,
  GET_DOCTOR_DETAILS,
  ERROR_DOCTOR_DETAILS,
  GET_ALL_DOCTORS,
  ERROR_GET_ALL_DOCTORS,
  CREATE_DOCTOR,
  ERROR_CREATE_DOCTOR,
  CLEAR_ERR_STATE,
} from "./types";
import { Dispatch } from "redux";

export const createNewDoctor = (data: any) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: LOADING });

    const res = await axios.post(userServiceBaseURL + "internal/doctor", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({
      type: CREATE_DOCTOR,
      payload: res.data?.data,
    });
    dispatch({ type: CLEAR_ERR_STATE });
  } catch (error: any) {
    dispatch({
      type: ERROR_CREATE_DOCTOR,
      payload: error.response?.data,
    });
  }
};

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
