import React, { Component, Fragment } from 'react';
import { Button, ButtonGroup, Table } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import {
    Row, Col,
    Card, CardBody,
    CardTitle
} from 'reactstrap';
import { FaTrashAlt, FaPencilAlt, FaPlus } from 'react-icons/fa';
import { Tab } from 'bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { API_BASE_URL } from '../../../../api/axiosClient';
import axios from 'axios';

class Bills extends Component {

    state = {
        id: '',
        bills: []
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get(API_BASE_URL + `/Bill/api/Bill/GetByRoom/${id}`)
            .then(res => {
                const bills = res.data;
                this.setState({ id, bills });
                console.log(id);
            })
            .catch(error => console.log(error));
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
                                    <thead>
                                        <tr>
                                            <td>Phòng</td>
                                            <td>Số khách trọ</td>
                                            <td>Giá tiền</td>
                                            <td>Trạng thái</td>
                                            <td></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td className='right'>
                                                <Row style={{ width: '50%', float: 'right' }}>
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
                                    </tbody>
                                </Table>
                                <div className='text-center'>
                                    <Link to={`../add/bill/${this.state.id}`}>
                                        <Button variant="outline-primary">
                                            <FaPlus /> Thêm hóa đơn
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

export default withRouter(Bills);


