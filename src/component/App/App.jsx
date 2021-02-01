import React from 'react';
import Slide from '../Slide/Slide';
import Slider from '../Slider/Slider';

import exampleCode from '../../const/exampleCode';

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
      <h1>Slider react</h1>
      <p>React slider component with touch support, works for mobile and desktop devices and any HTML content</p>
      <h3>Features</h3>
      <ul>
        <li>Infinite option</li>
        <li>Multiple slides to showSlide</li>
        <li>Scrolling to a selected slide</li>
      </ul>
    </header>
    
    <div className="container__example">
      <h2>Simple slide</h2>
      <p>For simple usage, just pass slides as children. You don't need any configuration!</p>
      <div className="example__props-list">
        <h3>Default properties</h3>
        <ul>
          <li><code>infiniteLoop: false</code></li>
          <li><code>isProgressBar: false</code></li>
          <li><code>showSlide: 1</code></li>
        </ul>
      </div>
      <Slider
      infiniteLoop
      >
        <Slide to={img[0].to}/>
        <Slide to={img[1].to}/>
        <Slide to={img[2].to}/>
        <Slide to={img[3].to}/>
      </Slider>
      <div className="example">
        <div className="example__code">
          <h3>Usage</h3>
          <pre>{ exampleCode.simpleCarousel }</pre>
        </div>
      <div>
    </div>
      </div>
    </div>

    <div className="container__example">
      <h2>Slider with custom options</h2>
      <p>React slider component with infinite and scrolling to a selected slide options, and works any HTML content</p>
      <div className="example__props-list">
        <h3>Custom properties</h3>
        <ul>
          <li><code>infiniteLoop: true</code></li>
          <li><code>isProgressBar: true</code></li>
          <li><code>showSlide: 2</code></li>
        </ul>
      </div>
      <Slider
        showSlide={2}
        infiniteLoop
        isProgressBar
      >
        <div className="carousel__slide slide">
          <iframe 
            className="you-tube__player"
            width="100%"
            height="300px"
            src={"https://www.youtube.com/embed/Gq_kY3XPTpU?autoplay=1&mute=1"}
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
            src={"https://www.youtube.com/embed/aa7WIo3yA-8?autoplay=1&mute=1"}
            frameBorder="0"
            />
        </div>
        <Slide to={img[2].to}/>
        <Slide to={img[3].to}/>
      </Slider>
      <div className="example">
        <div className="example__code">
          <h3>Usage</h3>
          <pre>{ exampleCode.customCarousel }</pre>
        </div>
      <div>
    </div>
      </div>
    </div>
  </section>
);

export default App;
