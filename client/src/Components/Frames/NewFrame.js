import React from 'react';
const axios = require('axios');

class NewFrame extends React.Component {
  constructor(props) {
    super(props);
    this.state = { typeOfFrame: '', image: '' };
  }
  onChange = (e) => {
    /*
      Because we named the inputs to match their
      corresponding values in state, it's
      super easy to update the state
    */
    this.setState({ [e.target.name]: e.target.value });
  };
  onPhoto = (e) => {
    this.setState({ image: e.target.files[0] });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', this.state.image);
    formData.append('typeOfFrame', this.state.typeOfFrame);
    axios
      .post('http://localhost:4000/frame/new', formData)
      .then((res) => {
        console.log(res.data);
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
        <form onSubmit={this.handleSubmit} encType="multipart/form-data">
          <label htmlFor="typeOfFrame" className="form-label">
            Είδος Κουφώματος
          </label>
          <input
            type="text"
            id="typeOfFrame"
            name="typeOfFrame"
            className="form-control"
            value={this.state.typeOfFrame}
            onChange={this.onChange}
          />
          <div className="form-file custom-file">
            <input
              type="file"
              className="form-file-input"
              id="image"
              name="image"
              onChange={this.onPhoto}
            />
            <label className="form-file-label" htmlFor="image">
              <span className="form-file-text custom-file-label">
                Επιλέξτε Εικόνα...
              </span>
              <span className="form-file-button">Browse</span>
            </label>
          </div>
          <button type="submit" className="mt-3 btn btn-success">
            Αποθήκευση
          </button>
        </form>
      </>
    );
  }
}

export default NewFrame;
