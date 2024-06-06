import React from "react";
import "./button.css";

const Button = ({ buttonText, styled }) => {
  return <button className={`bn30 ${styled}`}>{buttonText}</button>;
};

export default Button;
