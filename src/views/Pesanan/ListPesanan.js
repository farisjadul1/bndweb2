import React, { Component } from "react";
import {
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
import { getListPesanan } from "actions/PesananAction";
import { numberWithCommas } from "utils";
import { Pesanans } from "components";

class ListPesanan extends Component {
  componentDidMount() {
    this.props.dispatch(getListPesanan());
  }

  render() {
    const { getListPesananError, getListPesananLoading, getListPesananResult } =
      this.props;
    // console.log("data ", getListPesananResult)
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Pesanan</CardTitle>
              </CardHeader>
              <CardBody>
                <Table>
                  <thead className="text-primary">
                    <tr>
                      <th>Tanggal & Orde_Id</th>
                      <th>Pesanan</th>
                      <th>Status</th>
                      <th>Total Harga</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>

                  <tbody>
                    {getListPesananResult ? (
                      Object.keys(getListPesananResult).map((key) => (
                        //data ada
                        <tr key={key}>
                          <td>
                            <p>{getListPesananResult[key].tanggal}</p>
                          </td>
                          <td>
                            <Pesanans
                              pesanans={getListPesananResult[key].pesanans}
                            />
                          </td>
                          <td>{getListPesananResult[key].status}</td>
                          <td>
                            <p>
                              Total Harga : Rp. {numberWithCommas(
                                  getListPesananResult[key].totalHarga)}
                            </p>
                            <p>
                              Ongkir : Rp.{" "}
                              {numberWithCommas(
                                getListPesananResult[key].ongkir
                              )}{" "}
                            </p>
                            <p>
                              {" "}
                              <strong>
                                Total : Rp.{" "}
                                {numberWithCommas(
                                  getListPesananResult[key].totalHarga +
                                    getListPesananResult[key].ongkir
                                )}
                              </strong>{" "}
                            </p>
                          </td>
                          <td>
                            <a
                              href={getListPesananResult[key].url}
                              className="btn btn-primary"
                            >
                              <i className="nc-icon nc-money-coins"></i>{" "}
                              Midtrans{" "}
                            </a>
                          </td>
                        </tr>
                      ))
                    ) : getListPesananLoading ? (
                      //ikon loading
                      <tr>
                        <td colSpan="6" align="center">
                          <Spinner color="primary" />
                        </td>
                      </tr>
                    ) : getListPesananError ? (
                      //tampilkan eror
                      <tr>
                        <td colSpan="6" align="center">
                          {getListPesananError}
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
  getListPesananLoading: state.PesananReducer.getListPesananLoading,
  getListPesananResult: state.PesananReducer.getListPesananResult,
  getListPesananError: state.PesananReducer.getListPesananError,
});

export default connect(mapStateToProps, null)(ListPesanan);
