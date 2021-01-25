import React, { useState, useEffect} from 'react';

const img = [
  { id: 1, to: './img/large_magellanic_cloud_galaxy.jpg' },
  { id: 2, to: './img/milky_way_galaxy.jpg' },
  { id: 3, to: './img/ngc_4414_galaxy.jpg' },
  { id: 4, to: './img/andromeda_galaxy.jpg' },
  { id: 5, to: './img/circinus_galaxy.jpg' },
  { id: 6, to: './img/m33_hunter_wilson_galaxy.jpg' },
  { id: 7, to: './img/ngc_55_galaxy.jpg' },
  { id: 8, to: './img/spiral_galaxy_ngc_4945_galaxy.jpg' },
  { id: 9, to: './img/m82_chandra_hst_spritzer_galaxy.jpg' },
  { id: 10, to: './img/view_of_the_southern_spiral_ngc_300_galaxy.jpg' },
];

const Slide = ({
  id,
  to,
}) => (
  <div className={`carousel__slide slide__${id}`} key={`slide__${id}`}>
    <img src={to} alt="galaxy" />
  </div>
);

const slides = img.map((item) => (<Slide id={item.id} to={item.to} />));

const App = () => (
  <div className="wrapper">
    <Slider
      children={slides}
      show={2}
      infiniteLoop
    />
  </div>
);

const Slider = ({
  children,
  show,
  infiniteLoop,
}) => {
  const [length, setLength] = useState(children.length);
  const [currentIndex, setCurrentIndex] = useState(infiniteLoop ? show : 0);

  const [isRepeating, setIsRepeating] = useState(infiniteLoop && children.length > show);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  const [touchPosition, setTouchPosition] = useState(null);

  useEffect(() => {
    setLength(children.length);
    setIsRepeating(infiniteLoop && children.length > show);
  }, [children, infiniteLoop, show]);

  useEffect(() => {
    if (isRepeating) {
      if (currentIndex === show || currentIndex === length) {
        setTransitionEnabled(true);
      }
    }
  }, [currentIndex, isRepeating, show, length]);

  const handleTransitionEnd = () => {
    if (isRepeating) {
      if (currentIndex === 0) {
        setTransitionEnabled(false);
        setCurrentIndex(length);
      } else if (currentIndex === length + show) {
        setTransitionEnabled(false);
        setCurrentIndex(show);
      }
    }
  };

  const handleClickPrev = () => {
    if (isRepeating || currentIndex > 0) {
      setCurrentIndex((index) => (index - 1));
    }
  };

  const handleClickNext = () => {
    if (isRepeating || currentIndex < (length - show)) {
      setCurrentIndex((index) => (index + 1));
    }
  };

  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  const handleTouchMove = (e) => {
    const touchDown = touchPosition;

    if (touchDown === null) {
      return;
    }

    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;

    if (diff > 5) {
      handleClickNext();
    }

    if (diff < -5) {
      handleClickPrev();
    }

    setTouchPosition(null);
  };

  const renderPrevSlide = () => {
    const output = [];
    for (let i = 0; i < show; i += 1) {
      output.push(children[length - 1 - i]);
    }
    return output.reverse();
  };

  const renderNextSlide = () => {
    const output = [];
    for (let i = 0; i < show; i += 1) {
      output.push(children[i]);
    }
    return output;
  };

  return (
    <div className="container">
      <div
        className="carousel__container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div
          className="carousel__slides"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: !transitionEnabled ? 'none' : undefined,
            width: `calc(100%/${show})`,
          }}
          onTransitionEnd={() => handleTransitionEnd()}
        >
          {
            (length > show && isRepeating)
            && renderPrevSlide()
          }
          {children}
          {
            (length > show && isRepeating)
            && renderNextSlide()
          }
        </div>
      </div>
      {(isRepeating || currentIndex > 0) && (
        <button className="btn btn__left" onClick={() => handleClickPrev()} type="button">
          <svg width="16px" height="27px" viewBox="0 0 16 27" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" space="preserve" serif="http://www.serif.com/">
            <path d="M15.302,4.008C16.233,3.091 16.233,1.645 15.3,0.729C14.311,-0.243 12.663,-0.243 11.675,0.729L0.955,11.261C-0.318,12.512 -0.318,14.488 0.955,15.739L11.675,26.271C12.663,27.243 14.311,27.243 15.3,26.271C16.233,25.355 16.233,23.909 15.302,22.992L7.934,15.737C6.663,14.486 6.663,12.514 7.934,11.263L15.302,4.008Z" />
          </svg>
        </button>
      )}
      {(isRepeating || currentIndex < (length - show)) && (
        <button className="btn btn__right" onClick={() => handleClickNext()} type="button">
          <svg width="16px" height="27px" viewBox="0 0 16 27" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" serif="http://www.serif.com/">
            <path d="M0.698,22.992C-0.233,23.909 -0.233,25.355 0.7,26.271C1.689,27.243 3.337,27.243 4.325,26.271L15.045,15.739C16.318,14.488 16.318,12.512 15.045,11.261L4.325,0.729C3.337,-0.243 1.689,-0.243 0.7,0.729C-0.233,1.645 -0.233,3.091 0.698,4.008L8.066,11.263C9.337,12.514 9.337,14.486 8.066,15.737L0.698,22.992Z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default App;
