import React from "react";

// reusable button component
const Button = (props) => {
  const { text, cls } = props;

  return (
    <button className={cls ? cls : 'defaultButton'}>{text}</button>
  )
}
export default Button;