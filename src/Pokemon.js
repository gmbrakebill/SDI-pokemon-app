import React, { Fragment } from 'react';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import Image from './Image';

class Pokemon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokedata: {
        name: '',
        types: [],
        abilities: [],
        sprites: {},
      },
      url: this.props.url,
    };
  }

  async componentDidMount() {
    const response = await fetch(this.props.url);
    const json = await response.json();
    this.setState({ pokedata: json });
  }

  async componentDidUpdate(prevProps, prevState) {
    const response = await fetch(this.props.url);
    const json = await response.json();
    this.setState({ pokedata: json });
  }

  render() {
    let types = this.state.pokedata.types
      .map((kind) => kind.type.name)
      .join(', ');
    let abilities = this.state.pokedata.abilities
      .map((ability) => ability.ability.name)
      .join(', ');
    return (
      <Fragment>
        <Flippy
          flipOnHover={false}
          flipOnClick={true}
          flipDirection="horizontal"
          ref={(r) => (this.flippy = r)}
          style={{ width: '250px', height: '300px' }}
        >
          <FrontSide style={{ backgroundColor: '#41669d' }}>
            <Image
              url={this.state.pokedata.sprites.front_default}
              alt={this.state.pokedata.name}
            />
          </FrontSide>
          <BackSide style={{ backgroundColor: '#41669d' }}>
            <h3>{this.state.pokedata.name}</h3> <br />
            <h5>Pokemon ID: {this.state.pokedata.id}</h5>
            <h5> Abilities: {abilities} </h5>
            <h5>Type(s): {types} </h5>
          </BackSide>
        </Flippy>
      </Fragment>
    );
  }
}

export default Pokemon;
