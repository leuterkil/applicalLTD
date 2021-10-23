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
          <label htmlFor="firstName">Όνομα</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={this.state.firstName}
            onChange={this.onChange}
          />
          <label htmlFor="lastName">Επίθετο :</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={this.state.lastName}
            onChange={this.onChange}
          />
          <label htmlFor="e-mail">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
          />
          <label htmlFor="phone">Τηλέφωνο</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={this.state.phone}
            onChange={this.onChange}
          />
          <button type="submit">Αποθήκευση</button>
        </form>
      </>
    );
  }
}

export default NewCustomer;
