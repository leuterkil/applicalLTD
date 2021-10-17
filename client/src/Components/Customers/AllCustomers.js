import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
const axios = require('axios');

class AllCustomers extends React.Component {
  constructor(props) {
    super(props);
    this.state = { customers: [] };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/customer/all').then((res) => {
      this.setState({ customers: res.data });
    });
  }
  render() {
    return (
      <>
        <Link to="/customers/new">Νέος Πελάτης</Link>
        <ul>
          {this.state.customers.map((customer, index) => (
            <Link key={index} to={`/customers/${customer._id}`}>
              <li key={index}>
                {customer.firstName} {customer.lastName}
              </li>
            </Link>
          ))}
        </ul>
      </>
    );
  }
}

export default AllCustomers;
