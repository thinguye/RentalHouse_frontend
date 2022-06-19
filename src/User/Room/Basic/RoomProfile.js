import React, { Component, Fragment } from "react";
import { Button, Table } from "react-bootstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import instance from "../../../api/axiosClient";
import { Col, Row, Form, FormGroup, Label, Input } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";

class RoomProfile extends Component {
  state = {
    room: {},
    repair: 0,
  };

  componentDidMount() {
    instance
      .get(`api/Room/GetRoomById/${sessionStorage.getItem("roomId")}`)
      .then((res) => {
        const room = res.data;
        console.log(room);
        this.setState({ room });
      })
      .catch((error) => console.log(error));
    instance
      .get(`api/RequestRepair/RoomRepairs/${sessionStorage.getItem("roomId")}`)
      .then((res) => {
        const repairList = res.data;
        const repair = repairList.length;
        this.setState({ repair });
      });
  }

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
            <Row>
              <Col md="3">
                <div className="card mb-3 widget-chart">
                  <div className="widget-chart-content">
                    <div className="icon-wrapper rounded-circle">
                      <div className="icon-wrapper-bg bg-success" />
                      <i className="lnr-home text-success" />
                    </div>
                    <div className="widget-numbers" style={{fontSize:"120%"}}>{this.state.room.name}</div>
                    <div className="widget-subheading">Số phòng</div>
                  </div>
                </div>
              </Col>
              <Col md="3">
                <div className="card mb-3 widget-chart">
                  <div className="widget-chart-content">
                    <div className="icon-wrapper rounded-circle">
                      <div className="icon-wrapper-bg bg-primary" />
                      <i className="pe-7s-calculator text-primary" />
                    </div>
                    <div className="widget-numbers" style={{fontSize:"120%"}}>
                      {Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(this.state.room.price)}
                    </div>
                    <div className="widget-subheading">Giá phòng</div>
                  </div>
                </div>
              </Col>
              <Col md="3">
                <div className="card mb-3 widget-chart">
                  <div className="widget-chart-content">
                    <div className="icon-wrapper rounded-circle">
                      <div className="icon-wrapper-bg bg-info" />
                      <i className="lnr-users text-info" />
                    </div>
                    <div className="widget-numbers" style={{fontSize:"120%"}}>
                      {this.state.room.number_Of_People}
                    </div>
                    <div className="widget-subheading">Số khách</div>
                  </div>
                </div>
              </Col>
              <Col md="3">
                <div className="card mb-3 widget-chart">
                  <div className="widget-chart-content">
                    <div className="icon-wrapper rounded-circle">
                      <div className="icon-wrapper-bg bg-danger" />
                      <i className="lnr-cog text-danger" />
                    </div>
                    <div className="widget-numbers" style={{fontSize:"120%"}}>{this.state.repair}</div>
                    <div className="widget-subheading">Số lần sửa chữa</div>
                  </div>
                </div>
              </Col>
            </Row>
          </CSSTransition>
        </TransitionGroup>
      </Fragment>
    );
  }
}

export default RoomProfile;
