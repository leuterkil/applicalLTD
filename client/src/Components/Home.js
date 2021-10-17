import React from 'react';
import ButtonMenu from './ButtonMenu';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <h1>Καλώς ήρθες, {this.props.name}</h1>
        <ButtonMenu />
      </>
    );
  }
}

export default Home;
