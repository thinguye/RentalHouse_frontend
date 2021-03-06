import React, { Component, Fragment } from "react";
import { Button, Form } from "react-bootstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import instance from "../../../../api/axiosClient";
import { Row, FormGroup, Label, Input } from "reactstrap";
import { FaSave } from "react-icons/fa";

export default class EditRoomProfile extends Component {
  state = {
    id: sessionStorage.getItem("roomId"),
    name: "",
    state: "",
    number_Of_People: 0,
    price: 0,
    description: "",
    date: new Date(),
  };

  componentDidMount() {
    instance
      .get(`api/Room/GetRoomById/${this.state.id}`)
      .then((res) => {
        const room = res.data;
        const name = room.name;
        const state = room.state;
        const number_Of_People = room.number_Of_People;
        const price = room.price;
        const description = room.description;
        const date = room.date;
        this.setState({
          name,
          state,
          number_Of_People,
          price,
          description,
          date,
        });
      })
      .catch((error) => console.log(error));
  }

  onNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  onPriceChange = (e) => {
    this.setState({
      price: e.target.value,
    });
  };

  onDescriptionChange = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  onStateChange = (e) => {
    this.setState({
      state: e.target.value,
    });
  };

  handleSubmit = (e) => {
    const data = {
      id: this.state.id,
      name: this.state.name,
      state: this.state.state,
      number_Of_People: this.state.number_Of_People,
      price: this.state.price,
      description: this.state.description,
      date: this.state.date,
    };
    instance
      .put(`api/Room`, data)
      .then((res) => {
        if (res) {
          window.location.href = "/manage/rooms";
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    if (sessionStorage.getItem("role") !== "admin") {
      if (sessionStorage.getItem("role") === "user") {
        window.location.href = "/room";
      }
      window.location.href = "/";
    }
    return (
      <Fragment>
        <TransitionGroup>
          <CSSTransition
            component="div"
            className="TabsAnimation"
            appear={true}
            timeout={0}
            enter={false}
            exit={false}
          >
            <Form>
              <Row>
                <FormGroup>
                  <Label>Ph??ng</Label>
                  <Input
                    type="text"
                    placeholder="Nh???p s??? ph??ng"
                    value={this.state.name}
                    onChange={this.onNameChange}
                  />
                </FormGroup>
              </Row>
              <FormGroup>
                <Label>Gi?? ph??ng</Label>
                <Input
                  type="text"
                  placeholder="Nh???p gi?? ph??ng"
                  value={this.state.price}
                  onChange={this.onPriceChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Tr???ng th??i</Label>
                <Form.Control
                  as="select"
                  value={this.state.state}
                  onChange={this.onStateChange}
                >
                  <option value="???? Cho Thu??">???? Cho Thu??</option>
                  <option value="???? ?????t">???? ?????t</option>
                  <option value="??ang S???a Ch???a">??ang S???a Ch???a</option>
                  <option value="C??n Tr???ng">C??n Tr???ng</option>
                </Form.Control>
              </FormGroup>
              <FormGroup>
                <Label>M?? t???</Label>
                <Form.Control
                  as="textarea"
                  placeholder=""
                  value={this.state.description}
                  onChange={this.onDescriptionChange}
                  row={5}
                ></Form.Control>
              </FormGroup>
              <div className="text-center">
                <Button
                  onClick={(e) => this.handleSubmit()}
                  style={{ border: "none" }}
                  type="submit"
                  variant="outline-primary"
                >
                  <FaSave /> L??u ch???nh s???a
                </Button>
              </div>
            </Form>
          </CSSTransition>
        </TransitionGroup>
      </Fragment>
    );
  }
}
