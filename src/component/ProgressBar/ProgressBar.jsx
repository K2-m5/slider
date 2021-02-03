import React from 'react';
import PropTypes from 'prop-types';

import './progress-bar.less';

const ProgressBar = ({ length, currentIndex, slidesPerView, onClickIndicator }) => {
  const outPut = [];

  for (let i = slidesPerView; i < length + slidesPerView; i += 1) {
    outPut.push((
      <button
        aria-label="item"
        key={`button_${i}`}
        className={`slider__navigation_button ${currentIndex === i ? 'button_selected' : ''}`}
        value={i}
        type="button"
        onClick={(e) => onClickIndicator(e)}
      />
    ))
  }

  return (
    <div className="slider__navigation" key="progress__list">
      {outPut}
    </div>
  );
};


ProgressBar.propTypes = {
  length: PropTypes.number.isRequired,
  currentIndex: PropTypes.number.isRequired,
  onClickIndicator: PropTypes.func.isRequired,
  slidesPerView: PropTypes.number.isRequired,
};

export default ProgressBar;
