import React from 'react';
import { Link } from 'react-router-dom';
import 'moment/locale/el';
const axios = require('axios');
const moment = require('moment');

class AllOrdersMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { orders: [], dateOfOrder: '' };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/order/all').then((res) => {
      moment.locale('el');
      const ordDate = moment(res.data.orderDate).format('LL');

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
        <Link to="/orders/new">Νέα Παραγγελία</Link>
        <ul>
          {this.state.orders.map((order, index) => (
            <li id={`oid${order._id}`} key={index}>
              <Link key={index} to={`/orders/${order._id}`}>
                {order.customer.firstName} {order.customer.lastName}{' '}
              </Link>
              {order.address} {this.state.dateOfOrder}
              <button onClick={(e) => this.deleteOrder(order._id, e)}>
                Διαγραφή
              </button>
              <button>
                <Link to={`/orders/edit/${order._id}`}>Επεξεργασία</Link>
              </button>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default AllOrdersMenu;
