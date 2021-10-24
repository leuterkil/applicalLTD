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
              />
            </div>
            <div className="col-4">
              <label htmlFor="lastName" className="form-label">
                Επίθετο :
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
            Ενημέρωση
          </button>
        </form>
      </>
    );
  }
}

export default withRouter(EditCustomer);
