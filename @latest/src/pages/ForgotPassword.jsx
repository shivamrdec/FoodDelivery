import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/password/forgot",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong. Try again."
      );
    }
    setLoading(false);
  };

  return (
    <div className="forgot-password-container">
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <div className="forgot-password-form">
          <h2>Forgot Password</h2>
          <p>Enter your email to receive a password reset link.</p>
          <Form onSubmit={handleSubmit(handleForgotPassword)}>
            <Form.Group className="mb-3">
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="error-message">{errors.email.message}</p>
              )}
            </Form.Group>
            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </Form>
          <p className="back-to-login">
            <Link to="/login">Back to Login</Link>
          </p>
        </div>
      </Container>
    </div>
  );
};

export default ForgotPassword;
