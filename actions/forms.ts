import axios from "axios";
import { formServiceBaseURl, setAuthToken } from "../utils/auth";
import {
  FETCHING_FORM_FROM_SERVER,
  ERROR_FETCHING_FORM,
  LOADING,
  CREATING_FORM,
  ERROR_CREATING_FORM,
  DELETING_FORM,
  ERROR_DELETING_FORM,
} from "./types";
import { Dispatch } from "redux";
import Cookies from "js-cookie";

export const getSingleForm =
  (id: string, type: string, fillerId: string) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({ type: LOADING });

      const res = await axios.get(baseURL + `form/${id}?type=${type}`);
      dispatch({
        type: FETCHING_FORM_FROM_SERVER,
        payload: res.data,
      });
    } catch (error: any) {
      dispatch({
        type: ERROR_FETCHING_FORM,
        payload: error.response,
      });
    }
  };

export const getAllForm = () => async (dispatch: Dispatch) => {
  try {
    const res = await axios.get(formServiceBaseURl + `forms`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    dispatch({
      type: FETCHING_FORM_FROM_SERVER,
      payload: res.data,
    });
  } catch (error: any) {
    dispatch({
      type: ERROR_FETCHING_FORM,
      payload: error.response,
    });
  }
};

export const createForm =
  (
    type: string,
    category: string,
    filler_id: string,
    filler_type: string,
    doctor_name: string,
    doctor_id: string,
    data: any
  ) =>
  async (dispatch: Dispatch) => {
    filler_id = filler_id + "";

    try {
      dispatch({ type: LOADING });

      const res = await axios.post(
        formServiceBaseURl + `form`,
        {
          type,
          category,
          filler_id,
          filler_type,
          consulting_doctor_name: doctor_name,
          consulting_doctor_id: doctor_id,
          data: data,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      dispatch({
        type: CREATING_FORM,
        payload: res.data,
      });
    } catch (error: any) {
      dispatch({
        type: ERROR_CREATING_FORM,
        payload: error.response,
      });
    }
  };

export const deleteForm =
  (id: string, updateFormStatus: () => void) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: LOADING });

      const res = await axios.delete(formServiceBaseURl + `form/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      updateFormStatus();
      dispatch({
        type: DELETING_FORM,
        payload: res.data,
      });
    } catch (error: any) {
      dispatch({
        type: ERROR_DELETING_FORM,
        payload: error.response,
      });
    }
  };
