import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/public.css';
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
    console.log(id);
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
        <div className="d-flex justify-content-end">
          <Link
            className="btn btn-success list-link text-white"
            to="/customers/new"
          >
            Νέος Πελάτης <i className="fas fa-plus px-2"></i>
          </Link>
        </div>
        <ul className="list-container py-2 px-2 my-3">
          {this.state.customers.map((customer, index) => (
            <li
              className="px-3 py-3 d-flex"
              id={`cid${customer._id}`}
              key={index}
            >
              <h3 className="col-6">
                <span className="indexes">{index + 1}</span>
                <Link
                  className="list-link"
                  key={index}
                  to={`/customers/${customer._id}`}
                >
                  {customer.firstName} {customer.lastName}{' '}
                </Link>
              </h3>
              <div className="d-flex justify-content-end col-6">
                <button
                  className="btn btn-link"
                  onClick={(e) => this.deleteCustomer(customer._id, e)}
                >
                  <i className="fas fa-trash text-danger"></i>
                </button>
                <button className="btn btn-link">
                  <Link
                    className="list-link"
                    to={`/customers/edit/${customer._id}`}
                  >
                    <i className="fa fa-pencil text-black"></i>
                  </Link>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default AllCustomers;
