import React, { useState } from "react";
import "./Login.css";


export default function AuthForms() {
  const [formType, setFormType] = useState("ownerRegister");

  const renderForm = () => {
    switch (formType) {
      case "ownerRegister":
        return (
          <form className="form-container">
            <h2>Owner Registration</h2>
            <input type="text" placeholder="Full Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="text" placeholder="Business Name" />
            <button type="submit">Register</button>
          </form>
        );
      case "ownerLogin":
        return (
          <form className="form-container">
            <h2>Owner Login</h2>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="submit">Login</button>
          </form>
        );
      case "userRegister":
        return (
          <form className="form-container">
            <h2>User Registration</h2>
            <input type="text" placeholder="Full Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="submit">Register</button>
          </form>
        );
      case "userLogin":
        return (
          <form className="form-container">
            <h2>User Login</h2>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
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
        <button onClick={() => setFormType("ownerRegister")}>
          Owner Register
        </button>
        <button onClick={() => setFormType("ownerLogin")}>
          Owner Login
        </button>
        <button onClick={() => setFormType("userRegister")}>
          User Register
        </button>
        <button onClick={() => setFormType("userLogin")}>
          User Login
        </button>
      </div>
      {renderForm()}
    </div>
  );
}
