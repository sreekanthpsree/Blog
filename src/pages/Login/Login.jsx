import React, { useState } from "react";
// import Logo from "../../olx-logo.png";
import "./Login.css";
import { collection, db } from "../../firebase/config";

import { useNavigate } from "react-router-dom";
import { getDocs, query, where } from "firebase/firestore/lite";

function Login() {
  const [loginValues, setLoginValues] = useState({});

  const [errorLoginValues, setLoginErrorValues] = useState({});
  const loginHandle = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setLoginValues({ ...loginValues, [name]: value });
  };
  const Navigate = useNavigate();

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      errors.email = "Email required";
    } else if (!regex.test(values.email)) {
      errors.email = "Please enter a valid email";
    }
    if (!values.password) {
      errors.password = "Password required";
    }

    return errors;
  };
  const loginSubmitHandle = async (e) => {
    e.preventDefault();
    setLoginErrorValues(validate(loginValues));

    const userDetails = query(
      collection(db, "users"),
      where("email", "==", loginValues.email),
      where("password", "==", loginValues.password)
    );
    const snap = await getDocs(userDetails);
    snap.forEach((doc) => {
      const userData = doc.data();
      localStorage.setItem("name", userData.username);
      localStorage.setItem("phone", userData.phone);
      localStorage.setItem("email", userData.email);
      localStorage.setItem("email", userData.email);
      localStorage.setItem("id", userData.id);
    });
    Navigate("/");
  };

  return (
    <div>
      <div className="loginParentDiv">
        <form>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            value={loginValues.email}
            className="input"
            type="email"
            id="fname"
            name="email"
            onChange={loginHandle}
          />
          <p>{errorLoginValues.email}</p>
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            value={loginValues.password}
            className="input"
            type="password"
            id="lname"
            name="password"
            onChange={loginHandle}
          />
          <p>{errorLoginValues.password}</p>
          <br />
          <br />
          <button onClick={loginSubmitHandle}>Login</button>
        </form>
        <a
          onClick={() => {
            Navigate("/signup");
          }}
        >
          Signup
        </a>
      </div>
    </div>
  );
}

export default Login;
