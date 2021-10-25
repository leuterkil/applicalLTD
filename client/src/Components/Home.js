import React from 'react';
import ButtonMenu from './ButtonMenu';
import { connect } from 'react-redux';

const mapStateToProps = ({ session }) => ({
  session,
});

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <div className="container ">
          <h1 className="text-center">
            Καλώς ήρθες, {this.props.session.username}
          </h1>
          <ButtonMenu />
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps)(Home);
