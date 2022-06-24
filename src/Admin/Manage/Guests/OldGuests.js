import React, { Component, Fragment } from "react";
import { Button, Table, Modal } from "react-bootstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import instance from "../../../api/axiosClient";
import { Row, Col } from "reactstrap";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import { Redirect } from "react-router-dom";
import moment from "moment";
import "jquery/dist/jquery.min.js";

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.css";
import $ from "jquery";

export default class OldGuests extends Component {
  state = {
    guests: [],
    redirect: false,
    id: 0,
    name: "",
    showDelete: false,
  };

  componentDidMount() {
    instance
      .get(`api/Customer/old+customers`)
      .then((res) => {
        const guests = res.data;
        this.setState({ guests });
      })
      .catch((error) => console.log(error));
      $(document).ready(function () {
        setTimeout(function () {
          $("#oldGuests").dataTable({
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
              { orderable: false },
              { orderable: false },
              { orderable: false },
            ],
          });
        }, 100);
      });
  }

  handleShowDelete = (id, name, e) => {
    this.setState({
      showDelete: true,
      name: name,
      id: id,
    });
  };

  handleCloseDelete = () => {
    this.setState({
      showDelete: false,
    });
  };

  deleteGuest = () => {
    instance.delete(`api/Customer/${this.state.id}`).then((res) => {
      if (res) {
        const guests = this.state.guests.filter(
          (item) => item.id !== this.state.id
        );
        this.setState({ guests });
        this.setState({ showDelete: false });
      }
    });
  };

  setRedirect = (id, e) => {
    sessionStorage.setItem("guestId", id);
    window.location.href="/manage/guest";
  };

  render() {
    if (sessionStorage.getItem("role") !== "admin") {
      if(sessionStorage.getItem("role") === "user") {
        window.location.href ="/room";
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
            <div>
              <Table id="oldGuests">
                <thead style={{ color: "blue" }}>
                  <tr>
                  <td>#</td>
                    <td>Họ và tên</td>
                    <td>Số điện thoại</td>
                    <td>Ngày sinh</td>
                    <td>Số CMND/CCCD</td>
                    <td>Tạm trú từ</td>
                    <td>Đến ngày</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  {this.state.guests.map((guest) => (
                    <tr v-for="item in tableItems" key={guest.id}>
                    <td className="text-center">{guest.id}</td>
                      <td>{guest.name}</td>
                      <td>{guest.phone}</td>
                      <td>{moment(guest.doB).format("DD-MM-YYYY")}</td>
                      <td>{guest.id_Number}</td>
                      <td>{moment(guest.startDate).format("DD-MM-YYYY")}</td>
                      <td>{moment(guest.endDate).format("DD-MM-YYYY")}</td>
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
                              onClick={(e) =>
                                this.handleShowDelete(guest.id, guest.name)
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
              </Table>
              <Modal
                show={this.state.showDelete}
                size="lg"
                onClick={(e) => this.handleCloseDelete()}
                aria-labelledby="contained-modal-title-vcenter"
              >
                <Modal.Header closeButton>
                  <Modal.Title>Xác nhận</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Bạn có muốn xóa {this.state.name} vĩnh viễn khỏi hệ thống?
                </Modal.Body>
                <Modal.Footer
                  style={{
                    backgroundColor: "white",
                    borderColor: "transparent",
                  }}
                >
                  <Button
                    variant="danger"
                    onClick={(e) => this.deleteGuest(this.state.id)}
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
            </div>
          </CSSTransition>
        </TransitionGroup>
      </Fragment>
    );
  }
}
