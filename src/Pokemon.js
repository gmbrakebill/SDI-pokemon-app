import React, { Fragment } from 'react';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import Image from './Image';

class Pokemon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokedata: [props.pokemon],
      url: props.url,
    };
  }

  fetchPokemon = async (props) => {
    fetch(this.state.url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ pokedata: [data] });
      });
  };

  componentDidMount() {
    console.log('DidMount reached');
    this.fetchPokemon();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.url !== prevState.url) {
      this.fetchPokemon();
    }
  }

  render() {
    let types = this.state.pokedata[0].types
      .map((kind) => kind.type.name)
      .join(', ');
    let abilities = this.state.pokedata[0].abilities
      .map((ability) => ability.ability.name)
      .join(', ');
    return (
      <Fragment className="Flippy">
        <Flippy
          flipOnHover={false}
          flipOnClick={true}
          flipDirection="horizontal"
          ref={(r) => (this.flippy = r)}
          style={{ width: '250px', height: '300px' }}
        >
          <FrontSide style={{ backgroundColor: '#41669d' }}>
            <Image
              url={this.state.pokedata[0].sprites.front_default}
              alt={this.state.pokedata[0].name}
            />
          </FrontSide>
          <BackSide style={{ backgroundColor: '#41669d' }}>
            <h3>{this.state.pokedata[0].name}</h3> <br />
            <h5>Pokemon ID: {this.state.pokedata[0].id}</h5>
            <h5> Abilities: {abilities} </h5>
            <h5>Type(s): {types} </h5>
          </BackSide>
        </Flippy>
      </Fragment>
    );
  }
}

export default Pokemon;
