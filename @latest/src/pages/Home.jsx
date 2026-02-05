import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import "./HomePage.css"; // Import CSS for styling
import "./RestaurantMenu.jsx";



const HomePage = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  const handleSignup = () => {
    navigate("/signup");
  };
  const handleMenu = () => {
    navigate("/menu");
  };
  const handleRestaurant = () => {
    navigate("/restaurants");
  }
  return (
    <div className="home-container">
      {/* Navbar */}
      <Navbar expand="lg" className="navbar-overlay" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand href="#">Quick Bite</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" >
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/menu">Menu</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/contact">Contact</Nav.Link>
            </Nav>
            <Button className="me-3" variant="primary" onClick={handleLogin} class="login-signup">Login</Button>
            <Button className="me-3"  variant="primary" onClick={handleSignup} class="login-signup">Sign up</Button>
            <Button variant="light - dark" onClick={handleRestaurant}>Add Restaurant</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <div className="hero-content">
        <h1>Delicious Food, Delivered Fast</h1>
        <p>Order your favorite meals anytime, anywhere.</p>
        <Button variant="danger" size="lg" onClick={handleMenu}>Order Now</Button>
      </div>
    </div>
  );
};


export default HomePage;
