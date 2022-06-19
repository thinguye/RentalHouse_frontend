import React, { Component, Fragment } from 'react';
import { Button, Form} from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import instance from '../../../../api/axiosClient';
import {
    Row, FormGroup, Label, Input
} from 'reactstrap';
import {FaSave} from 'react-icons/fa'

export default class EditRoomProfile extends Component {

    state = {
        id: sessionStorage.getItem("roomId"),
        name: '',
        state: '',
        number_Of_People: 0,
        price: 0,
        description: '',
        date: new Date(),
    }

    componentDidMount() {
        if (sessionStorage.getItem("role") !== "admin") {
            window.location.href = "/";
          }
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
            .then((res) => {
                if (res){
                    window.location.href="/manage/rooms"
                }
            })
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
                                    <Label>Phòng</Label>
                                    <Input type="text"
                                        placeholder="Nhập số phòng" value={this.state.name} onChange={this.onNameChange}/>
                                </FormGroup>
                            </Row>
                            <FormGroup>
                                <Label>Giá phòng</Label>
                                <Input type="text"
                                    placeholder="Nhập giá phòng" value={this.state.price}
                                    onChange={this.onPriceChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Trạng thái</Label>
                                <Form.Control
                                    as="select"
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
                                <Label>Mô tả</Label>
                                <Form.Control as="textarea"
                                    placeholder="" value={this.state.description}
                                    onChange={this.onDescriptionChange} row={5}>
                                </Form.Control>
                            </FormGroup>
                            <div className='text-center'>
                                <Button onClick={(e)=>this.handleSubmit()} style={{border:"none"}} type="submit" variant="outline-primary"><FaSave/> Lưu chỉnh sửa</Button>
                            </div>
                        </Form>
                    </CSSTransition>
                </TransitionGroup>
            </Fragment>
        );
    }
};

