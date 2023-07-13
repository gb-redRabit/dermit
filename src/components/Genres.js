import React from "react";

const Genres = ({ text, typ, click }) => {
  const activeBackground = (e) => {
    e.target.style.color = "rgb(234,179,8)";
  };
  if (typ !== "big")
    return (
      <button
        onClick={(e) => {
          click(e);
          activeBackground(e);
        }}
        className="text-sm flex justify-center items-center p-2  bg-gray-950 rounded text-white transition-all duration-300 ease-linear text-center hover:text-yellow-500 hover:bg-gray-600 cursor-pointer"
      >
        {text}
      </button>
    );
  else
    return (
      <buton className="text-lm border-solid border-2 border-gray-500 rounded-xl text-white px-5 py-2 text-center  ">
        {text}
      </buton>
    );
};

export default Genres;
