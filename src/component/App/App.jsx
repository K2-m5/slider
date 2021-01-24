import React, { useState, useEffect } from 'react';

const img = [
  { id: 1, to: './img/large_magellanic_cloud_galaxy.jpg', transform: 0 },
  { id: 2, to: './img/milky_way_galaxy.jpg', transform: 0 },
  { id: 3, to: './img/NGC_4414_galaxy.jpg', transform: 0 },
];

const App = () => (
  <div className="wrapper">
    <Slider />
  </div>
);

const Slider = () => {
  const [length, setLength] = useState(img.length);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setLength(img.length);
  }, [img.length]);

  const handleClickPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((index) => (index - 1));
    }
  };

  const handleClickNext = () => {
    if (currentIndex < (length - 1)) {
      setCurrentIndex((index) => (index + 1));
    }
  };

  return (
    <div className="container">
      <div className="carousel__container">
        <div className="carousel__slides" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          <Card data={img} />
        </div>
      </div>
      {currentIndex > 0 && (
        <button className="btn btn__left" onClick={handleClickPrev} type="button">
          <svg width="16px" height="27px" viewBox="0 0 16 27" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" space="preserve" serif="http://www.serif.com/">
            <path d="M15.302,4.008C16.233,3.091 16.233,1.645 15.3,0.729C14.311,-0.243 12.663,-0.243 11.675,0.729L0.955,11.261C-0.318,12.512 -0.318,14.488 0.955,15.739L11.675,26.271C12.663,27.243 14.311,27.243 15.3,26.271C16.233,25.355 16.233,23.909 15.302,22.992L7.934,15.737C6.663,14.486 6.663,12.514 7.934,11.263L15.302,4.008Z" />
          </svg>
        </button>
      )}
      {currentIndex < (length - 1) && (
        <button className="btn btn__right" onClick={handleClickNext} type="button">
          <svg width="16px" height="27px" viewBox="0 0 16 27" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" serif="http://www.serif.com/">
            <path d="M0.698,22.992C-0.233,23.909 -0.233,25.355 0.7,26.271C1.689,27.243 3.337,27.243 4.325,26.271L15.045,15.739C16.318,14.488 16.318,12.512 15.045,11.261L4.325,0.729C3.337,-0.243 1.689,-0.243 0.7,0.729C-0.233,1.645 -0.233,3.091 0.698,4.008L8.066,11.263C9.337,12.514 9.337,14.486 8.066,15.737L0.698,22.992Z" />
          </svg>
        </button>
      )}
    </div>
  );
};

const Card = ({ data }) => (
  (
    data.map((i) => (
      <div className="carousel__slide" key={i.id}>
        <img src={i.to} style={{ transform: `translateX(${i.transform})` }} alt="galaxy" />
      </div>
    ))
  )
);

export default App;
