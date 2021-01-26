import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import ProgressBar from '../ProgressBar/ProgressBar';
import Slide from '../Slide/Slide';
import Button from '../Button/Button';

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

const slidesArr = img.map((item) => (<Slide id={item.id} to={item.to} />));

const App = () => (
  <div className="wrapper">
    <Slider
      width={700}
      height={300}
      slides={slidesArr}
      show={2}
      infiniteLoop
      isProgressBar
    />
  </div>
);

const Slider = ({
  width,
  height,
  slides,
  show = 1,
  infiniteLoop,
  isProgressBar,
}) => {
  const [length, setLength] = useState(slides.length);
  const [currentIndex, setCurrentIndex] = useState(infiniteLoop ? show : 0);
  const [currentIndicator, setCurrentIndicator] = useState(1);

  const [isRepeating, setIsRepeating] = useState(infiniteLoop && slides.length > show);
  const [isTransition, setTransitionEnabled] = useState(true);

  const [touchPosition, setTouchPosition] = useState(null);

  useEffect(() => {
    setLength(slides.length);
    setIsRepeating(infiniteLoop && slides.length > show);
  }, [slides, infiniteLoop, show]);

  useEffect(() => {
    if (isRepeating && (currentIndex === show || currentIndex === length)) {
      setTransitionEnabled(true);
    }
  }, [currentIndex, isRepeating, show, length, isTransition]);

  useEffect(() => {
    if (isRepeating && currentIndicator <= 0) {
      setCurrentIndicator(length);
    } else if (isRepeating && currentIndicator > length) {
      setCurrentIndicator(1);
    }
  }, [currentIndicator, isRepeating, length]);

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
      setCurrentIndicator((index) => (index - 1));
    }
  };

  const handleClickNext = () => {
    if (isRepeating || currentIndex < length - show) {
      setCurrentIndex((index) => (index + 1));
      setCurrentIndicator((index) => (index + 1));
    }
  };

  const handleClickIndicator = (e) => {
    const value = parseInt(e.target.value, 10);
    setCurrentIndex(value);
    setCurrentIndicator(value);
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
      output.push(slides[length - 1 - i]);
    }
    return output.reverse();
  };

  const renderNextSlide = () => {
    const output = [];
    for (let i = 0; i < show; i += 1) {
      output.push(slides[i]);
    }
    return output;
  };

  return (
    <div
      className="container"
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <div
        className="carousel__container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div
          className="carousel__slides"
          style={{
            display: 'flex',
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: !isTransition ? 'none' : undefined,
            width: `calc(100%/${show})`,
          }}
          onTransitionEnd={() => handleTransitionEnd()}
        >
          {
            (length > show && isRepeating)
            && renderPrevSlide()
          }
          {slides}
          {
            (length > show && isRepeating)
            && renderNextSlide()
          }
        </div>
      </div>
      {
        isProgressBar
        && (
        <ProgressBar
          length={length}
          currentIndex={currentIndicator}
          handleClickIndicator={handleClickIndicator}
        />
        )
      }
      {(isRepeating || currentIndex > 0) && <Button.Prev prev={handleClickPrev} />}
      {(isRepeating || currentIndex < (length - show)) && <Button.Next next={handleClickNext} />}
    </div>
  );
};

Slider.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  show: PropTypes.number.isRequired,
  infiniteLoop: PropTypes.bool.isRequired,
  isProgressBar: PropTypes.bool.isRequired,
  slides: PropTypes.elementType.isRequired,
};
export default App;
