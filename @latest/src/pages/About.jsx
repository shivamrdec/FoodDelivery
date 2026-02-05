import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "./About.css"; // Import CSS file
//import aboutImage from "../assets/about-food.jpg"; // Add an image related to food delivery

const About = () => {
  return (
    <div className="about-container">
      <div className="about-background"></div> {/* Background Blur Effect */}
      <Container className="about-content">
        <Row className="align-items-center">
          {/* Left Section - About Content */}
          <Col md={6}>
            <h2>About <span className="brand-name">Quick Bite</span></h2>
            <p>
              Welcome to <strong>Quick Bite</strong>, your go-to food delivery service! 
              We bring delicious meals from your favorite restaurants straight to your doorstep, ensuring convenience and satisfaction.
            </p>
            <p>
              Whether you're craving a pizza, a burger, or a healthy salad, 
              our platform connects you with top-rated restaurants near you. 
              Our fast and reliable delivery system guarantees fresh and hot meals in no time!
            </p>
            <p>
              Our mission is to make food ordering <strong>easy, quick, and enjoyable</strong> 
              with a seamless user experience and exceptional customer service.
            </p>
          </Col>

           {/* Right Section - Image  */}
           <Col md={6} className="text-center">
            <Image src="https://cdn.pixabay.com/photo/2019/10/10/07/16/pizza-4538925_1280.jpg" alt="Food Delivery" fluid rounded />
          </Col> 
        </Row>
      </Container>
    </div>
  );
};

export default About;
