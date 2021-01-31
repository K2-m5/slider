import React from 'react';
import PropTypes from 'prop-types';

import './slide.less';

const Slide = ({
  to,
}) => (
  <div className={`carousel__slide slide`}>
    <img src={to} alt="galaxy" />
  </div>
);

export default Slide;

Slide.propTypes = {
  to: PropTypes.string.isRequired,
};
