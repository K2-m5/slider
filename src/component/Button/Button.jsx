import React from 'react';
import PropTypes from 'prop-types';

import './button.less';

const Button = ({
  onClick,
  icon,
  className,
}) => (
  <button className={`btn ${className}`} onClick={onClick} type="button">
    {icon}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired,
};

export default Button;
