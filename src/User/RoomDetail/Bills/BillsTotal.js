import React, { Component, Fragment } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { Row, Col, Label, Input } from "reactstrap";
import { FaTrashAlt, FaPlus } from "react-icons/fa";
import instance from "../../../api/axiosClient";
import moment from "moment";
import "jquery/dist/jquery.min.js";

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.css";
import $ from "jquery";

export default class BillsTotal extends Component {
  state = {
    id:0,
    bills: [],
    roomName: "",
    room: sessionStorage.getItem("roomId"),
    oldElectricNum: 0,
    electric_num: 0,
    oldWaterNum: 0,
    water_num: 0,
    showAdd: false,
    showSubmit: false,
    showDelete: false,
    contentSubmit: "",
  };

  componentDidMount() {
    if (sessionStorage.getItem("role") !== "user") {
      window.location.href = "/home";
    }
    const id = this.state.room;
    instance
      .get(`api/Bill/GetByRoom/${id}`)
      .then((res) => {
        const bills = res.data;
        this.setState({ bills });
      })
      .catch((error) => console.log(error));
    
    instance
      .get(`api/Room/GetRoomById/${id}`)
      .then((res) => {
        const data = res.data;
        const roomName = data.name;
        this.setState({ roomName });
      })
      .catch((error) => console.log(error));
      $(document).ready(function () {
        setTimeout(function () {
          $("#bills").dataTable({
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
            columns:[
              {orderable:true},
              {orderable:true},
              {orderable:true},
              {orderable:true},
              {orderable:true},
              {orderable:true},
              {orderable:false},
            ]
          });
        }, 100);
      });
  }

  handleShowAdd = () => {
    instance
      .get(`api/Bill/room+electric/${sessionStorage.getItem("roomId")}`)
      .then((res) => {
        if (res) {
          const electrics = res.data;
          const electric = electrics[electrics.length - 1];
          const oldElectricNum = electric.electric_Number;
          const electric_num = electric.electric_Number;
          this.setState({ oldElectricNum, electric_num });
        }
      });
    instance
      .get(`api/Bill/room+water/${sessionStorage.getItem("roomId")}`)
      .then((res) => {
        if (res) {
          const waters = res.data;
          const water = waters[waters.length - 1];
          const oldWaterNum = water.water_Number;
          const water_num = water.water_Number;
          this.setState({ oldWaterNum, water_num });
        }
      });
    this.setState({
      showAdd: true,
    });
  };

  handleCloseSubmit = () => {
    this.setState({
      showSubmit: false,
    });
  };

  handleCloseAdd = () => {
    this.setState({
      showAdd: false,
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

  onElectricChange = (e) => {
    this.setState({
      electric_num: e.target.value,
    });
  };

  onWaterChange = (e) => {
    this.setState({
      water_num: e.target.value,
    });
  };

  handleSubmit = (e) => {
    if (this.state.electric_num < this.state.oldElectricNum) {
      this.setState({
        showSubmit: true,
        contentSubmit: "Số mới không thể nhỏ hơn số cũ. Vui lòng kiểm tra lại!",
      });
    } else {
      const room = this.state.room;
      const electric_num = this.state.electric_num;
      const water_num = this.state.water_num;
      instance
        .post(
          `api/Bill?roomId=${room}&electric_num=${electric_num}&water_num=${water_num}`
        )
        .then((res) => {
          console.log(res);
          if (res) {
            this.setState({
              showAdd: false,
              showSubmit: true,
              contentSubmit: "Bạn đã thêm hóa đơn thành công!",
            });
          } else {
            this.setState({
              showSubmit: true,
              contentSubmit: "Quá trình thất bại!",
            });
          }
        })
        .catch((err) => console.log(err));
    }
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

  setColor(is_Pay) {
    if (is_Pay === true) {
      return "#99FF99";
    }
    return "transparent";
  }

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
                <Table id="bills" responsive>
                  <thead style={{ color: "blue" }}>
                    <tr>
                      <td className="text-center">Ngày</td>
                      <td className="text-center">Tiền phòng</td>
                      <td className="text-center">Tiền điện</td>
                      <td className="text-center">Tiền nước</td>
                      <td className="text-center">Các khoản khác</td>
                      <td className="text-center">Thành tiền</td>
                      <td className="text-center">Trạng thái</td>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.bills.map((bill) => (
                      <tr
                        style={{ backgroundColor: this.setColor(bill.is_Pay) }}
                        v-for="item in tableItems"
                        key={bill.id}
                      >
                        <td className="text-center">
                          {moment(bill.time).format("DD-MM-YYYY")}
                        </td>
                        <td className="text-center">
                          {Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(bill.price)}
                        </td>
                        <td className="text-center">
                          {Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(bill.electric_Fee)}
                        </td>
                        <td className="text-center">
                          {Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(bill.water_Fee)}
                        </td>
                        <td className="text-center">
                          {Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(bill.wifi_Fee + bill.garbage_Fee)}
                        </td>
                        <td className="text-center">
                          {Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(bill.total)}
                        </td>
                        <td className="text-center">
                          {bill.is_Pay ? "Đã Thanh Toán" : "Chưa Thanh Toán"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div className="text-center">
                  <Button
                  style={{border:"none", marginTop:"1rem"}}
                    variant="outline-primary"
                    onClick={(e) => this.handleShowAdd()}
                  >
                    <FaPlus /> Thêm hóa đơn
                  </Button>
                </div>
                <Modal
                  show={this.state.showAdd}
                  onHide={(e) => this.handleCloseAdd()}
                >
                  <Modal.Header
                    style={{
                      backgroundColor: "white",
                      borderWidth: "5px",
                      borderColor: "blueviolet",
                    }}
                    closeButton
                  >
                    <Modal.Title style={{ color: "blueviolet" }}>
                      Thêm hóa đơn
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group>
                        <Label for="electric">Số điện</Label>
                        <Input
                          type="number"
                          step={1}
                          name="electric"
                          id="electric"
                          value={this.state.electric_num}
                          placeholder={this.state.oldElectricNum}
                          onChange={this.onElectricChange}
                          required
                        />
                      </Form.Group>
                      <Form.Group>
                        <Label for="water">Số nước</Label>
                        <Input
                          type="number"
                          step={1}
                          name="water"
                          id="water"
                          value={this.state.water_num}
                          placeholder={this.state.oldWaterNum}
                          onChange={this.onWaterChange}
                          required
                        />
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer style={{ display: "block" }}>
                    <div className="text-center">
                      <Button
                        style={{
                          border:"none",
                          marginRight: "40px",
                        }}
                        onClick={(e) => this.handleSubmit()}
                        type="submit"
                        variant="outline-primary"
                      >
                        Thêm
                      </Button>
                      <Button
                        style={{ marginLeft: "40px", border:'none' }}
                        variant="outline-danger"
                        onClick={(e) => this.handleCloseAdd()}
                      >
                        Thoát
                      </Button>
                    </div>
                  </Modal.Footer>
                </Modal>
                <Modal
                  show={this.state.showSubmit}
                  onHide={(e) => this.handleCloseSubmit()}
                >
                  <Modal.Header
                    style={{
                      backgroundColor: "white",
                      borderWidth: "5px",
                      borderColor: "blueviolet",
                    }}
                    closeButton
                  >
                    <Modal.Title style={{ color: "blueviolet" }}>
                      Thông báo
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>{this.state.contentSubmit}</Modal.Body>
                </Modal>
              </div>
            </CSSTransition>
          </TransitionGroup>
        </Fragment>
      </>
    );
  }
}
