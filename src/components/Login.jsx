import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function AuthForms() {
  const [formType, setFormType] = useState("ownerRegister");
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    let endpoint = "";
    if (formType === "ownerRegister") endpoint = "http://localhost:5000/owner/register";
    if (formType === "ownerLogin") endpoint = "http://localhost:5000/owner/login";
    if (formType === "userRegister") endpoint = "http://localhost:5000/user/signup";
    if (formType === "userLogin") endpoint = "http://localhost:5000/user/login";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Something went wrong!");
        return;
      }

      // ✅ If it's a login — store user data and navigate
      if (formType === "ownerLogin") {
        localStorage.setItem("owner", JSON.stringify(data.owner || data)); // save owner
        navigate("/owner");
      } else if (formType === "userLogin") {
        localStorage.setItem("user", JSON.stringify(data.user || data)); // save user
        navigate("/user");
      } else {
        // ✅ Registration success
        alert("Registration successful!");
        setFormType(formType.includes("owner") ? "ownerLogin" : "userLogin");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error. Try again later.");
    }
  };

  const renderForm = () => {
    switch (formType) {
      case "ownerRegister":
        return (
          <form className="form-container" onSubmit={handleSubmit}>
            <h2>Owner Registration</h2>
            <input name="name" type="text" placeholder="Full Name" onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
            <input name="restaurantName" type="text" placeholder="Restaurant Name" onChange={handleChange} required />
            <input name="mobile_no" type="number" placeholder="Mobile Number" onChange={handleChange} required />
            <input name="adders" type="text" placeholder="Address" onChange={handleChange} required />
            <button type="submit">Register</button>
          </form>
        );

      case "ownerLogin":
        return (
          <form className="form-container" onSubmit={handleSubmit}>
            <h2>Owner Login</h2>
            <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">Login</button>
          </form>
        );

      case "userRegister":
        return (
          <form className="form-container" onSubmit={handleSubmit}>
            <h2>User Registration</h2>
            <input name="name" type="text" placeholder="Full Name" onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
            <input name="mobile_no" type="number" placeholder="Mobile Number" onChange={handleChange} required />
            <button type="submit">Register</button>
          </form>
        );

      case "userLogin":
        return (
          <form className="form-container" onSubmit={handleSubmit}>
            <h2>User Login</h2>
            <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">Login</button>
          </form>
        );

      default:
        return null;
    }
  };

  return (
    <div className="auth-page">
      <div className="form-switch">
        <button onClick={() => setFormType("ownerRegister")}>Owner Register</button>
        <button onClick={() => setFormType("ownerLogin")}>Owner Login</button>
        <button onClick={() => setFormType("userRegister")}>User Register</button>
        <button onClick={() => setFormType("userLogin")}>User Login</button>
      </div>
      {renderForm()}
    </div>
  );
}
