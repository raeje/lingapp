import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { useScrollDirection } from "../hooks";
import { RiLogoutBoxLine } from "react-icons/ri";
import { setItem } from "../helpers/localStorage";

const TopBar = () => {
  const scrollDirection = useScrollDirection();
  const navigate = useNavigate();

  const handleLogout = () => {
    setItem("Authorization", "");
    navigate("/login");
  };

  return (
    <div
      className={`sticky h-12 w-full flex justify-between place-items-center border-b-2 border-red-900 z-30 ${
        scrollDirection === "down" ? "-top-12" : "top-0"
      } bg-white `}
    >
      <Logo />

      <button
        className="p-2 mr-1 first-line:rounded-md"
        onClick={() => handleLogout()}
      >
        <RiLogoutBoxLine className="h-6 w-6 text-gray-700" />
      </button>
    </div>
  );
};

export default TopBar;
