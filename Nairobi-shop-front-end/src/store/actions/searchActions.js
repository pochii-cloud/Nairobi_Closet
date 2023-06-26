// searchActions.js
import { SEARCH_SET_KEYWORD } from '../constants/searchConstants';

export const setKeyword = (keyword) => {
  return {
    type: SEARCH_SET_KEYWORD,
    payload: keyword,
  };
};
