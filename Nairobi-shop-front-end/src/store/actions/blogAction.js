import { SET_TOP_BLOGS } from "../constants/blogConstants";
import http from "../../services/api";
import { toast } from "react-toastify";
import { ToastObjects } from "../../utils/toast/toastObject";
export const getTopBlogs = () => async (dispatch) => {
  try {
    const { data } = await http.get(`/api/v1/home/blog`);
    dispatch({ type: SET_TOP_BLOGS, payload: data });
  } catch (error) {
    toast.error("Something went wrong.", ToastObjects);
  }
};
