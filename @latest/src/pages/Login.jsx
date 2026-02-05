import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Container, Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, useNavigate } from "react-router-dom";
import "react-phone-input-2/lib/style.css";
import "./Login.css"; // Import CSS file

const Login = () => {
  const { setIsAuthenticated, setUser } = useContext(Context);
  const navigateTo = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleLogin = async (data) => {
    try {
      const res = await axios.post("http://localhost:4000/api/v1/user/login", data, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success(res.data.message);
      setIsAuthenticated(true);
      setUser(res.data.user);
      navigateTo("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      {/* Background Blur */}
      <div className="login-background"></div>

      {/* Login Form */}
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <div className="login-form">
          <h2>Login</h2>
          <p>
            or <Link to="/signup">create an account</Link>
          </p>

          <Form onSubmit={handleSubmit(handleLogin)}>
            {/* Email Field */}
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <p className="text-danger">{errors.email.message}</p>}
            </Form.Group>

            {/* Password Field */}
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && <p className="text-danger">{errors.password.message}</p>}
            </Form.Group>

            <p className="forgot-password">
              <Link to={"/password/forgot"}>Forgot password?</Link>
            </p>

            {/* Login Button */}
            <button type="submit" className="btn btn-danger w-100">Login</button>
          </Form>

          {/* Terms & Conditions */}
          <p className="terms-text mt-3">
            By clicking on Login, I accept the{" "}
            <Link to="/terms">Terms & Conditions</Link> &{" "}
            <Link to="/privacy">Privacy Policy</Link>.
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Login;
