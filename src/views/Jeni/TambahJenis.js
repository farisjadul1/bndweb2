import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  FormGroup,
  Input,
  Row,
  Spinner,
} from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import foto from "../../assets/img/default-image.jpg";
import swal from "sweetalert";
import { tambahJenis } from "actions/JenisAction";

class TambahJenis extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: foto,
      importToDB: false,
      namajenis: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      const gambar = event.target.files[0];
      this.setState({
        image: URL.createObjectURL(gambar),
        imageToDB: gambar,
      });
    }
  };

  handleSubmit = (event) => {
    const { imageToDB, namajenis } = this.state;

    event.preventDefault();
    if (imageToDB && namajenis) {
      //lanjut ke aksi firebase
      this.props.dispatch(tambahJenis(this.state));
    } else {
      //aletr
      swal("Failed", "Maaf Nama Jenis Harus disi", "error");
    }
  };

  componentDidUpdate(prevProps) {
    const { tambahJenisResult } = this.props;

    if (
      tambahJenisResult &&
      prevProps.tambahJenisResult !== tambahJenisResult
    ) {
      swal("Sukses", "Jenis sukses dibuat", "success");
      this.props.history.push("/admin/jenis");
    }
  }

  render() {
    const { image, namajenis } = this.state;
    const { tambahJenisLoading } = this.props;
    // console.log("Image Asli : ", this.state.imageToDB)
    // console.log("Image url : ", image)
    return (
      <div className="content">
        <Row>
          <Col>
            <Link to="/admin/jenis" className="btn btn-primary">
              Kembali
            </Link>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Tambah Kategori</CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <img src={image} width="200" alt="Logo Jenis" />
                  </Col>
                </Row>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <label>Logo Kategori</label>
                        <Input
                          type="file"
                          onChange={(event) => this.handleImage(event)}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <label>Nama Kategori</label>
                        <Input
                          type="text"
                          value={namajenis}
                          name="namajenis"
                          onChange={(event) => this.handleChange(event)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {tambahJenisLoading ? (
                        <Button color="primary" type="submit" disabled>
                          <Spinner size="sm" color="light" /> loading
                        </Button>
                      ) : (
                        <Button color="primary" type="submit">
                          Simpan
                        </Button>
                      )}
                    </Col>
                  </Row>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tambahJenisLoading: state.JenisReducer.tambahJenisLoading,
  tambahJenisResult: state.JenisReducer.tambahJenisResult,
  tambahJenisError: state.JenisReducer.tambahJenisError,
});

export default connect(mapStateToProps, null)(TambahJenis);
