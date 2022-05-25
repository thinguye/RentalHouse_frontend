import React, { Component, Fragment } from 'react';
import { Button, Table } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import axios from 'axios'
import { API_BASE_URL } from '../../../../api/axiosClient';
import {
    Col, Row, Form, FormGroup, Label, Input
} from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';

class EditRoomProfile extends Component {

    state = {
        id: '',
        name: '',
        state: '',
        number_Of_People: 0,
        price: 0,
        description: '',
        date: new Date()
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get(API_BASE_URL + `/Room/${id}`)
            .then(res => {
                const room = res.data;
                const name = room.name;
                const state = room.state;
                const number_Of_People = room.number_Of_People;
                const price = room.price;
                const description = room.description;
                const date = room.date;
                this.setState({ id, name, state, number_Of_People, price, description, date });
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
        axios
            .post(API_BASE_URL + `/Room/${this.state.id}`, data)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    render() {

        const options = ['Còn Trống', 'Đã Cho Thuê', 'Đang Sửa Chữa', 'Đã Đặt Phòng']
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
                                        placeholder="Nhập số phòng" value={this.state.name}/>
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
                                <Input type="text" name="state" id="state"
                                    placeholder="Nhập giá phòng" value={this.state.state}
                                    onChange={this.onStateChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="des">Mô tả</Label>
                                <textarea name="des" id="des"
                                    placeholder="Nhập số khách trong phòng" value={this.state.description}
                                    onChange={this.onDescriptionChange} />.
                            </FormGroup>
                            <Link to="../rooms">
                                <Button onClick={this.handleSubmit} type="submit" color="primary">Lưu chỉnh sửa</Button>
                            </Link>
                        </Form>
                    </CSSTransition>
                </TransitionGroup>
            </Fragment>
        );
    }
};

export default withRouter(EditRoomProfile);
