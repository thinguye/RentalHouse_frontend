import React, { Component, Fragment } from "react";
import {
  Button,
  Table,
  Modal,
} from "react-bootstrap";
import { Input } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import instance from "../../../api/axiosClient";
import { Row, Col } from "reactstrap";
import { FaTrashAlt, FaSave } from "react-icons/fa";
import moment from "moment";
import { toast, Slide } from "react-toastify";
import "jquery/dist/jquery.min.js";

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.css";
import $ from "jquery";

class BillList extends Component {
  state = {
    bills: [],
    id: 0,
    showUpdate: false,
    showDelete: false,
  };

  list = [];

  componentDidMount() {
    if (sessionStorage.getItem("role") !== "admin") {
      window.location.href = "/";
    }
    instance
      .get(`api/Bill`)
      .then((res) => {
        const bills = res.data;
        this.setState({ bills });
      })
      .catch((error) => console.log(error));
    $(document).ready(function () {
      setTimeout(function () {
        $("#billLists").dataTable({
          language: {
            search: "Tìm kiếm:",
            info: "Hiển thị  _START_ đến _END_ trong _TOTAL_ hóa đơn",
            infoEmpty: "",
            emptyTable: "Chưa có dữ liệu để hiển thị",
            lengthMenu: "Hiển thị _MENU_ hóa đơn",
            paginate: {
              next: "Trang cuối",
              previous: "Trang đầu",
            },
          },
          columns: [
            null,
            null,
            null,
            null,
            { orderable: false },
            { orderable: false },
          ],
        });
      }, 100);
    });
  }

  updateStatus = () => {
    instance.put(`api/Bill/${this.state.id}`).then((res) => {
      if (res) {
        this.setState({
          showUpdate: false,
        });
        this.notify1();
      }
    });
  };

  deleteBill = () => {
    instance
      .delete(`api/Bill/${this.state.id}`)
      .then((res) => {
        if (res) {
          const bills = this.state.bills.filter(
            (item) => item.id !== this.state.id
          );
          this.setState({ bills });
          this.setState({ showDelete: false });
          this.notify2();
        }
      })
      .catch((error) => console.log(error));
  };

  notify1 = (e) =>
    (this.toastId = toast("Đã thanh toán!", {
      transition: Slide,
      closeButton: true,
      autoClose: 3000,
      position: "bottom-center",
    }));

  notify2 = () =>
    (this.toastId = toast("Đã xóa hóa đơn!", {
      transition: Slide,
      closeButton: true,
      autoClose: 3000,
      position: "bottom-center",
    }));

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
                <Table id="billLists" style={{ borderColor: "gray" }}>
                  <thead style={{ color: "blue" }}>
                    <tr>
                      <td className="text-center">Mã hóa đơn</td>
                      <td className="text-center">Ngày</td>
                      <td className="text-center">Phòng</td>
                      <td className="text-center">Thành tiền</td>
                      <td className="text-center">Trạng thái</td>
                      <td></td>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.bills.map((bill) => (
                      <tr v-for="item in tableItems" key={bill.id}>
                        <td className="text-center">{bill.id}</td>
                        <td className="text-center">
                          {moment(bill.time).format("DD-MM-YYYY")}
                        </td>
                        <td className="text-center">{bill.room}</td>
                        <td className="text-center">
                          {Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(bill.total)}
                        </td>
                        <td className="text-center">
                          <Input
                            style={{
                              backgroundColor: "green",
                              borderColor: "green",
                            }}
                            defaultChecked={bill.is_Pay === true}
                            value={bill.is_Pay}
                            type="radio"
                          />
                        </td>
                        <td className="right">
                          <Row style={{ float: "right" }}>
                            <Col>
                              <Button
                                style={{ border: "none" }}
                                onClick={(e) => this.handleShowUpdate(bill.id)}
                                variant="outline-info"
                              >
                                <FaSave />
                              </Button>
                            </Col>
                            <Col>
                              <Button
                                style={{ border: "none" }}
                                variant="outline-danger"
                                onClick={(e) => this.handleShowDelete(bill.id)}
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
                  keyboard={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Xác nhận</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Bạn có muốn xóa hóa đơn này ra khỏi hệ thống?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="danger"
                      onClick={(e) => this.deleteBill(this.state.id)}
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
                    Bạn chắc chắn hóa đơn này đã được thanh toán?
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

export default BillList;
