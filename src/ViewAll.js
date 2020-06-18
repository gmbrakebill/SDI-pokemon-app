import React from 'react';
import Pokemon from './Pokemon';

class ViewAll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      pokedata: {
        name: '',
        types: [],
        abilities: [],
        sprites: {},
      },
      url: 'https://pokeapi.co/api/v2/pokemon',
    };
  }

  async componentDidMount() {
    const response = await fetch(this.state.url);
    const data = await response.json();
    this.setState({ pokedata: data.results, loading: false });
  }
  render() {
    let pokemonList = this.state.pokedata;
    console.log(pokemonList);
    return (
      <div>
        {this.state.loading || !this.state.pokedata ? (
          <div>loading...</div>
        ) : (
          <div>
            <Pokemon url={pokemonList[0].url} />
          </div>
        )}
        <button onClick={this.props.Return}>Return</button>
      </div>
    );
  }
}
export default ViewAll;
