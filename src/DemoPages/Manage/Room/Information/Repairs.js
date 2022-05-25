import React, { Component, Fragment } from 'react';
import { Button, ButtonGroup, Table } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import {
    Row, Col,
    Card, CardBody,
    CardTitle
} from 'reactstrap';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
import { Tab } from 'bootstrap';


export default class Repairs extends Component {

    state = {
        expLeft: false,
        expRight: false,
        expUp: false,
        expDown: false,
        expContract: false,
        expOverlay: false,
        expSlideLeft: false,
        expSlideRight: false,
        expSlideUp: false,
        expSlideDown: false,
        expZoomIn: false,
        expZoomOut: false,
    }

    constructor(props) {
        super(props);

        this.state = {
            cSelected: [],
        };

        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
        this.onCheckboxBtnClick = this.onCheckboxBtnClick.bind(this);
    }

    toggle(name) {
        this.setState({
            [name]: !this.state[name],
            progress: 0.5,
        })
    }

    onRadioBtnClick(rSelected) {
        this.setState({ rSelected });
    }

    onCheckboxBtnClick(selected) {
        const index = this.state.cSelected.indexOf(selected);
        if (index < 0) {
            this.state.cSelected.push(selected);
        } else {
            this.state.cSelected.splice(index, 1);
        }
        this.setState({ cSelected: [...this.state.cSelected] });
    }

    render() {
        return (
            <>
                <Fragment>
                    <TransitionGroup>
                        <CSSTransition component="div" className="TabsAnimation"
                            appear={true} timeout={0} enter={false} exit={false}>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Phòng</th>
                                        <th>Số khách trọ</th>
                                        <th>Giá tiền</th>
                                        <th>Trạng thái</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td className='right'>
                                            <Row style={{ width: '50%', float: 'right' }}>
                                                <Col>
                                                    <Button variant="outline-primary">
                                                        <FaPencilAlt />
                                                    </Button>
                                                </Col>
                                                <Col>
                                                    <Button variant="outline-danger">
                                                        <FaTrashAlt />
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </CSSTransition>
                    </TransitionGroup>
                </Fragment>
            </>
        );
    }
};


