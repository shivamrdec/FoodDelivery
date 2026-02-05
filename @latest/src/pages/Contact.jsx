import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("Your message has been submitted!");
  };

  return (
    <div className="contact-page">
  <div className="contact-overlay"></div>
    <Container className="contact-container">
      <h2 className="text-center mb-4">Customer Support</h2>
      <p className="text-center">Email: <a href="mailto:support@swiggy.in">support@quick.in</a></p>

      {/* Corporate Office */}
      <div className="text-center mb-4">
        <h4>Corporate Office</h4>
        <p>
          No. 67, Sy No. 8-14, Ground Floor, I&J Block, Embassy TechVillage, Outer Ring Road, 
          Devarbisanahalli, Bengaluru 560 103, Karnataka, India.
        </p>
        <p><strong>Corporate Identity Number:</strong> U74110KA2013PLC096580</p>
        <p><strong>Registration Number:</strong> 096580</p>
        <Button variant="primary"  type="submit" size="lg">Get Directions</Button>
      </div>

      {/* Contact Form */}
      <div className=" mb-5">
        <h3>Get in Touch</h3>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Enter Name</Form.Label>
                <Form.Control 
                  type="text" 
                  name="name" 
                  placeholder="Your Name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Enter Email Address</Form.Label>
                <Form.Control 
                  type="email" 
                  name="email" 
                  placeholder="Your Email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Enter Message</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={4} 
              name="message" 
              placeholder="Your Message" 
              value={formData.message} 
              onChange={handleChange} 
              required 
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check 
              type="checkbox" 
              label="By contacting us you agree to the Terms and Conditions and Privacy Policy" 
              required 
            />
          </Form.Group>

          <Button  variant="danger" type="submit">Submit</Button>
        </Form>
      </div>

      {/* Investor Relations */}
      <div className="mb-4">
        <h3>Investors/Shareholders</h3>
        <p><strong>Abhishek Saini</strong> - Vice President, Investor Relations</p>
        <p>Email: <a href="mailto:ir@quick.in">ir@quick.in</a></p>
        <p><strong>Sridhar. M</strong> - Company Secretary and Compliance Officer</p>
        <p>Email: <a href="mailto:secretarial@quick.in">secretarial@quick.in</a></p>
      </div>

      {/* Public Relations & Media */}
      <div className="mb-4">
        <h3>Public Relations and Media</h3>
        <p><strong>Sanjana Shetty </strong></p>
        <p>Email: <a href="mailto:sanjana.shetty1@quick.in">sanjana.shetty1@quick.in</a></p>

        <p><strong>Akanksha Jain (Quick Bite Food & Quick Bite Dineout)</strong></p>
        <p>Email: <a href="mailto:akanksha.j@quick.in">akanksha.j@quick.in</a></p>

        <p>All media queries can also be addressed to: <a href="mailto:pr@quick.in">pr@quick.in</a></p>
      </div>

      {/* Get the App */}
      <div className="text-center mt-5">
        <h3>Get the Quick Bite App now!</h3>
        <p>For best offers and discounts curated specially for you.</p>
        <Button variant="dark">Download Now</Button>
      </div>
    </Container>
    </div>
  );
};

export default Contact;
