import React, { useState } from 'react';
// import Image from './Image';
import Pokemon from './Pokemon';

function Cart(props) {
  const [index, setIndex] = useState(0);
  return (
    <div className="App">
      <h1> Your Pokemon Cart:</h1>
      {/* <Image
        url={props.collection[index].sprites.front_default}
        alt={props.collection[index].name}
      />
      <h4>{props.collection[index].name}</h4> */}
      <Pokemon url={props.collection[index].url} />
      <button
        id="prev"
        onClick={() => {
          if (index === 0) {
            setIndex(props.collection.length - 1);
          } else {
            setIndex(index - 1);
          }
        }}
      >
        Previous
      </button>
      <button
        id="next"
        onClick={() => {
          if (index === props.collection.length - 1) {
            setIndex(0);
          } else {
            setIndex(index + 1);
          }
        }}
      >
        Next
      </button>
      <br />
      <br />
      <button onClick={props.Return}>Return</button>
    </div>
  );
}
//  else{
//      alert('You don\'t have any Pokemon in your cart!)
//  }
// }

export default Cart;
