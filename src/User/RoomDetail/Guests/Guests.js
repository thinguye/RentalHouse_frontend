import React, { Component, Fragment } from 'react';
import { Button, Table, Modal, ModalBody, ModalHeader, ModalFooter, ModalTitle, Form, FormGroup, FormControl } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import instance from '../../../api/axiosClient';
import { Row, Col, Label, Input } from 'reactstrap';
import { FaTrashAlt, FaPencilAlt, FaPlus } from 'react-icons/fa';
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import moment from 'moment';


class Guests extends Component {

    state = {
        guests: [],
        showEdit: false,
        showDelete: false,

        id: 0,
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
        room: sessionStorage.getItem("roomId"),
        nationality: '',
    }

    componentDidMount() {
        instance.get(`api/Customer/GetByRoom/${sessionStorage.getItem("roomId")}`)
            .then(res => {
                const guests = res.data;
                this.setState({ guests });
            })
            .catch(error => console.log(error));
    }


    handleShowEdit = (guestId) => {
        const id = guestId;
        instance.get(`api/Customer/${id}`)
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
                this.setState({id, name, id_Number, doB, phone, initial_Address, hometown, job, company, startDate, endDate, room, nationality });
            })
            .catch(error => console.log(error));
        this.setState({
            showEdit: true
        })
    }

    handleCloseEdit = () => {
        this.setState({
            showEdit: false
        })
    }

    handleSubmit = () => {
        const data = {
            id: this.state.id,
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
            startDate: this.state.startDate,
            endDate: this.state.endDate,
        };
        console.log(data);
        instance
            .put(`api/Customer/Edit/${this.state.id}`, data)
            .then(res => {
                if (res) {
                    this.setState({
                        showEdit: false
                    })
                }
            })
            .catch(err => console.log(err));
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
                                            <tr v-for="item in tableItems" key={guest.id}>
                                                <td>{guest.name}</td>
                                                <td>{guest.phone}</td>
                                                <td>{moment(guest.doB).format('DD-MM-YYYY')}</td>
                                                <td>{guest.id_Number}</td>
                                                <td className='right'>
                                                    <Row style={{ float: 'right' }}>
                                                        <Col>
                                                            <Button style={{border:'none'}} variant="outline-primary" onClick={(e) => this.handleShowEdit(guest.id)}>
                                                                <FaPencilAlt />
                                                            </Button>
                                                        </Col>
                                                        
                                                    </Row>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                <Modal size="lg"
                                    aria-labelledby="contained-modal-title-vcenter" show={this.state.showEdit} onHide={e => this.handleCloseEdit()} style={{ width: '100wh' }}>
                                    <ModalHeader closeButton>
                                        <ModalTitle id="contained-modal-title-vcenter">
                                        </ModalTitle>
                                    </ModalHeader>
                                    <ModalBody>
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
                                                            min="1900-01-01" value={this.state.doB} onChange={this.onDoBChange}
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
                                                <Label for='room'>Phòng</Label>
                                                <Input name='room' type="text" placeholder={this.state.room == -1 ? "Không" : this.state.room} disabled />
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
                                        </Form>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button onClick={(e) => this.handleSubmit()} type="submit" color="primary">Lưu chỉnh sửa</Button>
                                    </ModalFooter>
                                </Modal>
                            </div>
                        </CSSTransition>
                    </TransitionGroup>
                </Fragment>
            </>
        );
    }
};

export default Guests;


