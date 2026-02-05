import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Add.css";

const url = "http://localhost:4000"; // Ensure correct backend URL

const Add = ({ fetchList,fetchMenu }) => {  // ✅ Receive fetchList as a prop
  const [foodData, setFoodData] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
  });

  const handleChange = (e) => {
    setFoodData({ ...foodData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFoodData({ ...foodData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", foodData.name);
    formData.append("description", foodData.description);
    formData.append("price", foodData.price);
    formData.append("image", foodData.image);

    try {
      const response = await axios.post(`${url}/api/v1/food/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        toast.success("Food Added Successfully!");
        setFoodData({ name: "", description: "", price: "", image: null });

        if (fetchList) {
          fetchList();  // ✅ Refresh the list after adding a food item
        } else {
          console.error("fetchList is undefined");
        }
      } else {
        toast.error("Error adding food");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Server error! Please try again.");
    }
  };

  return (
    <div className="add-food-container">
      <h2>Add Food Item</h2>
      <form onSubmit={handleSubmit} className="add-food-form">
        <input
          type="text"
          name="name"
          placeholder="Food Name"
          value={foodData.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={foodData.description}
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={foodData.price}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
        <button type="submit">Add Food</button>
      </form>
    </div>
  );
};

export default Add;
