import axios from "axios";
import { authBaseURL } from "../utils/utils";
import {
  USER_LOGIN,
  REGISTER_USER,
  USER_LOGIN_FAILED,
  REGISTER_USER_FAILED,
  LOADING,
  REQUEST_OTP,
  REQUEST_OTP_FAILED,
  LOGOUT,
  CLEAR_ERR_STATE,
  TOKEN_REFRESHED,
  TOKEN_REFRESH_FAILED,
} from "./types";
import { Dispatch } from "redux";
import { deleteState } from "../localstorage";
import Cookies from "js-cookie";

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

export const register = (data: any) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: LOADING });

    const res = await axios.post(authBaseURL + `signup`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: CLEAR_ERR_STATE });
    dispatch({
      type: REGISTER_USER,
      payload: res.data?.data,
    });
  } catch (error: any) {
    dispatch({
      type: REGISTER_USER_FAILED,
      payload: error.response?.data,
    });
  }
};

export const verify =
  (data: any, email: string) => async (dispatch: Dispatch) => {
    console.log(email, data);
    try {
      dispatch({ type: LOADING });

      const res = await axios.post(
        authBaseURL + `verify?email=` + email,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({
        type: REQUEST_OTP,
        payload: res.data?.data,
      });
    } catch (error: any) {
      dispatch({
        type: REQUEST_OTP_FAILED,
        payload: error.response?.data,
      });
    }
  };

export const resendOtp = (email: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: LOADING });

    const res = await axios.get(authBaseURL + "code?email=" + email);
    dispatch({
      type: REQUEST_OTP,
      payload: res.data?.data,
    });
  } catch (error: any) {
    dispatch({
      type: REQUEST_OTP_FAILED,
      payload: error.response?.data,
    });
  }
};

export const refreshToken = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: LOADING });

    const res = await axios.get(
      authBaseURL + "refresh-token/" + Cookies.get("token")
    );
    dispatch({
      type: TOKEN_REFRESHED,
      payload: res.data?.data,
    });
  } catch (error: any) {
    dispatch({
      type: TOKEN_REFRESH_FAILED,
      payload: error.response?.data,
    });
    logout();
  }
};

export const logout = () => async (dispatch: Dispatch) => {
  dispatch({ type: LOGOUT });
  deleteState();
  window.location.reload();
};
