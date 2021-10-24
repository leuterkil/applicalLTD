import React from 'react';
const axios = require('axios');

class NewCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { firstName: '', lastName: '', email: '', phone: '' };
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
      .post('http://localhost:4000/customer/new', {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        phone: this.state.phone,
      })
      .then((res) => {
        console.log(res.data.errors);
        this.setState({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
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
          <div className="row">
            <div className="col-4">
              <label htmlFor="firstName" className="form-label">
                Όνομα
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="form-control"
                value={this.state.firstName}
                onChange={this.onChange}
                autoFocus
              />
            </div>
            <div className="col-4">
              <label htmlFor="lastName" className="form-label">
                Επίθετο
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="form-control"
                value={this.state.lastName}
                onChange={this.onChange}
              />
            </div>
          </div>
          <label htmlFor="e-mail" className="form-label">
            E-mail
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={this.state.email}
            onChange={this.onChange}
          />
          <label htmlFor="phone" className="form-label">
            Τηλέφωνο
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            className="form-control"
            value={this.state.phone}
            onChange={this.onChange}
          />
          <button type="submit" className="btn btn-success mt-3">
            Αποθήκευση
          </button>
        </form>
      </>
    );
  }
}

export default NewCustomer;
