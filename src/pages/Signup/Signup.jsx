import "./Signup.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, addDoc, collection, db } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { validate } from "./validateForm";
export default function Signup() {
  const navigate = useNavigate();
  const initialValue = {
    username: "",
    phone: "",
    password: "",
    email: "",
  };
  const [userDetails, setuserDetails] = useState(initialValue);
  const [errorValues, setErrorvalues] = useState({});
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setuserDetails({ ...userDetails, [name]: value });
  };

  const users = collection(db, "users");
  const submitHandler = (e) => {
    e.preventDefault();

    setErrorvalues(validate(userDetails));

    createUserWithEmailAndPassword(
      auth,
      userDetails.email,
      userDetails.password
    )
      .then((userCredential) => {
        addDoc(users, {
          id: userCredential.user.uid,
          username: userDetails.username,
          phone: userDetails.phone,
          email: userDetails.email,
          password: userDetails.password,
        }).then(() => {
          localStorage.setItem("name", userDetails.username);
          localStorage.setItem("email", userDetails.email);
          localStorage.setItem("phone", userDetails.phone);

          alert("User created successfully");
          navigate("/");
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
      });
  };

  return (
    <div>
      <div></div>
      <div className="signupParentDiv">
        <form>
          <div className="blog_signup-input"></div>
          <label htmlFor="fname">Username: </label>
          <input
            value={userDetails.username}
            className="input"
            onChange={handleChange}
            type="text"
            id="fname"
            name="username"
          />
          <p>{errorValues.username}</p>
          <label htmlFor="fname">Email:</label>

          <input
            value={userDetails.email}
            onChange={handleChange}
            className="input"
            type="email"
            id="fname"
            name="email"
          />
          <p>{errorValues.email}</p>

          <label htmlFor="lname">Phone:</label>

          <input
            value={userDetails.phone}
            onChange={handleChange}
            className="input"
            type="number"
            id="lname"
            name="phone"
          />
          <p>{errorValues.phone}</p>

          <label htmlFor="lname">Password:</label>

          <input
            value={userDetails.password}
            onChange={handleChange}
            className="input"
            type="password"
            id="lname"
            name="password"
          />
          <p>{errorValues.password}</p>

          <button onClick={submitHandler}>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
