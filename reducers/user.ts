import {
  LOADING,
  GET_DOCTOR_DETAILS,
  ERROR_DOCTOR_DETAILS,
  GET_ALL_DOCTORS,
  ERROR_GET_ALL_DOCTORS,
} from "../actions/types";

interface AuthState {
  loading: boolean;
  data: any | null;
  message: string | null;
}

const initialState: AuthState = {
  loading: false,
  data: null,
  message: null,
};

type AuthAction =
  | { type: typeof LOADING }
  | { type: typeof GET_DOCTOR_DETAILS; payload: any }
  | { type: typeof ERROR_DOCTOR_DETAILS; payload: any }
  | { type: typeof GET_ALL_DOCTORS; payload: any }
  | { type: typeof ERROR_GET_ALL_DOCTORS; payload: any };

export default function formReducer(
  state: AuthState = initialState,
  action: AuthAction
): AuthState {
  switch (action.type) {
    case GET_DOCTOR_DETAILS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        message: "doctor details fetched successfully",
      };
    case ERROR_DOCTOR_DETAILS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        message: "error fetching doctor details",
      };
    case GET_ALL_DOCTORS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        message: "All doctor details fetched successfully",
      };
    case ERROR_GET_ALL_DOCTORS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        message: "error fetching all doctors details",
      };
    default:
      return state;
  }
}
