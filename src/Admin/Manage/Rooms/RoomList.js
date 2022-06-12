import React, { Component, Fragment } from "react";
import { Button, Table, Modal } from "react-bootstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {
  Row,
  Col,
  Input,
  Label,
  Form,
  FormGroup,
} from "reactstrap";
import { FaTrashAlt, FaPencilAlt, FaPlus, FaEye } from "react-icons/fa";
import { Redirect } from "react-router-dom";
import instance from "../../../api/axiosClient";

import "jquery/dist/jquery.min.js";

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.css";
import $ from "jquery";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.min.css";

export default class RoomList extends Component {
  state = {
    rooms: [],
    id: 0,
    username: "",
    password: "",
    redirectEditRoom: false,
    redirectRoomDetail: false,
    showDelete: false,
    showAdd: false,
    showCreate: false,
    name: "",
    state: "Còn Trống",
    number_Of_People: 0,
    price: "",
    description: "",
    date: new Date(),
  };
  componentDidMount() {
    instance
      .get("api/Room")
      .then((res) => {
        const rooms = res.data;
        this.setState({ rooms });
      })
      .catch((error) => console.log(error));
    $(document).ready(function () {
      setTimeout(function () {
        $("#example").dataTable({
          language: {
            search: "Tìm kiếm:",
            info: "Hiển thị  _START_ đến _END_ trong _TOTAL_ phòng",
            infoEmpty: "",
            emptyTable: "Chưa có dữ liệu để hiển thị",
            lengthMenu: "Hiển thị _MENU_ phòng",
            paginate: {
              next: "Trang cuối",
              previous: "Trang đầu",
            },
          },
          columns: [null, null, null, null, null, { orderable: false }],
        });
      }, 1000);
    });
  }

  deleteRoom = (id, e) => {
    instance.delete(`api/Room/${id}`).then((res) => {
      console.log(res);
      console.log(res.data);
      const rooms = this.state.rooms.filter((item) => item.id !== id);
      this.setState({ rooms });
      this.setState({ showDelete: true });
    });
  };

  setColor(status) {
    if (status === "Còn Trống") {
      return "#99FF99";
    } else if (status === "Đang Sửa Chữa") {
      return "#C0C0C0";
    } else if (status === "Đã Đặt") {
      return "#FFFF99";
    }
    return "transparent";
  }

  createAccount = (e) => {
    const data = {
      username: this.state.username,
      password: this.state.password,
      roomId: this.state.id,
      role: "user",
    };
    instance.post(`api/Account/Register`, data);
  };

  setDisabledButton(number) {
    if (number > 0) {
      return "disabled";
    }
    return "";
  }

  onNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  onPriceChange = (e) => {
    this.setState({
      price: e.target.value,
    });
  };

  onDescriptionChange = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  onUsernameChange = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  onPasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleSubmit = (e) => {
    const data = {
      id: this.state.id,
      name: this.state.name,
      state: this.state.state,
      number_Of_People: this.state.number_Of_People,
      price: this.state.price,
      description: this.state.description,
      date: this.state.date,
    };
    instance.post("api/Room", data).then((res) => {
      console.log(res.data);
      this.setState({ showAdd: false });
      window.location.reload();
    });
  };

  setRedirectRoomDetail = (id, e) => {
    sessionStorage.setItem("roomId", id);
    this.setState({
      redirectRoomDetail: true,
    });
  };

  setRedirectEditRoom = (id, e) => {
    sessionStorage.setItem("roomId", id);
    this.setState({
      redirectEditRoom: true,
    });
  };

  renderRedirectRoomDetail = (e) => {
    if (this.state.redirectRoomDetail === true) {
      return <Redirect to="/manage/room/details" />;
    }
    return <Redirect to="/manage/rooms" />;
  };

  renderRedirectEditRoom = (e) => {
    if (this.state.redirectEditRoom === true) {
      return <Redirect to="/manage/room/edit" />;
    }
    return <Redirect to="/manage/rooms" />;
  };

  handleShowDelete = (id) => {
    this.setState({
      id: id,
      showDelete: true,
    });
  };
  handleCloseDelete = () => {
    this.setState({
      showDelete: false,
    });
  };

  handleShowAdd = () => {
    this.setState({
      showAdd: true,
    });
  };
  handleCloseAdd = () => {
    this.setState({
      showAdd: false,
    });
  };

  handleShowCreate = (id) => {
    this.setState({
      id: id,
      showCreate: true,
    });
  };
  handleCloseCreate = () => {
    this.setState({
      showCreate: false,
    });
  };

