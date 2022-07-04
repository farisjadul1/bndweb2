import FIREBASE from "../config/FIREBASE";
import { dispatchError, dispatchLoading, dispatchSuccess } from "../utils";

export const GET_LIST_KAOS = "GET_LIST_KAOS";
export const UPLOAD_KAOS = "UPLOAD_KAOS";
export const TAMBAH_KAOS = "TAMBAH_KAOS";
export const GET_DETAIL_KAOS = "GET_DETAIL_KAOS";
export const UPDATE_KAOS = "UPDATE_KAOS";
export const DELETE_KAOS = "DELETE_KAOS";

export const getListKaos = () => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_LIST_KAOS);

    FIREBASE.database()
      .ref("kaoss")
      .once("value", (querySnapshot) => {
        let data = querySnapshot.val() ? querySnapshot.val() : [];

        dispatchSuccess(dispatch, GET_LIST_KAOS, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_LIST_KAOS, error);
        alert(error);
      });
  };
};

export const uploadKaos = (gambar, imageToDB) => {
  return (dispatch) => {
    dispatchLoading(dispatch, UPLOAD_KAOS);

    var uploadTask = FIREBASE.storage()
      .ref("kaoss")
      .child(gambar.name)
      .put(gambar);

    uploadTask.on(
      "state_changed",
      function (snapshot) {
        console.log(snapshot);
      },
      function (error) {
        dispatchError(dispatch, UPLOAD_KAOS, error);
      },
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          const dataBaru = {
            image: downloadURL,
            imageToDB: imageToDB,
          };

          dispatchSuccess(dispatch, UPLOAD_KAOS, dataBaru);
        });
      }
    );
  };
};

export const tambahKaos = (data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, TAMBAH_KAOS);

    const dataBaru = {
      gambar: [data.imageToDB1, data.imageToDB2],
      nama: data.nama,
      harga: data.harga,
      berat: data.berat,
      jenis: data.jenis,
      ready: true,
      ukuran: data.ukuranSelected,
      jeni: data.jeni,
    };

    FIREBASE.database()
      .ref("kaoss")
      .push(dataBaru)
      .then((response) => {
        dispatchSuccess(dispatch, TAMBAH_KAOS, response);
      })
      .catch((error) => {
        dispatchError(dispatch, TAMBAH_KAOS, error);
        alert(error);
      });
  };
};

export const getDetailKaos = (id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_DETAIL_KAOS);

    FIREBASE.database()
      .ref("kaoss/" + id)
      .once("value", (querySnapshot) => {
        let data = querySnapshot.val() ? querySnapshot.val() : [];

        dispatchSuccess(dispatch, GET_DETAIL_KAOS, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_DETAIL_KAOS, error);
        alert(error);
      });
  };
};

export const updateKaos = (data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, UPDATE_KAOS);

    const dataBaru = {
      gambar: [
        data.imageToDB1 ? data.imageToDB1 : data.imageLama1,
        data.imageToDB2 ? data.imageToDB2 : data.imageLama2,
      ],
      nama: data.nama,
      harga: data.harga,
      berat: data.berat,
      jenis: data.jenis,
      ready: true,
      ukuran: data.ukuranSelected,
      jeni: data.jeni,
    };

    FIREBASE.database()
      .ref("kaoss/" + data.id)
      .update(dataBaru)
      .then((response) => {
        if (data.imageToDB1) {
          // hapus data lama nya.
          var desertRef = FIREBASE.storage().refFromURL(data.imageLama1);
          desertRef.delete().catch(function (error) {
            dispatchError(dispatch, UPDATE_KAOS, error);
          });
        }
        if (data.imageToDB2) {
          // hapus data lama nya.
          var desertRef2 = FIREBASE.storage().refFromURL(data.imageLama2);
          desertRef2.delete().catch(function (error) {
            dispatchError(dispatch, UPDATE_KAOS, error);
          });
        }

        dispatchSuccess(dispatch, UPDATE_KAOS, "Update Apparel Sukses");
      })
      .catch((error) => {
        dispatchError(dispatch, UPDATE_KAOS, error);
        alert(error);
      });
  };
};

export const deleteKaos = (images, id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, DELETE_KAOS);

    var desertRef = FIREBASE.storage().refFromURL(images[0]);
    desertRef
      .delete()
      .then(function () {
        // dia delete foto yang ke 2
        var desertRef2 = FIREBASE.storage().refFromURL(images[1]);
        desertRef2
          .delete()
          .then(function () {
            //hapus rdbnya .
            FIREBASE.database()
              .ref("kaoss/" + id)
              .remove()
              .then(function () {
                dispatchSuccess(
                  dispatch,
                  DELETE_KAOS,
                  "Apparel berhasil di hapus"
                );
              })
              .catch(function (error) {
                dispatchError(dispatch, DELETE_KAOS, error);
              });
          })
          .catch(function (error) {
            dispatchError(dispatch, DELETE_KAOS, error);
          });
      })
      .catch(function (error) {
        dispatchError(dispatch, DELETE_KAOS, error);
      });
  };
};
