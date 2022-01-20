import { ImportedXmlComponent } from 'docx';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import 'moment/locale/el';
const axios = require('axios');
const moment = require('moment');

class Customer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { customer: [], orders: [], orderDat: [] };
  }
  componentDidMount() {
    const cid = this.props.match.params.cid;
    axios.get(`/customer/${cid}`).then((res) => {
      this.setState({ customer: res.data });
    });

    axios.get(`/order/customer/${cid}`).then((res) => {
      let ordDate = [];
      for (let item of res.data) {
        ordDate.push(moment(item.orderDate).format('LL'));
      }

      this.setState({ orders: res.data, orderDat: ordDate });
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
        <h3 className="text-center">
          Προσφορές για {this.state.customer.firstName}
        </h3>
        <ol>
          {this.state.orders.map((item, index) => (
            <li key={index}>
              <div className="d-flex">
                <Link className="list-link col-6" to={`/orders/${item._id}`}>
                  <div className="h4">
                    {index + 1}. Διευθυνση : {item.address}
                  </div>
                </Link>
                <div className="d-flex col-6 justify-content-end px-3">
                  <i>Ημερομηνία Προσφοράς : {this.state.orderDat[index]}</i>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </>
    );
  }
}

export default withRouter(Customer);
