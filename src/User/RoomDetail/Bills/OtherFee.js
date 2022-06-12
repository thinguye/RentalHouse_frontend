import React, { Component, Fragment } from 'react';
import { Button, Table } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import instance from '../../../api/axiosClient';
import {
    Col, Row, Form, FormGroup, Label, Input
} from 'reactstrap';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import moment from 'moment';


class OtherFee extends Component {

    state = {
        areaID: 1,
        electricFee: 0,
        waterFee: 0,
        garbageFee: 0,
        wifiFee: 0,
        bonusPeopleFee: 0
    }

    componentDidMount() {
        instance.get(`api/OtherFee/1`)
            .then(res => {
                const otherFree = res.data;
                const areaID = otherFree.areaID;
                const electricFee = otherFree.electricFee;
                const waterFee = otherFree.waterFee;
                const garbageFee = otherFree.garbageFee;
                const wifiFee = otherFree.wifiFee;
                const bonusPeopleFee = otherFree.bonusPeopleFee;
                this.setState({ areaID, electricFee, waterFee, garbageFee, wifiFee, bonusPeopleFee });
            })
            .catch(error => console.log(error));
    }

    onElectricFeeChange = e => {
        this.setState({
            electricFee: e.target.value
        });
    };

    onWaterFeeChange = e => {
        this.setState({
            waterFee: e.target.value
        });
    };

    onWifiFeeChange = e => {
        this.setState({
            wifiFee: e.target.value
        });
    };

    onGarbageFeeChange = e => {
        this.setState({
            garbageFee: e.target.value
        });
    };

    onBonusPeopleChange = e => {
        this.setState({
            bonusPeopleFee: e.target.value
        });
    };



    handleSubmit = e => {
        const data = {
            areaID: this.state.areaID,
            electricFee: this.state.electricFee,
            waterFee: this.state.waterFee,
            garbageFee: this.state.garbageFee,
            wifiFee: this.state.wifiFee,
            bonusPeopleFee: this.state.bonusPeopleFee
        };
        instance
            .put(`api/OtherFee/1`, data)
            .then(res => console.log(res))
            .catch(err => console.log(err));
        console.log(this.state.areaID);
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
                        <div style={{ padding: '5vh' }}>
                            <Form>
                                <FormGroup>
                                    <Row>
                                        <Col><Label style={{color:'blue'}}>Giá điện</Label></Col>
                                        <Col><Input disabled value={this.state.electricFee} /></Col>
                                        <Col>VNĐ/kWh</Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup>
                                    <Row>
                                        <Col><Label style={{color:'blue'}}>Giá nước</Label></Col>
                                        <Col><Input disabled value={this.state.waterFee} /></Col>
                                        <Col>VNĐ/m<sup>3</sup></Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup>
                                    <Row>
                                        <Col><Label style={{color:'blue'}}>Tiền rác</Label></Col>
                                        <Col><Input disabled value={this.state.garbageFee} /></Col>
                                        <Col>VNĐ/phòng</Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup>
                                    <Row>
                                        <Col><Label style={{color:'blue'}}>Phí wi-fi</Label></Col>
                                        <Col><Input disabled value={this.state.wifiFee} /></Col>
                                        <Col>VNĐ/phòng</Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup>
                                    <Row>
                                        <Col><Label style={{color:'blue'}}>Thêm người(cho phòng từ 3 người trở lên)</Label></Col>
                                        <Col><Input disabled value={this.state.bonusPeopleFee} /></Col>
                                        <Col>VNĐ/người</Col>
                                    </Row>
                                </FormGroup>
                            </Form>
                        </div>
                    </CSSTransition>
                </TransitionGroup>
            </Fragment >
        );
    }
};

export default OtherFee;


