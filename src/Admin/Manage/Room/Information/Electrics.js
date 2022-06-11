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
import instance from '../../../../api/axiosClient';
import 'jquery/dist/jquery.min.js';

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.css";
import $ from 'jquery';
import moment from 'moment';

export default class Electrics extends Component {

    state = {
        electrics: []
    }

    componentDidMount() {
        instance.get(`api/Bill/room+electric/${sessionStorage.getItem("roomId")}`)
            .then(res => {
                if (res) {
                    const electrics = res.data;
                    this.setState({ electrics })
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
                                        <td>Giá điện</td>
                                        <td>Tổng tiền</td>
                                        <td></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.electrics.map((electric) => (
                                        <tr v-for="item in tableItems" key={electric.id}>
                                            <td>{electric.id}</td>
                                            <td>{moment(electric.electric_Date).format('DD-MM-YYYY')}</td>
                                            <td>{electric.old_Number}</td>
                                            <td>{electric.electric_Number}</td>
                                            <td>{electric.electric_Price}</td>
                                            <td>{electric.total}</td>
                                            <td className='right'>
                                                <Row style={{ float: 'right' }}>
                                                    <Col>
                                                        <Button variant="outline-primary">
                                                            <FaPencilAlt />
                                                        </Button>
                                                    </Col>
                                                    <Col>
                                                        <Button variant="outline-danger">
                                                            <FaTrashAlt />
                                                        </Button>
                                                    </Col>
                                                </Row>
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
};


