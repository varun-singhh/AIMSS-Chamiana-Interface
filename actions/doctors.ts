import axios from "axios";
import { userServiceBaseURL } from "../utils/utils";
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

export const getDoctorDetails =
  (id: string, query: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: LOADING });

      const res = await axios.get(
        `${userServiceBaseURL}doctor/${id}?${query}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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

export const getAllDoctorsDetails =
  (query: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: LOADING });

      var url;
      if (query !== "") {
        url = `${userServiceBaseURL}doctors?${query}`;
      } else {
        url = `${userServiceBaseURL}doctors`;
      }

      const res = await axios.get(url, {
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
