import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UserMainPage.css";
import logo from "../assets/Gemini_Generated_Image_14sqii14sqii14sq.png";

const UserMainPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [showOrders, setShowOrders] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
    else navigate("/");

    axios
      .get("https://eatexpress-backend.onrender.com/owner/owners")
      .then((res) => setRestaurants(res.data))
      .catch((err) => console.error(err));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const handleMyOrders = async () => {
    if (!user || !user.id) {
      alert("User not found. Please log in again.");
      return;
    }

    try {
      const res = await axios.get(`https://eatexpress-backend.onrender.com/order/user/${user.id}`);
      setOrders(res.data);
      setShowOrders(true);
    } catch (err) {
      console.error("Error fetching orders:", err);
      alert("Could not fetch orders. Try again later.");
    }
  };

  const handleOrder = (restaurantId) => {
    navigate(`/order/${restaurantId}`);
  };

  return (
    <div className="user-page">
      {/* ---------- HEADER ---------- */}
      <header className="header1">
        <div className="header-left">
          <img src={logo} alt="EatExpress Logo" className="logo1" />
          <h1 className="title1">EatExpress</h1>
        </div>

        <div className="nav-buttons">
          {user && <span className="welcome-text">👋 Hi, {user.name}</span>}
          <button className="cart-btn" onClick={handleMyOrders}>
            🧾 My Orders
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </header>

      {/* ---------- SEARCH ---------- */}
      <div className="search-container">
        <input
          type="text"
          placeholder="🔍 Search restaurants..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      {/* ---------- RESTAURANTS ---------- */}
      <main className="content">
        <div className="restaurant-grid">
          {restaurants
            .filter((r) =>
              r.restaurantName.toLowerCase().includes(search.toLowerCase())
            )
            .map((r) => (
              <div key={r._id} className="restaurant-card">
                <div className="card-header">
                  <h3 className="restaurant-name1">{r.restaurantName}</h3>
                </div>
                <p className="restaurant-owner">👨‍🍳 Owner: {r.name}</p>
                <p className="restaurant-address">📍 Address: {r.adders}</p>
                <button
                  className="order-btn"
                  onClick={() => handleOrder(r._id)}
                >
                  🍔 Order Now
                </button>
              </div>
            ))}
        </div>
      </main>

      {/* ---------- ORDERS POPUP ---------- */}
      {showOrders && (
        <div className="orders-popup">
          <div className="orders-box">
            <button
              className="close-orders-btn-top"
              onClick={() => setShowOrders(false)}
            >
              ✖
            </button>
            <h2>📦 My Orders</h2>
            {orders.length === 0 ? (
              <p className="empty-orders">No orders found.</p>
            ) : (
              <ul className="orders-list">
                {orders.map((order, i) => (
                  <li key={i} className="order-item">
                    <p>
                      <strong>Restaurant ID:</strong> {order.restaurantId}
                    </p>
                    <p>
                      <strong>Items:</strong>{" "}
                      {order.items.map((item) => item.name).join(", ")}
                    </p>
                    <p>
                      <strong>Address:</strong> {order.address}
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(order.date).toLocaleString()}
                    </p>
                    <p className={`status ${order.status.toLowerCase()}`}>
                      <strong>Status:</strong> {order.status}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMainPage;
