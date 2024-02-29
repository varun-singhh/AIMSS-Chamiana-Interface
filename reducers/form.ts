import {
  FETCHING_FORM_FROM_SERVER,
  CREATING_FORM,
  LOADING,
  DELETING_FORM,
  LOGOUT
} from "../actions/types";

interface FormState {
  loading: boolean;
  data: any | null;
  message: string | null;
}

const initialState: FormState = {
  loading: false,
  data: null,
  message: null,
};

type FormAction =
  | { type: typeof LOADING }
  | { type: typeof LOGOUT }
  | { type: typeof FETCHING_FORM_FROM_SERVER; payload: any }
  | { type: typeof CREATING_FORM; payload: any }
  | { type: typeof DELETING_FORM; payload: any };

export default function formReducer(
  state: FormState = initialState,
  action: FormAction
): FormState {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case FETCHING_FORM_FROM_SERVER:
      return {
        ...state,
        loading: !state.loading,
        data: action.payload,
        message: "form retrieved successfully",
      };
    case CREATING_FORM:
      return {
        ...state,
        loading: !state.loading,
        data: action.payload,
        message: "form uploaded successfully",
      };
    case DELETING_FORM:
      return {
        ...state,
        loading: !state.loading,
        data: action.payload,
        message: "form deleted successfully",
      };
    case LOGOUT: 
      return initialState
    default:
      return state;
  }
}
