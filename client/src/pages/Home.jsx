import React from "react";
import { Outlet } from "react-router-dom";
import { TopBar, NavBar } from "../components";

const Home = () => {
  return (
    <div className="bg-gray-300 h-screen w-full max-w-screen overlap-y-hidden">
      <TopBar />
      <Outlet />
      <NavBar />
    </div>
  );
};

export default Home;
