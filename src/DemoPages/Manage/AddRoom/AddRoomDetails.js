import React, { Component, Fragment } from 'react';
import { Button, Table } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import axios from 'axios'
import { API_BASE_URL } from '../../../api/axiosClient';
import {
    Col, Row, Form, FormGroup, Label, Input
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';

export default class AddRoomDetails extends Component {

    state = {
        name: '',
        state: 'Còn Trống',
        number_Of_People: 0,
        price: '',
        description: '',
        date: new Date()
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

    handleSubmit = e => {
        e.preventDefault();
        const data = {
            name: this.state.name,
            state: this.state.state,
            number_Of_People: this.state.number_Of_People,
            price: this.state.price,
            description: this.state.description,
            date: this.state.date
        };
        axios
            .post(API_BASE_URL + '/Room', data)
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
                            <Row>
                                <FormGroup>
                                    <Label for="name">Số phòng</Label>
                                    <Input type="text" name="name" id="name"
                                        placeholder="Nhập số phòng" value={this.state.name}
                                        onChange={this.onNameChange} required />
                                </FormGroup>
                            </Row>
                            <FormGroup>
                                <Label for="price">Giá phòng</Label>
                                <Input type="text" name="price" id="price"
                                    placeholder="Nhập giá phòng" value={this.state.price}
                                    onChange={this.onPriceChange} required />
                            </FormGroup>
                            <FormGroup>
                                <Label for="des">Mô tả</Label>
                                <textarea name="des" id="des"
                                    placeholder="Nhập số khách trong phòng" value={this.state.description}
                                    onChange={this.onDescriptionChange} />.
                            </FormGroup>
                            <Link to="../rooms">
                                <Button onClick={this.handleSubmit} type="submit" color="primary">Thêm</Button>
                            </Link>
                        </Form>
                    </CSSTransition>
                </TransitionGroup>
            </Fragment>
        );
    }
};
