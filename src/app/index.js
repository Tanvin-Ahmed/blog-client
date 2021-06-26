import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import pageInteractionReducer from "./reducers/pageInteractionReducer";
import blogsReducer from "./reducers/blogsReducer";

export default combineReducers({
  userReducer,
  pageInteractionReducer,
  blogsReducer,
});
