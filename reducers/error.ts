import { Reducer } from 'redux';
import {
  ERROR_UPLOADING_FORM,
  ERROR_FETCHING_FORM,
  ERROR_CREATING_FORM,
  LOADING,
  ERROR_DELETING_FORM,
} from '../actions/types';

interface ErrorState {
  loading: boolean;
  err: any | null;
  message: string | null;
}

const initialState: ErrorState = {
  loading: false,
  err: null,
  message: null,
};

const errorReducer: Reducer<ErrorState> = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case ERROR_FETCHING_FORM:
      return {
        ...state,
        loading: false,
        err: action.payload,
        message: 'failed to fetch form',
      };
    case ERROR_UPLOADING_FORM:
      return {
        ...state,
        loading: false,
        err: action.payload,
        message: 'failed to upload form',
      };
    case ERROR_CREATING_FORM:
      return {
        ...state,
        loading: false,
        message: 'failed to upload form, please try again',
      };
    case ERROR_DELETING_FORM:
      return {
        ...state,
        loading: false,
        message: 'failed to delete form, please try again',
      };
    default:
      return state;
  }
};

export default errorReducer;
