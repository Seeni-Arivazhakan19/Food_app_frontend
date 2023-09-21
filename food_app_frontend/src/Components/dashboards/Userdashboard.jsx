import React, { useState, useEffect } from "react";
import axios from "axios";
import Usernav from "../navFooter/UserNav";
import Useroptions from "../User/Useroptions";
import RestaurantMenu from "../webpages/RestaurantMenu";
import "./Userdashboard.css";

export default function Userdashboard() {
  const [query, setQuery] = useState("");
  const [restaurant, setRestaurant] = useState(null);
  const [error, setError] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const handleQueryInput = (e) => {
    const value = e.target.value;
    setQuery(value);
  };

  const handleSearchUsers = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8080/restaurant/viewbyname/${query}`);

      if (response.status === 200 && response.data) {
        setRestaurant(response.data);
        setError(null);
      } else {
        setRestaurant(null);
        setError("Restaurant not found");
      }
    } catch (err) {
      console.error(err);
      setRestaurant(null);
      setError("An error occurred while searching for the restaurant");
    }
  };

  const selectRestaurant = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  return (
    <>
      <Usernav />
      <Useroptions />
      <div className="search-bar">
        <form onSubmit={handleSearchUsers}>
          <input
            type="text"
            placeholder="Search restaurant by name..."
            value={query}
            onChange={handleQueryInput}
          />
          <button type="submit" style={{ background: "crimson", color: "white" }}>
            Search
          </button>
        </form>
      </div>
      {error && <p>{error}</p>}
      {restaurant && (
        <div className="result-box">
          <h2>{restaurant.restaurant_name}</h2>
          <p>Contact: {restaurant.restaurant_contact}</p>
          <p>Address: {restaurant.restaurant_address}</p>
          <button onClick={() => selectRestaurant(restaurant)}>View Menu</button>
        </div>
      )}

      {selectedRestaurant && (
        <div className="selected-restaurant">
          <RestaurantMenu restaurantId={selectedRestaurant.restaurant_id} />
        </div>
      )}
    </>
  );
}
