import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Container, Form } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import "./ResetPassword.css";

const ResetPassword = () => {
  const { token } = useParams(); // Get token from URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:4000/api/v1/user/password/reset/${token}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(response.data.message);
      navigate("/login"); // Redirect to login page after success
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong. Try again."
      );
    }
    setLoading(false);
  };

  return (
    <div className="reset-password-container">
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <div className="reset-password-form">
          <h2>Reset Password</h2>
          <p>Enter a new password for your account.</p>
          <Form onSubmit={handleResetPassword}>
            <Form.Group className="mb-3">
              <input
                type="password"
                name="password"
                placeholder="New Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <button type="submit" disabled={loading}>
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default ResetPassword;
