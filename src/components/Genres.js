import React from "react";

const Genres = ({ text, typ, click }) => {
  if (typ !== "big")
    return (
      <button
        onClick={click}
        className="text-sm flex justify-center items-center p-2  bg-gray-950 rounded text-white  text-center hover:text-yellow-500 hover:bg-gray-600 cursor-pointer"
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
