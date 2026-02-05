import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Add from "./Add";  // Import Add component
import "./List.css";

const url = "http://localhost:4000";  // Ensure correct backend URL
const currency = "₹";  

const List = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch the food list
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/v1/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Failed to fetch food list.");
      }
    } catch (error) {
      console.error("Error fetching list:", error);
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to remove food item
  const removeFood = async (id) => {
    try {
      const response = await axios.delete(`${url}/api/v1/food/remove/${id}`);
      if (response.data.success) {
        toast.success("Food removed successfully");
        fetchList(); // Refresh the list after deletion
      } else {
        toast.error("Failed to remove food");
      }
    } catch (error) {
      console.error("Error removing food:", error);
      toast.error("Server error. Please try again.");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      {/* <Add fetchList={fetchList} />  Pass fetchList as a prop */}
      <p>All Foods List</p>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="list-table">
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Description</b>
            <b>Price</b>
            <b>Action</b>
          </div>

          {list.length > 0 ? (
            list.map((item, index) => (
              <div key={index} className="list-table-format">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  onError={(e) => e.target.src = "/placeholder.jpg"} 
                />
                <p>{item.name}</p>
                <p>{item.description || "No description available"}</p>
                <p>{currency}{item.price}</p>
                <button onClick={() => removeFood(item._id)}>Delete</button>
              </div>
            ))
          ) : (
            <p>No food items found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default List;
