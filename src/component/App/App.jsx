import React from 'react';
import Slider from '../Slider/Slider';
import GitHubImage from '../Icons/GitHubImage';

const slidesExample = [
  <img src={'./assets/img/m82_chandra_hst_spritzer_galaxy.jpg'} alt="galaxy" />,
  <img src={'./assets/img/milky_way_galaxy.jpg'} alt="galaxy" />,
  <img src={'./assets/img/ngc_4414_galaxy.jpg'} alt="galaxy" />,
  <img src={'./assets/img/andromeda_galaxy.jpg'} alt="galaxy" />,
]

const slidesExample2 = [
  <img src={'./assets/img/m82_chandra_hst_spritzer_galaxy.jpg'} alt="galaxy" />,
  <iframe
    title="my-you-tube"
    className="you-tube__player"
    src="https://www.youtube.com/embed/Gq_kY3XPTpU?autoplay=1&mute=1enablejsapi=0"
    frameBorder="0"
  />,
  <img src={'./assets/img/milky_way_galaxy.jpg'} alt="galaxy" />,
  <iframe
    title="my-you-tube"
    className="you-tube__player"
    src="https://www.youtube.com/embed/l11vfJFlgn0?autoplay=1&mute=1enablejsapi=0"
    frameBorder="0"
  />,
  <img src={'./assets/img/ngc_4414_galaxy.jpg'} alt="galaxy" />,
  <img src={'./assets/img/andromeda_galaxy.jpg'} alt="galaxy" />,
]

const App = () => (
  <section className="wrapper">
    <header className="header">
      <div className="titles">
        <h1>Slider react</h1>
        <a aria-label="link-to-home" href="https://github.com/K2-m5/slider"><GitHubImage className="titles_icon" /></a>
      </div>
      <p>
        React slider component with touch support,
        works for mobile and desktop devices. You can work with any HTML content.
      </p>
    </header>
    <div className="table-container">
      <h2>Property</h2>
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
            <td className="props-name_bold">containerClass</td>
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
    <div className="container__example">
      <h2>Simple slide</h2>
      <p>For simple usage, just pass slides as children. You do not need any configuration!</p>

      <Slider
        infiniteLoop={false}
        slidesPerView={1}
        showProgressBar
        slides={slidesExample}
      />
    </div>

    <div className="container__example">
      <h2>Slider with custom options</h2>
      <p>React slider component with infinite and scrolling to a selected slide options.</p>
      <Slider
        slidesPerView={2}
        infiniteLoop
        showProgressBar
        slides={slidesExample2}
      />
    </div>
  </section>
);

export default App;
