import { USER_LOGIN, USER_REGISTER, GET_USER, FORGOT_PASSWORD, RESET_PASSWORD } from "../constants/authContants";

const initialState = {
profile: {},
};

export default function userAuthReducer(state = initialState, action) {
switch (action.type) {
case USER_LOGIN:
case USER_REGISTER:
case GET_USER:
case FORGOT_PASSWORD:
case RESET_PASSWORD: {
return {
...state,
profile: { ...state.profile, ...action.payload },
};
}default: {
  return state;
}
}
}