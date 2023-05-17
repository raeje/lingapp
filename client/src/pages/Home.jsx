import React from "react";
import { Outlet } from "react-router-dom";
import { TopBar, NavBar } from "../components";

const Home = () => {
  return (
    <div className="bg-gray-200 h-screen w-screen flex flex-col place-items-center">
      <TopBar />
      <Outlet />
      <NavBar />
    </div>
  );
};

export default Home;
