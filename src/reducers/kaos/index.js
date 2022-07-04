import {
  GET_LIST_KAOS,
  UPLOAD_KAOS,
  TAMBAH_KAOS,
  GET_DETAIL_KAOS,
  UPDATE_KAOS,
  DELETE_KAOS,
} from "../../actions/KaosAction";

const initialState = {
  getListKaosLoading: false,
  getListKaosResult: false,
  getListKaosError: false,

  uploadKaosLoading: false,
  uploadKaosResult: false,
  uploadKaosError: false,

  tambahKaosLoading: false,
  tambahKaosResult: false,
  tambahKaosError: false,

  getDetailKaosLoading: false,
  getDetailKaosResult: false,
  getDetailKaosError: false,

  deleteKaosLoading: false,
  deleteKaosResult: false,
  deleteKaosError: false,
};

export default function foo(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_KAOS:
      return {
        ...state,
        getListKaosLoading: action.payload.loading,
        getListKaosResult: action.payload.data,
        getListKaosError: action.payload.errorMassage,
      };
    case UPLOAD_KAOS:
      return {
        ...state,
        uploadKaosLoading: action.payload.loading,
        uploadKaosResult: action.payload.data,
        uploadKaosError: action.payload.errorMassage,
      };
    case TAMBAH_KAOS:
      return {
        ...state,
        tambahKaosLoading: action.payload.loading,
        tambahKaosResult: action.payload.data,
        tambahKaosError: action.payload.errorMassage,
      };
    case GET_DETAIL_KAOS:
      return {
        ...state,
        getDetailKaosLoading: action.payload.loading,
        getDetailKaosResult: action.payload.data,
        getDetailKaosError: action.payload.errorMassage,
      };
    case UPDATE_KAOS:
      return {
        ...state,
        updateKaosLoading: action.payload.loading,
        updateKaosResult: action.payload.data,
        updateKaosError: action.payload.errorMassage,
      };
    case DELETE_KAOS:
      return {
        ...state,
        deleteKaosLoading: action.payload.loading,
        deleteKaosResult: action.payload.data,
        deleteKaosError: action.payload.errorMassage,
      };
    default:
      return state;
  }
}
