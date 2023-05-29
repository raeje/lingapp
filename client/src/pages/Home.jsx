import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { TopBar, NavBar, LeftSidebar, RightSidebar } from "../components";
import { getItem } from "../helpers/localStorage";

const RESPONSIVE_CLASS_NAMES = "md:bg-gray-50";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getItem("Authorization");

    if (!currentUser) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div
      className={`bg-gray-200 h-screen w-full max-w-screen overlap-y-hidden flex flex-col items-center ${RESPONSIVE_CLASS_NAMES}`}
    >
      <TopBar />
      <Outlet />
      {window.innerWidth < 767 ? (
        <NavBar />
      ) : (
        <>
          <LeftSidebar />
          <RightSidebar />
        </>
      )}
    </div>
  );
};

export default Home;
