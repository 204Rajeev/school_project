import React from "react";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import Login from "./Login";
import Footer from "../components/Footer";
import About from "./About";

function Home(props) {
  return (
    <div>
      <Navbar />
      <Carousel />
      <About/>
      <Footer/>
    </div>
  );
}

export default Home;
