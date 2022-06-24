import React, { Component, Fragment } from "react";
import { Alert, Button } from "react-bootstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import instance from "../../../api/axiosClient";
import { Form, FormGroup, Label, Input } from "reactstrap";

export default class ResetPass extends Component {
  state = {
    username: "",
    password: "",
    show: false,
    contentAlert: "",
    alertback: "",
  };

  onPasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  onUsernameChange = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  setShow = () => {
    this.setState({
      show: true,
    });
  };

  setClose = () => {
    this.setState({
      show: false,
    });
  };

  handleSubmit = () => {
    instance
      .post(
        `api/Account/ResetPassword?username=${this.state.username}&password=${this.state.password}`
      )
      .then((res) => {
        if (res) {
          this.setState({
            contentAlert: "Tạo mới mật khẩu thành công",
            alertback: "success",
          });
          return;
        } else {
          this.setState({
            contentAlert: "Tạo mới mật khẩu thất bại. Vui lòng kiểm tra lại",
            alertback: "danger",
          });
        }
      })
      .catch((error) => {
        this.setState({
          contentAlert: "Tạo mới mật khẩu thất bại. Vui lòng kiểm tra lại",
          alertback: "danger",
        });
      });

    this.setState({
      show: true,
      password: "",
      username: "",
    });
  };

  render() {
    if (sessionStorage.getItem("role") !== "admin") {
      if (sessionStorage.getItem("role") === "user") {
        window.location.href = "/room";
      }
      window.location.href = "/";
    }
    return (
      <Fragment>
        <TransitionGroup>
          <CSSTransition
            component="div"
            className="TabsAnimation"
            appear={true}
            timeout={0}
            enter={false}
            exit={false}
          >
            <div style={{ maxWidth: "50%" }}>
              <Form>
                <FormGroup>
                  <Label>Nhập tên đăng nhập</Label>
                  <Input
                    type="text"
                    onChange={this.onUsernameChange}
                    placeholder="Nhập tên đăng nhập"
                    required
                    value={this.state.username}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Mật khẩu mới</Label>
                  <Input
                    type="password"
                    onChange={this.onPasswordChange}
                    required
                    placeholder="Nhập mật khẩu mới"
                    value={this.state.password}
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                    title="Mật khẩu bao gồm tối thiểu chữ hoa, chữ thường, chữ số, kí tự đặt biệt và có ít nhất 8 kí tự"
                  />
                </FormGroup>
                <div className="text-center" style={{ marginTop: "3rem" }}>
                  <Button onClick={(e) => this.handleSubmit()}>
                    Đổi mật khẩu
                  </Button>
                </div>
              </Form>
              <Alert
                style={{ marginTop: "2rem" }}
                variant={this.state.alertback}
                show={this.state.show}
                onClose={(e) => this.setClose()}
                dismissible
              >
                <p>{this.state.contentAlert}</p>
              </Alert>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </Fragment>
    );
  }
}
