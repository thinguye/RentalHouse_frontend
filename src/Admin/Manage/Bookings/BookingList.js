import React, { Component, Fragment } from "react";
import {
  Button,
  Table,
  Form,
  Modal,
  FormGroup,
  ModalBody,
} from "react-bootstrap";
import { Input } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import instance from "../../../api/axiosClient";
import { Row, Col } from "reactstrap";
import { FaTrashAlt, FaPencilAlt, FaPlus, FaSave } from "react-icons/fa";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import moment from "moment";
import { toast, Slide } from "react-toastify";
import { faL } from "@fortawesome/free-solid-svg-icons";
import "jquery/dist/jquery.min.js";

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.css";
import $ from "jquery";

class BookingList extends Component {
  state = {
    bookings: [],
    id: 0,
    status: false,
    rooms: [],
    roomName: [],
    showAdd: false,
    showUpdate: false,
    showDelete: false,
    disableButton: "disabled",
    name: "",
    phone: "",
    note: "",
    room: "",
  };

  componentDidMount() {
    if (sessionStorage.getItem("role") !== "admin") {
      window.location.href = "/";
    }
    var bookings = [];
    instance
      .get(`api/Booking`)
      .then((res) => {
        bookings = res.data;
        this.setState({ bookings });
      })
      .catch((error) => console.log(error));
    $(document).ready(function () {
      setTimeout(function () {
        $("#bookingList").dataTable({
          language: {
            search: "Tìm kiếm:",
            info: "Hiển thị  _START_ đến _END_ trong _TOTAL_ lượt",
            infoEmpty: "",
            emptyTable: "Chưa có dữ liệu để hiển thị",
            lengthMenu: "Hiển thị _MENU_ lượt",
            paginate: {
              next: "Trang cuối",
              previous: "Trang đầu",
            },
          },
          columns: [
            null,
            { orderable: false },
            { orderable: false },
            { orderable: false },
            null,
            { orderable: false },
            { orderable: false },
          ],
        });
      }, 100);
    });
    // const roomName = Array(bookings.length).fill("");
    // for (let i = 0; i < bookings.length; i++) {
    //   instance.get(`api/Room/GetRoomById/${bookings[i].room}`).then((rs) => {
    //     const room = rs.data;
    //     const name = room.name;
    //     roomName.push(name);

    //   });
    // }
    // this.setState({roomName})
  }

  updateStatus = () => {
    instance.put(`api/Booking/${this.state.id}`).then((res) => {
      if (res) {
        this.setState({
          showUpdate: false,
        });
        this.notify1();
      }
    });
  };

  deleteBooking = () => {
    instance
      .delete(`api/Booking/${this.state.id}`)
      .then((res) => {
        if (res) {
          const bookings = this.state.bookings.filter(
            (item) => item.id !== this.state.id
          );
          this.setState({ bookings });
          this.setState({ showDelete: false });
          this.notify2();
        }
      })
      .catch((error) => console.log(error));
  };

  notify = (e) =>
    (this.toastId = toast("Đặt phòng thành công!", {
      transition: Slide,
      closeButton: true,
      autoClose: 3000,
      position: "bottom-center",
    }));

  notify1 = (e) =>
    (this.toastId = toast("Đã cọc tiền!", {
      transition: Slide,
      closeButton: true,
      autoClose: 3000,
      position: "bottom-center",
    }));

  notify2 = () =>
    (this.toastId = toast("Đã xóa thông tin đặt phòng!", {
      transition: Slide,
      closeButton: true,
      autoClose: 3000,
      position: "bottom-center",
    }));

  onNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  onPhoneChange = (e) => {
    this.setState({
      phone: e.target.value,
    });
  };
  onNotesChange = (e) => {
    this.setState({
      note: e.target.value,
    });
  };
  onRoomChange = (e) => {
    this.setState({
      room: e.target.value,
    });
  };

  onChangeStatus = (e) => {
    this.setState({
      disableButton: "",
      status: true,
    });
  };

  handleShowAdd = () => {
    this.setState({
      showAdd: true,
    });
    instance.get("api/Room").then((res) => {
      const rooms = res.data.filter((item) => item.state === "Còn Trống");
      this.setState({ rooms });
    });
  };
  handleCloseAdd = () => {
    this.setState({
      showAdd: false,
    });
  };

  handleShowUpdate = (id) => {
    this.setState({
      id: id,
      showUpdate: true,
    });
  };

