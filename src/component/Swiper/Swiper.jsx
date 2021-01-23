import React from 'react';
import Card from '../Card/Card';

import './swiper.less';

const data = [
  './img/large_magellanic_cloud_galaxy.jpg',
  './img/milky_way_galaxy.jpg',
];

const Swiper = () => (
  <div className="container__carousel">
    <div className="carousel">
      <Card data={data} />
    </div>
  </div>
);

export default Swiper;
