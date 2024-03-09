import {
  USER_LOGIN,
  REGISTER_USER,
  LOADING,
  REQUEST_OTP,
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
  | { type: typeof USER_LOGIN; payload: any }
  | { type: typeof REQUEST_OTP; payload: any };

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
        loading: false,
        loggedIn: false,
        data: action.payload,
        message: "user registered successfully",
      };
    case REQUEST_OTP:
      return {
        loading: false,
        loggedIn: false,
        data: action.payload,
        message: "otp sent successfully",
      };
    case USER_LOGIN:
      return {
        loggedIn: true,
        loading: false,
        data: action.payload,
        message: "user logged in successfully",
      };
    default:
      return state;
  }
}
