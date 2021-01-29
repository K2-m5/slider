import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Slide from '../Slide/Slide';
import Button from '../Button/Button';
import ProgressBar from '../ProgressBar/ProgressBar';

import './slider.less';

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
  const [currentIndicator, setCurrentIndicator] = useState(infiniteLoop ? show : 0);

  const [isRepeating, setIsRepeating] = useState(infiniteLoop && slides.length >= show);
  const [isTransition, setTransition] = useState(true);

  const [touchPosition, setTouchPosition] = useState(null);

  useEffect(() => {
    setLength(slides.length);
    setIsRepeating(infiniteLoop && slides.length > show);
  }, [slides, infiniteLoop, show]);

  useEffect(() => {
    if (isRepeating && (currentIndex === show || currentIndex === length)) {
      setTransition(true);
    }
  }, [currentIndex, isRepeating, show, length, isTransition]);

  useEffect(() => {
    if (isRepeating && currentIndicator < show) {
      setCurrentIndicator(index => index + length);
    } else if (isRepeating && currentIndicator === (length + show)) {
      setCurrentIndicator(show);
    }
  }, [currentIndicator, isRepeating, length]);

  const handleTransitionEnd = () => {
    if (isRepeating) {
      if (currentIndex === 0) {
        setTransition(false);
        setCurrentIndex(length);
      } else if (currentIndex === length + show) {
        setTransition(false);
        setCurrentIndex(show);
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
    if ((isRepeating || currentIndex < length - show) && currentIndex !== (length + show)) {
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
      const {to} = slides[length - 1 - i]
      output.push(<Slide index={length - i} to={to} key={`transition__slide__${length - i}`} />);
    }

    return output.reverse();
  };

  const renderNextSlide = () => {
    const output = [];
    for (let i = 0; i < show; i += 1) {
      const { to } = slides[i]
      output.push(<Slide index={show - i} to={to} key={`transition__slide__${show - i}`} />);
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
            (length >= show && isRepeating)
            && renderPrevSlide()
          }
          {slides.map((item, i) => (<Slide index={i + 1} to={item.to} key={`slide__key__${i}`} />))}
          {
            (length >= show && isRepeating)
            && renderNextSlide()
          }
        </div>
      </div>
      {
        isProgressBar
        && show === length
        || (
        <ProgressBar
          length={isRepeating ? length : show === 1 ? length : length - 1}
          show={isRepeating ? show : 0}
          currentIndex={currentIndicator}
          handleClickIndicator={handleClickIndicator}
        />
        )
      }
      {(isRepeating || currentIndex > 0) && <Button.Prev prev={handleClickPrev} />}
      {(isRepeating || currentIndex < length - show) && <Button.Next next={handleClickNext} />}
    </div>
  );
};

Slider.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  show: PropTypes.number.isRequired,
  infiniteLoop: PropTypes.bool.isRequired,
  isProgressBar: PropTypes.bool.isRequired,
  slides: PropTypes.array.isRequired,
};

export default Slider;
