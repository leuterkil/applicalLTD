import React from 'react';
import { withRouter } from 'react-router-dom';
const axios = require('axios');

class Frame extends React.Component {
  constructor(props) {
    super(props);
    this.state = { frame: [], image: '' };
  }
  componentDidMount() {
    const fid = this.props.match.params.fid;
    axios
      .get(`http://localhost:4000/frame/${fid}`)
      .then((res) => {
        console.log(res);
        this.setState({ frame: res.data, image: res.data.frameImage[0].url });
      })
      .catch((e) => console.log(e));
  }
  render() {
    return (
      <>
        <h3 className="text-center">Στοιχεία Κουφώματος</h3>
        <div className="text-center bg-dark text-white py-4">
          <p className="display-5">Είδος : {this.state.frame.typeOfFrame}</p>
          <img width="200" src={this.state.image} />
        </div>
      </>
    );
  }
}

export default withRouter(Frame);
