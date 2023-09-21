import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../Axios";

export default function RestaurantMenu() {
  const { restaurantId } = useParams();
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});

  useEffect(() => {
    // Fetch the menu items for the selected restaurant using restaurantId
    async function fetchMenuItems() {
      try {
        const response = await axios.get(`http://localhost:8080/restaurant/menu/${restaurantId}`);
        if (response.status === 200 && response.data) {
          setMenuItems(response.data);
        }
      } catch (error) {
        console.error("Error fetching menu items: ", error);
      }
    }

    fetchMenuItems();
  }, [restaurantId]);

  const handleQuantityChange = (itemId, quantity) => {
    setSelectedItems({
      ...selectedItems,
      [itemId]: quantity,
    });
  };

  const handlePlaceOrder = () => {
    // Implement the logic to place an order using selectedItems
    // You can send a POST request to the server to place the order
    // Include the selected items and quantities in the request body
    // After placing the order, you can show a confirmation message to the user
  };

  return (
    <div>
      <h2>Restaurant Menu</h2>
      <ul>
        {menuItems.map((item) => (
          <li key={item.itemId}>
            {item.itemName} - Price: ${item.itemPrice}
            <input
              type="number"
              value={selectedItems[item.itemId] || 0}
              onChange={(e) => handleQuantityChange(item.itemId, parseInt(e.target.value))}
            />
          </li>
        ))}
      </ul>
      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
}
