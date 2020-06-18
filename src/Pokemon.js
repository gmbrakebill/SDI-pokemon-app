import React from 'react';
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
      <div className="pokemon-card">
        <Flippy
          flipOnHover={false}
          flipOnClick={true}
          flipDirection="horizontal"
          ref={(r) => (this.flippy = r)}
          style={{
            width: '250px',
            height: '300px',
            // left: '43%',
            position: 'relative',
            padding: '10px',
            // margin-bottom : '20px',
          }}
        >
          <FrontSide style={{ backgroundColor: '#2F4F4F' }}>
            <Image
              url={this.state.pokedata.sprites.front_default}
              alt={this.state.pokedata.name}
            />
          </FrontSide>
          <BackSide style={{ backgroundColor: '#2F4F4F', color: '#FFFFFF' }}>
            <h3>{this.state.pokedata.name}</h3> <br />
            <h5>Pokemon ID: {this.state.pokedata.id}</h5>
            <h5> Abilities: {abilities} </h5>
            <h5>Type(s): {types} </h5>
          </BackSide>
        </Flippy>
      </div>
    );
  }
}

export default Pokemon;
