import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import './OrderPayment.css';

const PaymentPage = () => {
    const [payment, setPayment] = useState("cod");
    const [data, setData] = useState({ firstName: "", lastName: "", email: "", address: "", phone: "" });
    const [cartItems, setCartItems] = useState([]);
    const [currency] = useState("₹");
    const [deliveryCharge] = useState(50);
    const [totalAmount, setTotalAmount] = useState(0);
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const response = await axios.get(`http://localhost:5173/api/v1/cart/get/${userId}`);
            
            if (response.data.success) {
                const updatedCart = response.data.cart.map(item => ({
                    itemId: item._id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price
                }));
                setCartItems(updatedCart);
            } else {
                setCartItems([]);
            }
        } catch (error) {
            console.error("Error fetching cart:", error);
            setCartItems([]);
        }
    };

    useEffect(() => {
        if (cartItems.length === 0) {
            setTotalAmount(0);
            return;
        }

        let calculatedTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        setTotalAmount(calculatedTotal);
    }, [cartItems]);

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const placeOrder = async (e) => {
        e.preventDefault();
        const orderData = { userId, items: cartItems, amount: totalAmount + deliveryCharge, address: data };

        if (payment === "razorpay") {
            handleRazorpayPayment();
        } else {
            try {
                const response = await axios.post("/api/v1/order/placecod", orderData, { withCredentials: true });
                if (response.data.success) {
                    toast.success(response.data.message);
                    navigate("/myorders");
                    clearCart();
                } else {
                    toast.error("Something Went Wrong");
                }
            } catch (error) {
                console.error(error);
                toast.error("Order placement failed");
            }
        }
    };

    return (
        <form onSubmit={placeOrder} className='place-order'>
            <div className="place-order-left">
                <p className='title'>Delivery Information</p>
                <input type="text" name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='First name' required />
                <input type="text" name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Last name' required />
                <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Email address' required />
                <input type="text" name='address' onChange={onChangeHandler} value={data.address} placeholder='Full Address' required />  
                <input type="text" name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Phone' required />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <p>Subtotal: {currency}{totalAmount}</p>
                    <p>Delivery Fee: {currency}{deliveryCharge}</p>
                    <p><b>Total: {currency}{totalAmount + deliveryCharge}</b></p>
                </div>
                <div className="payment">
                    <h2>Payment Method</h2>
                    <div onClick={() => setPayment("cod")} className={`payment-option ${payment === "cod" ? "selected" : ""}`}>COD (Cash on Delivery)</div>
                    <div onClick={() => setPayment("razorpay")} className={`payment-option ${payment === "razorpay" ? "selected" : ""}`}>Razorpay (Online Payment)</div>
                </div>
                <button className='place-order-submit' type='submit'>{payment === "cod" ? "Place Order" : "Pay Now"}</button>
            </div>
        </form>
    );
};

export default PaymentPage;
