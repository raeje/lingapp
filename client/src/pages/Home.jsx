import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { TopBar, NavBar } from "../components";
import { getItem } from "../helpers/localStorage";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getItem("Authorization");

    if (!currentUser) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="bg-gray-300 h-screen w-full max-w-screen overlap-y-hidden">
      <TopBar />
      <Outlet />
      <NavBar />
    </div>
  );
};

export default Home;
