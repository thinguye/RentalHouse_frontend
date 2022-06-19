import React, { Component, Fragment } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "react-bootstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import instance from "../../../api/axiosClient";
import { Row, Col } from "reactstrap";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import { Redirect } from "react-router-dom";
import moment from "moment";
import { toast, Slide } from "react-toastify";
import "jquery/dist/jquery.min.js";

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.css";
import $ from "jquery";

export default class NewGuests extends Component {
  state = {
    id: 0,
    guests: [],
    redirect: false,
    showDelete: false,
    roomName: ''
  };

  componentDidMount() {
    if (sessionStorage.getItem("role") !== "admin") {
      window.location.href = "/";
    }
    instance
      .get(`api/Customer/current+customers`)
      .then((res) => {
        const guests = res.data;
        this.setState({ guests });
      })
      .catch((error) => console.log(error));
      $(document).ready(function () {
        setTimeout(function () {
          $("#newGuests").dataTable({
            language: {
              search: "Tìm kiếm:",
              info: "Hiển thị  _START_ đến _END_ trong _TOTAL_ khách",
              infoEmpty: "",
              emptyTable: "Chưa có dữ liệu để hiển thị",
              lengthMenu: "Hiển thị _MENU_ khách",
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
  }

  // setName(id) {
  //   console.log(id);
  //   instance.get(`api/Room/GetRoomById/${id}`).then((res) => {
  //     if (res) {
  //       console.log(res)
  //       const roomUser = res.data;
  //       var roomName = roomUser.name;
  //       this.setState({roomName})
  //     }
  //   }).catch((error)=> console.log(error));
  // }
  notify2 = () =>
    (this.toastId = toast("Đã xóa khách ra khỏi phòng!", {
      transition: Slide,
      closeButton: true,
      autoClose: 3000,
      position: "bottom-center",
    }));

  deleteGuest = () => {
    instance
      .put(`api/Customer/${this.state.id}`, this.state.id, -1)
      .then((res) => {
        if (res) {
          this.notify2();
          window.location.reload();
        }
      });
  };

  setRedirect = (id, e) => {
    sessionStorage.setItem("guestId", id);
    window.location.href="/manage/guest"
  };


  handleShowDelete = (guestId) => {
    this.setState({
      showDelete: true,
      id: guestId,
    });
  };

  handleCloseDelete = () => {
    this.setState({
      showDelete: false,
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
            <div>
              <Table id="newGuests">
                <thead style={{ color: "blue" }}>
                  <tr>
                    <td className="text-center">Họ và tên</td>
                    <td className="text-center">Số điện thoại</td>
                    <td className="text-center">Ngày sinh</td>
                    <td className="text-center">Số CMND/CCCD</td>
                    <td className="text-center">Phòng</td>
                    <td className="text-center">Tạm trú từ</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  {this.state.guests.map((guest) => (
                    <tr v-for="item in tableItems" key={guest.id}>
                      <td className="text-center">{guest.name}</td>
                      <td className="text-center">{guest.phone}</td>
                      <td className="text-center">{moment(guest.doB).format("DD-MM-YYYY")}</td>
                      <td className="text-center">{guest.id_Number}</td>
                      <td className="text-center">{guest.room}</td>
                      <td className="text-center">{moment(guest.startDate).format("DD-MM-YYYY")}</td>
                      <td>
                        <Row>
                          <Col>
                            <Button
                              style={{ border: "none" }}
                              variant="outline-primary"
                              onClick={(e) => this.setRedirect(guest.id)}
                            >
                              <FaPencilAlt />
                            </Button>
                          </Col>
                          <Col>
                            <Button
                              style={{ border: "none" }}
                              variant="outline-danger"
                              onClick={(e) => this.handleShowDelete(guest.id)}
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
              <Modal
                show={this.state.showDelete}
                onHide={(e) => this.handleCloseDelete()}
              >
                <ModalHeader closeButton>Xóa khách trọ</ModalHeader>
                <ModalBody>
                  Bạn muốn xóa vị khách này ra khỏi phòng hiện tại?
                </ModalBody>
                <ModalFooter>
                  <Button onClick={(e) => this.deleteGuest()}>Có</Button>
                  <Button onClick={(e) => this.handleCloseDelete()}>
                    Không
                  </Button>
                </ModalFooter>
              </Modal>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </Fragment>
    );
  }
}
