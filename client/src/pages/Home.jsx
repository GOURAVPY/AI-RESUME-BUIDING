import React from "react";
import { Banner, Hero, Feature, Testimonial, CallToAction, Footre } from "../components";

const Home = () => {
  return (
    <div className=" selection:bg-green-400">
      <Banner />
      <Hero />
      <Feature />
      <Testimonial />
      <CallToAction />
      <Footre />
    </div>
  );
};

export default Home;
