import React, { useState } from 'react';

const App = () => (
  <div className="wrapper">
    <Slider />
  </div>
);

const Slider = () => {
  const [transform, setTransform] = useState('0');
  const [slide, setSlide] = useState(0);

  const img = [
    { to: './img/large_magellanic_cloud_galaxy.jpg', transform: 0 },
    { to: './img/milky_way_galaxy.jpg', transform: 0 },
    { to: './img/NGC_4414_galaxy.jpg', transform: 0 },
  ];

  const handleClickPrev = () => {
    console.log(slide, transform);
    setSlide((slide + 1));
    setTransform(`${(slide + 1) * 100}%`);
  };

  const handleClickNext = () => {
    setSlide((slide - 1));
    setTransform(`${(slide - 1) * 100}%`);
    console.log(slide, transform);
  };

  return (
    <div className="container">
      <div className="carousel__container">
        <div className="carousel__slides" style={{ transform: `translateX(${transform})` }}>
          <Card data={img} />
        </div>
      </div>
      <button onClick={handleClickPrev} className="btn btn__left" type="button">Left</button>
      <button onClick={handleClickNext} className="btn btn__right" type="button">Right</button>
    </div>
  );
};

const Card = ({ data }) => (
  (
    data.map((i, index) => (
      <div className="carousel__slide" key={index}>
        <img src={i.to} style={{ transform: `translateX(${i.transform})` }} alt="galaxy" />
      </div>
    ))
  )
);

export default App;
