import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { listOrders, placeOrder,updateStatus,userOrders, verifyOrder, placeOrderCod } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.get("/list",listOrders);
orderRouter.post("/userorders",isAuthenticated,userOrders);
orderRouter.post("/place",isAuthenticated,placeOrder);
orderRouter.post("/status",updateStatus);
orderRouter.post("/verify",verifyOrder);
orderRouter.post("/placecod",isAuthenticated,placeOrderCod);

export default orderRouter;