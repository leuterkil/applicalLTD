import React from 'react';
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
        <h2>Λίστα Πελατών</h2>
        <ul>
          {this.state.customers.map((customer) => (
            <li>
              {customer.firstName} {customer.lastName}
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default AllCustomers;
