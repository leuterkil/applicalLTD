import React from 'react';
import ButtonMenu from './ButtonMenu';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
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
        <Helmet>
          <title>Aplical LTD</title>
        </Helmet>
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
