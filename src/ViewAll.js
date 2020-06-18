import React from 'react';

class ViewAll extends React.Component {
  state = {
    loading: true,
    pokemon: null,
    name: ' ',
  };

  async componentDidMount() {
    const url = 'https://pokeapi.co/api/v2/pokemon/';
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ pokemon: data.results[0], loading: false });
  }
  render() {
    return (
      <div>
        {this.state.loading || !this.state.pokemon ? (
          <div>loading...</div>
        ) : (
          <div>{this.state.pokemon.name}</div>
        )}
      </div>
    );
  }
}
export default ViewAll;
