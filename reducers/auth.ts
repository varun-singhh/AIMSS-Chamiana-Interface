import {
  USER_LOGIN,
  REGISTER_USER,
  USER_LOGIN_FAILED,
  REGISTER_USER_FAILED,
  LOADING,
  REQUEST_OTP,
  REQUEST_OTP_FAILED,
} from "../actions/types";

interface AuthState {
  loading: boolean;
  loggedIn: boolean;
  data: any | null;
  message: string | null;
}

const initialState: AuthState = {
  loading: false,
  data: null,
  loggedIn: false,
  message: null,
};

type AuthAction =
  | { type: typeof LOADING }
  | { type: typeof REGISTER_USER; payload: any }
  | { type: typeof REGISTER_USER_FAILED; payload: any }
  | { type: typeof USER_LOGIN; payload: any }
  | { type: typeof REQUEST_OTP; payload: any }
  | { type: typeof REQUEST_OTP_FAILED; payload: any }
  | { type: typeof USER_LOGIN_FAILED; payload: any };

export default function formReducer(
  state: AuthState = initialState,
  action: AuthAction
): AuthState {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_USER:
      return {
        ...state,
        loading: false,
        data: action.payload,
        message: "user registered successfully",
      };
    case REQUEST_OTP:
      return {
        ...state,
        loading: false,
        data: action.payload,
        message: "otp sent successfully",
      };
    case USER_LOGIN:
      return {
        ...state,
        loggedIn: true,
        loading: false,
        data: action.payload,
        message: "user logged in successfully",
      };
    case REGISTER_USER_FAILED:
      return {
        ...state,
        loading: false,
        data: action.payload,
        message: "failed to register user",
      };
    case REQUEST_OTP_FAILED:
      return {
        ...state,
        loading: false,
        data: action.payload,
        message: "failed to send otp",
      };
    case USER_LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        data: action.payload,
        message: "failed to login",
      };
    default:
      return state;
  }
}
