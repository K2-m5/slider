import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

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

  const carouselRef = useRef();
  const [scrollingState, setScrollingState] = useState({
    isScrolling: false,
    clientX: 0,
    scrollX: 0,
  });

  useEffect(() => {
    document.addEventListener('mousedown', handleOnMouseDown);
    document.addEventListener('mousemove', handleOnMouseMove);
    document.addEventListener('mouseup', handleOnMouseUp);
    document.addEventListener('mouseleave', handleOnMouseLeave);

    return () => {
      document.removeEventListener('mousedown', handleOnMouseDown);
      document.removeEventListener('mousemove', handleOnMouseMove);
      document.removeEventListener('mouseup', handleOnMouseUp);
      document.removeEventListener('mouseleave', handleOnMouseLeave);
    }
  }, [])

  useEffect(() => {
    setLength(children.length);
    setIsRepeating(infiniteLoop && children.length > showSlide);
  }, [children, infiniteLoop, showSlide]);

  useEffect(() => {
    if (isRepeating && (currentIndex === showSlide || currentIndex === length)) {
      setTransition(true);
    }
  }, [currentIndex, isRepeating, showSlide, length]);

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

  const handleOnMouseDown = e => {
    if (carouselRef && carouselRef.current && !carouselRef.current.contains(e.target)) {
      return;
    }

    e.preventDefault();
    carouselRef.current.style.transition = '0s';
    setScrollingState({
      ...scrollingState,
      isScrolling: true,
      clientX: e.clientX,
    })
  }

  const handleOnMouseMove = (e) => {
    if (!carouselRef && !carouselRef.current && !carouselRef.current.contains(e.target)) {
      return;
    }
    
    const { isScrolling, clientX } = scrollingState;
    const currenClick = e.clientX;

    if (isScrolling) {
      const scrX = ((clientX - currenClick )/carouselRef.current.clientWidth) ;
      carouselRef.current.style.transform = `translateX(-${(scrX + currentIndex) * 100}%)`;

      setScrollingState({
        ...scrollingState,
        scrollX: scrX
      });
    }
  }

  const changeSlideHandle = () => {

    carouselRef.current.style.transition = '.2s';

    if (scrollingState.scrollX > 0) {
      handleClickNext();
    }

    if (scrollingState.scrollX < 0) {
      handleClickPrev();
    }
  }

  const handleOnMouseUp = (e) => {
    if (carouselRef && carouselRef.current && !carouselRef.current.contains(e.target)) {
      return;
    }

    e.preventDefault();

    if (!scrollingState.isScrolling) {
      return;
    }

    changeSlideHandle();
    setScrollingState({
      ...scrollingState,
      isScrolling: false,
      scrollX: 0,
      clientX: 0,
    })
  }

  const handleOnMouseLeave = (e) => {
    if (!scrollingState.isScrolling) {
      return;
    }

    e.preventDefault();
    changeSlideHandle();
    setScrollingState({
      ...scrollingState,
      isScrolling: false,
    });
  }

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
    <div className="carousel__container">
      <div
        ref={carouselRef}
        className="carousel__slides"
        style={{
          display: 'flex',
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: !isTransition ? 'none' : undefined,
          width: `calc(100%/${showSlide})`,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onMouseDown={handleOnMouseDown}
        onMouseUp={handleOnMouseUp}
        onMouseMove={handleOnMouseMove}
        onMouseLeave={handleOnMouseLeave}
        onTransitionEnd={handleTransitionEnd}
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
