import {
  LOADING,
  GET_DOCTOR_DETAILS,
  ERROR_DOCTOR_DETAILS,
  GET_ALL_DOCTORS,
  ERROR_GET_ALL_DOCTORS,
  CREATE_DOCTOR,
  ERROR_CREATE_DOCTOR,
  GET_PATIENT_DETAILS,
  ERROR_PATIENT_DETAILS,
  GET_ALL_PATIENTS,
  ERROR_GET_ALL_PATIENTS,
  CREATE_PATIENT,
  ERROR_CREATE_PATIENT,
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
  | { type: typeof GET_ALL_DOCTORS; payload: any }
  | { type: typeof CREATE_DOCTOR; payload: any }
  | { type: typeof GET_PATIENT_DETAILS; payload: any }
  | { type: typeof GET_ALL_PATIENTS; payload: any }
  | { type: typeof CREATE_PATIENT; payload: any };

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
    case GET_DOCTOR_DETAILS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        message: "doctor details fetched successfully",
      };
    case GET_ALL_DOCTORS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        message: "All doctor details fetched successfully",
      };
    case CREATE_DOCTOR:
      return {
        ...state,
        loading: false,
        data: action.payload,
        message: "new doctor created",
      };
    case GET_PATIENT_DETAILS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        message: "patient details fetched successfully",
      };
    case GET_ALL_PATIENTS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        message: "All patient details fetched successfully",
      };
    case CREATE_PATIENT:
      return {
        ...state,
        loading: false,
        data: action.payload,
        message: "new patient created",
      };
    default:
      return state;
  }
}
