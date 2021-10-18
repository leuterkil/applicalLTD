import React from 'react';
import { withRouter } from 'react-router-dom';
const axios = require('axios');

class EditFrame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typeOfFrame: '',
    };
  }

  onChange = (e) => {
    /*
      Because we named the inputs to match their
      corresponding values in state, it's
      super easy to update the state
    */
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const fid = this.props.match.params.fid;
    axios
      .put(`http://localhost:4000/frame/${fid}`, {
        typeOfFrame: this.state.typeOfFrame,
      })
      .then((res) => {});
  };

  componentDidMount() {
    const fid = this.props.match.params.fid;
    axios.get(`http://localhost:4000/frame/${fid}`).then((res) => {
      this.setState({
        typeOfFrame: res.data.typeOfFrame,
      });
    });
  }

  render() {
    return (
      <>
        <h3>Επεξεργασία Κουφώματος</h3>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <label htmlFor="typeOfFrame">Είδος Κουφώματος</label>
          <input
            type="text"
            id="typeOfFrame"
            name="typeOfFrame"
            value={this.state.typeOfFrame}
            onChange={this.onChange}
          />
          <button type="submit">Αποθήκευση</button>
        </form>
      </>
    );
  }
}

export default withRouter(EditFrame);
