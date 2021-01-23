import React from 'react';

import './card.less';

const Card = ({ data }) => (
  (
    data.map((i) => (
      <div className="card">
        <img src={i} key={i} alt="galaxy" />
      </div>
    ))
  )
);

export default Card;
