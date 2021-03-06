import React, { Component, Fragment } from "react";
import { Alert, Button } from "react-bootstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import instance from "../../../api/axiosClient";
import { Form, FormGroup, Label, Input } from "reactstrap";

export default class AccountDetail extends Component {
  state = {
    password: "",
    confirmPass: "",
    show: false,
    contentAlert: "",
    alertback: "",
  };

  onPasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  onConfirmPassChange = (e) => {
    this.setState({
      confirmPass: e.target.value,
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
    if (this.state.password === this.state.confirmPass) {
      instance
        .post(`api/Account/ChangePassword?password=${this.state.password}`)
        .then((res) => {
          if (res) {
            this.setState({
              contentAlert: "Đổi mật khẩu thành công",
              alertback: "success",
            });
            return;
          } else {
            this.setState({
              contentAlert: "Đổi mật khẩu thất bại. Vui lòng kiểm tra lại",
              alertback: "danger",
            });
          }
        })
        .catch((error) =>
          this.setState({
            contentAlert:
              "Mật khẩu bao gồm chữ hoa, chữ thường, số, kí tự đặt biệt và có ít nhất 8 kí tự",
            alertback: "danger",
          })
        );
    } else {
      this.setState({
        contentAlert: "Xác thực mật khẩu thất bại. Vui lòng kiểm tra lại",
        alertback: "danger",
      });
    }
    this.setState({
      show: true,
      password: "",
      confirmPass: "",
    });
  };

  render() {
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
                  <Label for="password">Mật khẩu mới</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    onChange={this.onPasswordChange}
                    required
                    placeholder="Nhập mật khẩu mới"
                    value={this.state.password}
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                    title="Mật khẩu bao gồm tối thiểu chữ hoa, chữ thường, chữ số, kí tự đặt biệt và có ít nhất 8 kí tự"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="confirmpass">Xác nhận mật khẩu mới</Label>
                  <Input
                    type="password"
                    onChange={this.onConfirmPassChange}
                    name="confirmpass"
                    id="confirmpass"
                    placeholder="Xác nhận mật khẩu mới"
                    required
                    value={this.state.confirmPass}
                  />
                  .
                </FormGroup>
                <div className="text-center">
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
