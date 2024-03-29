import {
  FETCHING_FORM_FROM_SERVER,
  CREATING_FORM,
  LOADING,
  DELETING_FORM,
  ERROR_CREATING_FORM,
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
  | { type: typeof FETCHING_FORM_FROM_SERVER; payload: any }
  | { type: typeof CREATING_FORM; payload: any }
  | { type: typeof DELETING_FORM; payload: any }
  | { type: typeof ERROR_CREATING_FORM; payload: any };

export default function formReducer(
  state: FormState = initialState,
  action: FormAction
): FormState {
  switch (action.type) {
    case ERROR_CREATING_FORM:
      return {
        ...state,
        loading: false,
        message: "failed to upload form, please try again",
      };
    case FETCHING_FORM_FROM_SERVER:
      return {
        ...state,
        loading: false,
        data: action.payload,
        message: "form retrieved successfully",
      };
    case CREATING_FORM:
      return {
        ...state,
        loading: false,
        data: action.payload,
        message: "form uploaded successfully",
      };
    case DELETING_FORM:
      return {
        ...state,
        loading: false,
        data: action.payload,
        message: "form deleted successfully",
      };
    default:
      return state;
  }
}
