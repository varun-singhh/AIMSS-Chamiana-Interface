import axios from "axios";
import { authBaseURL } from "../utils/auth";
import {
  USER_LOGIN,
  REGISTER_USER,
  USER_LOGIN_FAILED,
  REGISTER_USER_FAILED,
  LOADING,
  REQUEST_OTP,
  REQUEST_OTP_FAILED,
  LOGOUT,
} from "./types";
import { Dispatch } from "redux";
import { deleteState } from "../localstorage";

export const login = (data: any) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: LOADING });

    const res = await axios.post(authBaseURL + `login`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({
      type: USER_LOGIN,
      payload: res.data?.data,
    });
  } catch (error: any) {
    dispatch({
      type: USER_LOGIN_FAILED,
      payload: error.response?.data,
    });
  }
};

export const logout = () => async (dispatch: Dispatch) => {
  dispatch({ type: LOGOUT });
  deleteState()
};
