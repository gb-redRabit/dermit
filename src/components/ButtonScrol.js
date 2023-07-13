import React, { useState } from "react";
import { IconContext } from "react-icons";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
const ButtonScrol = () => {
  const [disable, setDisable] = useState(false);
  const topScrol = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > 2500) {
        setDisable(true);
      } else {
        setDisable(false);
      }
    },
    { passive: true }
  );

  return (
    disable && (
      <IconContext.Provider
        value={{
          className:
            "text-4xl text-white fixed right-16 bottom-5 cursor-pointer hover:text-yellow-500  animate-pulse ",
        }}
      >
        <BsFillArrowUpCircleFill onClick={topScrol} />
      </IconContext.Provider>
    )
  );
};

export default ButtonScrol;
