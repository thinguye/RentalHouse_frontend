import React, { Component, Fragment } from 'react';
import { Button, ButtonGroup, Table } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import {
    Row, Col,
    Card, CardBody,
    CardTitle
} from 'reactstrap';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
import { Tab } from 'bootstrap';
import instance from '../../../api/axiosClient';
import 'jquery/dist/jquery.min.js';

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.css";
import $ from 'jquery';
import moment from 'moment';

export default class WaterBills extends Component {

    state = {
        waters: []
    }

    componentDidMount() {
        instance.get(`api/Bill/room+water/${sessionStorage.getItem("roomId")}`)
            .then(res => {
                if (res) {
                    const waters = res.data;
                    this.setState({ waters })
                }
            })
        $(document).ready(function () {
            setTimeout(function () {
                $('#example').dataTable();
            }, 1000);
        });
    }

    render() {
        return (
            <>
                <Fragment>
                    <TransitionGroup>
                        <CSSTransition component="div" className="TabsAnimation"
                            appear={true} timeout={0} enter={false} exit={false}>
                            <Table id="example">
                                <thead style={{ color: 'blue' }}>
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
                                            <td>{moment(water.water_Date).format('DD-MM-YYYY')}</td>
                                            <td>{water.old_Number}</td>
                                            <td>{water.water_Number}</td>
                                            <td>{water.water_Price}</td>
                                            <td>{water.total}</td>
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
};


