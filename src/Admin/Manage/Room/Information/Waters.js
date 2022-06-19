import React, { Component, Fragment } from "react";
import { Button, Table } from "react-bootstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { Row, Col } from "reactstrap";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import instance from "../../../../api/axiosClient";
import "jquery/dist/jquery.min.js";

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.css";
import $ from "jquery";
import moment from "moment";

export default class Waters extends Component {
  state = {
    waters: [],
  };

  componentDidMount() {
    instance
      .get(`api/Bill/room+water/${sessionStorage.getItem("roomId")}`)
      .then((res) => {
        if (res) {
          const waters = res.data;
          this.setState({ waters });
        }
      });
    $(document).ready(function () {
      setTimeout(function () {
        $("#waterBills").dataTable({
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
            }
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
              <Table id="waterBills">
                <thead style={{ color: "blue" }}>
                  <tr>
                    <td>Mã hóa đơn</td>
                    <td>Ngày</td>
                    <td>Số cũ</td>
                    <td>Số mới</td>
                    <td>Giá nước</td>
                    <td>Tổng tiền</td>
                  </tr>
                </thead>
                <tbody>
                  {this.state.waters.map((water) => (
                    <tr v-for="item in tableItems" key={water.id}>
                      <td>{water.id}</td>
                      <td>{moment(water.water_Date).format("DD-MM-YYYY")}</td>
                      <td>{water.old_Number}</td>
                      <td>{water.water_Number}</td>
                      <td>
                        {Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(water.price)}
                      </td>
                      <td>
                        {Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(water.total)}
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
