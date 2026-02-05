import { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Menu.css";

const url = "http://localhost:4000"; // Change to match your backend port

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();

  // Fetch food items from List Page or API
  const fetchMenu = async () => {
    try {
      const response = await axios.get(`${url}/api/v1/food/list`);
      if (response.data.success) {
        setMenuItems(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleOrderClick = (item) => {
    navigate("/PaymentPage", { state: { item } }); // Redirecting with item data
  };

  return (
    <Container className="menu-container mt-4">
      <h2 className="text-center mb-4">Menu</h2>
      <Row>
        {menuItems.length > 0 ? (
          menuItems.map((item) => (
            <Col key={item._id} md={4} sm={6} className="mb-4">
              <Card className="menu-card">
                <Card.Img
                  variant="top"
                  src={item.image}
                  alt={item.name}
                  onError={(e) => (e.target.src = "/placeholder.jpg")}
                  className="menu-image"
                />
                <Card.Body>
                  <Card.Title className="text-center">{item.name}</Card.Title>
                  <Card.Text className="text-center">
                    {item.description || "No description available"}
                  </Card.Text>
                  <Card.Text className="text-center price">₹{item.price}</Card.Text>
                  <Button 
                    variant="success" 
                    className="w-100"
                    onClick={() => handleOrderClick(item)}
                  >
                    Order
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">No food items available</p>
        )}
      </Row>
    </Container>
  );
};

export default Menu;
