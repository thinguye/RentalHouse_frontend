import React, { Component, Fragment } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import instance from "../../../../api/axiosClient";
import { Row, Col, Input, Label, FormGroup } from "reactstrap";
import { FaTrashAlt, FaPencilAlt, FaPlus } from "react-icons/fa";
import { withRouter } from "react-router";
import { Redirect } from "react-router-dom";
import moment from "moment";
import { Moment } from "moment";
import "jquery/dist/jquery.min.js";

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.css";
import $ from "jquery";

class Guests extends Component {
  state = {
    idRoom: sessionStorage.getItem("roomId"),
    allGuests: [],
    guests: [],
    redirectEditGuest: false,
    redirectAddGuest: false,
    showDelete: false,
    name: "",
    id: "",
    showAdd: false,
    disableButton: "disabled",

    id_Number: "",
    doB: "",
    hometown: "",
    initial_Address: "",
    job: "",
    nationality: "",
    company: "",
    phone: "",
    room: sessionStorage.getItem("roomId"),
    startDate: "",
    endDate: "",
  };

  onNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  onIdNumberChange = (e) => {
    this.setState({
      id_Number: e.target.value,
    });
  };

  onPhoneChange = (e) => {
    this.setState({
      phone: e.target.value,
    });
  };

  onDoBChange = (e) => {
    this.setState({
      doB: e.target.value,
    });
  };

  onHometownChange = (e) => {
    this.setState({
      hometown: e.target.value,
    });
  };

  onAddressChange = (e) => {
    this.setState({
      initial_Address: e.target.value,
    });
  };

  onJobChange = (e) => {
    this.setState({
      job: e.target.value,
    });
  };

  onCompanyChange = (e) => {
    this.setState({
      company: e.target.value,
    });
  };

  onNationalityChange = (e) => {
    this.setState({
      nationality: e.target.value,
    });
  };

  onStartDateChange = (e) => {
    this.setState({
      startDate: e.target.value,
      endDate: e.target.value,
    });
  };

  handleSubmit = () => {
    const data = {
      name: this.state.name,
      id_Number: this.state.id_Number,
      doB: this.state.doB,
      hometown: this.state.hometown,
      initial_Address: this.state.initial_Address,
      job: this.state.job,
      nationality: this.state.nationality,
      company: this.state.company,
      phone: this.state.phone,
      room: this.state.room,
      startDate: this.state.startDate,
      endDate: new Date(),
    };
    instance
      .post("api/Customer", data)
      .then((res) => {
        console.log(res);
        this.setState({ showAdd: false });
        window.location.reload(false);
      })
      .catch((err) => console.log(err));
  };

  handleChange = () => {
    instance
      .put(`api/Customer/${this.state.id}?roomId=${this.state.idRoom}`)
      .then((res) => {
        console.log(res);
        if (res) {
          window.location.reload();
        }
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    instance
      .get(`api/Customer/GetByRoom/${this.state.idRoom}`)
      .then((res) => {
        const guests = res.data;
        this.setState({ guests });
      })
      .catch((error) => console.log(error));
    instance.get(`api/Customer/old+customers`).then((res) => {
      const allGuests = res.data;
      this.setState({
        allGuests,
      });
    });
    $(document).ready(function () {
      setTimeout(function () {
        $("#guestList").dataTable({
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
        });
      }, 100);
    });
  }

  deleteGuest = (id, e) => {
    const room = 0;
    instance
      .put(`api/Customer/${id}`, room)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        this.setState({ showDelete: false });
        window.location.reload(false);
      })
      .catch((error) => console.log(error));
  };

  setRedirectEditGuest = (id, e) => {
    sessionStorage.setItem("guestId", id);
    window.location.href = "/manage/guest";
  };

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

  handleShowAdd = () => {
    this.setState({
      showAdd: true,
    });
  };

  onGuestChange = (e) => {
    this.setState({
      id: e.target.value,
      disableButton: "",
    });
  };

