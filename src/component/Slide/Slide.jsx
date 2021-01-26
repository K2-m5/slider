import React from 'react';
import PropTypes from 'prop-types';

import './slide.less';

const Slide = ({
  id,
  to,
}) => (
  <div className={`carousel__slide slide__${id}`} key={`slide__${id}`}>
    <img src={to} alt="galaxy" />
  </div>
);

export default Slide;

Slide.propTypes = {
  id: PropTypes.number.isRequired,
  to: PropTypes.string.isRequired,
};
