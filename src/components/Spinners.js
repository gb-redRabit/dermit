import React from 'react';
import PacmanLoader from "react-spinners/PacmanLoader";
const Spinners = () => {
    return (
        <PacmanLoader
        color="rgba(214, 184, 54, 1)"
        cssOverride={{}}
        loading
        margin={-1}
        size={20}
        speedMultiplier={2}
      />
    );
}

export default Spinners;
