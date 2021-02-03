import React from 'react';
import Slide from '../Slide/Slide';
import Slider from '../Slider/Slider';0
import GitHub from '../Icon/GitHub';

const img = [
  { to: './assets/img/m82_chandra_hst_spritzer_galaxy.jpg' },
  { to: './assets/img/milky_way_galaxy.jpg' },
  { to: './assets/img/ngc_4414_galaxy.jpg' },
  { to: './assets/img/andromeda_galaxy.jpg' },
  { to: './assets/img/circinus_galaxy.jpg' },
  { to: './assets/img/m33_hunter_wilson_galaxy.jpg' },
  { to: './assets/img/ngc_55_galaxy.jpg' },
  { to: './assets/img/spiral_galaxy_ngc_4945_galaxy.jpg' },
  { to: './assets/img/view_of_the_southern_spiral_ngc_300_galaxy.jpg' },
  { to: './assets/img/large_magellanic_cloud_galaxy.jpg' },
];

const App = () => (
  <section className="wrapper">
    <header>
      <div className="titles">
        <h1>Slider react</h1>
        <a href="https://github.com/K2-m5/slider"><GitHub className={"titles_icon"}/></a>
      </div>
      <p>React slider component with touch support, works for mobile and desktop devices. You can work with any HTML content. </p>
    </header>
    <div>
    <h3>Props</h3>
        <table className="table-props">
          <thead className="table-props__header">
            <tr>
              <td>Name</td>
              <td>Type</td>
              <td>Default Value</td>
              <td>Description</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="props-name_bold">slidesPerView</td>
              <td>Number</td>
              <td>1</td>
              <td>Description</td>
            </tr>
            <tr>
              <td className="props-name_bold">infiniteLoop</td>
              <td>Boolean</td>
              <td>false</td>
              <td>Description</td>
            </tr>
            <tr>
              <td className="props-name_bold">slidesPerView</td>
              <td>Boolean</td>
              <td>false</td>
              <td>Description</td>
            </tr>
          </tbody>
        </table>
    </div>
    <div className="container__example">
      <h2>Simple slide</h2>
      <p>For simple usage, just pass slides as children. You do not need any configuration!</p>

      <Slider
      infiniteLoop
      showProgressBar
      >
        <Slide to={img[0].to}/>
        <Slide to={img[1].to}/>
        <Slide to={img[2].to}/>
        <Slide to={img[3].to}/>
      </Slider>
    </div>

    <div className="container__example">
      <h2>Slider with custom options</h2>
      <p>React slider component with infinite and scrolling to a selected slide options.</p>
      <Slider
        slidesPerView={2}
        infiniteLoop
        showProgressBar
      >
        <div className="carousel__slide slide">
          <iframe 
            className="you-tube__player"
            width="100%"
            height="300px"
            src={"https://www.youtube.com/embed/Gq_kY3XPTpU?autoplay=1&mute=1enablejsapi=0"}
            frameBorder="0"
            />
        </div>
        <Slide to={img[0].to}/>
        <Slide to={img[1].to}/>
        <div className="carousel__slide slide">
          <iframe 
            className="you-tube__player"
            width="100%"
            height="300px"
            src={"https://www.youtube.com/embed/aa7WIo3yA-8?autoplay=1&mute=1enablejsapi=1"}
            frameBorder="0"
            />
        </div>
        <Slide to={img[2].to}/>
        <Slide to={img[3].to}/>
      </Slider>
    </div>
  </section>
);

export default App;
