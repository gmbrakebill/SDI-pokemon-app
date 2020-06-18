import React, { Fragment } from 'react';
import './App.css';

function Image(props) {
  return (
    <Fragment>
      <h4>{props.alt}</h4>
      <img src={props.url} alt={props.alt} className="picture" />
    </Fragment>
  );
}

export default Image;
