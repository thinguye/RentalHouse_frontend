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

class BillDetail extends Component {

    state = {
        roomName: '',
        room: 0,
        electric_num: 0,
        water_num: 0,
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        const room = id;
        const electric_num = 0;
        const water_num = 0;
        axios.get(API_BASE_URL + `/Room/${id}`)
            .then(res => {
                const data = res.data;
                const roomName = data.name;
                this.setState({
                    roomName, room, electric_num, water_num
                })
            })
            .catch(error => console.log(error));
    }

    onElectricChange = e => {
        this.setState({
            electric_num: e.target.value
        });
    };

    onWaterChange = e => {
        this.setState({
            water_num: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const room = this.state.room;
        const electric_num = this.state.electric_num;
        const water_num = this.state.water_num;
        axios
            .post(API_BASE_URL + `/Bill?roomId=${room}&electric_num=${electric_num}&water_num=${water_num}`)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    render() {
        return (
            <>
                <Fragment>
                    <TransitionGroup>
                        <CSSTransition component="div" className="TabsAnimation"
                            appear={true} timeout={0} enter={false} exit={false}>
                            <Form>
                                <Row>
                                    <FormGroup>
                                        <Label for="name">Số phòng</Label>
                                        <Input type="text" name="name" id="name" value={this.state.roomName} />
                                    </FormGroup>
                                </Row>
                                <FormGroup>
                                    <Label for="electric">Số điện</Label>
                                    <Input type="number" name="electric" id="electric" value={this.state.electric_num}
                                        onChange={this.onElectricChange} required />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="water">Số nước</Label>
                                    <Input type="number" name="water" id="water" value={this.state.water_num}
                                        onChange={this.onWaterChange} required />
                                </FormGroup>
                                <Link to="../rooms">
                                    <Button onClick={this.handleSubmit} type="submit" color="primary">Thêm</Button>
                                </Link>
                            </Form>
                        </CSSTransition>
                    </TransitionGroup>
                </Fragment>
            </>
        );
    }
};
export default withRouter(BillDetail);

