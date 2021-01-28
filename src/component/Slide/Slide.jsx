import React from 'react';
import PropTypes from 'prop-types';

import './slide.less';

const Slide = ({
  index,
  to,
}) => (
  <div className={`carousel__slide slide__${index}`}>
    <img src={to} alt="galaxy" />
  </div>
);

export default Slide;

Slide.propTypes = {
  index: PropTypes.number.isRequired,
  to: PropTypes.string.isRequired,
};
