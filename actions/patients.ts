import axios from "axios";
import { userServiceBaseURL } from "../utils/utils";
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

export const getPatientDetails =
  (id: string, query: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: LOADING });

      const res = await axios.get(
        `${userServiceBaseURL}patient/${id}?${query}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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

export const getAllPatientsDetails =
  (query: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: LOADING });

      var url;
      if (query !== "") {
        url = `${userServiceBaseURL}patients?${query}`;
      } else {
        url = `${userServiceBaseURL}patients`;
      }

      const res = await axios.get(url, {
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
