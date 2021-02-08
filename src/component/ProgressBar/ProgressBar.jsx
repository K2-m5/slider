import React from 'react';
import PropTypes from 'prop-types';

import './progress-bar.less';

const ProgressBar = ({
  lengthSlides,
  currentIndex,
  slidesPerView,
  onIndicatorClick,
}) => {
  const output = [];

  for (let i = slidesPerView; i < lengthSlides + slidesPerView; i += 1) {
    output.push((
      <button
        aria-label="item"
        key={`button_${i}`}
        className={`slider__navigation_button ${currentIndex === i ? 'button_selected' : ''}`}
        value={i}
        type="button"
        onClick={(e) => onIndicatorClick(e)}
      />
    ));
  }

  return (
    <div className="slider__navigation" key="progress__list">
      {output}
    </div>
  );
};

ProgressBar.propTypes = {
  lengthSlides: PropTypes.number.isRequired,
  currentIndex: PropTypes.number.isRequired,
  onIndicatorClick: PropTypes.func.isRequired,
  slidesPerView: PropTypes.number.isRequired,
};

export default ProgressBar;
