import React from "react";
import clsx from "clsx";
import '../../../styles/button.css';
import PropTypes from "prop-types";

// reusable button component
const Button = (props) => {
  const { text, cls, onClick } = props;

  return (
    <button className={clsx(['btnBase', cls && cls])} onClick={onClick} value={text}>
      {text}
    </button>
  );
}

Button.defaultProps = {
  text: '',
  cls: undefined,
  onClick: () => {}
}

Button.propTypes = {
  text: PropTypes.string,
  cls: PropTypes.string,
  onClick: PropTypes.func.isRequired
}

export default Button;