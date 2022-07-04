import {
  GET_LIST_JENIS,
  TAMBAH_JENIS,
  GET_DETAIL_JENIS,
  UPDATE_JENIS,
  DELETE_JENIS
} from "../../actions/JenisAction";

const initialState = {
  getListJenisLoading: false,
  getListJenisResult: false,
  getListJenisError: false,

  tambahJenisLoading: false,
  tambahJenisResult: false,
  tambahJenisError: false,

  getDetailJenisLoading: false,
  getDetailJenisResult: false,
  getDetailJenisError: false,

  updateJenisLoading: false,
  updateJenisResult: false,
  updateJenisError: false,

  deleteJenisLoading: false,
  deleteJenisResult: false,
  deleteJenisError: false,
};

export default function foo(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_JENIS:
      return {
        ...state,
        getListJenisLoading: action.payload.loading,
        getListJenisResult: action.payload.data,
        getListJenisError: action.payload.errorMassage,
      };
    case TAMBAH_JENIS:
      return {
        ...state,
        tambahJenisLoading: action.payload.loading,
        tambahJenisResult: action.payload.data,
        tambahJenisError: action.payload.errorMassage,
      };
    case GET_DETAIL_JENIS:
      return {
        ...state,
        getDetailJenisLoading: action.payload.loading,
        getDetailJenisResult: action.payload.data,
        getDetailJenisError: action.payload.errorMassage,
      };
      case UPDATE_JENIS:
        return {
          ...state,
          updateJenisLoading: action.payload.loading,
          updateJenisResult: action.payload.data,
          updateJenisError: action.payload.errorMassage,
        }
        case DELETE_JENIS:
          return {
            ...state,
            deleteJenisLoading: action.payload.loading,
            deleteJenisResult: action.payload.data,
            deleteJenisError: action.payload.errorMassage,
          }
    default:
      return state;
  }
}
