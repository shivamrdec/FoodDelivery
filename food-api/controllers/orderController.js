import orderModel from "../models/orderModel.js";
import  { User }   from "../models/userModel.js"; // ✔ Correct for named exports

import Razorpay from "razorpay";

// Razorpay Configuration
const razorpay = new Razorpay({
    key_id: "rzp_test_aeKFIvSTRlUqOL",
    key_secret: "UIQyr0yPt5mV7HjheuvyKxCc",
});

// Config variables
const currency = "INR";
const deliveryCharge = 50;
const frontend_URL = "http://localhost:5173";

// ✅ Placing User Order using Razorpay
const placeOrder = async (req, res) => {
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount + deliveryCharge,
            address: req.body.address,
            payment: false,  // Payment is not completed yet
        });

        await newOrder.save();
        await User.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Razorpay Order Creation
        const options = {
            amount: newOrder.amount * 100,  // Convert to paisa
            currency: currency,
            receipt: `order_rcptid_${newOrder._id}`,
            payment_capture: 1
        };

        const razorpayOrder = await razorpay.orders.create(options);

        res.json({ 
            success: true, 
            order_id: razorpayOrder.id,
            amount: newOrder.amount,
            currency: currency
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" });
    }
};

// ✅ Placing User Order for Cash on Delivery (COD)
const placeOrderCod = async (req, res) => {
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount + deliveryCharge,
            address: req.body.address,
            payment: false, // COD orders are unpaid initially
            paymentMethod: "COD"
        });

        await newOrder.save();
        await User.findByIdAndUpdate(req.body.userId, { cartData: {} });

        res.json({ success: true, message: "Order Placed" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" });
    }
};

// ✅ List All Orders (For Admin)
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" });
    }
};

// ✅ User Orders for Frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" });
    }
};

// ✅ Update Order Status (For Admin)
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" });
    }
};

// ✅ Verify Razorpay Order Payment
const verifyOrder = async (req, res) => {
    try {
        const { orderId, razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

        if (!razorpay_payment_id) {
            await orderModel.findByIdAndDelete(orderId);
            return res.json({ success: false, message: "Payment Failed" });
        }

        await orderModel.findByIdAndUpdate(orderId, { 
            payment: true, 
            paymentMethod: "Online",
            razorpay_payment_id,
            razorpay_order_id
        });

        res.json({ success: true, message: "Payment Successful" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Verification Error" });
    }
};

export { placeOrder, placeOrderCod, listOrders, userOrders, updateStatus, verifyOrder };
