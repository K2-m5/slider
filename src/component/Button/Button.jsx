import React from 'react';
import PropTypes from 'prop-types';

import './button.less';

const Button = ({
  children,
  onClick,
  icon,
  className,
}) => (
  <button className={`slider__btn ${className}`} onClick={onClick} type="button">
    {children && children}
    {icon && icon}
  </button>
);

Button.defaultProps = {
  children: [],
  onClick: () => {},
  icon: [],
  className: "",
};

Button.propTypes = {
  children: PropTypes.any.isRequired,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.any.isRequired,
  className: PropTypes.string.isRequired,
};

export default Button;
