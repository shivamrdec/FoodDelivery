import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Restaurants.css";

const AddRestaurant = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    openingHours: "",
    cuisine: "",
   
    menu: [{ name: "", price: "", description: "", image: null }],
    
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  

  const handleMenuChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMenu = [...formData.menu];
    updatedMenu[index][name] = value;
    setFormData({ ...formData, menu: updatedMenu });
  };

  const handleMenuImageChange = (index, e) => {
    const updatedMenu = [...formData.menu];
    updatedMenu[index].image = e.target.files[0]; // Assign file directly
    setFormData({ ...formData, menu: updatedMenu });
  };

  const addMenuItem = () => {
    setFormData({
      ...formData,
      menu: [...formData.menu, { name: "", price: "", description: "", image: null }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "menu") {
        formData.menu.forEach((item, index) => {
          Object.keys(item).forEach((field) => {
            if (field !== "image") {
              formDataToSend.append(`menu[${index}][${field}]`, item[field]);
            }
          });
          if (item.image) {
            formDataToSend.append(`menu[${index}][image]`, item.image);
          }
        });
      } else if (key === "image" && formData[key]) {
        formDataToSend.append("image", formData[key]);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      await axios.post("http://localhost:4000/api/v1/restaurant/add", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Restaurant added successfully!");
      navigate("/menu");
    } catch (error) {
      console.error("Error adding restaurant:", error);
      alert("Failed to add restaurant. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="add-restaurant-container py-5">
      <div className="shadow p-4 bg-white rounded">
        <h2 className="text-center mb-4">Add Restaurant</h2>

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Restaurant Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter restaurant name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  placeholder="Enter address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Cuisine Type</Form.Label>
                <Form.Control
                  type="text"
                  name="cuisine"
                  placeholder="e.g., Italian, Chinese, Indian"
                  value={formData.cuisine}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Opening Hours</Form.Label>
                <Form.Control
                  type="text"
                  name="openingHours"
                  placeholder="e.g., 10 AM - 10 PM"
                  value={formData.openingHours}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          

          <h4>Menu Items</h4>
          {formData.menu.map((item, index) => (
            <Row key={index} className="mb-2">
              <Col md={3}>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Dish Name"
                  value={item.name}
                  onChange={(e) => handleMenuChange(index, e)}
                />
              </Col>
              <Col md={2}>
                <Form.Control
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={item.price}
                  onChange={(e) => handleMenuChange(index, e)}
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) => handleMenuChange(index, e)}
                />
              </Col>
              <Col md={3}>
                <Form.Control 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => handleMenuImageChange(index, e)} 
                />
              </Col>
            </Row>
          ))}

          <Button variant="secondary" onClick={addMenuItem} className="mt-2">
            Add Menu Item
          </Button>

          <Button variant="danger" type="submit" className="w-100 mt-3" disabled={loading}>
            {loading ? "Adding..." : "Add Restaurant"}
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default AddRestaurant;
