import React from 'react';
import PropTypes from 'prop-types';

import './progress-bar.less';

const ProgressBar = ({ length, currentIndex, showSlide, handleClickIndicator }) => {
  const outPut = [];

  for (
    let i = showSlide;
    i < length + showSlide;
    i += 1
    ) {
    outPut.push((
      <button
        aria-label="item"
        key={`button_${i}`}
        className={`slider__navigation_button button_${i} ${currentIndex === i ? 'button_selected' : ''}`}
        value={i}
        type="button"
        onClick={(e) => handleClickIndicator(e)}
      />
    ))
  }

  return (
    <div className="slider__navigation" key="progress__list">
      {outPut}
    </div>
  );
};

export default ProgressBar;

ProgressBar.propTypes = {
  length: PropTypes.number.isRequired,
  currentIndex: PropTypes.number.isRequired,
  handleClickIndicator: PropTypes.func.isRequired,
};
