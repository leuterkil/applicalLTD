import React from 'react';
import { useHistory } from 'react-router-dom';
const axios = require('axios');

class NewFrame extends React.Component {
  constructor(props) {
    super(props);
    this.state = { typeOfFrame: '' };
  }
  onChange = (e) => {
    /*
      Because we named the inputs to match their
      corresponding values in state, it's
      super easy to update the state
    */
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:4000/frame/new', {
        typeOfFrame: this.state.typeOfFrame,
      })
      .then((res) => {
        console.log(res.data.errors);
        this.setState({
          typeOfFrame: '',
        });
        alert('Success');
        Array.from(document.querySelectorAll('input')).forEach(
          (input) => (input.value = '')
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    return (
      <>
        <h3>Εισάγετε Στοιχεία</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="typeOfFrame">Είδος Κουφώματος : </label>
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

export default NewFrame;
