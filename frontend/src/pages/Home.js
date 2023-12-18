import React from "react";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import Login from "./Login";

function Home(props) {
  return (
    <div>
      <Navbar />
      <Carousel />
    </div>
  );
}

export default Home;
