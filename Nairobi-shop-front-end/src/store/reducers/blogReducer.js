// homeReducer.js
import { SET_TOP_BLOGS } from "../constants/blogConstants";

const initialState = {
  topBlogs: [],
};

const BlogReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOP_BLOGS:
      return {
        ...state,
        topBlogs: action.payload,
      };
    default:
      return state;
  }
};

export default BlogReducer ;
