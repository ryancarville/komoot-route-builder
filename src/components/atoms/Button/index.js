import React from "react";
import clsx from "clsx";
import '../../../styles/button.css';

// reusable button component
const Button = (props) => {
  const { text, cls, onClick } = props;

  return (
    <button className={clsx(['btnBase', cls && cls])} onClick={onClick}>
      {text}
    </button>
  );
}
export default Button;