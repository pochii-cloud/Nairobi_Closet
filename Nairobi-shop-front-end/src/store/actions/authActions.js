
import { USER_LOGIN, USER_REGISTER, GET_USER, FORGOT_PASSWORD, RESET_PASSWORD } from "../constants/authContants";

export function loginUser(payload) {
return { type: USER_LOGIN, payload: payload };
}

export function registerUser(payload) {
return { type: USER_REGISTER, payload: payload };
}

export function getUserProfile(payload) {
return { type: GET_USER, payload: payload };
}

export function forgotPassword(payload) {
return { type: FORGOT_PASSWORD, payload: payload };
}

export function resetPassword(payload) {
return { type: RESET_PASSWORD, payload: payload };
}