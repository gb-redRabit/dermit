import React from "react";

const Typography = ({ text, size = "text-2xl" }) => {
  return <h1 className={`${size} font-medium text-white`}>{text}</h1>;
};

export default Typography;
