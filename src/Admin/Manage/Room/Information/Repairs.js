import React, { Component, Fragment } from "react";
import { Button, Table, FormControl } from "react-bootstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { Row, Col } from "reactstrap";
import { FaTrashAlt, FaPlus } from "react-icons/fa";
import instance from "../../../../api/axiosClient";
import moment from "moment";
import "jquery/dist/jquery.min.js";

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.css";
import $ from "jquery";

class Repairs extends Component {
  state = {
    repairs: [],
    description: "",
  };

  componentDidMount() {
    const id = sessionStorage.getItem("roomId");
    instance
      .get(`api/RequestRepair/RoomRepairs/${id}`)
      .then((res) => {
        const repairs = res.data;
        this.setState({ repairs });
        console.log(id);
      })
      .catch((error) => console.log(error));
    $(document).ready(function () {
      setTimeout(function () {
        $("#repairList").dataTable({
          language: {
            search: "Tìm kiếm:",
            info: "Hiển thị  _START_ đến _END_ trong _TOTAL_ lần",
            infoEmpty: "",
            emptyTable: "Chưa có dữ liệu để hiển thị",
            lengthMenu: "Hiển thị _MENU_ lần",
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
          ],
        });
      }, 100);
    });
  }

  handleSubmmit = () => {
    if (this.state.description !== "") {
      const data = {
        room: sessionStorage.getItem("roomId"),
        description: this.state.description,
        date: new Date(),
        status: "Đang Đợi",
      };
      instance.post(`api/RequestRepair`, data).then((res) => {
        if (res) {
          window.location.reload();
        }
      });
    }
  };

  onDesChange = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  render() {
    if (sessionStorage.getItem("role") !== "admin") {
      if(sessionStorage.getItem("role") === "user") {
        window.location.href ="/room";
      }
      window.location.href = "/";
    }
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
                <Table id="repairList" responsive>
                  <thead style={{ color: "blue" }}>
                    <tr>
                      <td>Ngày</td>
                      <td>Nội dung</td>
                      <td>Trạng thái</td>
                      <td></td>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.repairs.map((repair) => (
                      <tr v-for="item in tableItems" key={repair.id}>
                        <td>{moment(repair.date).format("DD-MM-YYYY")}</td>
                        <td>{repair.description}</td>
                        <td>{repair.status}</td>
                        <td style={{ float: "right" }}>
                          <Button
                            style={{ border: "none" }}
                            variant="outline-danger"
                            onClick={(e) => this.deleteRepair(repair.id_Number)}
                          >
                            <FaTrashAlt />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Row
                  md={6}
                  sm={1}
                  className="text-center"
                  style={{ marginTop: "2rem" }}
                >
                  <Col md={8} sm={1}>
                    <FormControl
                      type="text"
                      value={this.state.description}
                      onChange={this.onDesChange}
                    ></FormControl>
                  </Col>
                  <Col md={4} sm={1}>
                    <Button
                      style={{ border: "none" }}
                      variant="outline-primary"
                      onClick={(e) => this.handleSubmmit()}
                    >
                      <FaPlus /> Thêm yêu cầu sửa chữa
                    </Button>
                  </Col>
                </Row>
              </div>
            </CSSTransition>
          </TransitionGroup>
        </Fragment>
      </>
    );
  }
}

export default Repairs;
