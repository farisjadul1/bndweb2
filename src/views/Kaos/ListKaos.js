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
import { Link } from "react-router-dom";
import { deleteKaos, getListKaos } from "../../actions/KaosAction";
import swal from "sweetalert";

class ListKaos extends Component {
  componentDidMount() {
    this.props.dispatch(getListKaos());
  }

  componentDidUpdate(prevProps) {
    const { deleteKaosResult } = this.props;

    if (deleteKaosResult && prevProps.deleteKaosResult !== deleteKaosResult) {
      swal("Sukses", deleteKaosResult, "success");
      this.props.dispatch(getListKaos());
    }
  }

  hapusData = (images, key) => {
    //akses ke aksi
    this.props.dispatch(deleteKaos(images, key));
  };

  render() {
    const { getListKaosError, getListKaosLoading, getListKaosResult } =
      this.props;
    // console.log("data ", getListKaosResult)
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Apparel</CardTitle>
                <Link
                  to="/admin/apparel/tambah"
                  className="btn btn-primary float-right"
                >
                  Tambah Apparel
                </Link>
              </CardHeader>
              <CardBody>
                <Table>
                  <thead className="text-primary">
                    <tr>
                      <th>Foto</th>
                      <th>Nama Apparel</th>
                      <th>Harga</th>
                      <th>Berat</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>

                  <tbody>
                    {getListKaosResult ? (
                      Object.keys(getListKaosResult).map((key) => (
                        //data ada
                        <tr key={key}>
                          <td>
                            <img
                              src={getListKaosResult[key].gambar[0]}
                              width="80"
                              alt={getListKaosResult[key].nama}
                            />
                          </td>
                          <td>{getListKaosResult[key].nama}</td>
                          <td>Rp. {getListKaosResult[key].harga}</td>
                          <td>{getListKaosResult[key].berat} kg</td>
                          <td>
                            <Link
                              className="btn btn-warning"
                              to={"/admin/apparel/edit/" + key}
                            >
                              <i className="nc-icon nc-settings" /> Edit
                            </Link>
                            <Button
                              color="danger"
                              className="ml-4"
                              onClick={() =>
                                this.hapusData(
                                  getListKaosResult[key].gambar,
                                  key
                                )
                              }
                            >
                              <i className="nc-icon nc-basket" /> Hapus
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : getListKaosLoading ? (
                      //ikon loading
                      <tr>
                        <td colSpan="6" align="center">
                          <Spinner color="primary" />
                        </td>
                      </tr>
                    ) : getListKaosError ? (
                      //tampilkan eror
                      <tr>
                        <td colSpan="6" align="center">
                          {getListKaosError}
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan="6" align="center">
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
  getListKaosLoading: state.KaosReducer.getListKaosLoading,
  getListKaosResult: state.KaosReducer.getListKaosResult,
  getListKaosError: state.KaosReducer.getListKaosError,

  deleteKaosLoading: state.KaosReducer.deleteKaosLoading,
  deleteKaosResult: state.KaosReducer.deleteKaosResult,
  deleteKaosError: state.KaosReducer.deleteKaosError,
});

export default connect(mapStateToProps, null)(ListKaos);
