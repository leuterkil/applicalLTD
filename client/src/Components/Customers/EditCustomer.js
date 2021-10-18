import React from 'react';
import { withRouter } from 'react-router-dom';
const axios = require('axios');

class EditCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: [],
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
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

  handleSubmit = (e, id) => {
    e.preventDefault();
    const cid = this.props.match.params.cid;
    axios
      .put(`http://localhost:4000/customer/${cid}`, {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        phone: this.state.phone,
      })
      .then((res) => {
        this.setState({ customer: res.data });
      });
  };

  componentDidMount() {
    const cid = this.props.match.params.cid;
    axios.get(`http://localhost:4000/customer/${cid}`).then((res) => {
      this.setState({
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        email: res.data.email,
        phone: res.data.phone,
      });
    });
  }

  render() {
    return (
      <>
        <h3>Επεξεργασία Πελάτη</h3>
        <form onSubmit={(e) => this.handleSubmit(e)}>
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

export default withRouter(EditCustomer);
