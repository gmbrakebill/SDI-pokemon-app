import React from 'react';
import './App.css';

function Image(props) {
  return <img src={props.url} alt={props.alt} className="picture" />;
}

export default Image;
