import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import Slide from '../Slide/Slide';
import Button from '../Button/Button';
import ProgressBar from '../ProgressBar/ProgressBar';
import BtnImageNext from '../Icons/BtnImageNext';
import BtnImagePrev from '../Icons/BtnImagePrev';

import './slider.less';

const Slider = ({
  slides,
  slidesPerView,
  infiniteLoop,
  showProgressBar,
  showButton,
  containerClass,
}) => {
  if (!slides) {
    return (<div style={{color: "red", fontSize: '2rem'}}>{"The slide array is empty, please pass the slide array by pattern."}</div>);
  }

  if (slidesPerView < 1) {
    return (<div style={{color: "red", fontSize: '2rem'}}>{"You transmitted a value less than the allowed value, please pass correct value"}</div>);
  }

  const [arraySlides, setArraySlides] = useState(slides);
  const [lengthSlides, setLengthSlides] = useState(slides.length);
  const [currentIndex, setCurrentIndex] = useState(infiniteLoop ? slidesPerView : 0);
  const [currentIndicator, setCurrentIndicator] = useState(infiniteLoop ? slidesPerView : 0);
  const sliderRef = useRef();
  const [scrollingState, setScrollingState] = useState({
    isTransition: true,
    isScrolling: false,
    clientX: 0,
    scrollX: 0,
  });

  useEffect(() => {
    if (arraySlides.length < slidesPerView) {

      for (let i = 0; i < slidesPerView; i++) {
        arraySlides.push(<div key={`empty__slide ${i}`} className={"empty__slide"}/>)
      }
      setArraySlides(arraySlides)
      setLengthSlides(arraySlides.length);
    }
  }, [lengthSlides, slidesPerView])

  useEffect(() => {
    if (!infiniteLoop) {
      return;
    }

    if (currentIndicator < slidesPerView) {
      setCurrentIndicator((index) => index + lengthSlides);
    } else if (currentIndicator === (lengthSlides + slidesPerView)) {
      setCurrentIndicator(slidesPerView);
    }
  }, [currentIndicator, lengthSlides]);

  const handleTransitionEnd = () => {
    if (!infiniteLoop) {
      return;
    }

    if (currentIndex === 0) {
      setCurrentIndex(lengthSlides);
      setScrollingState({
        ...scrollingState,
        isTransition: false,
      });
    } else if (currentIndex === lengthSlides + slidesPerView) {
      setCurrentIndex(slidesPerView);
      setScrollingState({
        ...scrollingState,
        isTransition: false,
      });
    }
    setTimeout(() => {
      setScrollingState({
        ...scrollingState,
        isTransition: true,
      });
    }, 0);
  };

  const handlePrevClick = () => {
    if ((infiniteLoop || currentIndex > 0) && currentIndex !== 0) {
      setCurrentIndex(currentIndex - 1);
      setCurrentIndicator(currentIndicator - 1);
    }
  };

  const handleNextClick = () => {
    if ((infiniteLoop
        || currentIndex < lengthSlides - slidesPerView)
        && currentIndex !== (lengthSlides + slidesPerView)) {
      setCurrentIndex(currentIndex + 1);
      setCurrentIndicator(currentIndicator + 1);
    }
  };

  const onIndicatorClick = (e) => {
    const value = parseInt(e.target.value, 10);
    setCurrentIndex(value);
    setCurrentIndicator(value);
  };

  const handleTouchStart = (e) => {
    setScrollingState({
      ...scrollingState,
      isTransition: false,
      isScrolling: true,
      clientX: e.touches[0].clientX,
    });
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setScrollingState({
      ...scrollingState,
      isTransition: false,
      isScrolling: true,
      clientX: e.clientX,
    });
  };

  const handleSlideMove = (currenClientX) => {
    if (!scrollingState.isScrolling) {
      return;
    }

    const scrX = ((scrollingState.clientX - currenClientX) / sliderRef.current.clientWidth);
    setScrollingState({
      ...scrollingState,
      scrollX: scrX,
    });
  };

  const handleTouchMove = (e) => {
    handleSlideMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    e.preventDefault();
    handleSlideMove(e.clientX);
  };

  const currentSlideShow = () => {
    setScrollingState({
      ...scrollingState,
      isTransition: true,
      isScrolling: false,
      scrollX: 0,
    });
  };

  const showNewSlide = () => {
    if (scrollingState.scrollX > 0.3) {
      if (currentIndex === (lengthSlides - slidesPerView) && !infiniteLoop) {
        currentSlideShow();
        setScrollingState({
          ...scrollingState,
          isTransition: true,
          isScrolling: false,
          scrollX: 0,
          clientX: 0,
        });

        return;
      }

      handleNextClick();
    } else if (scrollingState.scrollX < -0.3) {
      handlePrevClick();
    } else {
      currentSlideShow();
    }
    setScrollingState({
      ...scrollingState,
      isTransition: true,
      isScrolling: false,
      scrollX: 0,
      clientX: 0,
    });
  };

  const isScrollingCheck = () => {
    if (!scrollingState.isScrolling) {

    }
  };

  const handleMouseUp = () => {
    isScrollingCheck();
    showNewSlide();
  };

  const handleTouchEnd = () => {
    isScrollingCheck();
    showNewSlide();
  };

  const handleMouseLeave = (e) => {
    isScrollingCheck();
    e.preventDefault();
    showNewSlide();
  };

  const handleTouchCancel = () => {
    isScrollingCheck();
    showNewSlide();
  };

  const renderPrevSlide = () => {
    const output = [];
    for (let i = 1; i <= slidesPerView; i += 1) {
      output.push(<Slide key={`slide-duplicate_${slides.length - i}`}>{slides[slides.length - i]}</Slide>);
    }

    return output.reverse();
  };

  const renderNextSlide = () => {
    const output = [];
    for (let i = 0; i < slidesPerView; i += 1) {
      output.push(<Slide key={`slide-duplicate_${i}`}>{slides[i]}</Slide>);
    }

    return output;
  };
  
  return (
    <div className={`slider__container ${containerClass}`}>
      <div
        ref={sliderRef}
        className={`slider__slides ${scrollingState.isTransition
          ? 'transition' : 'transition-stop'}`}
        style={{
          transform: `translateX(-${(currentIndex + scrollingState.scrollX) * 100}%)`,
          width: `calc(100%/${slidesPerView})`,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchCancel}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTransitionEnd={handleTransitionEnd}
      >
        {
          (lengthSlides >= slidesPerView && infiniteLoop)
          && renderPrevSlide()
        }
        {arraySlides.map((item, index) => ( <Slide key={`slide_${index}`}>{item}</Slide> ))}
        {
          (lengthSlides >= slidesPerView && infiniteLoop)
          && renderNextSlide()
        }
      </div>
      {
        !showProgressBar
        || (
        <ProgressBar
          lengthSlides={ infiniteLoop || slidesPerView === 1
            ? lengthSlides : (lengthSlides - slidesPerView) >= slidesPerView
              ? lengthSlides - 1 : slidesPerView }
          slidesPerView={infiniteLoop ? slidesPerView : 0}
          currentIndex={currentIndicator}
          onIndicatorClick={onIndicatorClick}
        />
        )
      }
      {
        (showButton && (infiniteLoop || currentIndex > 0))
        && <Button className="prev" onClick={handlePrevClick} icon={<BtnImagePrev />} />
      }
      {
        (showButton && (infiniteLoop || currentIndex < lengthSlides - slidesPerView))
        && <Button className="next" onClick={handleNextClick} icon={<BtnImageNext />} />
      }
    </div>
  );
};

Slider.defaultProps = {
  slidesPerView: 1,
  infiniteLoop: false,
  showProgressBar: false,
  showButton: true,
  containerClass: '',
};

Slider.propTypes = {
  slidesPerView: PropTypes.number,
  infiniteLoop: PropTypes.bool,
  showProgressBar: PropTypes.bool,
  showButton: PropTypes.bool,
  slides: PropTypes.array,
  containerClass: PropTypes.string,
};

export default Slider;
