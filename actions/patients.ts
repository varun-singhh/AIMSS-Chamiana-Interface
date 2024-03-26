import axios from "axios";
import { userServiceBaseURL } from "../utils/auth";
import {
  LOADING,
  GET_PATIENT_DETAILS,
  ERROR_PATIENT_DETAILS,
  GET_ALL_PATIENTS,
  ERROR_GET_ALL_PATIENTS,
  CREATE_PATIENT,
  ERROR_CREATE_PATIENT,
  CLEAR_ERR_STATE,
} from "./types";
import { Dispatch } from "redux";

export const createNewPatient = (data: any) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: LOADING });

    const res = await axios.post(
      userServiceBaseURL + "internal/patient",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: CREATE_PATIENT,
      payload: res.data?.data,
    });
    dispatch({ type: CLEAR_ERR_STATE });
  } catch (error: any) {
    dispatch({
      type: ERROR_CREATE_PATIENT,
      payload: error.response?.data,
    });
  }
};

export const getPatientDetails = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: LOADING });

    const res = await axios.get(userServiceBaseURL + "patient?id=" + id, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({
      type: GET_PATIENT_DETAILS,
      payload: res.data?.data,
    });
  } catch (error: any) {
    dispatch({
      type: ERROR_PATIENT_DETAILS,
      payload: error.response?.data,
    });
  }
};

export const getAllPatientsDetails = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: LOADING });

    const res = await axios.get(userServiceBaseURL + "patients", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({
      type: GET_ALL_PATIENTS,
      payload: res.data?.data,
    });
  } catch (error: any) {
    dispatch({
      type: ERROR_GET_ALL_PATIENTS,
      payload: error.response?.data,
    });
  }
};
