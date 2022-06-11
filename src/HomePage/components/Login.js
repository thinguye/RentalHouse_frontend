import React, { Component, useState } from 'react'

import instance from '../../api/axiosClient'
import axios from 'axios'
import './Login.css';
import { FaEye } from 'react-icons/fa'
import { Redirect } from 'react-router-dom'
import { parseJSON } from 'date-fns';
import { Button, ToggleButton } from 'react-bootstrap';

export default class Login extends Component {
  state = {
    username: '',
    password: '',
    redirect: false,
    account: {},
    room: {},
    showPass: false
  }

  componentDidMount() {
    sessionStorage.setItem("token", "");
  }
  handleOnChangeUsername = e => {
    this.setState({
      username: e.target.value
    })
  }
  handleOnChangePassword = e => {
    this.setState({
      password: e.target.value
    })
  }

  handleLogin = e => {
    if (this.state.username===''||this.state.password===''){
      
    }
    var data = new URLSearchParams({
      username: this.state.username,
      password: this.state.password,
      client_id: "myClient",
      grant_type: "password",
      scope: "myAPIs"
    })
    instance.post('connect/token', data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then((rs) => {
        console.log(rs)
        if (rs.data != null) {
          sessionStorage.setItem("token", rs.data.access_token);
          instance.defaults.headers.Authorization = "Bearer " + rs.data.access_token
          instance.get('api/Room/GetUserRoomId')
            .then((res) => {
              if (res.data != 0) {
                this.setState({
                  role: 'user',
                })
                sessionStorage.setItem("roomId", res.data);
              }
              else {
                this.setState({ role: 'admin' })
              }
              this.setState({
                redirect: true
              })
            })
        }
      }).catch(error => console.log(error));
  }

  renderRedirect = () => {
    if (this.state.redirect == true) {
      if (this.state.role == 'admin') {
        return <Redirect to='/dashboards' />;
      } else if (this.state.role == 'user') {
        return <Redirect to='/room' />;
      }
    }
    return <Redirect to='/home' />;
  }

  render() {

    return (
      <div className='login'>
        <ul className='nav login'>
          <li className='login-form'>
              <label className='label'>Tên đăng nhập</label>
              <input type="text" required
                value={this.state.username}
                onChange={this.handleOnChangeUsername}
              />
              <label className='label'>Mật khẩu</label>
              <input type={this.state.showPass ? "text" : "password"} required
                value={this.state.password}
                onChange={this.handleOnChangePassword} />
              <button style={{ color: (this.state.showPass==true ? "gray" : "white"), backgroundColor: 'transparent', border: 'none' }} onClick={(e) => this.setState({ showPass: !this.state.showPass })}><FaEye /></button>
              <div style={{display:'inline-block'}}>
                {this.renderRedirect()}
                <button className='btn-login' onClick={(e) => this.handleLogin()}>Đăng nhập</button>
              </div>
          </li>
        </ul>
      </div>
    )
  }
};