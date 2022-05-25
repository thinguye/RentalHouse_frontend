import React, { Component, Fragment, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import axios from 'axios'
import { API_BASE_URL } from '../../../api/axiosClient';
import {
    Col, Row, FormGroup, Label, Input, Form
} from 'reactstrap';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import moment from 'moment';
import $ from 'jquery';


class UpdateRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            room: 0,
            oldRoomName: '',
            rooms: [],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get(API_BASE_URL + `/Customer/${id}`)
            .then(res => {
                const guest = res.data;
                const room = guest.room;
                axios.get(API_BASE_URL + `/Room/${room}`, room)
                    .then(res => {
                        const dt = res.data;
                        const oldRoomName = dt.name;
                        this.setState({ id, room, oldRoomName });
                        console.log(id);
                        console.log(oldRoomName);
                        console.log(room);
                    })
                    .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
        axios.get(API_BASE_URL + `/Room`)
            .then(res => {
                const rooms = res.data;
                this.setState({ rooms });
                console.log(rooms);
            })
            .catch(error => console.log(error));
    }
    onRoomChange = e => {
        this.setState({
            room: e.target.value
        });
        console.log(this.state.room);
    };


    handleSubmit = e => {
        e.preventDefault();
        axios
            .put(API_BASE_URL + `/Customer/${this.state.id}`, this.state.id, this.state.room)
            .then(res => console.log(res))
            .catch(err => console.log(err));
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
                        <div style={{ padding: '2vh' }}>
                            <Form>
                                <FormGroup>
                                    <Label>Phòng cũ</Label>
                                    <Input type='text' value={this.state.oldRoomName} disabled>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="room">Phòng mới</Label>
                                    <select name='room' id='room' onChange={this.onRoomChange}>
                                        {this.state.rooms.map((room) => (
                                            <option value={room.id}>{room.name}</option>
                                        ))}
                                    </select>
                                </FormGroup>
                                <div className='text-center'>
                                    <Button onClick={this.handleSubmit} type="submit" color="primary">Đổi phòng</Button>
                                </div>
                            </Form>
                        </div>
                    </CSSTransition>
                </TransitionGroup>
            </Fragment>
        );
    }
};

export default withRouter(UpdateRoom);


