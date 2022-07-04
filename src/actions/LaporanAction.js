import FIREBASE from "../config/FIREBASE";
import { dispatchError, dispatchLoading, dispatchSuccess } from "../utils";

export const GET_LAPORAN = "GET_LAPORAN";

export const getLaporan = () => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_LAPORAN);

    FIREBASE.database()
      .ref("histories").orderByChild("status").equalTo("lunas")
      .once("value", (querySnapshot) => {
        let data = querySnapshot.val() ? querySnapshot.val() : [];
        dispatchSuccess(dispatch, GET_LAPORAN, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_LAPORAN, error);
        alert(error);
      });
  };
};
