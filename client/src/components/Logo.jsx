import React from "react";
import logo from "../images/logo.png";

const Logo = () => {
  return (
    <div className="h-12 flex nline-block align-middle content-center p-2 font-extrabold">
      <img src={logo} alt="lingapp-logo" className="h-8 w-8" />
      <p className="text-2xl ml-1 text-red-400">Ling</p>
      <p className="text-2xl text-red-500">App</p>
    </div>
  );
};

export default Logo;