  handleCloseAdd = () => {
    this.setState({
      showAdd: false,
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
                <Table id="guestList">
                  <thead style={{ color: "blue" }}>
                    <tr>
                      <td>Họ và tên</td>
                      <td>Số điện thoại</td>
                      <td>Ngày sinh</td>
                      <td>Số CMND/CCCD</td>
                      <td></td>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.guests.map((guest) => (
                      <tr v-for="item in tableItems" key={guest.id}>
                        <td>{guest.name}</td>
                        <td>{guest.phone}</td>
                        <td>{moment(guest.doB).format("DD-MM-YYYY")}</td>
                        <td>{guest.id_Number}</td>
                        <td className="right">
                          <Row style={{ float: "right" }}>
                            <Col>
                              <Button
                                onClick={(e) =>
                                  this.setRedirectEditGuest(guest.id)
                                }
                                variant="outline-primary"
                                style={{border:"none"}}
                              >
                                <FaPencilAlt />
                              </Button>
                            </Col>
                            <Col>
                              <Button
                              style={{border:"none"}}
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
                <Row md={3} sm={1} style={{marginTop:"1rem"}}>
                  <Col>
                    <Form.Control as="select" onChange={this.onGuestChange}>
                    <option value={""}>---</option>
                      {this.state.allGuests.map((guest) => (
                        <option value={guest.id}>{guest.name}</option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col>
                  <Button onClick={(e)=>this.handleChange()} className={this.state.disableButton}>
                      Thêm khách có sẵn
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      onClick={(e) => this.handleShowAdd()}
                      variant="outline-primary"
                    ><FaPlus /> Thêm khách mới</Button>
                  </Col>
                </Row>
                <Modal
                  show={this.state.showAdd}
                  onHide={(e) => this.handleCloseAdd()}
                  size="lg"
                >
                  <Modal.Body>
                    <Form style={{ color: "blueviolet" }}>
                      <Row>
                        <Col>
                          <FormGroup>
                            <Label for="name">Họ và tên</Label>
                            <Input
                              type="text"
                              name="name"
                              id="name"
                              placeholder="Nhập tiếng Việt có dấu"
                              value={this.state.name}
                              onChange={this.onNameChange}
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label for="phone">Số điện thoại</Label>
                            <Input
                              type="tel"
                              name="phone"
                              id="phone"
                              value={this.state.phone}
                              onChange={this.onPhoneChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label for="startDate">Ngày đến</Label>
                            <Input
                              type="date"
                              name="startDate"
                              id="startDate"
                              value={this.state.startDate}
                              onChange={this.onStartDateChange}
                              required
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                            <Label for="doB">Ngày sinh</Label>
                            <Input
                              type="date"
                              name="doB"
                              id="doB"
                              value={this.state.doB}
                              onChange={this.onDoBChange}
                              required
                              placeholder="dd-mm-yyyy"
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label for="nationality">Quốc tịch</Label>
                            <Input
                              type="text"
                              name="nationality"
                              id="nationality"
                              placeholder="Nhập tiếng Việt có dấu"
                              value={this.state.nationality}
                              onChange={this.onNationalityChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label for="id">Số CMND/CCCD</Label>
                            <Input
                              type="text"
                              name="id"
                              id="id"
                              value={this.state.id_Number}
                              onChange={this.onIdNumberChange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                            <Label for="job">Nghề nghiệp</Label>
                            <Input
                              type="text"
                              name="job"
                              id="job"
                              placeholder="Nhập tiếng Việt có dấu"
                              value={this.state.job}
                              onChange={this.onJobChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label for="company">Nơi làm việc</Label>
                            <Input
                              type="text"
                              name="company"
                              id="company"
                              placeholder="Nhập tiếng Việt có dấu"
                              value={this.state.company}
                              onChange={this.onCompanyChange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <FormGroup>
                        <Label for="hometown">Quê quán</Label>
                        <Input
                          type="text"
                          name="hometown"
                          id="hometown"
                          placeholder="Nhập tiếng Việt có dấu"
                          value={this.state.hometown}
                          onChange={this.onHometownChange}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="address">Nơi đăng kí HKTT</Label>
                        <Input
                          type="text"
                          name="address"
                          id="address"
                          placeholder="Nhập tiếng Việt có dấu"
                          value={this.state.initial_Address}
                          onChange={this.onAddressChange}
                        />
                      </FormGroup>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer
                    style={{
                      display: "block",
                      border: "none",
                      backgroundColor: "transparent",
                    }}
                  >
                    <div className="text-center">
                      <Button
                        style={{
                          marginRight: "40px",
                          borderColor: "transparent",
                        }}
                        onClick={(e) => this.handleSubmit()}
                        type="submit"
                        variant="outline-primary"
                      >
                        Thêm
                      </Button>
                      <Button
                        style={{ marginLeft: "40px", border: "none" }}
                        variant="outline-danger"
                        onClick={(e) => this.handleCloseAdd()}
                      >
                        Thoát
                      </Button>
                    </div>
                  </Modal.Footer>
                </Modal>
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
                    Bạn có muốn xóa {this.state.name} khỏi phòng{" "}
                    {this.state.idRoom}?
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
      </>
    );
  }
}

export default Guests;
