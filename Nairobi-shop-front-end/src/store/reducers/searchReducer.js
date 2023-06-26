// searchReducer.js
import { SEARCH_SET_KEYWORD } from '../constants/searchConstants';

const initialState = {
  keyword: '',
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_SET_KEYWORD:
      return {
        ...state,
        keyword: action.payload,
      };
    default:
      return state;
  }
};

export default searchReducer;
