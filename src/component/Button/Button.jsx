import React from 'react';
import PropTypes from 'prop-types';

import './button.less';

const handleIcon = {
  next: () => (
    <svg width="16px" height="27px" viewBox="0 0 16 27" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" serif="http://www.serif.com/">
      <path d="M0.698,22.992C-0.233,23.909 -0.233,25.355 0.7,26.271C1.689,27.243 3.337,27.243 4.325,26.271L15.045,15.739C16.318,14.488 16.318,12.512 15.045,11.261L4.325,0.729C3.337,-0.243 1.689,-0.243 0.7,0.729C-0.233,1.645 -0.233,3.091 0.698,4.008L8.066,11.263C9.337,12.514 9.337,14.486 8.066,15.737L0.698,22.992Z" />
    </svg>
  ),
  prev: () => (
    <svg width="16px" height="27px" viewBox="0 0 16 27" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" space="preserve" serif="http://www.serif.com/">
      <path d="M15.302,4.008C16.233,3.091 16.233,1.645 15.3,0.729C14.311,-0.243 12.663,-0.243 11.675,0.729L0.955,11.261C-0.318,12.512 -0.318,14.488 0.955,15.739L11.675,26.271C12.663,27.243 14.311,27.243 15.3,26.271C16.233,25.355 16.233,23.909 15.302,22.992L7.934,15.737C6.663,14.486 6.663,12.514 7.934,11.263L15.302,4.008Z" />
    </svg>
  )
}

const Button = ({
  handle,
  icon,
}) => (
  <button className={`btn btn__${icon}`} onClick={() => handle()} type="button">
    {handleIcon[icon]()}
  </button>
);

export default Button;

Button.propTypes = {
  handle: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
};
