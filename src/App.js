import React from 'react';
import './App.css';
import Image from './Image';
import QueryButton from './queryButton';
import Cart from './Cart';
import ViewAll from './ViewAll';
import Pokemon from './Pokemon';

// const initialState = { cartindex: 0 };

// function reducer(state, action) {
//   switch (action.type) {
//     case 'increment':
//       return { cartindex: state.cartindex + 1 };
//     case 'decrement':
//       return { cartindex: state.cartindex - 1 };
//   }
// }

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokedata: [
        {
          name: '',
          types: [],
          abilities: [],
          sprites: {},
        },
      ],
      urlBase: 'https://pokeapi.co/api/v2/pokemon/',
      url: 'https://pokeapi.co/api/v2/pokemon/pikachu',
      currentItem: '',
      collection: [],
      cartindex: 0,
      showHideCollection: true,
    };
  }

  fetchPokemon = async () => {
    fetch(this.state.url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ pokedata: [data] });
        console.log(this.state.pokedata);
      });
  };

  ShowComponent() {
    this.setState({ showHideCollection: true });
  }

  HideComponent() {
    this.setState({ showHideCollection: false });
  }

  AddtoCollection = () => {
    if (this.state.collection.indexOf(this.state.pokedata[0]) === -1) {
      let newCollection = this.state.collection.concat(this.state.pokedata[0]);
      this.setState({ collection: newCollection });
      alert('Pokemon added to collection!');
    } else {
      alert('Pokemon already collected!');
    }
  };

  componentDidMount() {
    this.fetchPokemon();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.url !== prevState.url) {
      this.fetchPokemon();
    }
  }

  handleSubmit(event) {
    let newURL = this.state.urlBase + this.state.currentItem;
    this.setState({ url: newURL });
    this.setState({ currentItem: '' });
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({
      currentItem: event.target.value,
    });
  }

  render() {
    let types = this.state.pokedata[0].types
      .map((kind) => kind.type.name)
      .join(', ');
    let abilities = this.state.pokedata[0].abilities
      .map((ability) => ability.ability.name)
      .join(', ');
    if (this.state.showHideCollection) {
      return (
        <div className="App">
          {/* <h1>{this.state.pokedata[0].name}</h1>
          <Image
            url={this.state.pokedata[0].sprites.front_default}
            alt={this.state.pokedata[0].name}
          />
          <h4>Pokemon ID: {this.state.pokedata[0].id}</h4>
          <p> Abilities: {abilities} </p>
          <h3>Type(s): {types} </h3> */}
          <Pokemon
            pokemon
            url={'https://pokeapi.co/api/v2/pokemon/pikachu'}
            pokemon={this.state.pokedata[0]}
          />
          <QueryButton
            onSubmit={this.handleSubmit.bind(this)}
            onChange={this.handleChange.bind(this)}
          />
          <br />
          <button
            onClick={() => this.AddtoCollection()}
            className="CollectPokeBtn"
          >
            Collect!
          </button>
          <button
            onClick={() => this.HideComponent()}
            className="ViewCollection"
          >
            View Collection
          </button>
          <button onClick={() => <ViewAll />}>View All</button>
        </div>
      );
    } else {
      return (
        <Cart
          collection={this.state.collection}
          Return={this.ShowComponent.bind(this)}
        />
      );
    }
  }
}
export default App;
