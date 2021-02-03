import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import Button from '../Button/Button';
import ProgressBar from '../ProgressBar/ProgressBar';
import Next from '../Icon/Next';
import Prev from '../Icon/Prev';

import './slider.less';

const Slider = ({
  children,
  slidesPerView,
  infiniteLoop,
  showProgressBar,
}) => {
  const length = children.length;
  const [currentIndex, setCurrentIndex] = useState(infiniteLoop ? slidesPerView : 0);
  const [currentIndicator, setCurrentIndicator] = useState(infiniteLoop ? slidesPerView : 0);
  const carouselRef = useRef();
  const [scrollingState, setScrollingState] = useState({
    isTransition: true,
    isScrolling: false,
    clientX: 0,
    scrollX: 0,
  });

  useEffect(() => {
    if (infiniteLoop && currentIndicator < slidesPerView) {
      setCurrentIndicator(index => index + length);
    } else if (infiniteLoop && currentIndicator === (length + slidesPerView)) {
      setCurrentIndicator(slidesPerView);
    }
  }, [currentIndicator, infiniteLoop, length, slidesPerView]);

  const handleTransitionEnd = () => {
    if (infiniteLoop) {
      if (currentIndex === 0) {
        setCurrentIndex(length);
        setScrollingState({
          ...scrollingState,
          isTransition: false,
        });
      } else if (currentIndex === length + slidesPerView) {
        setCurrentIndex(slidesPerView);
        setScrollingState({
          ...scrollingState,
          isTransition: false,
        });
      }
    }
    setTimeout(() => {
      setScrollingState({
        ...scrollingState,
        isTransition: true,
      });
    }, 0);
  };

  const onClickPrev = () => {
    if ((infiniteLoop || currentIndex > 0) && currentIndex !== 0) {
      setCurrentIndex((index) => (index - 1));
      setCurrentIndicator((index) => (index - 1));
    }
  };

  const onClickNext = () => {
    if ((infiniteLoop || currentIndex < length - slidesPerView) && currentIndex !== (length + slidesPerView)) {
      setCurrentIndex((index) => (index + 1));
      setCurrentIndicator((index) => (index + 1));
    }
  };

  const onClickIndicator = e => {
    const value = parseInt(e.target.value, 10);
    setCurrentIndex(value);
    setCurrentIndicator(value);
  };

  const onTouchStart = e => {
    let clientDownX = e.touches[0].clientX;

    setScrollingState({
      ...scrollingState,
      isTransition: false,
      isScrolling: true,
      clientX: clientDownX,
    })
  }

  const onMouseDown = e => {
    e.preventDefault();
    let clientDownX = e.clientX;

    setScrollingState({
      ...scrollingState,
      isTransition: false,
      isScrolling: true,
      clientX: clientDownX,
    })
  }

  const handleSlideMove = (currenClientX) => {
    const { isScrolling, clientX } = scrollingState;

    if (isScrolling) {
      const scrX = ((clientX - currenClientX )/carouselRef.current.clientWidth) ;
      setScrollingState({
        ...scrollingState,
        scrollX: scrX
      });
    }
  }

  const onTouchMove = e => {
    let currenClientX = e.touches[0].clientX;
    handleSlideMove(currenClientX);
    }

  const onMouseMove = e => {
    e.preventDefault();
    let currenClientX = e.clientX;
    handleSlideMove(currenClientX);
  }

  const changeSlideHandle = () => {
    if (scrollingState.scrollX > 0.3) {
      if (currentIndex === (length - slidesPerView) && !infiniteLoop) {
        currentSlideShow();
        setScrollingState({
          ...scrollingState,
          isTransition: true,
          isScrolling: false,
          scrollX: 0,
          clientX: 0,
        })
        return;
      }

      onClickNext();
    } else if (scrollingState.scrollX < -0.3) {
      onClickPrev();
    } else {
      currentSlideShow();
    }
    setScrollingState({
      ...scrollingState,
      isTransition: true,
      isScrolling: false,
      scrollX: 0,
      clientX: 0,
    })
  }

  const currentSlideShow = () => {
    setScrollingState({
      ...scrollingState,
      isTransition: true,
      isScrolling: false,
      scrollX: 0,
    })
  }

  const onMouseUp = () => {
    if (!scrollingState.isScrolling) {
      return;
    }
    changeSlideHandle();
  }

  const onTouchEnd = () => {
    if (!scrollingState.isScrolling) {
      return;
    }

    changeSlideHandle();
  }

  const onMouseLeave = e => {
    if (!scrollingState.isScrolling) {
      return;
    }

    e.preventDefault();
    changeSlideHandle();
  }

  const onTouchCancel = () => {
    if (!scrollingState.isScrolling) {
      return;
    }

    changeSlideHandle();
  }

  const renderPrevSlide = () => {
    const output = [];
    for (let i = 0; i < slidesPerView; i += 1) {
      output.push(children[length - 1 - i]);
    }

    return output.reverse();
  };

  const renderNextSlide = () => {
    const output = [];
    for (let i = 0; i < slidesPerView; i += 1) {
      output.push(children[i]);
    }

    return output;
  };

  return (
    <div 
      className="carousel__container"
      >
      <div
        ref={carouselRef}
        className={`carousel__slides ${scrollingState.isTransition ? 'transition' : 'transition-stop'}`}
        style={{
          transform: `translateX(-${(currentIndex + scrollingState.scrollX) * 100}%)`,
          width: `calc(100%/${slidesPerView})`,
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchCancel}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onTransitionEnd={handleTransitionEnd}
      >
        {
          (length >= slidesPerView && infiniteLoop)
          && renderPrevSlide()
        }
        {children}
        {
          (length >= slidesPerView && infiniteLoop)
          && renderNextSlide()
        }
      </div>
      {
        !showProgressBar
        || (
        <ProgressBar
          length={infiniteLoop ? length : slidesPerView === 1 ? length : length - 1}
          slidesPerView={infiniteLoop ? slidesPerView : 0}
          currentIndex={currentIndicator}
          onClickIndicator={onClickIndicator}
        />
        )
      }
      {(infiniteLoop || currentIndex > 0) && <Button onClick={onClickPrev} className="btn__prev" icon={<Prev />} />}
      {(infiniteLoop || currentIndex < length - slidesPerView) && <Button onClick={onClickNext} className="btn__next" icon={<Next />}/>}
    </div>
  );
};

Slider.defaultProps = {
  slidesPerView: 1,
  infiniteLoop: false,
  showProgressBar: false,
};

Slider.propTypes = {
  slidesPerView: PropTypes.number.isRequired,
  infiniteLoop: PropTypes.bool.isRequired,
  showProgressBar: PropTypes.bool.isRequired,
  children: PropTypes.array.isRequired
};

export default Slider;
