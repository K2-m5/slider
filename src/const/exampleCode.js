import React from 'react';

const simpleSlider = () => (
  <div className="example__code_container">
    <p className="example__code_title">Usage code</p>
    <pre className="language-js">
      <code>
        <div>
          <span className="const"> const </span>
          <span className="name">slides </span>
          <span>= </span>
          <span className="name">[</span>
        </div>
        <div>
          <span className="tag">   &lt;</span>
          <span className="name">img </span>
          <span className="attribute">src</span>
          <span> =</span>
          <span className="string">"./assets/img/m82_chandra_hst_spritzer_galaxy.jpg"</span>
          <span className="attribute"> alt</span>
          <span> =</span>
          <span className="string">"galaxy"</span>
          <span className="tag"> /&gt;</span>
          <span>,</span>
        </div>
        <div>
          <span className="tag">   &lt;</span>
          <span className="name">img </span>
          <span className="attribute">src</span>
          <span> =</span>
          <span className="string">"./assets/img/milky_way_galaxy.jpg"</span>
          <span className="attribute"> alt</span>
          <span> =</span>
          <span className="string">"galaxy"</span>
          <span className="tag"> /&gt;</span>
          <span>,</span>
        </div>
        <div>
          <span className="tag">   &lt;</span>
          <span className="name">img </span>
          <span className="attribute">src</span>
          <span> =</span>
          <span className="string">"./assets/img/ngc_4414_galaxy.jpg"</span>
          <span className="attribute"> alt</span>
          <span> =</span>
          <span className="string">"galaxy"</span>
          <span className="tag"> /&gt;</span>
          <span>,</span>
        </div>
        <div>
          <span className="tag">   &lt;</span>
          <span className="name">img </span>
          <span className="attribute">src</span>
          <span> =</span>
          <span className="string">"./assets/img/andromeda_galaxy.jpg"</span>
          <span className="attribute"> alt</span>
          <span> =</span>
          <span className="string">"galaxy"</span>
          <span className="tag"> /&gt;</span>
          <span>,</span>
        </div>
        <div>
          <span className="name"> ]</span>
          <span>;</span>
        </div>
        <div><span> </span></div>
        <div>
          <span className="tag"> &lt;</span>
          <span className="reactElement">Slider</span>
        </div>
        <div>
          <span className="attribute">   slides</span>
          <span>=</span>
          <span className="curlyBracket">&#123;</span>
          <span className="name">slides</span>
          <span className="curlyBracket">&#125;</span>
        </div>
        <div>
          <span className="tag"> /&gt;</span>
        </div>
      </code>
    </pre>
  </div>
);

const customSlider = () => (
  <div className="example__code_container">
    <p className="example__code_title">Usage code</p>
    <pre className="language-js">
      <code>
        <div>
          <span className="const"> const </span>
          <span className="name">slides </span>
          <span>= </span>
          <span className="name">[</span>
        </div>
        <div>
          <span className="tag">   &lt;</span>
          <span className="name">img </span>
          <span className="attribute">src</span>
          <span> =</span>
          <span className="string">"./assets/img/m82_chandra_hst_spritzer_galaxy.jpg"</span>
          <span className="attribute"> alt</span>
          <span> =</span>
          <span className="string">"galaxy"</span>
          <span className="tag"> /&gt;</span>
          <span>,</span>
        </div>
        <div>
          <span className="tag">   &lt;</span>
          <span className="name">video </span>
          <span className="attribute">src</span>
          <span> =</span>
          <span className="string">"./assets/video/lapenkoHunter.mp4"</span>
          <span className="attribute"> controls</span>
          <span className="tag"> /&gt;</span>
          <span>,</span>
        </div>
        <div>
          <span className="tag">   &lt;</span>
          <span className="name">img </span>
          <span className="attribute">src</span>
          <span> =</span>
          <span className="string">"./assets/img/milky_way_galaxy.jpg"</span>
          <span className="attribute"> alt</span>
          <span> =</span>
          <span className="string">"galaxy"</span>
          <span className="tag"> /&gt;</span>
          <span>,</span>
        </div>
        <div>
          <span className="tag">   &lt;</span>
          <span className="name">p</span>
          <span className="tag">&gt;</span>
          <span>Lorem ipsum dolor sit amet consectetur adipisicing elit</span>
          <span className="tag">/&lt;</span>
          <span className="name">p</span>
          <span className="tag">&gt;</span>
          <span>,</span>
        </div>
        <div>
          <span className="tag">   &lt;</span>
          <span className="name">img </span>
          <span className="attribute">src</span>
          <span> =</span>
          <span className="string">"./assets/img/ngc_4414_galaxy.jpg"</span>
          <span className="attribute"> alt</span>
          <span> =</span>
          <span className="string">"galaxy"</span>
          <span className="tag"> /&gt;</span>
          <span>,</span>
        </div>
        <div>
          <span className="tag">   &lt;</span>
          <span className="name">img </span>
          <span className="attribute">src</span>
          <span> =</span>
          <span className="string">"./assets/img/andromeda_galaxy.jpg"</span>
          <span className="attribute"> alt</span>
          <span> =</span>
          <span className="string">"galaxy"</span>
          <span className="tag"> /&gt;</span>
          <span>,</span>
        </div>
        <div>
          <span className="name"> ]</span>
          <span>;</span>
        </div>
        <div><span> </span></div>
        <div>
          <span className="tag"> &lt;</span>
          <span className="reactElement">Slider</span>
        </div>
        <div>
          <span className="attribute">   slides</span>
          <span>=</span>
          <span className="curlyBracket">&#123;</span>
          <span className="name">slides</span>
          <span className="curlyBracket">&#125;</span>
        </div>
        <div>
          <span className="attribute">   slidesPerView</span>
          <span>=</span>
          <span className="curlyBracket">&#123;</span>
          <span className="name">2</span>
          <span className="curlyBracket">&#125;</span>
        </div>
        <div>
          <span className="attribute">   infiniteLoop</span>
        </div>
        <div>
          <span className="attribute">   showProgressBar</span>
        </div>
        <div>
          <span className="tag"> /&gt;</span>
        </div>
      </code>
    </pre>
  </div>
);

export default { simpleSlider, customSlider};
