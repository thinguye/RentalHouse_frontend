import React, { Component, Fragment } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Table } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import instance from '../../../api/axiosClient';
import { Row, Col } from 'reactstrap';
import { FaTrashAlt, FaPencilAlt, FaPlus } from 'react-icons/fa';
import { Link, Redirect } from 'react-router-dom';
import moment from 'moment';
import {
    toast,
    Slide
} from 'react-toastify';

export default class NewGuests extends Component {
    state = {
        id: 0,
        guests: [],
        redirect: false,
        showDelete: false
    }

    componentDidMount() {
        instance.get(`api/Customer/current+customers`)
            .then(res => {
                const guests = res.data;
                this.setState({ guests });
            })
            .catch(error => console.log(error));
    }

    notify2 = () => this.toastId = toast("Đã xóa khách ra khỏi phòng!", {
        transition: Slide,
        closeButton: true,
        autoClose: 3000,
        position: 'bottom-center'
    });

    deleteGuest = () => {
        instance.put(`api/Customer/${this.state.id}`, this.state.id, -1).then(res => {
            if (res) {
                this.notify2()
                window.location.reload(false);
            }
        });
    };

    setRedirect = (id, e) => {
        sessionStorage.setItem("guestId", id);
        this.setState({
            redirect: true
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/manage/guest' />
        }
        return <Redirect to='/manage/guests' />
    }

    handleShowDelete = (guestId) => {
        this.setState({
            showDelete: true,
            id: guestId
        })
    }

    handleCloseDelete = () => {
        this.setState({
            showDelete: false
        })
    }

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
                                        <td>Phòng</td>
                                        <td>Tạm trú từ</td>
                                        <td></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.guests.map((guest) => (
                                        <tr v-for="item in tableItems" key={guest.id}>
                                            <td>{guest.name}</td>
                                            <td>{guest.phone}</td>
                                            <td>{moment(guest.doB).format('DD-MM-YYYY')}</td>
                                            <td>{guest.id_Number}</td>
                                            <td>{guest.room}</td>
                                            <td>{moment(guest.startDate).format('DD-MM-YYYY')}</td>
                                            <td>
                                                <Row>
                                                    <Col>
                                                        {this.renderRedirect()}
                                                        <Button style={{ border: 'none' }} variant="outline-primary" onClick={(e) => this.setRedirect(guest.id)}>
                                                            <FaPencilAlt />
                                                        </Button>
                                                    </Col>
                                                    <Col>
                                                        <Button style={{ border: 'none' }} variant="outline-danger" onClick={(e) => this.handleShowDelete(guest.id)}>
                                                            <FaTrashAlt />
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Modal show={this.state.showDelete} onHide={(e) => this.handleCloseDelete()}>
                                <ModalHeader closeButton>
                                        Xóa khách trọ
                                </ModalHeader>
                                <ModalBody>
                                    Bạn muốn xóa vị khách này ra khỏi phòng?
                                </ModalBody>
                                <ModalFooter>
                                    <Button onClick={(e) => this.deleteGuest()}>Có</Button>
                                    <Button onClick={(e) => this.handleCloseDelete()}>Không</Button>
                                </ModalFooter>
                            </Modal>
                        </div>
                    </CSSTransition>
                </TransitionGroup>
            </Fragment>
        );
    }
};
