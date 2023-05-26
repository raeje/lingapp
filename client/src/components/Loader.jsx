import React from "react";
import PacmanLoader from "react-spinners/PacmanLoader";

const Loader = ({ color = "rgb(248 113 113)", isLoading }) => {
  console.log("render loader...");
  return (
    <PacmanLoader
      color={color}
      loading={isLoading}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default Loader;
