import { GET_LIST_PESANAN, UPDATE_PESANAN } from "../../actions/PesananAction";

const initialState = {
  getListPesananLoading: false,
  getListPesananResult: false,
  getListPesananError: false,

  updatePesananLoading: false,
  updatePesananResult: false,
  updatePesananError: false,
};

export default function foo(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_PESANAN:
      return {
        ...state,
        getListPesananLoading: action.payload.loading,
        getListPesananResult: action.payload.data,
        getListPesananError: action.payload.errorMassage,
      };
      case UPDATE_PESANAN:
        return {
          ...state,
          updatePesananLoading: action.payload.loading,
          updatePesananResult: action.payload.data,
          updatePesananError: action.payload.errorMassage,
        };
    default:
      return state;
  }
}
