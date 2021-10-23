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
        <div className="container ">
          <h1 className="text-center">Καλώς ήρθες, {this.props.name}</h1>
          <ButtonMenu />
        </div>
      </>
    );
  }
}

export default Home;
