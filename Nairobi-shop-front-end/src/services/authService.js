
import http from "./api";
import { getUserProfile, loginUser, forgotPassword, resetPassword } from "../store/actions/authActions";

const authServices = {
loginUser: async (data, dispatch) => {
try {
let res = await http.post("/api/v1/auth/login", data);
console.log(res);
if (res.accessToken) {
localStorage.setItem("accessToken", res.accessToken);
}
dispatch(loginUser(res.data));
return Promise.resolve(res);
} catch (error) {
return Promise.reject(error);
}
},

registerUser: async (data, dispatch) => {
try {
let res = await http.post("/api/v1/auth/register", data);
if (res.accessToken) {
localStorage.setItem("accessToken", res.accessToken);
}
dispatch(loginUser(res.data));
return Promise.resolve(res);
} catch (error) {
return Promise.reject(error);
}
},

userProfile: async (dispatch) => {
try {
let res = await http.get("/api/v1/auth/profile");
dispatch(getUserProfile(res.data));
return Promise.resolve(res);
} catch (error) {
return Promise.reject(error);
}
},


  forgotPassword: async (data) => {
    try {
      let res = await http.post("/api/v1/auth/forgot-password", data);
      return Promise.resolve(res);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  resetPassword: async (data, userId, token) => {
    try {
      console.log("Request data:", data);
      const res = await http.put(`/api/v1/auth/reset-password/${userId}/${token}`, data);
      console.log("Response data:", res.data);
      return Promise.resolve(res);
    } catch (error) {
      console.error("Error in resetPassword:", error);
      return Promise.reject(error);
    }
  },
  
  
};

export default authServices;