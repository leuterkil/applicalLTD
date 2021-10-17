import React from 'react';
import { withRouter } from 'react-router-dom';
const axios = require('axios');

class Customer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { customer: [] };
  }
  componentDidMount() {
    const cid = this.props.match.params.cid;
    axios.get(`http://localhost:4000/customer/${cid}`).then((res) => {
      this.setState({ customer: res.data });
    });
  }
  render() {
    return (
      <>
        <h3>Στοιχεία Πελάτη</h3>
        <p>Όνομα : {this.state.customer.firstName}</p>
        <p>Επίθετο : {this.state.customer.lastName} </p>
        <p>E-mail : {this.state.customer.email} </p>
        <p>Τηλέφωνο : {this.state.customer.phone} </p>
      </>
    );
  }
}

export default withRouter(Customer);
