import express from 'express';
import { addToCart, getCart, removeFromCart } from '../controllers/cartController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const cartRouter = express.Router();

cartRouter.get("/get/:id",isAuthenticated,getCart);
cartRouter.post("/add",isAuthenticated,addToCart);
cartRouter.delete("/remove",isAuthenticated,removeFromCart);

export default cartRouter;