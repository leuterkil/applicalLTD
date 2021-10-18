import React from 'react';
import { withRouter } from 'react-router-dom';
const axios = require('axios');

class Frame extends React.Component {
  constructor(props) {
    super(props);
    this.state = { frame: [] };
  }
  componentDidMount() {
    const fid = this.props.match.params.fid;
    axios
      .get(`http://localhost:4000/frame/${fid}`)
      .then((res) => {
        console.log(res);
        this.setState({ frame: res.data });
      })
      .catch((e) => console.log(e));
  }
  render() {
    return (
      <>
        <h3>Στοιχεία Κουφώματος</h3>
        <p>Είδος : {this.state.frame.typeOfFrame}</p>
      </>
    );
  }
}

export default withRouter(Frame);
