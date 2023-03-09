import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
// import { Blog, Footer, Header, Navbar } from "./container";
import Home from "./pages/Home/Home";
import { Navbar } from "./container";
import Form from "./pages/Form/Form";
function App() {
  return (
    <div>
      <Router>
        <div className="blog_background">
          <Navbar />
        </div>
        <Routes>
          <Route element={<Home />} exact path="/"></Route>
          <Route element={<Signup />} path="/signup"></Route>
          <Route element={<Login />} path="/login"></Route>
          <Route element={<Form />} path="/form/:id"></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
