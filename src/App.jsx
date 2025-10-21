import React from "react";
import Login from "./components/Login";
import "./App.css";
import UserMainPage from "./components/UserMainPage";
import OwnerOrdersPage from "./components/OwnerOrdersPage";
import { Routes, Route } from "react-router-dom"; 
import Menu from "./components/Menu";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/user" element={<UserMainPage />} />
      <Route path="/owner" element={<OwnerOrdersPage />} />
      <Route path="/order/:restaurantId" element={<Menu />} />

    </Routes>
  );
}

