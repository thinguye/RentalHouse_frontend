import React, { Component, Fragment } from "react";
import { Button, ButtonGroup, Table } from "react-bootstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import { Tab } from "bootstrap";
import instance from "../../../api/axiosClient";
import "jquery/dist/jquery.min.js";

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.css";
import $ from "jquery";
import moment from "moment";

export default class ElectricBills extends Component {
  state = {
    electrics: [],
  };

  componentDidMount() {
    instance
      .get(`api/Bill/room+electric/${sessionStorage.getItem("roomId")}`)
      .then((res) => {
        if (res) {
          const electrics = res.data;
          this.setState({ electrics });
        }
      });
    $(document).ready(function () {
      setTimeout(function () {
        $("#elecBill").dataTable({
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
          columns: [null, null,null, null, null, null, null],
        });
      }, 100);
    });
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
              <Table id="elecBill">
                <thead style={{ color: "blue" }}>
                  <tr>
                    <td>Mã hóa đơn</td>
                    <td>Ngày</td>
                    <td>Số cũ</td>
                    <td>Số mới</td>
                    <td>Điện tiêu thụ</td>
                    <td>Giá điện</td>
                    <td>Tổng tiền</td>
                  </tr>
                </thead>
                <tbody>
                  {this.state.electrics.map((electric) => (
                    <tr v-for="item in tableItems" key={electric.id}>
                      <td>{electric.billId}</td>
                      <td>
                        {moment(electric.electric_Date).format("DD-MM-YYYY")}
                      </td>
                      <td>{electric.old_Number}</td>
                      <td>{electric.electric_Number}</td>
                      <td>{electric.electric_Number-electric.old_Number}</td>
                      <td>
                        {Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(electric.electric_Price)}
                      </td>
                      <td>
                        {Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(electric.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CSSTransition>
          </TransitionGroup>
        </Fragment>
      </>
    );
  }
}
