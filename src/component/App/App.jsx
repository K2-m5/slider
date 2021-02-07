import React from 'react';

import Slider from '../Slider/Slider';
import GitHubImage from '../Icons/GitHubImage';
import exampleCode from '../../const/exampleCode';

const slidesExample = {
  simpleSlider: [
    <img src="./assets/img/m82_chandra_hst_spritzer_galaxy.jpg" alt="galaxy" />,
    <img src="./assets/img/milky_way_galaxy.jpg" alt="galaxy" />,
    <img src="./assets/img/ngc_4414_galaxy.jpg" alt="galaxy" />,
    <img src="./assets/img/andromeda_galaxy.jpg" alt="galaxy" />,
  ],
  customSlider: [
    <img src="./assets/img/m82_chandra_hst_spritzer_galaxy.jpg" alt="galaxy" />,
    <video src="./assets/video/lapenkoHunter.mp4" controls />,
    <img src="./assets/img/milky_way_galaxy.jpg" alt="galaxy" />,
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>,
    <img src="./assets/img/ngc_4414_galaxy.jpg" alt="galaxy" />,
    <img src="./assets/img/andromeda_galaxy.jpg" alt="galaxy" />,
  ],
}

const App = () => (
  <section className="wrapper">
    <header className="header">
      <div className="header__container-title">
        <h1 className="header__title">Slider react</h1>
        <a
          className="header__link"
          aria-label="link-to-home"
          href="https://github.com/K2-m5/slider"
        >
          <GitHubImage className="header__link_icon" />
        </a>
      </div>
      <p className="header__subtitle">
        React slider component with touch support,
        works for mobile and desktop devices. You can work with any HTML content.
      </p>
    </header>
    <div className="table-props__container">
      <h2 className="table-props__title">Property</h2>
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
            <td className="table-props__name_bold">containerClass</td>
            <td>String</td>
            <td>&#34; &#34;</td>
            <td>Slider container class name</td>
          </tr>
          <tr>
            <td className="props-name_bold">slidesPerView</td>
            <td>Number</td>
            <td>1</td>
            <td>Multiple slides per view.</td>
          </tr>
          <tr>
            <td className="props-name_bold">showButton</td>
            <td>Boolean</td>
            <td>true</td>
            <td>Function for render navigation buttons</td>
          </tr>
          <tr>
            <td className="props-name_bold">showProgressBar</td>
            <td>Boolean</td>
            <td>false</td>
            <td>Function for render progress navigation bar</td>
          </tr>
          <tr>
            <td className="props-name_bold">infiniteLoop</td>
            <td>Boolean</td>
            <td>false</td>
            <td>Infinite loop </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="example__container">
      <h2 className="example__title">Simple slide</h2>
      <p className="example__subtitle">For simple usage, just pass slides as children. You do not need any configuration!</p>
      <Slider
        slides={slidesExample.simpleSlider}
      />
      {exampleCode.simpleSlider()}
    </div>

    <div className="example__container">
      <h2 className="example__title">Slider with custom options</h2>
      <p className="example__subtitle">React slider component with infinite and scrolling to a selected slide options.</p>
      <Slider
        slides={slidesExample.customSlider}
        slidesPerView={2}
        infiniteLoop
        showProgressBar
      />
      {exampleCode.customSlider()}
    </div>
  </section>
);

export default App;
