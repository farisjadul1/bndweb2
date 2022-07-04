import React, { Component } from "react";
import { Button, Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import Logo from "../../assets/img/Logo.svg";

export default class Gagal extends Component {
  render() {
    let search = window.location.search;
    let params = new URLSearchParams(search);

    const order_id = params.get("order_id");
    const transaction_status = params.get("transaction_status");

    return (
      <div>
        {" "}
        <Row className="justify-content-center mt-5">
          <Col md="4" className="mt-5">
            <img src={Logo} className="rounded mx-auto d-block" alt="Logo" />
            <Card>
              <CardHeader tag="h4" align="center">
                Maaf, Transaksi Anda Gagal, Silahkan Coba Lagi
              </CardHeader>
              <CardBody className="text-center">
                <p>Order ID : {order_id}</p>
                <p>Status Transaksi : {transaction_status}</p>

                <Button color="primary" type="submint">
                  Lanjutkan
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
