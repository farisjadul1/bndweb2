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
import { getDetailJenis, updateJenis } from "actions/JenisAction";


class EditJenis extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      imageLama: foto,
      image: foto,
      importToDB: false,
      namajenis: "",
    };
  }

  componentDidMount() { 
    this.props.dispatch(getDetailJenis(this.props.match.params.id))
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
    const { namajenis } = this.state;

    event.preventDefault();
    if (namajenis) {
      //lanjut ke aksi firebase
      this.props.dispatch(updateJenis(this.state));
    } else {
      //aletr
      swal("Failed", "Maaf Nama Jenis Harus disi", "error");
    }
  };

  componentDidUpdate(prevProps) {
    const { updateJenisResult, getDetailJenisResult } = this.props;

    if (
      updateJenisResult &&
      prevProps.updateJenisResult !== updateJenisResult
    ) {
      swal("Sukses", "Jenis sukses diupdate", "success");
      this.props.history.push("/admin/jenis");
    }
    if (
      getDetailJenisResult &&
      prevProps.getDetailJenisResult !== getDetailJenisResult
    ) {
      this.setState({
        image: getDetailJenisResult.image,
        namajenis: getDetailJenisResult.namajenis,
        imageLama: getDetailJenisResult.image,
      })
    }
  }

  render() {
    const { image, namajenis } = this.state;
    const { updateJenisLoading } = this.props;
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
                <CardTitle tag="h4">Edit Jenis</CardTitle>
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
                        <label>Logo Jenis</label>
                        <Input
                          type="file"
                          onChange={(event) => this.handleImage(event)}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <label>Nama Jenis</label>
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
                      {updateJenisLoading ? (
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
  updateJenisLoading: state.JenisReducer.updateJenisLoading,
  updateJenisResult: state.JenisReducer.updateJenisResult,
  updateJenisError: state.JenisReducer.updateJenisError,

  getDetailJenisLoading: state.JenisReducer.getDetailJenisLoading,
  getDetailJenisResult: state.JenisReducer.getDetailJenisResult,
  getDetailJenisError: state.JenisReducer.getDetailJenisError,
});

export default connect(mapStateToProps, null)(EditJenis);
