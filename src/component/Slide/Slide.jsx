import React from 'react';

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
