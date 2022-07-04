import FIREBASE from "../config/FIREBASE";
import { dispatchError, dispatchLoading, dispatchSuccess } from "../utils";

export const GET_LIST_JENIS = "GET_LIST_JENIS";
export const TAMBAH_JENIS = "TAMBAH_JENIS";
export const GET_DETAIL_JENIS = "GET_DETAIL_JENIS";
export const UPDATE_JENIS = "UPDATE_JENIS";
export const DELETE_JENIS = "DELETE_JENIS";

export const getListJenis = () => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_LIST_JENIS);

    FIREBASE.database()
      .ref("jenis")
      .once("value", (querySnapshot) => {
        let data = querySnapshot.val() ? querySnapshot.val() : [];

        dispatchSuccess(dispatch, GET_LIST_JENIS, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_LIST_JENIS, error);
        alert(error);
      });
  };
};

export const getDetailJenis = (id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_DETAIL_JENIS);

    FIREBASE.database()
      .ref("jenis/" + id)
      .once("value", (querySnapshot) => {
        let data = querySnapshot.val() ? querySnapshot.val() : [];

        dispatchSuccess(dispatch, GET_DETAIL_JENIS, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_DETAIL_JENIS, error);
        alert(error);
      });
  };
};

export const tambahJenis = (data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, TAMBAH_JENIS);
    // uplod ke storage firebase

    var uploadTask = FIREBASE.storage()
      .ref("jenis")
      .child(data.imageToDB.name)
      .put(data.imageToDB);

    uploadTask.on(
      "state_changed",
      function (snapshot) {
        console.log(snapshot);
      },
      function (error) {
        console.log(error);
      },
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          const dataBaru = {
            namajenis: data.namajenis,
            image: downloadURL,
          };

          FIREBASE.database()
            .ref("jenis")
            .push(dataBaru)
            .then((response) => {
              dispatchSuccess(dispatch, TAMBAH_JENIS, response ? response : []);
            })
            .catch((error) => {
              dispatchError(dispatch, TAMBAH_JENIS, error);
              alert(error);
            });
        });
      }
    );
  };
};

export const updateJenis = (data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, UPDATE_JENIS);

    // cek apakah gambar diganti?
    if (data.imageToDB) {
      //ganti gambar baru, ambil dan hapus gambar lama dari db
      // Create a reference to the file to delete
      var desertRef = FIREBASE.storage().refFromURL(data.imageLama);

      // Delete the file
      desertRef
        .delete()
        .then(() => {
          // File deleted successfully
          //upload gambar baru
          var uploadTask = FIREBASE.storage()
            .ref("jenis")
            .child(data.imageToDB.name)
            .put(data.imageToDB);

          uploadTask.on(
            "state_changed",
            function (snapshot) {
              console.log(snapshot);
            },
            function (error) {
              console.log(error);
            },
            function () {
              uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                const dataBaru = {
                  namajenis: data.namajenis,
                  image: downloadURL,
                };

                FIREBASE.database()
                  .ref("jenis/" + data.id)
                  .update(dataBaru)
                  .then((response) => {
                    dispatchSuccess(
                      dispatch,
                      UPDATE_JENIS,
                      response ? response : []
                    );
                  })
                  .catch((error) => {
                    dispatchError(dispatch, UPDATE_JENIS, error);
                    alert(error);
                  });
              });
            }
          );
        })
        .catch((error) => {
          dispatchError(dispatch, UPDATE_JENIS, error);
          alert(error);
        });
    } else {
      const dataBaru = {
        namajenis: data.namajenis,
        image: data.image,
      };

      FIREBASE.database()
        .ref("jenis/" + data.id)
        .update(dataBaru)
        .then((response) => {
          dispatchSuccess(dispatch, UPDATE_JENIS, response ? response : []);
        })
        .catch((error) => {
          dispatchError(dispatch, UPDATE_JENIS, error);
          alert(error);
        });
    }
  };
};

export const deleteJenis = (image, id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, DELETE_JENIS);

    //hapus data
    var desertRef = FIREBASE.storage().refFromURL(image);

    desertRef
      .delete()
      .then(() => {
        // hapus di rdp
        FIREBASE.database()
          .ref("jenis/" + id)
          .remove()
          .then(() => {
            dispatchSuccess(dispatch, DELETE_JENIS, "Jenis Sukses dihapus");
          })
          .catch((error) => {
            dispatchError(dispatch, DELETE_JENIS, error);
            alert(error);
          });
      })
      .catch((error) => {
        dispatchError(dispatch, DELETE_JENIS, error);
        alert(error);
      });
  };
};
