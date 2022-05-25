import React, { Component, Fragment } from 'react';
import { Button, Table } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import axios from 'axios'
import { API_BASE_URL } from '../../../../../api/axiosClient';
import {
    Col, Row, Form, FormGroup, Label, Input
} from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';

class GuestDetail extends Component {

    state = {
        name: '',
        id_Number: '',
        doB: '',
        hometown: '',
        initial_Address: '',
        job: '',
        nationality: '',
        company: '',
        phone: '',
        room: this.props.match.params.id,
        startDate: '',
        endDate: ''
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
    };

    onStartDateChange = e => {
        this.setState({
            startDate: e.target.value,
            endDate: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const data = {
            name: this.state.name,
            id_Number: this.state.id_Number,
            doB: this.state.doB,
            hometown: this.state.hometown,
            initial_Address: this.state.initial_Address,
            job: this.state.job,
            nationality: this.state.nationality,
            company: this.state.company,
            phone: this.state.phone,
            room: this.state.room,
        };
        axios
            .post(API_BASE_URL + '/Customer', data)
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
                        <Form>
                            <FormGroup>
                                <Label for="name">Họ và tên</Label>
                                <Input type="text" name="name" id="name"
                                    placeholder="Nhập tiếng Việt có dấu" value={this.state.name}
                                    onChange={this.onNameChange} required />
                            </FormGroup>
                            <FormGroup>
                                <Label for="id">Số CMND/CCCD</Label>
                                <Input type="text" name="id" id="id"
                                    value={this.state.id_Number}
                                    onChange={this.onIdNumberChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="phone">Số điện thoại</Label>
                                <Input type="tel" name="phone" id="phone"
                                    value={this.state.phone}
                                    onChange={this.onPhoneChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="doB">Ngày sinh</Label>
                                <Input type="date" name="doB" id="doB"
                                    value={this.state.doB}
                                    onChange={this.onDoBChange} required />
                            </FormGroup>
                            <FormGroup>
                                <Label for="job">Nghề nghiệp</Label>
                                <Input type="text" name="job" id="job"
                                    placeholder="Nhập tiếng Việt có dấu" value={this.state.job}
                                    onChange={this.onJobChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="company">Nơi làm việc</Label>
                                <Input type="text" name="company" id="company"
                                    placeholder="Nhập tiếng Việt có dấu" value={this.state.company}
                                    onChange={this.onCompanyChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="nationality">Quốc tịch</Label>
                                <Input type="text" name="nationality" id="nationality"
                                    placeholder="Nhập tiếng Việt có dấu" value={this.state.nationality}
                                    onChange={this.onNationalityChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="room">Phòng</Label>
                                <Input type="text" name="room" id="room"
                                    placeholder="Nhập tiếng Việt có dấu" value={this.state.room}
                                    disabled/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="hometown">Quê quán</Label>
                                <Input type="text" name="hometown" id="hometown"
                                    placeholder="Nhập tiếng Việt có dấu" value={this.state.hometown}
                                    onChange={this.onHometownChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="address">Nơi đăng kí HKTT</Label>
                                <Input type="text" name="address" id="address"
                                    placeholder="Nhập tiếng Việt có dấu" value={this.state.initial_Address} onChange={this.onAddressChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="doB">Ngày đến</Label>
                                <Input type="date" name="doB" id="doB"
                                    value={this.state.startDate}
                                    onChange={this.onStartDateChange} required />
                            </FormGroup>
                            <Link to={`room/${this.props.match.params}`}>
                                <Button onClick={this.handleSubmit} type="submit" color="primary">Thêm</Button>
                            </Link>
                        </Form>
                    </CSSTransition>
                </TransitionGroup>
            </Fragment>
        );
    }
};

export default withRouter(GuestDetail);