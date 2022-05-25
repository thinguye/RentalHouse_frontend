import React, { Component, Fragment } from 'react';
import { Button, Table } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import axios from 'axios'
import { API_BASE_URL } from '../../../api/axiosClient';
import { Row, Col } from 'reactstrap';
import { FaTrashAlt, FaPencilAlt, FaPlus } from 'react-icons/fa';
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import moment from 'moment';


class BookingList extends Component {

    state = {
        bookings: []
    }

    componentDidMount() {
        axios.get(API_BASE_URL + `/Bill`)
            .then(res => {
                const bookings = res.data;
                console.log(res);
                console.log(res.data);
                this.setState({ bookings });
            })
            .catch(error => console.log(error));
    }

    deleteBooking(id, e) {
        axios.delete(API_BASE_URL + `/Booking/${id}`)
            .then(res => {
                console.log(res);
                console.log(res.data);
                const bookings = this.state.bookings.filter(item => item.id != id);
                this.setState({ bookings });
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
                                <Table bordered style={{ borderColor: 'gray' }}>
                                    <thead style={{ color: 'blue' }}>
                                        <tr>
                                            <th className='text-center' rowSpan={2}>Mã hóa đơn</th>
                                            <td className='text-center' rowSpan={2}>Ngày</td>
                                            <td className='text-center' rowSpan={2}>Tiền phòng</td>
                                            <td className='text-center' colSpan={2}>Điện</td>
                                            <td className='text-center' colSpan={2}>Nước</td>
                                            <td className='text-center' colSpan={2}>Các khoản khác</td>
                                            <th className='text-center' rowSpan={2}>Thành tiền</th>
                                            <th className='text-center' rowSpan={2}>Trạng thái</th>
                                        </tr>
                                        <tr>
                                            <td className='text-center'>Điện tiêu thụ</td>
                                            <td className='text-center'>Tổng tiền điện</td>
                                            <td className='text-center'>Nước tiêu thụ</td>
                                            <td className='text-center'>Tổng tiền nước</td>
                                            <td className='text-center'>Internet</td>
                                            <td className='text-center'>Rác</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.bookings.map((booking) => (
                                            <tr v-for="item in tableItems" key={booking.id}>
                                                <td>{booking.id}</td>
                                                <td>{moment(booking.time).format('DD-MM-YYYY')}</td>
                                                <td>{booking.price}</td>
                                                <td>{booking.electric_Num}</td>
                                                <td>{booking.electric_Fee}</td>
                                                <td>{booking.water_Num}</td>
                                                <td>{booking.water_Fee}</td>
                                                <td>{booking.wifi_Fee}</td>
                                                <td>{booking.garbage_Fee}</td>
                                                <td>{booking.total}</td>
                                                <td>{booking.isPay}</td>
                                                <td className='right'>
                                                    <Row style={{ float: 'right' }}>
                                                        <Col>
                                                            <Button variant="outline-primary">
                                                                <FaPencilAlt />
                                                            </Button>
                                                        </Col>
                                                        <Col>
                                                            <Button variant="outline-danger" onClick={(e) => this.deleteBooking(booking.id)}>
                                                                <FaTrashAlt />
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot style={{ borderColor: 'transparent' }}>
                                        <tr>
                                            <td colSpan={12}>
                                                <div className='text-center'>
                                                    <Link to={`../add/guest/${this.state.id}`}>
                                                        <Button variant="outline-primary">
                                                            <FaPlus /> Thêm hóa đơn
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    </tfoot>
                                </Table>
                            </div>
                        </CSSTransition>
                    </TransitionGroup>
                </Fragment>
            </>
        );
    }
};

export default withRouter(BookingList);


