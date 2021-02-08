import React from 'react';
import PropTypes from 'prop-types';

import './slide.less';

const Slide = ({
  children,
  className,
}) => (
  <div className={`slider__slide slide ${className}`}>
    {children}
  </div>
);

Slide.defaultProps = {
  className: '',
  children: <div />,
};

Slide.propTypes = {
  className: PropTypes.string,
  children: PropTypes.element,
};

export default Slide;
