import React, { Component, Fragment } from 'react';
import { Button, ButtonGroup, FormControl, FormGroup, FormLabel, Modal, ModalBody, ModalHeader, ModalTitle, Table } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import {
    Row, Col,
    Card, CardBody,
    CardTitle
} from 'reactstrap';
import { FaTrashAlt, FaPencilAlt, FaPlus, FaEye } from 'react-icons/fa';
import { Tab } from 'bootstrap';
import { Link, withRouter } from 'react-router-dom';
import instance from '../../../api/axiosClient';
import moment from 'moment';

export default class RepairsList extends Component {

    state = {
        repairs: [],
        room: sessionStorage.getItem("roomId"),
        description: '',
    }

    componentDidMount() {
        instance.get(`api/RequestRepair/RoomRepairs/${sessionStorage.getItem("roomId")}`)
            .then(res => {
                const repairs = res.data;
                this.setState({ repairs });
            })
            .catch(error => console.log(error));
    }

    onDesChange = e => {
        this.setState({
            description: e.target.value
        })
        console.log(this.state.description);
    }

    handleSubmmit = () => {
        if (this.state.description !== "") {
            const data = {
                room: this.state.room,
                description: this.state.description,
                date: new Date(),
                status: 'Đang Đợi'
            }
            instance.post(`api/RequestRepair`, data)
                .then(res => {
                    if (res) {
                        window.location.reload()
                    }
                });
        }
    }

    render() {
        return (
            <>
                <Fragment>
                    <TransitionGroup>
                        <CSSTransition component="div" className="TabsAnimation"
                            appear={true} timeout={0} enter={false} exit={false}>
                            <div>
                                <Table>
                                    <thead style={{ color: 'blue' }}>
                                        <tr>
                                            <td>Ngày</td>
                                            <td>Nội dung</td>
                                            <td>Trạng thái</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.repairs.map((repair) => (
                                            <tr v-for="item in tableItems" key={repair.id}>
                                                <td>{moment(repair.date).format('DD-MM-YYYY')}</td>
                                                <td>{repair.description}</td>
                                                <td style={{color:(repair.status=="Đang Sửa Chữa"?"orange":(repair.status=="Đã Hoàn Thành"?"green":"dark"))}}>{repair.status}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                <Row md={6} sm={1} className='text-center' style={{ marginTop: '2rem' }}>
                                    <Col md={8} sm={1}>
                                        <FormControl type='text' value={this.state.description} onChange={this.onDesChange}>
                                        </FormControl>
                                    </Col>
                                    <Col md={4} sm={1}>
                                        <Button variant="outline-primary" onClick={(e) => this.handleSubmmit()}>
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
};




