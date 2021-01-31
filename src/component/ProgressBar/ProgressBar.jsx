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
      <li  key={`progress__item__${i}`}>
        <button
          aria-label="item"
          className={`progress__list_item item_${i} ${currentIndex === i ? 'item_selected' : ''}`}
          value={i}
          type="button"
          onClick={(e) => handleClickIndicator(e)}
        />
      </li>));
  }

  return (
    <ul className="progress__list" key="progress__list">
      {outPut}
    </ul>
  );
};

export default ProgressBar;

ProgressBar.propTypes = {
  length: PropTypes.number.isRequired,
  currentIndex: PropTypes.number.isRequired,
  handleClickIndicator: PropTypes.func.isRequired,
};
