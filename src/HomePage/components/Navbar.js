import React from "react";
import logo from "../../assets/demo-ui/images/logo.png";
import Login from "./Login";
import "./Navbar.css";
import { Row, Col } from "react-bootstrap";

const Navbar = () => {
  return (
    <div className="header">
      <nav className="navbar">
            <a href="/" className="logo">
              <img src={logo} alt="logo" />
            </a>
            <Login />
      </nav>
    </div>
  );
};

export default Navbar;
