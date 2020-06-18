import React, { useReducer, useState } from 'react';
import Image from './Image';

const initialState = { index: 0 };

function reducer(state, action) {
  if (state.index === 0 && action.type === 'decrement') {
    return { index: state.index };
  }
  switch (action.type) {
    case 'increment':
      return { index: state.index + 1 };
    case 'decrement':
      return { index: state.index - 1 };
    default:
      throw new Error();
  }
}

function Cart(props) {
  // const [state, dispatch] = useReducer(reducer, initialState);
  const [index, setIndex] = useState(0);
  console.log('Num pokemon', props.collection.length);
  console.log('index', index);
  // if (state.index === props.collection.length) {
  //   dispatch({ type: 'decrement' });
  // }
  return (
    <div className="App">
      <h1> Your Pokemon Cart:</h1>
      <Image
        url={props.collection[index].sprites.front_default}
        alt={props.collection[index].name}
      />
      <h4>{props.collection[index].name}</h4>
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
