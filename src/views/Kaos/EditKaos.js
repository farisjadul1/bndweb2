import { getListJenis } from "actions/JenisAction";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import foto from "../../assets/img/default-image.jpg";
import swal from "sweetalert";
import { uploadKaos } from "actions/KaosAction";
import { getDetailKaos } from "actions/KaosAction";
import { updateKaos } from "actions/KaosAction";

class EditKaos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      image1: foto,
      image2: foto,
      imageToDB1: false,
      imageToDB2: false,
      imageLama1: false,
      imageLama2: false,
      nama: "",
      harga: 0,
      berat: 0,
      jenis: "",
      ukurans: ["S", "M", "L", "XL", "XXL"],
      ukuranSelected: [],
      ready: true,
      jeni: "",
      editUkuran: false,
    };
  }

  componentDidMount() {
    this.props.dispatch(getListJenis());
    this.props.dispatch(getDetailKaos(this.props.match.params.id));
  }

  componentDidUpdate(prevProps) {
    const { uploadKaosResult, updateKaosResult, getDetailKaosResult } =
      this.props;

    if (uploadKaosResult && prevProps.uploadKaosResult !== uploadKaosResult) {
      this.setState({
        [uploadKaosResult.imageToDB]: uploadKaosResult.image,
      });

      swal("Sukses", "Gambar Berhasil di Upload", "success");
    }

    if (updateKaosResult && prevProps.updateKaosResult !== updateKaosResult) {
      //sukses
      swal("Sukses", updateKaosResult, "success");
      this.props.history.push("/admin/apparel");
    }

    if (
      getDetailKaosResult &&
      prevProps.getDetailKaosResult !== getDetailKaosResult
    ) {
      this.setState({
        image1: getDetailKaosResult.gambar[0],
        image2: getDetailKaosResult.gambar[1],
        imageLama1: getDetailKaosResult.gambar[0],
        imageLama2: getDetailKaosResult.gambar[1],
        nama: getDetailKaosResult.nama,
        harga: getDetailKaosResult.harga,
        berat: getDetailKaosResult.berat,
        jenis: getDetailKaosResult.jenis,
        ukuranSelected: getDetailKaosResult.ukuran,
        ready: getDetailKaosResult.ready,
        jeni: getDetailKaosResult.jeni,
      });
    } else {
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleCheck = (event) => {
    // console.log(event.target.checked);
    const checked = event.target.checked;
    const value = event.target.value;
    if (checked) {
      //user cek list ukuran
      //isi state aray ukuranselected
      this.setState({
        ukuranSelected: [...this.state.ukuranSelected, value],
      });
    } else {
      // jika user hapus ceklis ukuran
      const ukuranBaru = this.state.ukuranSelected
        .filter((ukuran) => ukuran !== value)
        .map((filterUkuran) => {
          return filterUkuran;
        });

      this.setState({
        ukuranSelected: ukuranBaru,
      });
    }
  };

  handleImage = (event, imageToDB) => {
    if (event.target.files && event.target.files[0]) {
      const gambar = event.target.files[0];
      this.setState({
        [event.target.name]: URL.createObjectURL(gambar),
      });

      this.props.dispatch(uploadKaos(gambar, imageToDB));
    }
  };

  handleSubmit = (event) => {
    const {
      berat,
      harga,
      nama,
      jeni,
      ukuranSelected,
      jenis
    } = this.state;

    event.preventDefault();

    if (
      nama &&
      berat &&
      harga &&
      jeni &&
      ukuranSelected &&
      jenis
    ) {
      // masuk aksi
      this.props.dispatch(updateKaos(this.state));
    } else {
      // belum
      swal("Failed", "Maaf, Semua Form Wajib diisi", "error");
    }
  };

  editUkuran = () => {
    this.setState({
      editUkuran: true,
      ukuranSelected: [],
    });
  };

  render() {
    const {
      berat,
      harga,
      image1,
      image2,
      imageToDB1,
      imageToDB2,
      nama,
      jenis,
      jeni,
      ukurans,
      ready,
      ukuranSelected,
      editUkuran,
      imageLama1,
      imageLama2,
    } = this.state;
    const { getListJenisResult, updateKaosLoading } = this.props;

    // console.log("ukuran yang terpilih : ", ukuranSelected);

    return (
      <div className="content">
        <Row>
          <Col>
            <Link to="/admin/apparel" className="btn btn-primary">
              {" "}
              Kembali{" "}
            </Link>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardHeader tag="h4">Edit Apparel</CardHeader>
              <CardBody>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                  <Row>
                    <Col md="6">
                      <Row>
                        <Col>
                          <img
                            src={image1}
                            width="300"
                            alt="Foto Apparel (Depan)"
                          />
                          <FormGroup>
                            <label> Foto Apparel (Depan)</label>
                            <Input
                              type="file"
                              name="image1"
                              onChange={(event) =>
                                this.handleImage(event, "imageToDB1")
                              }
                            />
                          </FormGroup>
                          {image1 !== imageLama1 ? (
                            //selesai upload / proses upload
                            imageToDB1 ? (
                              <p>
                                {" "}
                                <i className="nc-icon nc-check-2"></i> Selesai
                                upload
                              </p>
                            ) : (
                              <p>
                                <i className="nc-icon nc-user-run"></i> Proses
                                upload
                              </p>
                            )
                          ) : (
                            // belum upload
                            <p>
                              <i className="nc-icon nc-cloud-upload-94"></i>{" "}
                              Belum upload
                            </p>
                          )}
                        </Col>
                        <Col>
                          <img
                            src={image2}
                            width="300"
                            alt="Foto Apparel (Belakang)"
                          />
                          <FormGroup>
                            <label> Foto Apparel (Belakang)</label>
                            <Input
                              type="file"
                              name="image2"
                              onChange={(event) =>
                                this.handleImage(event, "imageToDB2")
                              }
                            />
                          </FormGroup>
                          {image2 !== imageLama2 ? (
                            //selesai upload / proses upload
                            imageToDB2 ? (
                              <p>
                                {" "}
                                <i className="nc-icon nc-check-2"></i> Selesai
                                upload
                              </p>
                            ) : (
                              <p>
                                <i className="nc-icon nc-user-run"></i> Proses
                                upload
                              </p>
                            )
                          ) : (
                            // belum upload
                            <p>
                              <i className="nc-icon nc-cloud-upload-94"></i>{" "}
                              Belum upload
                            </p>
                          )}
                        </Col>
                      </Row>
                    </Col>

                    <Col md="6">
                      <FormGroup>
                        <label>Nama Apparel</label>
                        <Input
                          type="text"
                          value={nama}
                          name="nama"
                          onChange={(event) => this.handleChange(event)}
                        />
                      </FormGroup>

                      <Row>
                        <Col md="6">
                          <FormGroup>
                            <label>Jenis Apparel</label>
                            <Input
                              type="select"
                              name="jeni"
                              value={jeni}
                              onChange={(event) => this.handleChange(event)}
                            >
                              <option value="">Pilih</option>
                              {Object.keys(getListJenisResult).map((key) => (
                                <option value={key} key={key}>
                                  {getListJenisResult[key].namajenis}
                                </option>
                              ))}
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <label>Harga (Rp. )</label>
                            <Input
                              type="number"
                              value={harga}
                              name="harga"
                              onChange={(event) => this.handleChange(event)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                          <FormGroup>
                            <label>Berat (Kg)</label>
                            <Input
                              type="number"
                              value={berat}
                              name="berat"
                              onChange={(event) => this.handleChange(event)}
                            />
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <label>Keterangan</label>
                            <Input
                              type="text"
                              value={jenis}
                              name="jenis"
                              onChange={(event) => this.handleChange(event)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                          <label>
                            Ukuran yang tersedia sekarang adalah : (
                            {ukuranSelected.map((item, index) => (
                              <strong key={index}> {item} </strong>
                            ))}
                            )
                          </label>
                          {editUkuran ? (
                            <>
                            <FormGroup check>
                              {ukurans.map((ukuran, index) => (
                                <Label key={index} check className="mr-2">
                                  <Input
                                    type="checkbox"
                                    value={ukuran}
                                    onChange={(event) =>
                                      this.handleCheck(event)
                                    }
                                  />
                                  {ukuran}
                                  <span className="form-check-sign">
                                    <span className="check"></span>
                                  </span>
                                </Label>
                              ))}
                            </FormGroup>

                            <Button
                              color="primary"
                              size="sm"
                              onClick={() => this.setState({editUkuran: false})}
                            >
                              Selesai Edit Ukuran
                            </Button>
                            </>
                          ) : (
                            <Button
                              color="primary"
                              size="sm"
                              onClick={() => this.editUkuran()}
                            >
                              Edit Ukuran
                            </Button>
                          )}
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <label>Ketersediaan</label>
                            <Input
                              type="select"
                              name="ready"
                              value={ready}
                              onChange={(event) => this.handleChange(event)}
                            >
                              <option value={true}>Ada</option>
                              <option value={false}>Kosong</option>
                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {updateKaosLoading ? (
                        <Button
                          type="submit"
                          color="primary"
                          className="float-right"
                          disabled
                        >
                          <Spinner size="sm" color="light" /> Loading . . .
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          color="primary"
                          className="float-right"
                        >
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
  getListJenisLoading: state.JenisReducer.getListJenisLoading,
  getListJenisResult: state.JenisReducer.getListJenisResult,
  getListJenisError: state.JenisReducer.getListJenisError,

  uploadKaosLoading: state.KaosReducer.uploadKaosLoading,
  uploadKaosResult: state.KaosReducer.uploadKaosResult,
  uploadKaosError: state.KaosReducer.uploadKaosError,

  getDetailKaosLoading: state.KaosReducer.getDetailKaosLoading,
  getDetailKaosResult: state.KaosReducer.getDetailKaosResult,
  getDetailKaosError: state.KaosReducer.getDetailKaosError,
    
  updateKaosLoading: state.KaosReducer.updateKaosLoading,
  updateKaosResult: state.KaosReducer.updateKaosResult,
  updateKaosError: state.KaosReducer.updateKaosError,
});

export default connect(mapStateToProps, null)(EditKaos);
