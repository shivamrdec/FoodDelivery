import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Container, Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Verify.css"; // Import CSS file

const Verify = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/otp-verification",
        data,
        { headers: { "Content-Type": "application/json" } }
      );
      toast.success(response.data.message);
      navigate("/login"); // Redirect to login after successful verification
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-container">
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <div className="verify-form">
          <h2>Verify OTP</h2>
          <p>Enter the OTP sent to your email or phone.</p>

          <Form onSubmit={handleSubmit(handleVerify)}>
            <Form.Group className="mb-3">
              <input 
                type="email" 
                placeholder="Email" 
                required 
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <p className="error-text">{errors.email.message}</p>}
            </Form.Group>
            
            <Form.Group className="mb-3">
              <input 
                type="text" 
                placeholder="Phone (+91XXXXXXXXXX)" 
                required 
                {...register("phone", { required: "Phone number is required" })}
              />
              {errors.phone && <p className="error-text">{errors.phone.message}</p>}
            </Form.Group>
            
            <Form.Group className="mb-3">
              <input 
                type="text" 
                placeholder="Enter OTP" 
                required 
                {...register("otp", { required: "OTP is required" })}
              />
              {errors.otp && <p className="error-text">{errors.otp.message}</p>}
            </Form.Group>

            <button type="submit" disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default Verify;
