import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true},
  openingHours: { type: String, required: true},
  cuisine: { type: String, required: true },
  
 
  menu: [
    {
      name: String,
      price: Number,
      description: String,
      image: String,
    },
  ],
  
  createdAt: { type: Date, default: Date.now },
});

export const Restaurant = mongoose.model("Restaurant", restaurantSchema);
