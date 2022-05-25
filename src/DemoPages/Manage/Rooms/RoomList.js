import React, { Component, Fragment } from 'react';
import { Button, ButtonGroup, Table } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import axios from 'axios';
import {
    Row, Col,
    Card, CardBody,
    CardTitle
} from 'reactstrap';
import { FaTrashAlt, FaPencilAlt, FaPlus, FaEye } from 'react-icons/fa';
import { Tab } from 'bootstrap';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../../../api/axiosClient';

import 'jquery/dist/jquery.min.js';

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.css";
import $ from 'jquery';

import 'bootstrap/dist/css/bootstrap.min.css';

// Create table headers consisting of 4 columns.


export default class RoomList extends Component {

    state = {
        rooms: [],
    }
    componentDidMount() {
        axios.get(API_BASE_URL + "/Room")
            .then(res => {
                const rooms = res.data;
                this.setState({ rooms });
            })
            .catch(error => console.log(error));
        $(document).ready(function () {
            setTimeout(function () {
                $('#example').dataTable();
            }, 1000);
        });
    }



    deleteRoom(id, e) {
        axios.delete(API_BASE_URL + `/Room/${id}`).then(res => {
            console.log(res);
            console.log(res.data);
            const rooms = this.state.rooms.filter(item => item.id != id);
            this.setState({ rooms });
        });
    };



    render() {

        function setDisabledButton(number) {
            if (number > 0) {
                return "disabled";
            }
            return "";
        }

        return (
            <>
                <Fragment>
                    <TransitionGroup>
                        <CSSTransition component="div" className="TabsAnimation"
                            appear={true} timeout={0} enter={false} exit={false}>
                            <div>
                                <Table id="example">
                                    <thead style={{ color: 'blue' }}>
                                        <tr>
                                            <td>Mã phòng</td>
                                            <td>Phòng</td>
                                            <td className='text-center'>Số khách trọ</td>
                                            <td>Giá tiền</td>
                                            <td>Trạng thái</td>
                                            <td></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.rooms.map((room) => (
                                            <tr v-for="item in tableItems" key={room.name}>
                                                <td>{room.id}</td>
                                                <td>{room.name}</td>
                                                <td className='text-center'>{room.number_Of_People}</td>
                                                <td>{room.price}</td>
                                                <td>{room.state}</td>
                                                <td>
                                                    <Row style={{ float: 'right' }}>
                                                        <Col>
                                                            <Link to={`room/details/${room.id}`}>
                                                                <Button style={{ border: 'none' }} variant="outline-info">
                                                                    <FaEye />
                                                                </Button>
                                                            </Link>
                                                        </Col>
                                                        <Col>
                                                            <Link to={`room/edit/${room.id}`}>
                                                                <Button style={{ border: 'none' }} variant="outline-primary">
                                                                    <FaPencilAlt />
                                                                </Button>
                                                            </Link>
                                                        </Col>
                                                        <Col>
                                                            <Button style={{ border: 'none' }} onClick={(e) => this.deleteRoom(room.id)} variant="outline-danger" className={setDisabledButton(room.number_Of_People)}>
                                                                <FaTrashAlt />
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </td>
                                            </tr>)
                                        )}
                                    </tbody>
                                </Table>
                                <div className='text-center'>
                                    <Link to="./add/room">
                                        <Button variant="outline-primary">
                                            <FaPlus /> Thêm phòng
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </CSSTransition>
                    </TransitionGroup>
                </Fragment>
            </>
        );
    }
};


