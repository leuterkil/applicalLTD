import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/public.css';
import { Button, Modal } from 'react-bootstrap';
const axios = require('axios');

class AllCustomers extends React.Component {
  constructor(props) {
    super(props);
    this.state = { customers: [], custId: '', showModal: false, custName: '' };
    this.handleCloseMod = this.handleCloseMod.bind(this);
  }

  componentDidMount() {
    axios.get('/customer/all').then((res) => {
      this.setState({ customers: res.data });
    });
  }

  deleteCustomer(id, e, close) {
    console.log(id);
    axios.delete(`/customer/${id}`).then((res) => {
      console.log(res.data);
      const el = document.querySelector(`#cid${id}`);

      // remove the list item
      el.parentElement.removeChild(el);
      close();
    });
  }
  handleShow(id, fullName, e) {
    this.setState({ showModal: true, custId: id, custName: fullName });
  }
  handleCloseMod() {
    this.setState({ showModal: false });
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
                  onClick={(e) =>
                    this.handleShow(
                      customer._id,
                      `${customer.firstName} ${customer.lastName}`,
                      e
                    )
                  }
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
              <Modal show={this.state.showModal} onHide={this.handleCloseMod}>
                <Modal.Header closeButton>
                  <Modal.Title>Διαγραφή Πελάτη</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>
                    Είστε Σίγουροι για την διαγραφή του πελάτη{' '}
                    <b>{this.state.custName}</b>
                  </p>
                  <p>
                    (προσοχή με την διαγραφή του πελάτη θα διαγραφούν και οι
                    παραγγελίες που συνδέονται με αυτόν)
                  </p>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={this.handleCloseMod}>
                    Ακύρωση
                  </Button>
                  <Button
                    variant="danger"
                    onClick={(e) =>
                      this.deleteCustomer(
                        this.state.custId,
                        e,
                        this.handleCloseMod
                      )
                    }
                  >
                    Διαγραφή Πελάτη
                  </Button>
                </Modal.Footer>
              </Modal>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default AllCustomers;
