import React, { useState } from 'react'
import logo from '../../assets/demo-ui/images/logo.png'
import Login from './Login'
import { FaPhoneAlt } from 'react-icons/fa'
import './Navbar.css'
import { Row, Col } from 'react-bootstrap'

const Navbar = () => {

    return (
        <div className='header'>
            <nav className='navbar'>
                <Row>
                    <Col md='auto'>
                        <a href='/' className='logo'>
                            <img src={logo} alt='logo' />
                        </a>
                    </Col>
                    <Col>
                        <marquee style={{ color: "white", paddingTop:'5px'}}>Với giá cả phải chăng, an ninh tuyệt đối, nhà trọ Architect sẽ là nơi ở thích hợp, tiện nghi và an toàn cho sinh viên và công nhân. Địa chỉ: 123 Nguyễn Văn Thành, khu phố Phú Nghị, phường Hòa Lợi, thị xã Bến Cát, tỉnh Bình Dương</marquee>
                    </Col>
                    <Col md='auto'><Login /></Col>
                </Row>



            </nav>
        </div >
    )
}

export default Navbar