import React, { Component, Fragment } from 'react';
import { Button, Table, Form} from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import instance from '../../../../api/axiosClient';
import {
    Col, Row, FormGroup, Label, Input
} from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
import { Redirect } from 'react-router-dom';

class EditRoomProfile extends Component {

    state = {
        id: sessionStorage.getItem("roomId"),
        name: '',
        state: '',
        number_Of_People: 0,
        price: 0,
        description: '',
        date: new Date(),
        redirect: false
    }

    componentDidMount() {
        instance.get(`api/Room/GetRoomById/${this.state.id}`)
            .then(res => {
                const room = res.data;
                const name = room.name;
                const state = room.state;
                const number_Of_People = room.number_Of_People;
                const price = room.price;
                const description = room.description;
                const date = room.date;
                this.setState({ name, state, number_Of_People, price, description, date });
            })
            .catch(error => console.log(error));

    }

    onNameChange = e => {
        this.setState({
            name: e.target.value
        });
    };

    onPriceChange = e => {
        this.setState({
            price: e.target.value
        });
    };

    onDescriptionChange = e => {
        this.setState({
            description: e.target.value
        });
    };

    onStateChange = e => {
        this.setState({
            state: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const data = {
            id: this.state.id,
            name: this.state.name,
            state: this.state.state,
            number_Of_People: this.state.number_Of_People,
            price: this.state.price,
            description: this.state.description,
            date: this.state.date
        };
        instance.put(`api/Room`, data)
            .then(res => console.log(res))
            .catch(err => console.log(err));
        this.setState({ redirect: true })
    };

    renderRedirect = () => {
        if (this.state.redirect == true) {
            return <Redirect to='/manage/rooms' />;
        }
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
                        <Form>
                            <Row>
                                <FormGroup>
                                    <Label for="name">Phòng</Label>
                                    <Input type="text" name="name" id="name"
                                        placeholder="Nhập số phòng" value={this.state.name} />
                                </FormGroup>
                            </Row>
                            <FormGroup>
                                <Label for="price">Giá phòng</Label>
                                <Input type="text" name="price" id="price"
                                    placeholder="Nhập giá phòng" value={this.state.price}
                                    onChange={this.onPriceChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="state">Trạng thái</Label>
                                <Form.Control
                                    as="select"
                                    id="state"
                                    value={this.state.state}
                                    onChange={this.onStateChange}
                                >
                                    <option value="Đã Cho Thuê">Đã Cho Thuê</option>
                                    <option value="Đã Đặt">Đã Đặt</option>
                                    <option value="Đang Sửa Chữa">Đang Sửa Chữa</option>
                                    <option value="Còn Trống">Còn Trống</option>
                                </Form.Control>
                            </FormGroup>
                            <FormGroup>
                                <Label for="des">Mô tả</Label>
                                <Form.Control as="textarea" id="des"
                                    placeholder="" value={this.state.description}
                                    onChange={this.onDescriptionChange} row={5}>
                                    </Form.Control>
                            </FormGroup>
                            <div>
                                {this.renderRedirect()}
                                <Button onClick={this.handleSubmit} type="submit" color="primary">Lưu chỉnh sửa</Button>
                            </div>
                        </Form>
                    </CSSTransition>
                </TransitionGroup>
            </Fragment>
        );
    }
};

export default withRouter(EditRoomProfile);
