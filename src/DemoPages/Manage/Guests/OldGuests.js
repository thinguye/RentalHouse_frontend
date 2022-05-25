import React, { Component, Fragment } from 'react';
import { Button, Table } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import axios from 'axios'
import { API_BASE_URL } from '../../../api/axiosClient';
import { Row, Col } from 'reactstrap';
import { FaTrashAlt, FaPencilAlt, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default class OldGuests extends Component {
    state = {
        guests: []
    }

    componentDidMount() {
        axios.get(API_BASE_URL + `/Customer/api/Customer/old+customers`)
            .then(res => {
                const guests = res.data;
                this.setState({ guests });
            })
            .catch(error => console.log(error));
    }

    deleteGuest(id, e) {
        axios.delete(API_BASE_URL + `/Customer/${id}`).then(res => {
            console.log(res);
            console.log(res.data);
            const guests = this.state.guests.filter(item => item.id_Number != id);
            this.setState({ guests });
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
                        exit={false}>
                        <div>
                            <Table>
                                <thead style={{ color: 'blue' }}>
                                    <tr>
                                        <td>Họ và tên</td>
                                        <td>Số điện thoại</td>
                                        <td>Ngày sinh</td>
                                        <td>Số CMND/CCCD</td>
                                        <td>Tạm trú từ</td>
                                        <td>Đến ngày</td>
                                        <td></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.guests.map((guest) => (
                                        <tr v-for="item in tableItems" key={guest.id_Number}>
                                            <td>{guest.name}</td>
                                            <td>{guest.phone}</td>
                                            <td>{moment(guest.doB).format('DD-MM-YYYY')}</td>
                                            <td>{guest.id_Number}</td>
                                            <td>{moment(guest.startDate).format('DD-MM-YYYY')}</td>
                                            <td>{moment(guest.endDate).format('DD-MM-YYYY')}</td>
                                            <td>
                                                <Row>
                                                    <Col>
                                                        <Link to={`guest/${guest.id_Number}`}>
                                                            <Button variant="outline-primary">
                                                                <FaPencilAlt />
                                                            </Button>
                                                        </Link>
                                                    </Col>
                                                    <Col>
                                                        <Button variant="outline-danger" onClick={(e) => this.deleteGuest(guest.id_Number)}>
                                                            <FaTrashAlt />
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </CSSTransition>
                </TransitionGroup>
            </Fragment>
        );
    }
};
