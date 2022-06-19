import React, { Component, Fragment } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import instance from "../../../api/axiosClient";
import { Redirect } from "react-router-dom";
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
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  Legend,
  XAxis,
  CartesianGrid,
  YAxis,
  PieChart,
  Pie,
  Cell,
  Sector,
} from "recharts";

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(value)}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};


export default class AnalyticsDashboard1 extends Component {
  constructor() {
    super();

    this.state = {
      dropdownOpen: false,
      activeTab1: "11",
      data: [],
      data2: [],
      id: 2022,
      yearlyProfit: 0,
      room: 0,
      currentGuest: 0,
      booking: 0,
      repair: 0,
      colors: ["#82ca9d", "#FF8C00", "#8884d8"],
      activeIndex: 0,
    };
  }

  componentDidMount() {
    if (sessionStorage.getItem("role") !== "admin") {
      window.location.href = "/";
    }
    instance.get(`api/Bill/Profit?year=${this.state.id}`).then((res) => {
      if (res) {
        const tempData = res.data;
        const yearlyProfit = Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(tempData[tempData.length - 1]);
        const id = tempData[0];
        const data = [];
        var sumElectric = 0;
        var sumWater = 0;
        for (let i = 1; i < tempData.length - 3; i += 3) {
          if (tempData[i] !== 0) {
            data[(i - 1) / 3] = {
              name: (i - 1) / 3 + 1,
              "Doanh thu": tempData[i],
              Điện: tempData[i + 1],
              Nước: tempData[i + 2],
            };
            sumElectric += tempData[i + 1];
            sumWater += tempData[i + 2];
          } else {
            break;
          }
        }
        const data2 = [
          {
            name: "Lợi nhuận",
            value: tempData[tempData.length - 1] - (sumElectric + sumWater),
          },
          { name: "Điện", value: sumElectric },
          { name: "Nước", value: sumWater },
        ];
        this.setState({ data, data2, id, yearlyProfit });
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
        }).format(tempData[tempData.length - 1]);
        const id = tempData[0];
        const data = [];
        var sumElectric = 0;
        var sumWater = 0;
        for (let i = 1; i < tempData.length - 3; i += 3) {
          if (tempData[i] !== 0) {
            data[(i - 1) / 3] = {
              name: (i - 1) / 3 + 1,
              "Doanh thu": tempData[i],
              Điện: tempData[i + 1],
              Nước: tempData[i + 2],
            };
            sumElectric += tempData[i + 1];
            sumWater += tempData[i + 2];
          } else {
            break;
          }
        }
        const data2 = [
          {
            name: "Lợi nhuận",
            value: tempData[tempData.length - 1] - (sumElectric + sumWater),
          },
          { name: "Điện", value: sumElectric },
          { name: "Nước", value: sumWater },
        ];
        this.setState({ data, data2, id, yearlyProfit });
      }
    });
  };

  onPieEnter = (_, index) => {
    this.setState({
      activeIndex: index,
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
                          <Row>
                            <Col md={6}>
                              <ResponsiveContainer height={400}>
                                <LineChart
                                  data={this.state.data}
                                  margin={{
                                    top: 5,
                                    right: 10,
                                    left: 10,
                                    bottom: 5,
                                  }}
                                >
                                  <Tooltip />
                                  <XAxis dataKey="name" />
                                  <YAxis />
                                  <CartesianGrid
                                    stroke="#eee"
                                    strokeDasharray="5 5"
                                  />
                                  <Legend />
                                  <Line
                                    type="monotone"
                                    dataKey="Doanh thu"
                                    stroke="#82ca9d"
                                  />
                                  <Line
                                    type="monotone"
                                    dataKey="Điện"
                                    stroke="#FF8C00"
                                  />

                                  <Line
                                    type="monotone"
                                    dataKey="Nước"
                                    stroke="#8884d8"
                                  />
                                </LineChart>
                              </ResponsiveContainer>
                            </Col>
                            <Col md={6}>
                              <ResponsiveContainer width="100%" height="100%">
                                <PieChart width={400} height={400}>
                                  <Legend />
                                  <Pie
                                    activeIndex={this.state.activeIndex}
                                    activeShape={renderActiveShape}
                                    data={this.state.data2}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#82ca9d"
                                    dataKey="value"
                                    onMouseEnter={this.onPieEnter}
                                  >
                                    {this.state.data2.map((entry, index) => (
                                      <Cell
                                        key={`cell-${index}`}
                                        fill={
                                          this.state.colors[
                                            index % this.state.colors.length
                                          ]
                                        }
                                      />
                                    ))}
                                  </Pie>
                                </PieChart>
                              </ResponsiveContainer>
                            </Col>
                          </Row>
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
                      <div className="widget-numbers">{this.state.booking}</div>
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
                      <div className="widget-numbers">{this.state.repair}</div>
                      <div className="widget-subheading">Tổng lần sửa chữa</div>
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
