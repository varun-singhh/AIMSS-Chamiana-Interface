import { combineReducers } from "redux";
import formReducer from "./form";
import errorReducer from "./error";
import authReducer from "./auth";
import userReducer from "./user";
const reducer = combineReducers({
  form: formReducer,
  error: errorReducer,
  auth: authReducer,
  user: userReducer,
});

export default reducer;
