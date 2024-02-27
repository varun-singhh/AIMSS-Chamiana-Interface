import axios from "axios";
import { baseURL } from "../utils/auth";
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

export const getAllForm =
  (handleLoading: (status: boolean) => void) => async (dispatch: Dispatch) => {
    try {
      handleLoading(true);

      const res = await axios.get(baseURL + `form`);
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
    handleLoading(false);
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
    try {
      dispatch({ type: LOADING });

      const res = await axios.post(
        baseURL + `form`,
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

      const res = await axios.delete(baseURL + `form/${id}`, {
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
