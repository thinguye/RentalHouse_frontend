import React, { Component, Fragment } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import instance from "../../../api/axiosClient";

import {
  Row,
  Col,
  CardHeader,
  Card,
  TabContent,
  TabPane,
  Input,
} from "reactstrap";

import PageTitle from "../../../Layout/AppMain/PageTitle";

import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

export default class AnalyticsDashboard1 extends Component {
  constructor() {
    super();

    this.state = {
      dropdownOpen: false,
      activeTab1: "11",
      data: [],
      id: 2022,
      yearlyProfit: 0,
      room: 0,
      currentGuest: 0,
      booking: 0,
      repair: 0,
    };
  }

  componentDidMount() {
    instance.get(`api/Bill/Profit?year=${this.state.id}`).then((res) => {
      if (res) {
        const tempData = res.data;
        const yearlyProfit = Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(tempData[13]);
        const id = tempData[0];
        const data = [];
        for (let i = 1; i < 13; i++) {
          data[i - 1] = { name: i, profit: tempData[i] };
        }
        this.setState({ data, id, yearlyProfit });
      }
    });
    instance
      .get("api/Room")
      .then((res) => this.setState({ room: res.data.length }));
    instance
      .get("api/Customer/current+customers")
      .then((res) => this.setState({ currentGuest: res.data.length }));
    instance
      .get("api/Booking")
      .then((res) => this.setState({ booking: res.data.length }));
    instance
      .get("api/RequestRepair")
      .then((res) => this.setState({ repair: res.data.length }));
  }
  handleChange = (e) => {
    instance.get(`api/Bill/Profit?year=${e.target.value}`).then((res) => {
      if (res) {
        const tempData = res.data;
        const yearlyProfit = Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(tempData[13]);
        const id = tempData[0];
        const data = [];
        for (let i = 1; i < 13; i++) {
          data[i - 1] = { name: i, profit: tempData[i] };
        }
        this.setState({ data, id, yearlyProfit });
      }
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
              <PageTitle
                heading="TRANG CHỦ"
                icon="pe-7s-rocket icon-gradient bg-mean-fruit"
              />
              <Row>
                <Col md="12" lg="12">
                  <Card className="mb-3">
                    <CardHeader className="card-header-tab">
                      <div className="card-header-title">
                        <i className="header-icon lnr-rocket icon-gradient bg-tempting-azure">
                          {" "}
                        </i>
                        Báo cáo doanh thu
                      </div>
                      <div className="btn-actions-pane-right">
                        <Input
                          style={{ border: "none" }}
                          type="select"
                          defaultValue={this.state.id}
                          onChange={this.handleChange}
                        >
                          <option value={2021}>2021</option>
                          <option value={2022}>2022</option>
                        </Input>
                      </div>
                    </CardHeader>
                    <TabContent activeTab={this.state.activeTab1}>
                      <TabPane tabId="11">
                        <h6
                          style={{ paddingTop: "1rem" }}
                          className="text-center"
                        >
                          Tổng doanh thu năm: {this.state.yearlyProfit}
                        </h6>
                        <div className="widget-chart p-0">
                          <ResponsiveContainer height={400}>
                            <AreaChart
                              data={this.state.data}
                              margin={{
                                top: 5,
                                right: 10,
                                left: 10,
                                bottom: 5,
                              }}
                            >
                              <defs>
                                <linearGradient
                                  id="colorPv2"
                                  x1="0"
                                  y1="0"
                                  x2="0"
                                  y2="1"
                                >
                                  <stop
                                    offset="10%"
                                    stopColor="blue"
                                    stopOpacity={0.7}
                                  />
                                  <stop
                                    offset="90%"
                                    stopColor="blue"
                                    stopOpacity={0}
                                  />
                                </linearGradient>
                              </defs>
                              <Tooltip />
                              <XAxis dataKey="name" stroke="blue" />
                              <Area
                                type="monotone"
                                dataKey="profit"
                                stroke="blue"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorPv2)"
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </TabPane>
                    </TabContent>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col md="3">
                  <div className="card mb-3 widget-chart">
                    <div className="widget-chart-content">
                      <div className="icon-wrapper rounded-circle">
                        <div className="icon-wrapper-bg bg-success" />
                        <i className="lnr-home text-success" />
                      </div>
                      <div className="widget-numbers">{this.state.room}</div>
                        <div className="widget-subheading">Tổng phòng</div>
                    </div>
                  </div>
                </Col>
                <Col md="3">
                  <div className="card mb-3 widget-chart">
                    <div className="widget-chart-content">
                      <div className="icon-wrapper rounded-circle">
                        <div className="icon-wrapper-bg bg-primary" />
                        <i className="lnr-users text-primary" />
                      </div>
                      <div className="widget-numbers">
                          {this.state.currentGuest}
                        </div>
                        <div className="widget-subheading">
                          Tổng khách hiện tại
                        </div>
                    </div>
                  </div>
                </Col>
                <Col md="3">
                  <div className="card mb-3 widget-chart">
                    <div className="widget-chart-content">
                      <div className="icon-wrapper rounded-circle">
                        <div className="icon-wrapper-bg bg-info" />
                        <i className="lnr-calendar-full text-info" />
                      </div>
                      <div className="widget-numbers">
                          {this.state.booking}
                        </div>
                        <div className="widget-subheading">
                          Tổng lượt đặt phòng
                        </div>
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
                      <div className="widget-numbers">
                            {this.state.repair}
                          </div>
                          <div className="widget-subheading">
                            Tổng lần sửa chữa
                          </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </Fragment>
    );
  }
}
