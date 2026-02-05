// import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./Signup.css"; // Import the CSS file
import { useState } from "react";

const Signup = () => {
  const navigate = useNavigate("/verify");

  const [formData, setFormData] = useState({
    name: "",  // Changed from fullName
    email: "",
    phone: "",
    password: "",
    verificationMethod: "email", // Default to email
    agreeToTerms: false,
  });

  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  // Function to validate email format
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Function to validate phone format (+91XXXXXXXXXX)
  const isValidPhone = (phone) => /^\+91\d{10}$/.test(phone);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (name === "email") {
      setEmailError(isValidEmail(value) ? "" : "Please enter a valid email.");
    }

    if (name === "phone") {
      setPhoneError(isValidPhone(value) ? "" : "Phone must be +91XXXXXXXXXX.");
    }
  };

  const isFormValid =
    formData.name &&
    isValidEmail(formData.email) &&
    isValidPhone(formData.phone) &&
    formData.password.length >= 6 &&
    formData.agreeToTerms;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      toast.error("Please fill all fields correctly.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/v1/user/register", formData);
      toast.success(response.data.message);
      navigate("/verify"); // Redirect to verification page
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="signup-background">
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <div className="signup-form">
          <h2>Sign Up</h2>
          <Form onSubmit={handleSubmit}>
            {/* Name */}
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Email */}
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {emailError && <small className="text-danger">{emailError}</small>}
            </Form.Group>

            {/* Phone */}
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="phone"
                placeholder="Phone (+91XXXXXXXXXX)"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              {phoneError && <small className="text-danger">{phoneError}</small>}
            </Form.Group>

            {/* Password */}
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Verification Method */}
            <Form.Group className="mb-3">
              <Form.Label>Verification Method</Form.Label>
              <Form.Select name="verificationMethod" value={formData.verificationMethod} onChange={handleChange}>
                <option value="email">Email</option>
                <option value="phone">Phone</option>
              </Form.Select>
            </Form.Group>

            {/* Terms Checkbox */}
            <Form.Group className="mb-3 text-start">
              <Form.Check
                type="checkbox"
                name="agreeToTerms"
                label="I agree to Quick Bite's Terms of Service and Privacy Policy"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Create Account Button */}
            <Button variant="danger" type="submit" className="w-100" disabled={!isFormValid}>
              Create Account
            </Button>
          </Form>

          <p className="mt-3">or</p>

          {/* Already Have an Account? */}
          <p>
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Signup;
