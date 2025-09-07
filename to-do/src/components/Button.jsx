import React from "react";

const Button = ({ text, color, textcolor, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`${color} ${textcolor} px-3 py-1 rounded`}
    >
      {text}
    </button>
  );
};

export default Button;
