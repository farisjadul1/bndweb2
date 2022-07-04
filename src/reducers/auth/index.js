import { LOGIN_USER, CEK_LOGIN, LOGOUT } from "../../actions/AuthAction";

const initialState = {
  loginLoading: false,
  loginResult: false,
  loginError: false,

  cekLoginLoading: false,
  cekLoginResult: false,
  cekLoginError: false,

  logOutLoading: false,
  logOutResult: false,
  logOutError: false,
};

export default function foo(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loginLoading: action.payload.loading,
        loginResult: action.payload.data,
        loginError: action.payload.errorMassage,
      };
      case CEK_LOGIN:
        return {
          ...state,
          cekLoginLoading: action.payload.loading,
          cekLoginResult: action.payload.data,
          cekLoginError: action.payload.errorMassage,
        };
        case LOGOUT:
        return {
          ...state,
          logOutLoading: action.payload.loading,
          logOutResult: action.payload.data,
          logOutError: action.payload.errorMassage,
        };
    default:
      return state;
  }
}
