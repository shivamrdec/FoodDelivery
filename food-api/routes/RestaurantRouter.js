import express from "express";
import { addRestaurant, deleteRestaurant, getRestaurant, getRestaurantById, updateRestaurant } from "../controllers/restaurantController.js";
const router = express.Router();

import upload from "../middlewares/uploadMiddleware.js";
  
// ✅ Get all restaurants
router.get("/get", getRestaurant);
 

// ✅ Get restaurant by ID
router.get("/get/:id", getRestaurantById);
  

// ✅ Add a new restaurant
router.post("/add", upload.single("image"), addRestaurant);
 

// ✅ Update restaurant details
router.put("/update/:id", updateRestaurant);
  

// ✅ Delete restaurant
router.delete("/delete/:id", deleteRestaurant);
  

export default  router;
