// import ErrorHandler from "../middlewares/error.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Restaurant } from "../models/restaurantModel.js";
import { v2 as cloudinary } from "cloudinary";
// import multer from "multer";
// import streamifier from "streamifier";


export const getRestaurant = catchAsyncError(async (req, res, next) => {
     try {
        const restaurants = await Restaurant.find();
        res.json({ success: true, restaurants });
      } catch (error) {
        res.status(500).json({ message: "Error fetching restaurants" });
      }
});
export const getRestaurantById = catchAsyncError(async (req, res, next) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) return res.status(404).json({ message: "Not found" });
        res.json({ success: true, restaurant });
      } catch (error) {
        res.status(500).json({ message: "Error fetching restaurant" });
      }
});




// Configure Cloudinary

cloudinary.config({
    cloud_name: "dtnj3vjad",
    api_key: "836243925894637",
    api_secret: "z0rnS46iWj8QmEKtGeux95BLEpo",
});




// Controller function for adding a restaurant
export const addRestaurant = async (req, res) => {
  try {
    console.log("Received Data:", req.body);
    console.log("Received Files:", req.files);

    const { name, address, email, cuisine, openingHours,   menu } = req.body;

    

   
    // Extract menu images (if available)
    const menuImages = req.files["menuImages"] || [];
    console.log("menuImages:", menuImages);

    // Ensure menu is parsed correctly
    let menuData;
    try {
      menuData = typeof menu === "string" ? JSON.parse(menu) : menu;
    } catch (error) {
      return res.status(400).json({ message: "Invalid menu format" });
    }

    console.log("menuData:", menuData);

    // Attach images to menu items
    if (Array.isArray(menuData)) {
      menuData.forEach((item, index) => {
        if (menuImages[index]) {
          item.image = menuImages[index].buffer.toString("base64"); // Store as Base64
        }
      });
    }

    // Save restaurant data in database
    const newRestaurant = new Restaurant({
      name,
      address,
      email,
      cuisine,
      openingHours,
      menu: menuData,
    });

    console.log("newRestaurant:", newRestaurant);
    await newRestaurant.save();
    console.log("After addition newRestaurant:", newRestaurant);

    res.status(201).json({ message: "Restaurant added successfully!" });
  } catch (error) {
    console.error("Error adding restaurant:", error);
    res.status(500).json({ message: "Server error" });
  }
};




export const updateRestaurant = catchAsyncError(async (req, res, next) => {
    try {
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );
        res.json({ success: true, restaurant: updatedRestaurant });
      } catch (error) {
        res.status(500).json({ message: "Error updating restaurant" });
      }
});
export const deleteRestaurant = catchAsyncError(async (req, res, next) => {
    try {
        await Restaurant.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Restaurant deleted" });
      } catch (error) {
        res.status(500).json({ message: "Error deleting restaurant" });
      }
});
    

