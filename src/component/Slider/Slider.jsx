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
    setTimeout(() => {
      setTransition(true);
    }, 0);
  };

  const handleClickPrev = () => {
    if ((isRepeating || currentIndex > 0) && currentIndex !== 0 && isTransition) {
      setCurrentIndex((index) => (index - 1));
      setCurrentIndicator((index) => (index - 1));
    }
  };

  const handleClickNext = () => {
    if ((isRepeating || currentIndex < length - showSlide) && currentIndex !== (length + showSlide) && isTransition) {
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

    let clientDownX;
    if (e.type === 'touchstart') {
      clientDownX = e.touches[0].clientX;
    } else {
      e.preventDefault();
      clientDownX = e.clientX;
    }

    carouselRef.current.style.transition = '0s';
    setScrollingState({
      ...scrollingState,
      isScrolling: true,
      clientX: clientDownX,
    })
  }

  const handleOnMouseMove = (e) => {
    if (!carouselRef && !carouselRef.current && !carouselRef.current.contains(e.target)) {
      return;
    }

    let currenClick;
    if (e.type === 'touchmove') {
      currenClick = e.touches[0].clientX;
    } else {
      e.preventDefault();
      currenClick = e.clientX;
    }
    const { isScrolling, clientX } = scrollingState;

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

    if (scrollingState.scrollX > 0.2) {
      handleClickNext();
    } else if (scrollingState.scrollX < -0.2) {
      handleClickPrev();
    } else {
      carouselRef.current.style.transform = `translateX(-${(currentIndex) * 100}%)`;
    }
  }

  const handleOnMouseUp = (e) => {
    if (carouselRef && carouselRef.current && !carouselRef.current.contains(e.target)) {
      return;
    }

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
        onTouchStart={handleOnMouseDown}
        onTouchMove={handleOnMouseMove}
        onTouchEnd={handleOnMouseUp}
        onTouchCancel={handleOnMouseLeave}
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
  showSlide: PropTypes.number.isRequired,
  infiniteLoop: PropTypes.bool.isRequired,
  isProgressBar: PropTypes.bool.isRequired,
};

export default Slider;
