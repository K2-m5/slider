const simpleslider = `<Slider>
  <div className="slider__slide slide">
    <img src={'./assets/img/m82_chandra_hst_spritzer_galaxy.jpg'} alt="galaxy" />
  </div>
  <div className="slider__slide slide">
    <img src={'./assets/img/m82_chandra_hst_spritzer_galaxy.jpg'} alt="galaxy" />
  </div>
  <div className="slider__slide slide">
    <img src={'./assets/img/m82_chandra_hst_spritzer_galaxy.jpg'} alt="galaxy" />
  </div>
  <div className="slider__slide slide">
    <img src={'./assets/img/m82_chandra_hst_spritzer_galaxy.jpg'} alt="galaxy" />
  </div>
<Slider/>`;

const customslider = `<Slider
  slidesPerView={2}
  infiniteLoop
  showProgressBar
  >
    <div className="slider__slide slide">
      <iframe 
        className="you-tube__player"
        width="100%"
        height="300px"
        src={"https://www.youtube.com/embed/Gq_kY3XPTpU?autoplay=1&mute=1"}
        frameBorder="0"
        />
    </div>
    <div className="slider__slide slide">
      <img src={'./assets/img/m82_chandra_hst_spritzer_galaxy.jpg'} alt="galaxy" />
    </div>
    <div className="slider__slide slide">
      <img src={'./assets/img/m82_chandra_hst_spritzer_galaxy.jpg'} alt="galaxy" />
    </div>
    <div className="slider__slide slide">
      <iframe 
        className="you-tube__player"
        width="100%"
        height="300px"
        src={"https://www.youtube.com/embed/aa7WIo3yA-8?autoplay=1&mute=1"}
        frameBorder="0"
        />
    </div>
    <div className="slider__slide slide">
      <img src={'./assets/img/m82_chandra_hst_spritzer_galaxy.jpg'} alt="galaxy" />
    </div>
    <div className="slider__slide slide">
      <img src={'./assets/img/m82_chandra_hst_spritzer_galaxy.jpg'} alt="galaxy" />
    </div>
  <Slider/>`;

export default { simpleslider, customslider };
