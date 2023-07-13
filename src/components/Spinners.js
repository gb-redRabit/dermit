import React from "react";
import PacmanLoader from "react-spinners/PacmanLoader";
const Spinners = () => {
  return (
    <PacmanLoader
      color="rgba(15, 23, 42, 1)"
      loading
      margin={-1}
      size={20}
      speedMultiplier={2}
    />
  );
};

export default Spinners;
