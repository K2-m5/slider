import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Slide from '../Slide/Slide';
import Button from '../Button/Button';
import ProgressBar from '../ProgressBar/ProgressBar';

import './slider.less';

const Slider = ({
  children,
  showSlide,
  infiniteLoop,
  isProgressBar,
}) => {
  const [length, setLength] = useState(children.length);
  const [currentIndex, setCurrentIndex] = useState(infiniteLoop ? showSlide : 0);
  const [currentIndicator, setCurrentIndicator] = useState(infiniteLoop ? showSlide : 0);

  const [isRepeating, setIsRepeating] = useState(infiniteLoop && children.length >= showSlide);
  const [isTransition, setTransition] = useState(true);

  const [touchPosition, setTouchPosition] = useState(null);

  useEffect(() => {
    setLength(children.length);
    setIsRepeating(infiniteLoop && children.length > showSlide);
  }, [children, infiniteLoop, showSlide]);

  useEffect(() => {
    if (isRepeating && (currentIndex === showSlide || currentIndex === length)) {
      setTransition(true);
    }
  }, [currentIndex, isRepeating, showSlide, length, isTransition]);

  useEffect(() => {
    if (isRepeating && currentIndicator < showSlide) {
      setCurrentIndicator(index => index + length);
    } else if (isRepeating && currentIndicator === (length + showSlide)) {
      setCurrentIndicator(showSlide);
    }
  }, [currentIndicator, isRepeating, length]);

  const handleTransitionEnd = () => {
    if (isRepeating) {
      if (currentIndex === 0) {
        setTransition(false);
        setCurrentIndex(length);
      } else if (currentIndex === length + showSlide) {
        setTransition(false);
        setCurrentIndex(showSlide);
      }
    }
  };

  const handleClickPrev = () => {
    if ((isRepeating || currentIndex > 0) && currentIndex !== 0) {
      setCurrentIndex((index) => (index - 1));
      setCurrentIndicator((index) => (index - 1));
    }
  };

  const handleClickNext = () => {
    if ((isRepeating || currentIndex < length - showSlide) && currentIndex !== (length + showSlide)) {
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
    for (let i = 0; i < showSlide; i += 1) {
      output.push(children[length - 1 - i]);
    }

    return output.reverse();
  };

  const renderNextSlide = () => {
    const output = [];
    for (let i = 0; i < showSlide; i += 1) {
      output.push(children[i]);
    }

    return output;
  };

  return (
    <div
      className="carousel__container-main"
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
            width: `calc(100%/${showSlide})`,
          }}
          onTransitionEnd={() => handleTransitionEnd()}
        >
          {
            (length >= showSlide && isRepeating)
            && renderPrevSlide()
          }
          {children}
          {
            (length >= showSlide && isRepeating)
            && renderNextSlide()
          }
        </div>
      </div>
      {
        !isProgressBar
        || (
        <ProgressBar
          length={isRepeating ? length : showSlide === 1 ? length : length - 1}
          showSlide={isRepeating ? showSlide : 0}
          currentIndex={currentIndicator}
          handleClickIndicator={handleClickIndicator}
        />
        )
      }
      {(isRepeating || currentIndex > 0) && <Button.Prev prev={handleClickPrev} />}
      {(isRepeating || currentIndex < length - showSlide) && <Button.Next next={handleClickNext} />}
    </div>
  );
};

Slider.defaultProps = {
  width: 600,
  height: 250,
  showSlide: 1,
  infiniteLoop: false,
  isProgressBar: false,
};

Slider.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  showSlide: PropTypes.number.isRequired,
  infiniteLoop: PropTypes.bool.isRequired,
  isProgressBar: PropTypes.bool.isRequired,
};

export default Slider;
