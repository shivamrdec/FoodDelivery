import foodModel from "../models/foodModel.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "url";

// all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        
        // Append full URL to the image field
        const updatedFoods = foods.map(food => ({
            ...food._doc,  // Convert Mongoose object to plain object
            image: `http://localhost:4000/uploads/${food.image}`  // Correct image URL
        }));

        res.json({ success: true, data: updatedFoods });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching food list" });
    }
};


// add food
const addFood = async (req, res) => {

    try {
        let image_filename = `${req.file.filename}`

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            
            image: image_filename,
        })

        await food.save();
        res.json({ success: true, message: "Food Added" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// delete food


// Define __dirname manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const removeFood = async (req, res) => {
    try {
        const { id } = req.params; // Extract ID from URL parameter

        if (!id) {
            return res.status(400).json({ success: false, message: "Food ID is required" });
        }

        // Find food by ID
        const food = await foodModel.findById(id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        // Delete image file if it exists
        if (food.image) {
            const imagePath = path.join(__dirname, "../uploads", food.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        // Delete food from database
        await foodModel.findByIdAndDelete(id);

        res.json({ success: true, message: "Food Removed Successfully" });

    } catch (error) {
        console.error("Error removing food:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


export { listFood, addFood, removeFood }