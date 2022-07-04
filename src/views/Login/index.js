import { cekLogin } from "actions/AuthAction";
import { loginUser } from "actions/AuthAction";
import React, { Component } from "react";
import { connect } from "react-redux";
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
import swal from "sweetalert";
import Logo from "../../assets/img/Logo.svg";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  componentDidMount() { 
    this.props.dispatch(cekLogin(this.props.history))
   }


  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    const { email, password } = this.state;
    event.preventDefault();

    if (email && password) {
      //lanjut akksi login
      this.props.dispatch(loginUser(email, password));
    } else {
      swal("Failed", "Maaf Email dan Password Harus di Isi", "error");
    }
  };

  componentDidUpdate(prevProps) {
    const { loginResult, cekLoginResult } = this.props;

    if (cekLoginResult && prevProps.cekLoginResult !== cekLoginResult) {
      //sukses
      this.props.history.push("/admin/dashboard");
    }

    if (loginResult && prevProps.loginResult !== loginResult) {
      //sukses
      this.props.history.push("/admin/dashboard");
    }
  }

  render() {
    const { email, password } = this.state;
    const { loginLoading } = this.props;
    return (
      <div>
        <Row className="justify-content-center mt-5">
          <Col md="4" className="mt-5">
            <img src={Logo} className="rounded mx-auto d-block" alt="Logo" />
            <Card>
              <CardHeader tag="h4">Login</CardHeader>
              <CardBody>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                  <FormGroup>
                    <Label for="email">Alamat Email</Label>
                    <Input
                      type="email"
                      name="email"
                      value={email}
                      placeholder="Masukan Email"
                      onChange={(event) => this.handleChange(event)}
                    ></Input>
                  </FormGroup>

                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                      type="password"
                      name="password"
                      value={password}
                      placeholder="Masukan Password"
                      onChange={(event) => this.handleChange(event)}
                    ></Input>
                  </FormGroup>
                  {loginLoading ? (
                    <Button color="primary" type="submit" disabled>
                      <Spinner size="sm" color="light" /> loading
                    </Button>
                  ) : (
                    <Button color="primary" type="submit">
                      Login
                    </Button>
                  )}
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
  loginLoading: state.AuthReducer.loginLoading,
  loginResult: state.AuthReducer.loginResult,
  loginError: state.AuthReducer.loginError,

  cekLoginResult: state.AuthReducer.cekLoginResult,
});

export default connect(mapStateToProps, null)(Login);
