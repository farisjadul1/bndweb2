import { updatePesanan } from "actions/PesananAction";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Spinner,
} from "reactstrap";
import Logo from "../../assets/img/Logo.svg";

class Finish extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order_id: "",
      transaction_status: "",
    };
  }

  componentDidMount() {
    //https://www.google.com/?order_id=ORDER-101-1655862201&status_code=201&transaction_status=pending

    let search = window.location.search;
    let params = new URLSearchParams(search);

    const order_id = params.get("order_id");
    const transaction_status = params.get("transaction_status");

    if (order_id) {
      this.setState({
        order_id: order_id,
        transaction_status: transaction_status,
      });
      // masuk ke aksi update status history
      this.props.dispatch(updatePesanan(order_id, transaction_status));
    }
  }

  toHistory = () => {
    window.ReactNativeWebView.postMessage('Selesai')
  }

  render() {
    const { order_id, transaction_status } = this.state;
    const { updatePesananLoading } = this.props;
    return (
      <div>
        {" "}
        <Row className="justify-content-center mt-5">
          {updatePesananLoading ? (
            <Spinner color="primary" />
          ) : (
            <Col md="4" className="mt-5">
              <img src={Logo} className="rounded mx-auto d-block" alt="Logo" />
              <Card>
                <CardHeader tag="h4" align="center">
                  Selamat, Transaksi Anda Berhasil
                </CardHeader>
                <CardBody className="text-center">
                  <p>
                    {transaction_status === "pending" &&
                      "Untuk Selanjutnya Harap Selesaikan Pembayaran, jika sudah bayar, silahkan update status pembayarannya dihalam history"}
                  </p>
                  <p>Order ID : {order_id}</p>
                  <p>
                    Status Transaksi :{" "}
                    {transaction_status === "settlement" ||
                    transaction_status === "capture"
                      ? "lunas"
                      : transaction_status}
                  </p>

                  <Button color="primary" type="submint" onClick={() => this.toHistory()}>
                    Lanjutkan
                  </Button>
                </CardBody>
              </Card>
            </Col>
          )}
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  updatePesananLoading: state.PesananReducer.updatePesananLoading,
});

export default connect(mapStateToProps, null)(Finish);
