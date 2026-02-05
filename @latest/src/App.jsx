// import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
//  import Auth from "./pages/Auth";
 import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
 import { ToastContainer } from "react-toastify";
 import "react-toastify/dist/ReactToastify.css";
//  import axios from "axios";
//  import { Context } from "./main";
//  import OtpVerification from "./pages/OtpVerification";
// import Profile from "./pages/Profile";
import Verify from "./pages/Verify";
import Signup from "./pages/Signup";
 import Login from "./pages/Login"; 
 import About from './pages/About';
 import Contact from './pages/Contact';
 import Restaurants from './pages/Restaurants';
 import RestaurantMenu from './pages/RestaurantMenu';
 import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import OrderPayment from './pages/OrderPayment';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/auth" element={<Auth />} />
        <Route path="/otp-verification/:email/:phone" element={<OtpVerification />} />
        
         */}
         {/* <Route path='/me' element={<Profile />} /> */}
         <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path='/verify' element={<Verify />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
         <Route path="/restaurants" element={<Restaurants />} /> 
        <Route path="/menu" element={<RestaurantMenu />} />
         <Route path="/signup" element={<Signup />} />
        <Route path='/login' element={<Login />} /> 
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path = '/paymentpage' element ={<OrderPayment />} />  
      </Routes>
      <ToastContainer theme="colored" />
      <Footer />
    </Router>
  );
}
export default App;
