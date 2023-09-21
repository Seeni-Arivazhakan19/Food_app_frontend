import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../webpages/RestaurantMenu.css";

const RestaurantMenu = ({ restaurantId }) => {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/restaurant/view/${restaurantId}`)
      .then((response) => {
        const fetchedMenu = response.data.menuList || [];
        setMenu(fetchedMenu);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching menu: ", error);
        setLoading(false);
        setError("An error occurred while fetching the menu.");
      });
  }, [restaurantId]);

  const addToCart = () => {
    if (selectedItem) {
      const newItem = {
        menu_id: selectedItem.menu_id,
        dish_name: selectedItem.dish_name,
        quantity: quantity,
        dish_price: selectedItem.dish_price,
      };
      setCart([...cart, newItem]);
      setSelectedItem(null);
      setQuantity(1);
    }
  };

  const placeOrder = () => {
    const totalBill = cart.reduce(
      (total, item) => total + item.quantity * item.dish_price,
      0
    );

    const billDetails = {
      bill_date: new Date().toISOString(),
      bill_total: totalBill,
      quantity: cart.length,
    };

    const orderDetails = {
      billDetails,
      cartItems: cart,
    };

    axios
      .post("http://localhost:8080/cart/save", orderDetails)
      .then((response) => {
        // Assuming the server returns cart_id in the response data
        const cartId = response.data.cart_id;
        console.log(cartId);

        // Use the navigate function to navigate to the Orders component with cart_id
        navigate(`/orders/${cartId}`);
      })
      .catch((error) => {
        console.error("Error placing order: ", error);
      });
  };

  return (
    <div>
      <h2>Restaurant Menu</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {menu.length > 0 ? (
            menu.map((item) => (
              <li key={item.menu_id}>
                {item.dish_name} - INR.{item.dish_price}{" "}
                <button onClick={() => setSelectedItem(item)}>Add to Cart</button>
              </li>
            ))
          ) : (
            <li>No items available in the menu</li>
          )}
        </ul>
      )}
      {selectedItem && (
        <div>
          <p>Selected Item: {selectedItem.dish_name}</p>
          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <button onClick={addToCart}>Add to Cart</button>
        </div>
      )}
      {cart.length > 0 && (
        <div>
          <h2>Cart</h2>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.dish_name} - INR. {item.dish_price} - {item.quantity} nos.
              </li>
            ))}
          </ul>
          <button onClick={placeOrder}>Place Order</button>
        </div>
      )}
    </div>
  );
};

export default RestaurantMenu;
