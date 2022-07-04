import React, { Component } from "react";
import { numberWithCommas } from "utils";

export default class Penjualan extends Component {
  render() {
    const { dataPenjualan } = this.props;
    function formatDate(date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
      return [year, month, day].join("-");
    }
    var dataPrint = {};
    var keyData = [],
      index = 0;
    Object.keys(dataPenjualan).map(
      (key) =>
        (keyData[index++] = [
          key,
          formatDate(
            dataPenjualan[key].tanggal.slice(
              3,
              dataPenjualan[key].tanggal.length
            )
          ).replaceAll("-", ""),
        ])
    );
    keyData.sort(function (a, b) {
      if (a[1] > b[1]) return 1;
      if (a[1] < b[1]) return -1;
      return 0;
    });
    index = 0;
    Object.keys(dataPenjualan).map((key) =>
      Object.assign(dataPrint, {
        [keyData[index][0]]: dataPenjualan[keyData[index++][0]],
      })
    );
    return Object.keys(dataPrint).map((key) => (
      //data ada
      <tr
        key={key}
        id={"id-" + formatDate(dataPrint[key].tanggal).replaceAll("-", "")}
      >
        <td>
          {dataPrint[key].tanggal}
          {/*  {dataPrint[key].order_id} */}
        </td>
        <td xs="auto">
          <img
            id={"img" + String(Object.keys(dataPrint[key].pesanans)[0])}
            src={
              dataPrint[key].pesanans[Object.keys(dataPrint[key].pesanans)[0]]
                .product.gambar[0]
            }
            width="100"
            alt={
              dataPrint[key].pesanans[Object.keys(dataPrint[key].pesanans)[0]]
                .product.nama
            }
          />
        </td>
        <td xs="auto">
          {
            dataPrint[key].pesanans[Object.keys(dataPrint[key].pesanans)[0]]
              .product.nama
          }{" "}
          <br /> Harga : Rp. {numberWithCommas(dataPrint[key].totalHarga)}
        </td>
        <td className="text-center font-weight-bold">
          {
            dataPrint[key].pesanans[Object.keys(dataPrint[key].pesanans)[0]]
              .jumlahPesan
          }
        </td>
        <td>{dataPrint[key].status}</td>
        <td>
          Ongkir : Rp. {numberWithCommas(dataPrint[key].ongkir)}
          <br />
          <span className="font-weight-bold">
            Total : Rp.{" "}
            {numberWithCommas(
              dataPrint[key].totalHarga + dataPrint[key].ongkir
            )}
          </span>
        </td>
      </tr>
    ));
  }
}
