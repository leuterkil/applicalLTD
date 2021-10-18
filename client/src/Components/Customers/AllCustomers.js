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

  deleteCustomer(id, e) {
    axios.delete(`http://localhost:4000/customer/${id}`).then((res) => {
      console.log(res.data);
      const el = document.querySelector(`#cid${id}`);

      // remove the list item
      el.parentElement.removeChild(el);
    });
  }
  render() {
    return (
      <>
        <Link to="/customers/new">Νέος Πελάτης</Link>
        <ul>
          {this.state.customers.map((customer, index) => (
            <li id={`cid${customer._id}`} key={index}>
              <Link key={index} to={`/customers/${customer._id}`}>
                {customer.firstName} {customer.lastName}{' '}
              </Link>
              <button onClick={(e) => this.deleteCustomer(customer._id, e)}>
                Διαγραφή πελάτη
              </button>
              <button>
                <Link to={`/customers/edit/${customer._id}`}>
                  Επεξεργασία πελάτη
                </Link>
              </button>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default AllCustomers;
