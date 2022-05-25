import React, { Component, Fragment } from 'react';
import { Button, Table } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import axios from 'axios'
import { API_BASE_URL } from '../../../api/axiosClient';
import { Row, Col } from 'reactstrap';
import { FaTrashAlt, FaEye, FaPlus } from 'react-icons/fa';
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import moment from 'moment';


class BillList extends Component {

    state = {
        bills: []
    }

    componentDidMount() {
        axios.get(API_BASE_URL + `/Bill`)
            .then(res => {
                const bills = res.data;
                this.setState({ bills });
            })
            .catch(error => console.log(error));
    }

    deleteBill(id, e) {
        axios.delete(API_BASE_URL + `/Bill/${id}`)
            .then(res => {
                console.log(res);
                console.log(res.data);
                const bills = this.state.bills.filter(item => item.id != id);
                this.setState({ bills });
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
                                            <td className='text-center' rowSpan={2}>Tiền điện</td>
                                            <td className='text-center' rowSpan={2}>Tiền nước</td>
                                            <td className='text-center' colSpan={2}>Các khoản khác</td>
                                            <th className='text-center' rowSpan={2}>Thành tiền</th>
                                            <th className='text-center' rowSpan={2}>Trạng thái</th>
                                            <td rowSpan={2}></td>
                                        </tr>
                                        <tr>
                                            <td className='text-center'>Internet</td>
                                            <td className='text-center'>Rác</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.bills.map((bill) => (
                                            <tr v-for="item in tableItems" key={bill.id}>
                                                <td>{bill.id}</td>
                                                <td>{moment(bill.time).format('DD-MM-YYYY')}</td>
                                                <td>{bill.price}</td>
                                                <td>{bill.electric_Fee}</td>
                                                <td>{bill.water_Fee}</td>
                                                <td>{bill.wifi_Fee}</td>
                                                <td>{bill.garbage_Fee}</td>
                                                <td>{bill.total}</td>
                                                <td>{bill.isPay}</td>
                                                <td className='right'>
                                                    <Row style={{ float: 'right' }}>
                                                        <Col>
                                                            <Button variant="outline-primary">
                                                                <FaEye />
                                                            </Button>
                                                        </Col>
                                                        <Col>
                                                            <Button variant="outline-danger" onClick={(e) => this.deleteBill(bill.id_Number)}>
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
            </>
        );
    }
};

export default withRouter(BillList);


