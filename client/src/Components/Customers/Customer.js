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
        <h3 className="text-center">Στοιχεία Πελάτη</h3>
        <div className="bg-dark text-white text-center">
          <p className="display-5">
            <i className="fas fa-id-card px-3"></i>
            Ονοματεπώνυμο : {this.state.customer.firstName}{' '}
            {this.state.customer.lastName}
          </p>
          <p className="lead">
            <span className="px-3">
              <i className="fas fa-envelope"></i> :{' '}
              <a
                className="text-white"
                href={`mailto:${this.state.customer.email}`}
              >
                {this.state.customer.email}
              </a>
            </span>{' '}
            <i className="fas fa-phone-square"></i> :{' '}
            <a className="text-white" href={`tel:${this.state.customer.phone}`}>
              {this.state.customer.phone}{' '}
            </a>
          </p>
        </div>
      </>
    );
  }
}

export default withRouter(Customer);
