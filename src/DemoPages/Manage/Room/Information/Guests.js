import React, { Component, Fragment } from 'react';
import { Button, Table } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import axios from 'axios'
import { API_BASE_URL } from '../../../../api/axiosClient';
import { Row, Col } from 'reactstrap';
import { FaTrashAlt, FaPencilAlt, FaPlus } from 'react-icons/fa';
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import moment from 'moment';


class Guests extends Component {

    state = {
        id: '',
        guests: []
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get(API_BASE_URL + `/Customer/api/Customer/GetByRoom/${id}`)
            .then(res => {
                const guests = res.data;
                this.setState({ id, guests });
            })
            .catch(error => console.log(error));
    }

    deleteGuest(id, e) {
        const room = 0;
        axios.put(API_BASE_URL + `/Customer/${id}`, id, room)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
            .catch(error => console.log(error));
    };

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
                                            <td>Họ và tên</td>
                                            <td>Số điện thoại</td>
                                            <td>Ngày sinh</td>
                                            <td>Số CMND/CCCD</td>
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
                                                <td className='right'>
                                                    <Row style={{ float: 'right' }}>
                                                        <Col>
                                                            <Link to={`../../guest/${guest.id_Number}`}>
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
                                    <tfoot>
                                        <tr>
                                            <td colSpan={5}>
                                                <div className='text-center'>
                                                    <Link to={`../add/guest/${this.state.id}`}>
                                                        <Button variant="outline-primary">
                                                            <FaPlus /> Thêm phòng
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    </tfoot>
                                </Table>
                                <div>

                                </div>
                            </div>
                        </CSSTransition>
                    </TransitionGroup>
                </Fragment>
            </>
        );
    }
};

export default withRouter(Guests);


