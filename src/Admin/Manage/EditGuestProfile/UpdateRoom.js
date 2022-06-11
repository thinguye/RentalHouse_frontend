import React, { Component, Fragment, useState } from 'react';
import { Button, Table, Form, Modal } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import instance from '../../../api/axiosClient';
import {
    FormGroup, Label, Input
} from 'reactstrap';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
import { withRouter } from "react-router";
import { Link, Redirect } from 'react-router-dom';
import moment from 'moment';
import $ from 'jquery';
import { number } from 'prop-types';


class UpdateRoom extends Component {
    state = {
        id: 0,
        roomId: 1,
        name: '',
        oldRoom: 0,
        rooms: [],
        show: false
    }
    componentDidMount() {
        const id = sessionStorage.getItem("guestId");
        console.log(id);
        instance.get(`api/Customer/${id}`)
            .then(res => {
                const guest = res.data;
                const oldRoom = guest.room;
                const name = guest.name;
                console.log(res.data);
                this.setState({ id, name, oldRoom });
            })
            .catch(error => console.log(error));
        instance.get(`api/Room`)
            .then(res => {
                const rooms = res.data;
                this.setState({ rooms });
                console.log(rooms);
            })
            .catch(error => console.log(error));
    }

    onRoomChange = (e) => {
        console.log(e.target.value);
        this.setState({
            roomId: e.target.value
        });
        console.log(this.state.roomId);
    };

    handleSubmit = () => {
        instance
            .put(`api/Customer/${this.state.id}?roomId=${this.state.roomId}`)
            .then(res => {
                console.log(res);
                if (res) {
                    this.setState({ show: false });
                    window.location.reload()
                }
            })
            .catch(err => console.log(err));
        console.log(this.state.id + " " + this.state.roomId);
    };

    handleShow = () => {
        this.setState({
            show: true
        })
    }

    handleClose = () => {
        this.setState({
            show: false
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
                        <div style={{ padding: '2vh' }}>
                            <Form>
                                <Form.Group>
                                    <Label for='oldRoom'>Phòng cũ</Label>
                                    <Input type='text' name='oldRoom' placeholder={this.state.oldRoom == -1 ? "Không" : this.state.oldRoom} disabled />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label for="roomNew">Phòng mới</Form.Label>
                                    <Form.Select
                                        id="roomNew"
                                        value={this.state.roomId}
                                        onChange={this.onRoomChange}
                                    >
                                        {this.state.rooms.map((room) => (
                                            <option key={room.id} value={room.id}>Phòng {room.name}{'    '}{room.state}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <div style={{ marginTop: '2rem' }} className='text-center'>
                                    <Button onClick={(e) => this.handleShow()} color="primary">Đổi phòng</Button>
                                </div>
                            </Form>
                            <Modal
                                show={this.state.show}
                                onHide={(e) => this.handleClose()}
                                backdrop="static"
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>Xác nhận</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    Bạn muốn đổi {this.state.name} sang phòng {this.state.roomId}?
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="success" onClick={(e) => this.handleSubmit()}>
                                        Xác nhận
                                    </Button>
                                    <Button variant="secondary" onClick={(e) => this.handleClose()}>Đóng</Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </CSSTransition>
                </TransitionGroup>
            </Fragment>
        );
    }
};

export default UpdateRoom;


