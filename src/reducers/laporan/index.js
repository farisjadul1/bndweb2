import { GET_LAPORAN } from "../../actions/LaporanAction";

const initialState = {
  getLaporanLoading: false,
  getLaporanResult: false,
  getLaporanError: false,

  updateLaporanLoading: false,
  updateLaporanResult: false,
  updateLaporanError: false,
};

export default function foo(state = initialState, action) {
  switch (action.type) {
    case GET_LAPORAN:
      return {
        ...state,
        getLaporanLoading: action.payload.loading,
        getLaporanResult: action.payload.data,
        getLaporanError: action.payload.errorMassage,
      };
    default:
      return state;
  }
}
