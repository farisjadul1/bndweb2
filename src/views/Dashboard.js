/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  Row,
  Col,
} from "reactstrap";

function Dashboard() {
  return (
    <>
      <div className="content">
        <Row>
          <Col lg="6" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center">
                      <i className="nc-icon nc-bag-16 text-success" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <Link className="btn btn-success" to={"/admin/apparel/"}>
                        Apparel
                      </Link>
                    </div>
                  </Col>
                </Row>
              </CardBody>
              
            </Card>
          </Col>
          <Col lg="6" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center">
                      <i className="nc-icon nc-paper text-warning" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                    <Link className="btn btn-warning" to={"/admin/jenis/"}>
                        Kategori Apparel
                      </Link>
                    </div>
                  </Col>
                </Row>
              </CardBody>
             
            </Card>
          </Col>
          <Col lg="6" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row xs="2">
                  <Col md="4">
                    <div className="icon-big text-center">
                      <i className="nc-icon nc-cart-simple text-primary" />
                    </div>
                  </Col>
                  <Col md="8">
                    <div className="numbers">
                    <Link className="btn btn-primary" to={"/admin/pesanan/"}>
                        Transaksi
                    </Link>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center">
                      <i className="nc-icon nc-app text-secondary" />
                    </div>
                  </Col>
                  <Col md="8">
                    <div className="numbers">
                    <Link className="btn btn-secondary" to={"/admin/laporan/"}>
                        Laporan Penjualan
                      </Link>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        
      </div>
    </>
  );
}

export default Dashboard;
