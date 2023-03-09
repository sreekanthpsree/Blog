// import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const logoutHandler = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  const navigate = useNavigate();
  return (
    <div className="blog_navbar">
      <div className="blog_navbar-links">
        <div className="blog_navbar-links__logo">
          <img src={logo} alt="logo" />
        </div>
      </div>
      <div className="blog_navbar-links__menu">
        <p
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </p>
        <p>About</p>
        {localStorage.getItem("name") ? (
          <p> Hi, {localStorage.getItem("name")}</p>
        ) : (
          <p
            onClick={() => {
              navigate("/login");
            }}
          >
            Sign in
          </p>
        )}
        {localStorage.getItem("name") ? (
          <button
            type="button"
            onClick={() => {
              logoutHandler();
            }}
          >
            Log out
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign up
          </button>
        )}
        <img src="" alt="" />
      </div>
    </div>
  );
}

export default Navbar;
