import React from 'react';
import { withRouter } from 'react-router-dom';
import 'moment/locale/el';
const axios = require('axios');
const moment = require('moment');

class OrderDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { order: [], customer: {}, content: [], dateOfOrder: '' };
  }
  componentDidMount() {
    const oid = this.props.match.params.oid;
    axios
      .get(`http://localhost:4000/order/${oid}`)
      .then((res) => {
        console.log(res.data);
        const ordDate = moment(res.data.orderDate).format('LL');
        this.setState({
          order: res.data,
          customer: res.data.customer,
          content: res.data.content,
          dateOfOrder: ordDate,
        });
      })
      .catch((e) => console.log(e));
  }
  render() {
    return (
      <>
        <h3>Στοιχεία Παραγγελίας</h3>
        <p>Ημερομηνία : {this.state.dateOfOrder}</p>
        <p>
          Πελάτης : {this.state.customer.firstName}{' '}
          {this.state.customer.lastName}
        </p>
        <p>Διεύθυνση : {this.state.order.address}</p>
        <p>
          Περιεχόμενο Παραγγελίας :
          <ul>
            {this.state.content.map((item) => (
              <li>
                {item.frameHeight} {item.frameLength}{' '}
                {item.frameDesc.typeOfFrame} {item.qty} {item.price}
              </li>
            ))}
          </ul>
        </p>

        <p>Παρατηρήσεις : {this.state.order.notes}</p>
      </>
    );
  }
}

export default withRouter(OrderDetails);