  render() {
    return (
      <>
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
              <div>
                <Table id="example" responsive>
                  <thead style={{ color: "blue" }}>
                    <tr>
                      <td className="text-center">Phòng</td>
                      <td className="text-center">Số khách trọ</td>
                      <td className="text-center">Giá tiền</td>
                      <td className="text-center">Trạng thái</td>
                      <td className="text-center">Ngày tạo</td>
                      <td></td>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.rooms.map((room) => (
                      <tr
                        style={{ backgroundColor: this.setColor(room.state) }}
                        v-for="item in tableItems"
                        key={room.id}
                      >
                        <td className="text-center">{room.name}</td>
                        <td className="text-center">{room.number_Of_People}</td>
                        <td className="text-center">
                          {Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(room.price)}
                        </td>
                        <td className="text-center">{room.state}</td>
                        <td className="text-center">
                          {moment(room.date).format("DD-MM-YYYY")}
                        </td>
                        <td>
                          <Row>
                            <Col>
                              <Button
                                style={{ border: "none" }}
                                variant="outline-success"
                                onClick={(e) => this.handleShowCreate(room.id)}
                              >
                                <FaPlus />
                              </Button>
                            </Col>
                            <Col>
                              {this.renderRedirectRoomDetail()}
                              <Button
                                style={{ border: "none" }}
                                onClick={(e) =>
                                  this.setRedirectRoomDetail(room.id)
                                }
                                variant="outline-info"
                              >
                                <FaEye />
                              </Button>
                            </Col>
                            <Col>
                              {this.renderRedirectEditRoom()}
                              <Button
                                style={{ border: "none" }}
                                onClick={(e) =>
                                  this.setRedirectEditRoom(room.id)
                                }
                                variant="outline-primary"
                              >
                                <FaPencilAlt />
                              </Button>
                            </Col>
                            <Col>
                              <Button
                                style={{ border: "none" }}
                                onClick={(e) => this.handleShowDelete(room.id)}
                                variant="outline-danger"
                                className={this.setDisabledButton(
                                  room.number_Of_People
                                )}
                              >
                                <FaTrashAlt />
                              </Button>
                            </Col>
                          </Row>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div className="text-center">
                  <Button
                    onClick={(e) => this.handleShowAdd()}
                    variant="outline-primary"
                  >
                    <FaPlus /> Thêm phòng
                  </Button>
                </div>

                <Modal
                  show={this.state.showDelete}
                  onHide={(e) => this.handleCloseDelete()}
                  keyboard={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Xác nhận</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Bạn có muốn xóa phòng {this.state.id} khỏi danh sách phòng
                    không?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="danger"
                      onClick={(e) => this.deleteRoom(this.state.id)}
                    >
                      Có
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={(e) => this.handleCloseDelete()}
                    >
                      Không
                    </Button>
                  </Modal.Footer>
                </Modal>

                <Modal
                  show={this.state.showAdd}
                  onHide={(e) => this.handleCloseAdd()}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Thêm phòng</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Row>
                        <FormGroup>
                          <Label for="name">Số phòng</Label>
                          <Input
                            type="text"
                            name="name"
                            placeholder="Nhập số phòng"
                            value={this.state.name}
                            onChange={this.onNameChange}
                            required
                          />
                        </FormGroup>
                      </Row>
                      <FormGroup>
                        <Label for="price">Giá phòng</Label>
                        <Input
                          type="number"
                          step={10000}
                          name="price"
                          placeholder="Nhập giá phòng"
                          value={this.state.price}
                          onChange={this.onPriceChange}
                          required
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="des">Mô tả</Label>
                        <Input
                          type="text"
                          name="des"
                          placeholder=""
                          value={this.state.description}
                          onChange={this.onDescriptionChange}
                        />
                        .
                      </FormGroup>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      onClick={(e) => this.handleSubmit()}
                      type="submit"
                      color="primary"
                    >
                      Thêm
                    </Button>
                    <Button
                      variant="danger"
                      onClick={(e) => this.handleCloseAdd()}
                    >
                      Thoát
                    </Button>
                  </Modal.Footer>
                </Modal>

                <Modal
                  show={this.state.showCreate}
                  onHide={(e) => this.handleCloseCreate()}
                  style={{ top: "30%" }}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Đăng kí tài khoản</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Row>
                        <FormGroup>
                          <Label for="username">Tên đăng nhập</Label>
                          <Input
                            type="text"
                            name="username"
                            placeholder="Nhập tên tài khoản"
                            value={this.state.username}
                            onChange={this.onUsernameChange}
                            required
                          />
                        </FormGroup>
                      </Row>
                      <FormGroup>
                        <Label for="password"></Label>
                        <Input
                          type="text"
                          name="password"
                          placeholder="Nhập mật khẩu"
                          value={this.state.password}
                          onChange={this.onPasswordChange}
                          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                          title="Mật khẩu bao gồm tối thiểu chữ hoa, chữ thường, chữ số, kí tự đặt biệt và có ít nhất 8 kí tự"
                          required
                        />
                      </FormGroup>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      onClick={(e) => this.createAccount()}
                      type="submit"
                      color="primary"
                    >
                      Thêm
                    </Button>
                    <Button
                      variant="danger"
                      onClick={(e) => this.handleCloseCreate()}
                    >
                      Thoát
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </CSSTransition>
          </TransitionGroup>
        </Fragment>
      </>
    );
  }
}
