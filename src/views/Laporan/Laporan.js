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
import { getLaporan } from "actions/LaporanAction";
import { Penjualan } from "components";
import { numberWithCommas } from "utils";
import { DatePicker } from "reactstrap-date-picker";
import moment from "moment";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

class Laporan extends Component {
  componentDidMount() {
    this.props.dispatch(getLaporan());
    document.getElementById("convExcel").style.visibility = "hidden";
  }

  render() {
    const { getLaporanError, getLaporanLoading, getLaporanResult } = this.props;

    var dataPenjualan = getLaporanResult;
    var tgl1, tgl2;
    var f_tgl1, f_tgl2;
    var total = 0;

    if (window.location.href.search("tgl") === -1) {
      tgl1 = "01-01-2022";
      tgl2 = moment().format("MM-DD-YYYY");
      f_tgl1 = new Date(tgl1);
      f_tgl2 = new Date(tgl2);
    } else {
      tgl1 = window.location.href.slice(
        window.location.href.search("tgl1") + 5,
        window.location.href.search("tgl1") + 15
      );
      tgl2 = window.location.href.slice(
        window.location.href.search("tgl2") + 5,
        window.location.href.search("tgl2") + 15
      );

      f_tgl1 = new Date(tgl1);
      f_tgl2 = new Date(tgl2);
    }

    Object.keys(dataPenjualan).forEach((key) => {
      let tgl_data = formatDate(dataPenjualan[key].tanggal);
      tgl_data = new Date(tgl_data);
      if (tgl_data < f_tgl1 || tgl_data > f_tgl2) {
        delete dataPenjualan[key];
      }
    });
    Object.keys(dataPenjualan).map(
      (key) =>
        (total =
          total + dataPenjualan[key].totalHarga + dataPenjualan[key].ongkir)
    );

    function refreshPage() {
      window.location.replace(
        window.location.href.slice(
          0,
          window.location.href.search("laporan") + 7
        ) +
          "?tgl1=" +
          document.getElementById("tgl-awal").value.slice(0, 10) +
          "&tgl2=" +
          document.getElementById("tgl-akhir").value.slice(0, 10) +
          "&type=1"
      );
    }

    function exportExcel() {
      Object.keys(dataPenjualan).map((key) =>
        document
          .getElementById(
            "img" + String(Object.keys(dataPenjualan[key].pesanans)[0])
          )
          .remove()
      );
      document.getElementById("convExcel").click();
      window.location.reload();
    }
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Laporan Penjualan</CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="auto">
                    <label className="fs-1">Tanggal Awal</label>
                    <DatePicker
                      id="tgl-awal"
                      dateFormat={"DD-MM-YYYY"}
                      value={tgl1}
                    />
                  </Col>
                  <Col xs="auto">
                    <label className="fs-1">Tanggal Akhir</label>
                    <DatePicker
                      id="tgl-akhir"
                      dateFormat="DD-MM-YYYY"
                      value={tgl2}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col xs="auto">
                    <div className="app">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={refreshPage}
                      >
                        Tampilkan
                      </button>
                    </div>
                  </Col>
                  <Col xs="auto">
                    <div className="App">
                      <button className="btn btn-success" onClick={exportExcel}>
                        Export To Excel
                      </button>
                      <ReactHTMLTableToExcel
                        id="convExcel"
                        table="dataLaporan"
                        filename="laporan"
                        sheet="Sheet"
                        buttonText=""
                      />
                    </div>
                  </Col>
                </Row>
                <div ref={(el) => (this.componentRef = el)}>
                  <Table id="dataLaporan">
                    <thead className="text-primary">
                      <tr>
                        <th className="text-center">Tanggal Order</th>
                        <th className="text-center" colSpan="2">
                          Pesanan
                        </th>
                        <th className="text-center">Jumlah</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">Total Harga</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getLaporanResult ? (
                        <Penjualan dataPenjualan={getLaporanResult} />
                      ) : getLaporanLoading ? (
                        //ikon loading
                        <tr>
                          <td colSpan="6" align="center">
                            <Spinner color="primary" />
                          </td>
                        </tr>
                      ) : getLaporanError ? (
                        //tampilkan eror
                        <tr>
                          <td colSpan="6" align="center">
                            {getLaporanError}
                          </td>
                        </tr>
                      ) : (
                        <tr>
                          <td colSpan="6" align="center">
                            data kosong
                          </td>
                        </tr>
                      )}
                      <tr>
                        <td></td>
                        <td colSpan="5" align="right">
                          <span className="numbers mx-4">
                            Total Pemasukan : Rp. {numberWithCommas(total)}{" "}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getLaporanLoading: state.LaporanReducer.getLaporanLoading,
  getLaporanResult: state.LaporanReducer.getLaporanResult,
  getLaporanError: state.LaporanReducer.getLaporanError,
});

export default connect(mapStateToProps, null)(Laporan);
