import React from 'react';
import './App.css';
import QueryButton from './queryButton';
import Cart from './Cart';
import ViewAll from './ViewAll';
import Pokemon from './Pokemon';

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
    if (this.state.showHideCollection) {
      return (
        <div className="App">
          <Pokemon pokemon url={this.state.url} />
          <QueryButton
            onSubmit={this.handleSubmit.bind(this)}
            onChange={this.handleChange.bind(this)}
          />
          <br />
          <div ClassName="Buttons">
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
            <button onClick={() => <ViewAll />} className="ViewAllBtn">
              View All
            </button>
          </div>
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
