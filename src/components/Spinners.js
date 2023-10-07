import React from "react";
import PacmanLoader from "react-spinners/PacmanLoader";
const Spinners = () => {
  return (
    <PacmanLoader
      color="rgba(234,179,8, 1)"
      loading
      margin={-1}
      size={60}
      speedMultiplier={2}
    />
  );
};

export default Spinners;
