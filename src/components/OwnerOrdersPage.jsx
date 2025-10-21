import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OwnerOrdersPage.css";
import logo from "../assets/Gemini_Generated_Image_14sqii14sqii14sq.png"

const OwnerOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [ownerData, setOwnerData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedData = localStorage.getItem("owner");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setOwnerData(parsedData);

      // ✅ Fetch orders for this owner's restaurant only
      axios
        .get(`https://eatexpress-backend.onrender.com/order/restaurant/${parsedData.id}`)
        .then((res) => {
          setOrders(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }

  return (
    <div className="owner-orders-page">
      {/* ---------- HEADER ---------- */}
      <header className="header">
        <div className="logo-section">
          <img src={logo} alt="EatExpress Logo" className="logo" />
          <h1 className="site-title">EatExpress</h1>
        </div>

        <div className="setter">{ownerData && (
          <div className="owner-info">
            <p className="owner-name">
              👋 Welcome, <strong>{ownerData.name}</strong>
            </p>
            <p className="restaurant-name">
              🍽️ Restaurant: <strong>{ownerData.restaurantName}</strong>
            </p>
          </div>
        )}
        <button
          className="logout-btn"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          Logout
        </button>
        </div>

      </header>

      {/* ---------- CONTENT ---------- */}
      <div className="container">
        <h2 className="title">
          Orders for {ownerData?.restaurantName || "Your Restaurant"}
        </h2>

        {orders.length === 0 ? (
          <p className="order-empty">No orders yet.</p>
        ) : (
          <div className="order-list">
            {orders.map((order) => (
              <div key={order._id} className="order-card">
                <h3 className="order-id">Order ID: {order._id}</h3>
                <p>
                  <strong>User ID:</strong> {order.userId}
                </p>

                {/* ✅ Display only item names */}
                <p>
                  <strong>Items:</strong>{" "}
                  {order.items && order.items.length > 0
                    ? order.items.map((item) => item.name).join(", ")
                    : "No items"}
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerOrdersPage;
