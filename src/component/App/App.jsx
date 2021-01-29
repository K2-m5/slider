import React, { useState, useEffect } from 'react';
import Slider from '../Slider/Slider';

const img = [
  { to: './img/large_magellanic_cloud_galaxy.jpg' },
  { to: './img/milky_way_galaxy.jpg' },
  { to: './img/ngc_4414_galaxy.jpg' },
  { to: './img/andromeda_galaxy.jpg' },
  { to: './img/circinus_galaxy.jpg' },
  { to: './img/m33_hunter_wilson_galaxy.jpg' },
  { to: './img/ngc_55_galaxy.jpg' },
  { to: './img/spiral_galaxy_ngc_4945_galaxy.jpg' },
  { to: './img/m82_chandra_hst_spritzer_galaxy.jpg' },
  { to: './img/view_of_the_southern_spiral_ngc_300_galaxy.jpg' },
];

const img2 = [
  { to: './img/large_magellanic_cloud_galaxy.jpg' },
  { to: './img/milky_way_galaxy.jpg' },
  { to: './img/ngc_4414_galaxy.jpg' },
  { to: './img/view_of_the_southern_spiral_ngc_300_galaxy.jpg' },
];

const App = () => (
  <div>
    <div className="wrapper">
      <Slider
        width={600}
        height={300}
        slides={img2}
        show={2}
        infiniteLoop={false}
        isProgressBar
      />
    </div>
    <div className="wrapper">
      <Slider
        width={600}
        height={300}
        slides={img}
        show={2}
        infiniteLoop
        isProgressBar
      />
    </div>
  </div>
);

export default App;
