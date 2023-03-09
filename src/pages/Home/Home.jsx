import React from "react";
import "./Home.css";
import { Blog, Footer, Header } from "../../container/index";

function Home() {
  return (
    <div>
      <div className="blog_background">
        <Header />
      </div>
      <Blog />
      <Footer />
    </div>
  );
}

export default Home;
