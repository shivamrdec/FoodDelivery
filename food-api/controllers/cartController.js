import { User } from "../models/userModel.js";
import foodModel from "../models/foodModel.js"; // ✅ Use `foodModel` instead of `Item`

// Add to user cart
const addToCart = async (req, res) => {
   try {
      const { userId, itemId } = req.body;
      if (!userId || !itemId) {
         return res.status(400).json({ success: false, message: "Invalid request data" });
      }

      let userData = await User.findById(userId);
      if (!userData) return res.status(404).json({ success: false, message: "User not found" });

      let item = await foodModel.findById(itemId); // ✅ Use `foodModel`
      if (!item) return res.status(404).json({ success: false, message: "Item not found" });

      let cartData = userData.cartData || {};

      if (cartData[itemId]) {
         cartData[itemId].quantity += 1;
      } else {
         cartData[itemId] = { quantity: 1, price: item.price }; // ✅ Store price directly
      }

      await User.findByIdAndUpdate(userId, { cartData }, { new: true });

      res.json({ success: true, message: "Added to cart", cart: cartData });
   } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server Error" });
   }
};

// Remove from user cart
const removeFromCart = async (req, res) => {
   try {
      const { userId, itemId } = req.body;
      if (!userId || !itemId) {
         return res.status(400).json({ success: false, message: "Invalid request data" });
      }

      let userData = await User.findById(userId);
      if (!userData) return res.status(404).json({ success: false, message: "User not found" });

      let cartData = userData.cartData || {};

      if (cartData[itemId]) {
         cartData[itemId].quantity -= 1;
         if (cartData[itemId].quantity === 0) {
            delete cartData[itemId]; // ✅ Remove item if count is 0
         }
      } else {
         return res.json({ success: true, message: "Item not in cart" });
      }

      await User.findByIdAndUpdate(userId, { cartData }, { new: true });

      res.json({ success: true, message: "Removed from cart", cart: cartData });
   } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server Error" });
   }
};

// Get user cart
const getCart = async (req, res) => {
   try {
      const { id } = req.params;
      if (!id) {
         return res.status(400).json({ success: false, message: "User ID required" });
      }

      let userData = await User.findById(id);
      if (!userData) return res.status(404).json({ success: false, message: "User not found" });

      const cartItems = Object.entries(userData.cartData).map(([itemId, { quantity, price }]) => ({
         _id: itemId,
         quantity,
         price, // ✅ Fetch price directly from cartData
      }));

      res.json({ success: true, cart: cartItems });
   } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server Error" });
   }
};

export { addToCart, removeFromCart, getCart };
