import React from 'react';

import './progress-bar.less';

const ProgressBar = ({ length, currentIndex, handleClickIndicator }) => {
  const outPut = [];

  for (let i = 1; i < length + 1; i += 1) {
    outPut.push((
      <li>
        <button
          className={`progress__list_item item_${i} ${currentIndex === i ? 'item_selected' : ''}`}
          value={i}
          role="button"
          key={`progress__item__${i}`}
          onClick={handleClickIndicator}
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