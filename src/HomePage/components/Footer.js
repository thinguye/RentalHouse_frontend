import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './Footer.css';

const Footer = () => {
    return (
        <div className='footer'>
            <div className='container'>
                <h4 className="color sec py-4">Liên hệ</h4>
                <address>
                    <p>
                        <strong>
                            Nguyễn Mạnh Phúc
                        </strong>
                    </p>
                    <p>
                        <strong>Email: nguyenmanhphuc1993@gmail.com</strong>
                    </p>
                    <p>
                        <strong>
                            Số điện thoại: 0345 088 086
                        </strong>
                    </p>
                </address>
            </div>
        </div>
    )
}

export default Footer;