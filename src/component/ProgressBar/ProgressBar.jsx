import React from 'react';
import PropTypes from 'prop-types';

import './progress-bar.less';

const ProgressBar = ({ length, currentIndex, handleClickIndicator }) => {
  const outPut = [];

  for (let i = 0; i < length; i += 1) {
    outPut.push((
      <li>
        <button
          aria-label="item"
          className={`progress__list_item item_${i} ${currentIndex === i ? 'item_selected' : ''}`}
          value={i}
          type="button"
          key={`progress__item__${i}`}
          onClick={(e) => handleClickIndicator(e)}
        />
      </li>));
  }

  return (
    <ul className="progress__list">
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
