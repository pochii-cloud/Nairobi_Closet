import { combineReducers } from "redux";
import userAuthReducer from "./authReducers";
import homeReducers from "./homeReducers";
import cartReducers from "./cartReducers";
import searchReducer from './searchReducer';
import BlogReducer  from './blogReducer';
const appReducer = combineReducers({
  user: userAuthReducer,
  home: homeReducers,
  cart: cartReducers,
  search: searchReducer,
  blog:BlogReducer 
});

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
