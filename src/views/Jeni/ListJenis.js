import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Spinner,
  Table,
} from "reactstrap";
import { connect } from "react-redux";
import { getListJenis, deleteJenis } from "actions/JenisAction";
import { Link } from "react-router-dom";
import swal from "sweetalert";

class ListJenis extends Component {
  componentDidMount() {
    this.props.dispatch(getListJenis());
  }

  hapusData = (image, id) => {
    //akses ke aksi
    this.props.dispatch(deleteJenis(image, id));
  };

  componentDidUpdate(prevProps) {
    const { deleteJenisResult } = this.props;

    if (
      deleteJenisResult &&
      prevProps.deleteJenisResult !== deleteJenisResult
    ) {
      swal("Sukses", deleteJenisResult, "success");
      this.props.dispatch(getListJenis());
    }
  }

  render() {
    const { getListJenisError, getListJenisLoading, getListJenisResult } =
      this.props;
    // console.log("data loading: ", getListJenisLoading)
    // console.log("data result: ", getListJenisResult)
    // console.log("data eror: ", getListJenisError)
    // console.log("=======================================")

    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Jenis Apparel</CardTitle>
                <Link
                  to="/admin/jenis/tambah"
                  className="btn btn-primary float-right"
                >
                  Tambah Jenis
                </Link>
              </CardHeader>
              <CardBody>
                <Table>
                  <thead className="text-primary">
                    <tr>
                      <th>Logo</th>
                      <th>Nama Jenis</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getListJenisResult ? (
                      Object.keys(getListJenisResult).map((key) => (
                        //data ada
                        <tr key={key}>
                          <td>
                            <img
                              src={getListJenisResult[key].image}
                              width="80"
                              alt={getListJenisResult[key].namajenis}
                            />
                          </td>
                          <td>{getListJenisResult[key].namajenis}</td>
                          <td>
                            <Link
                              className="btn btn-warning"
                              to={"/admin/jenis/edit/" + key}
                            >
                              <i className="nc-icon nc-settings" /> Edit
                            </Link>
                            <Button
                              color="danger"
                              className="ml-4"
                              onClick={() =>
                                this.hapusData(
                                  getListJenisResult[key].image,
                                  key
                                )
                              }
                            >
                              <i className="nc-icon nc-basket" /> Hapus
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : getListJenisLoading ? (
                      //ikon loading
                      <tr>
                        <td colSpan="3" align="center">
                          <Spinner color="primary" />
                        </td>
                      </tr>
                    ) : getListJenisError ? (
                      //tampilkan eror
                      <tr>
                        <td colSpan="3" align="center">
                          {getListJenisError}
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan="3" align="center">
                          data kosong
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getListJenisLoading: state.JenisReducer.getListJenisLoading,
  getListJenisResult: state.JenisReducer.getListJenisResult,
  getListJenisError: state.JenisReducer.getListJenisError,

  deleteJenisLoading: state.JenisReducer.deleteJenisLoading,
  deleteJenisResult: state.JenisReducer.deleteJenisResult,
  deleteJenisError: state.JenisReducer.deleteJenisError,
});

export default connect(mapStateToProps, null)(ListJenis);
