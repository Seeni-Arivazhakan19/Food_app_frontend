import React, { useState, useEffect } from "react";
import axios from "axios";
import Usernav from "../navFooter/UserNav";

const Orders = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    // Fetch the user's cart items from the server
    axios.get("http://localhost:8080/cart/view/cart_id").then((response) => {
      setCartItems(response.data);
    });
  }, []);

  const placeOrder = () => {
    // Prepare the list of item IDs to place an order
    const itemIds = cartItems.map((item) => item.menu_id);

    // Send a POST request to place the order
    axios
      .post("http://localhost:8080/order/place", {
        itemIds: itemIds,
      })
      .then(() => {
        setOrderPlaced(true);
        // Clear the user's cart after placing the order
        axios.delete("http://localhost:8080/cart/remove/:cart_id");
      })
      .catch((error) => {
        console.error("Error placing order: ", error);
      });
  };

  return (
    <div>
      <Usernav />
      <h2>Order Summary</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.menu_id}>
              {item.dish_name} - {item.price}
            </li>
          ))}
        </ul>
      )}
      {cartItems.length > 0 && !orderPlaced && (
        <button onClick={placeOrder}>Place Order</button>
      )}
      {orderPlaced && <p>Order placed successfully!</p>}
    </div>
  );
};

export default Orders;
