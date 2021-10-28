import React from 'react';
import { Link } from 'react-router-dom';
import 'moment/locale/el';
const axios = require('axios');
const moment = require('moment');

class AllOrdersMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { orders: [], dateOfOrder: [] };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/order/all').then((res) => {
      let ordDate = [];
      for (let item of res.data) {
        ordDate.push(moment(item.orderDate).format('LL'));
      }

      this.setState({
        orders: res.data,
        dateOfOrder: ordDate,
      });
    });
  }

  deleteOrder(id, e) {
    axios.delete(`http://localhost:4000/order/${id}`).then((res) => {
      console.log(res.data);
      const el = document.querySelector(`#oid${id}`);

      // remove the list item
      el.parentElement.removeChild(el);
    });
  }

  render() {
    return (
      <>
        <div className="d-flex justify-content-end">
          <Link className="btn btn-success" to="/orders/new">
            Νέα Προσφορά <i className="fas fa-plus"></i>
          </Link>
        </div>
        <ul className="list-container py-2 px-2 my-3">
          {this.state.orders.map((order, index) => (
            <li className="py-3" id={`oid${order._id}`} key={index}>
              <div className="d-flex py-2">
                <h3 className="col-md-6 col-9 px-3">
                  <span className="indexes">{index + 1}</span>
                  <Link
                    className="list-link"
                    key={index}
                    to={`/orders/${order._id}`}
                  >
                    Πελάτης : {order.customer.firstName}{' '}
                    {order.customer.lastName}{' '}
                  </Link>
                </h3>
                <div className="d-flex col-md-6 col-3 justify-content-end px-3">
                  <button
                    className="btn btn-link"
                    onClick={(e) => this.deleteOrder(order._id, e)}
                  >
                    <i className="fas fa-trash text-danger"></i>
                  </button>
                  <button className=" btn btn-link">
                    <Link to={`/orders/edit/${order._id}`}>
                      <i className="fa fa-pencil text-dark"></i>
                    </Link>
                  </button>
                </div>
              </div>
              <i className="d-flex row">
                <div className="col-md-6 col-12 justify-content-start px-md-3">
                  Διεύθυνση Παράδοσης : {order.address}
                </div>{' '}
                <div className="d-flex col-md-6 col-12 justify-content-md-end px-md-3">
                  Ημ/νια Προσφοράς : {this.state.dateOfOrder[index]}{' '}
                </div>
              </i>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default AllOrdersMenu;
