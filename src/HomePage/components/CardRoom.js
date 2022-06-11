import React from 'react'
import { Card, Button, Modal, Form, Row, Col, Container } from 'react-bootstrap'
import logo from './images/room-3.jpg'
import './CardRoom.css'
import { FaHome, FaDollarSign, FaCalendarCheck } from 'react-icons/fa'
import { FcMoneyTransfer, FcCheckmark } from 'react-icons/fc'
import instance from '../../api/axiosClient'
import room1 from './images/room-3.jpg'
import room2 from './images/room-4.jpg'
import slide1 from './images/slider1.jpg'
import slide2 from './images/slider2.jpg'

export default class CardRoom extends React.Component {
  state = {
    show: false,
    name: "",
    phone: "",
    note: "",
    room: "",
    status: false,
    createDate: "",
    rooms: [],
  }

  imageRoom = [room1, room2, slide1, slide2];

  componentDidMount() {
    instance.get(`api/Room`)
      .then(res => {
        const rooms = res.data;
        this.setState({ rooms });
      })
      .catch(error => console.log(error));
  }

  handleClose = (e) => {
    this.setState({
      show: false
    })
  }
  handleShow = (id) => {
    this.setState({
      show: true,
      room: id
    })
  }
  handleSubmit = (e) => {
    const data = {
      name: this.state.name,
      phone: this.state.phone,
      room: this.state.room,
      note: this.state.note,
      status: false,
      createDate: new Date()
    }
    instance.post(`api/Booking`, data)
      .then(res => {
        this.setState({
          show: false
        })
        window.location.reload()
      })
  }
  onNameChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }
  onPhoneChange = (e) => {
    this.setState({
      phone: e.target.value
    })
  }
  onNotesChange = (e) => {
    this.setState({
      note: e.target.value
    })
  }
  setDisabledButton(status) {
    if (status != "Còn Trống") {
      return "disabled"
    }
    return ""
  }
  setColor(status) {
    if (status == "Còn Trống") {
      return 'green'
    }
    return 'red'
  }
  render() {
    return (
      <Container fluid>
        <Row md={3} xs={1} className='g-4'>
          {this.state.rooms.map((room) => (
            <div className='room-content'>
              <Card style={{ width: '20rem', marginTop: '2.5rem', marginBottom: '2.5rem' }} key={room.id}>
                <Card.Img variant="top" src={this.imageRoom[room.id % this.imageRoom.length]} />
                <Card.Body>
                  <Card.Title><FaHome /> Phòng {room.name}</Card.Title>
                  <Card.Text>
                    <p><FcMoneyTransfer /> Giá: {room.price} VNĐ</p>
                    <p><FcCheckmark /> Trạng thái: <span style={{ color: this.setColor(room.state) }}>{room.state}</span></p></Card.Text>
                  <div className='text-center'>
                    <Button style={{ color: 'white' }} variant="success" className={this.setDisabledButton(room.state)} onClick={(e) => this.handleShow(room.id)}>
                      <b>Đặt Phòng</b>
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>

          ))}
        </Row>


        <Modal show={this.state.show} onHide={(e) => this.handleClose()}>
          <Modal.Header closeButton>
            <Modal.Title>Đặt Phòng</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Họ và Tên</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nguyễn Văn A"
                  autoFocus
                  name="name"
                  onChange={this.onNameChange}
                  value={this.state.name}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder=""
                  autoFocus
                  name="phone"
                  onChange={this.onPhoneChange}
                  value={this.state.phone}
                  required
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
              >
                <Form.Label>Ghi chú</Form.Label>
                <Form.Control as="textarea" rows={3}
                  name="notes"
                  onChange={this.onNotesChange}
                  value={this.state.note} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={(e) => this.handleClose()}>
              Thoát
            </Button>
            <Button variant="primary" onClick={(e) => this.handleSubmit()}>
              Xác nhận
            </Button>
          </Modal.Footer>
        </Modal>
      </Container >
    );
  }
}
