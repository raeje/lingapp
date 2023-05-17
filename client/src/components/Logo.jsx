import React from "react";
import logo from "../images/logo.png";

const Logo = () => {
  return (
    <div className="h-30 flex content-center p-2 font-extrabold">
      <img src={logo} alt="lingapp-logo" className="h-12" />
      <p className="text-3xl mt-2 ml-2 text-red-400">Ling</p>
      <p className="text-3xl mt-2 text-red-500">app</p>
    </div>
  );
};

export default Logo;
