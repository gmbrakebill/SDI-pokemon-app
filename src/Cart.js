import React, { useReducer } from 'react';
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
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log('Num pokemon', props.collection.length);
  console.log('index', state.index);
  if (
    state.index >= props.collection.length ||
    props.collection[state.index] === undefined
  ) {
    dispatch({ type: 'decrement' });
  }
  return (
    <div className="App">
      <h1> Your Pokemon Cart:</h1>
      <Image
        url={props.collection[state.index].sprites.front_default}
        alt={props.collection[state.index].name}
      />
      <h4>{props.collection[state.index].name}</h4>
      <button onClick={() => dispatch({ type: 'decrement' })}>Previous</button>
      <button onClick={() => dispatch({ type: 'increment' })}>Next</button>
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
