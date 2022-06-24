import React, { Component } from "react";

import instance from "../../api/axiosClient";
import "./Login.css";
import { Redirect } from "react-router-dom";
import { Alert, Col, Form, Row } from "react-bootstrap";
import { Button } from "reactstrap";

export default class Login extends Component {
  state = {
    username: "",
    password: "",
    redirect: false,
    account: {},
    room: {},
    show: false,
  };

  componentDidMount() {
    sessionStorage.setItem("token", "");
    sessionStorage.setItem("role", "");
  }
  handleOnChangeUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };
  handleOnChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleLogin = () => {
    if (this.state.username !== "" && this.state.password !== "") {
      var data = new URLSearchParams({
        username: this.state.username,
        password: this.state.password,
        client_id: "myClient",
        grant_type: "password",
        scope: "myAPIs",
      });
      instance
        .post("connect/token", data, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((rs) => {
          console.log(rs);
          if (rs.data !== null) {
            sessionStorage.setItem("token", rs.data.access_token);
            instance.defaults.headers.Authorization =
              "Bearer " + rs.data.access_token;
            instance.get("api/Room/GetUserRoomId").then((res) => {
              if (res.data !== 0) {
                this.setState({
                  role: "user",
                });
                sessionStorage.setItem("roomId", res.data);
              } else {
                this.setState({ role: "admin" });
              }
              this.setState({
                redirect: true,
              });
            });
          } else {
            this.setState({
              show: true,
              contentAlert: "Sai tên đăng nhập hoặc mật khẩu",
            });
          }
        })
        .catch((err) => {
          this.setState({
            show: true,
            contentAlert: "Sai tên đăng nhập hoặc mật khẩu",
          });
        });
    } else {
      this.setState({
        show: true,
        contentAlert: "Vui lòng nhập tên đăng nhập và mật khẩu",
      });
    }
  };

  renderRedirect = () => {
    if (this.state.redirect === true) {
      if (this.state.role === "admin") {
        sessionStorage.setItem("role", "admin");
        return <Redirect to="/dashboard" />;
      } else if (this.state.role === "user") {
        sessionStorage.setItem("role", "user");
        return <Redirect to="/room" />;
      }
    }
    return <Redirect to="/home" />;
  };

  setClose = () => {
    this.setState({
      show: false,
    });
  };

  render() {
    return (
      <div className="login">
        <ul className="nav login">
          <li className="login-form">
            <Form>
              <Row>
                <Col>
                  <Form.Group>
                    <Row>
                      <Col md="auto">
                        <Form.Label style={{ color: "white" }}>
                          Tên đăng nhập
                        </Form.Label>
                      </Col>
                      <Col>
                        <Form.Control
                          style={{ padding: "0px 5px" }}
                          type="text"
                          required
                          value={this.state.username}
                          onChange={this.handleOnChangeUsername}
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Row>
                      <Col md="auto">
                        <Form.Label style={{ color: "white" }}>
                          Mật khẩu
                        </Form.Label>
                      </Col>
                      <Col>
                        <Form.Control
                          style={{ padding: "0px 5px" }}
                          type="password"
                          required
                          value={this.state.password}
                          onChange={this.handleOnChangePassword}
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                </Col>
                <Col md="auto">
                  {this.renderRedirect()}
                  <Button
                    className="btn-login"
                    onClick={(e) => this.handleLogin()}
                  >
                    Đăng nhập
                  </Button>
                </Col>
              </Row>
            </Form>
          </li>
        </ul>
        <Alert
          variant="danger"
          onClose={this.setClose}
          show={this.state.show}
          dismissible
        >
          <p>{this.state.contentAlert}</p>
        </Alert>
      </div>
    );
  }
}