  handleCloseUpdate = () => {
    this.setState({
      showUpdate: false,
    });
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
  handleSubmit = () => {
    const data = {
      name: this.state.name,
      phone: this.state.phone,
      room: this.state.room,
      note: this.state.note,
      status: false,
      createDate: new Date(),
    };
    instance.post(`api/Booking`, data).then((res) => {
      if (res) {
        this.setState({
          showAdd: false,
        });
        window.location.reload();
        this.notify();
      }
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
                <Table id="bookingList">
                  <thead style={{ color: "blue" }}>
                    <tr>
                      <td className="text-center">Người đặt phòng</td>
                      <td className="text-center">Số điện thoại</td>
                      <td className="text-center">Phòng</td>
                      <td className="text-center">Ghi chú</td>
                      <td className="text-center">Trạng thái cọc</td>
                      <td className="text-center">Ngày đặt</td>
                      <td></td>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.bookings.map((booking) => (
                      <tr v-for="item in tableItems" key={booking.id}>
                        <td className="text-center">{booking.name}</td>
                        <td className="text-center">{booking.phone}</td>
                        <td className="text-center">
                          {/* {this.state.roomName[index++]} */}
                          {booking.roomName}
                        </td>
                        <td className="text-center">{booking.note}</td>
                        <td className="text-center">
                          <Input
                            id="status"
                            style={{
                              backgroundColor: "green",
                              borderColor: "green",
                            }}
                            defaultChecked={booking.status === true}
                            value={booking.status}
                            type="checkbox"
                            onChange={(e) => this.onChangeStatus()}
                          />
                        </td>
                        <td className="text-center">
                          {moment(booking.createDate).format("DD-MM-YYYY")}
                        </td>
                        <td className="right">
                          <Row style={{ float: "right" }}>
                            <Col>
                              <Button
                                className={this.state.disableButton}
                                style={{ border: "none" }}
                                onClick={(e) =>
                                  this.handleShowUpdate(booking.id)
                                }
                                variant="outline-info"
                              >
                                <FaSave />
                              </Button>
                            </Col>
                            <Col>
                              <Button
                                style={{ border: "none" }}
                                variant="outline-danger"
                                onClick={(e) =>
                                  this.handleShowDelete(booking.id)
                                }
                              >
                                <FaTrashAlt />
                              </Button>
                            </Col>
                          </Row>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot style={{ borderColor: "transparent" }}>
                    <tr>
                      <td colSpan={12}>
                        <div className="text-center">
                          <Button
                            variant="outline-primary"
                            onClick={(e) => this.handleShowAdd()}
                          >
                            <FaPlus /> Đặt phòng
                          </Button>
                        </div>
                      </td>
                    </tr>
                  </tfoot>
                </Table>
                <Modal
                  show={this.state.showAdd}
                  onHide={(e) => this.handleCloseAdd()}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Đặt Phòng</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Họ và Tên</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Nguyễn Văn A"
                          autoFocus
                          name="name"
                          onChange={this.onNameChange}
                          value={this.state.name}
                          required
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control
                          type="tel"
                          placeholder=""
                          autoFocus
                          name="phone"
                          onChange={this.onPhoneChange}
                          value={this.state.phone}
                          required
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Phòng</Form.Label>
                        <Form.Select
                          value={this.state.room}
                          onChange={this.onRoomChange}
                        >
                          {this.state.rooms.map((room) => (
                            <option key={room.id} value={room.id}>
                              {room.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Ghi chú</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          name="notes"
                          onChange={this.onNotesChange}
                          value={this.state.note}
                        />
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="primary"
                      onClick={(e) => this.handleSubmit()}
                    >
                      Xác nhận
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={(e) => this.handleCloseAdd()}
                    >
                      Thoát
                    </Button>
                  </Modal.Footer>
                </Modal>

                <Modal
                  show={this.state.showDelete}
                  onHide={(e) => this.handleCloseDelete()}
                  keyboard={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Xác nhận</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Bạn có muốn xóa thông tin đặt phòng này ra khỏi danh sách
                    không?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="danger"
                      onClick={(e) => this.deleteBooking(this.state.id)}
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
                  show={this.state.showUpdate}
                  onHide={(e) => this.handleCloseUpdate()}
                  keyboard={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Xác nhận</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Bạn chắc chắn người đặt phòng đã đặt cọc?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="danger"
                      onClick={(e) => this.updateStatus(this.state.id)}
                    >
                      Có
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={(e) => this.handleCloseUpdate()}
                    >
                      Không
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

export default BookingList;
