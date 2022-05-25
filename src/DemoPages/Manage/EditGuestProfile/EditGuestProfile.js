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


class EditGuestProfile extends Component {

    state = {
        rooms: [],
        id: '',
        name: '',
        id_Number: '',
        doB: '',
        phone: '',
        initial_Address: '',
        hometown: '',
        job: '',
        company: '',
        startDate: '',
        endDate: '',
        room: 0,
        nationality: '',
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get(API_BASE_URL + `/Customer/${id}`)
            .then(res => {
                const guest = res.data;
                const name = guest.name;
                const id_Number = guest.id_Number;
                const doB = moment(guest.doB).format('YYYY-MM-DD');
                const phone = guest.phone;
                const initial_Address = guest.initial_Address;
                const hometown = guest.hometown;
                const job = guest.job;
                const company = guest.company;
                const startDate = moment(guest.startDate).format('YYYY-MM-DD');
                const endDate = moment(guest.endDate).format('YYYY-MM-DD');
                const room = guest.room;
                const nationality = guest.nationality;
                this.setState({ id, name, id_Number, doB, phone, initial_Address, hometown, job, company, startDate, endDate, room, nationality });
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

    onNameChange = e => {
        this.setState({
            name: e.target.value
        });
    };

    onIdNumberChange = e => {
        this.setState({
            id_Number: e.target.value
        });
    };

    onPhoneChange = e => {
        this.setState({
            phone: e.target.value
        });
    };

    onDoBChange = e => {
        this.setState({
            doB: e.target.value
        });
        console.log(e.target.value);
    };

    onHometownChange = e => {
        this.setState({
            hometown: e.target.value
        });
    };

    onAddressChange = e => {
        this.setState({
            initial_Address: e.target.value
        });
    };

    onJobChange = e => {
        this.setState({
            job: e.target.value
        });
    };

    onCompanyChange = e => {
        this.setState({
            company: e.target.value
        });
    };

    onNationalityChange = e => {
        this.setState({
            nationality: e.target.value
        });
    };

    onRoomChange = e => {
        this.setState({
            room: e.target.value
        });
        console.log(e.target.value);
    };

    onStartDateChange = e => {
        this.setState({
            startDate: e.target.value
        });
        console.log(e.target.value);
    };

    onEndDateChange = e => {
        this.setState({
            endDate: e.target.value
        });
        console.log(e.target.value);
    };

    handleSubmit = e => {
        e.preventDefault();
        const data = {
            name: this.state.name,
            id_Number: this.state.id_Number,
            doB: moment(this.state.doB),
            hometown: this.state.hometown,
            initial_Address: this.state.initial_Address,
            job: this.state.job,
            nationality: this.state.nationality,
            company: this.state.company,
            phone: this.state.phone,
            room: this.state.room,
            startDate: moment(this.state.startDate),
            endDate: moment(this.state.endDate),
        };
        console.log(data);
        axios
            .put(API_BASE_URL + `/Customer/Edit/${this.state.id}`, data)
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
                                    <Label for="name">Họ và tên</Label>
                                    <Input type="text" name="name" id="name"
                                        placeholder="Nhập tiếng Việt có dấu" value={this.state.name} onChange={this.onNameChange}
                                        required />
                                </FormGroup>
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <Label for="doB">Ngày sinh</Label>
                                            <Input type="date" name="doB" id="doB"
                                                min="1900-01-01" max="2022-05-31" value={this.state.doB} onChange={this.onDoBChange}
                                                required />
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label for="id">Số CMND/CCCD</Label>
                                            <Input type="text" name="id" id="id"
                                                value={this.state.id_Number} onChange={this.onIdNumberChange}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label for="phone">Số điện thoại</Label>
                                            <Input type="text" name="phone" id="phone"
                                                value={this.state.phone} onChange={this.onPhoneChange}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label for="job">Nghề nghiệp</Label>
                                            <Input type="text" name="job" id="job"
                                                placeholder="Nhập tiếng Việt có dấu" value={this.state.job} onChange={this.onJobChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label for="company">Nơi làm việc</Label>
                                            <Input type="text" name="company" id="company"
                                                placeholder="Nhập tiếng Việt có dấu" value={this.state.company} onChange={this.onCompanyChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <FormGroup>
                                    <Label for="nationality">Quốc tịch</Label>
                                    <Input type="text" name="nationality" id="nationality"
                                        placeholder="Nhập tiếng Việt có dấu" value={this.state.nationality} onChange={this.onNationalityChange}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Phòng</Label>
                                    <Input type='select' value={this.state.room} disabled>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="hometown">Quê quán</Label>
                                    <Input type="text" name="hometown" id="hometown"
                                        placeholder="Nhập tiếng Việt có dấu" value={this.state.hometown} onChange={this.onHometownChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="address">Nơi đăng kí HKTT</Label>
                                    <Input type="text" name="address" id="address"
                                        placeholder="Nhập tiếng Việt có dấu" value={this.state.initial_Address} onChange={this.onAddressChange}
                                    />
                                </FormGroup>
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <Label for="startDate">Tạm trú từ ngày</Label>
                                            <Input type="date" name="startDate" id="startDate" value={this.state.startDate} onChange={this.onStartDateChange}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label for="endDate">Đến ngày</Label>
                                            <Input type="date" name="endDate" id="endDate" value={this.state.endDate} onChange={this.onEndDateChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <div className='text-center'>
                                    <Button onClick={this.handleSubmit} type="submit" color="primary">Lưu chỉnh sửa</Button>
                                </div>
                            </Form>
                        </div>
                    </CSSTransition>
                </TransitionGroup>
            </Fragment>
        );
    }
};

export default withRouter(EditGuestProfile);


