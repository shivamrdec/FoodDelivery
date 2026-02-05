import React from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  const location = useLocation();
  const hiddenPaths = ["/login", "/signup"];

  // Hide footer on Login and Signup pages
  if (hiddenPaths.includes(location.pathname)) {
    return null;
  }

  return (
    <footer className="footer">
      <Container>
        <Row>
          {/* Quick Links */}
          <Col md={3}>
            <h5>Quick Links</h5>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/restaurants">Restaurants</a></li>
              <li><a href="/orders">Orders</a></li>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/about">About Us</a></li>
            </ul>
          </Col>

          {/* Contact Info */}
          <Col md={3}>
            <h5>Contact Us</h5>
            <p>Email: <a href="mailto:support@quickbite.in">support@quickbite.in</a></p>
            <p>Phone: +91 98765 43210</p>
          </Col>

          {/* Social Media */}
          <Col md={3}>
            <h5>Follow Us</h5>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            </div>
          </Col>

          {/* Newsletter */}
          <Col md={3}>
            <h5>Subscribe to Our Newsletter</h5>
            <Form>
              <Form.Group>
                <Form.Control type="email" placeholder="Enter your email" />
              </Form.Group>
              <Button variant="danger" className="mt-2 w-100">Subscribe</Button>
            </Form>
          </Col>
        </Row>

        {/* Copyright */}
        <Row className="text-center mt-4">
          <Col>
            <p className="copyright">© {new Date().getFullYear()} Quick Bite. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
