import React from 'react';
import { withRouter } from 'react-router-dom';
import 'moment/locale/el';
const axios = require('axios');
const moment = require('moment');

class OrderDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: [],
      customer: {},
      content: [],
      dateOfOrder: '',
      total: 0,
      color: '',
      typeFrame: '',
      windowOfFrame: '',
    };
  }
  componentDidMount() {
    const oid = this.props.match.params.oid;
    axios
      .get(`http://localhost:4000/order/${oid}`)
      .then((res) => {
        const ordDate = moment(res.data.orderDate).format('LL');
        let total = 0;

        for (let content of res.data.content) {
          total = total + content.qty * content.price;
        }

        this.setState({
          order: res.data,
          customer: res.data.customer,
          content: res.data.content,
          color: res.data.color,
          windowOfFrame: res.data.windowOfFrame,
          typeFrame: res.data.typeFrame,
          dateOfOrder: ordDate,
          total,
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
        <p>Χρώμα : {this.state.color}</p>
        <p>Τζάμι : {this.state.windowOfFrame}</p>
        <p>Τύπος : {this.state.typeFrame}</p>
        <p>Διεύθυνση : {this.state.order.address}</p>
        Περιεχόμενο Παραγγελίας :
        <ul>
          {this.state.content.map((item, index) => (
            <li key={index}>
              {item.frameHeight} {item.frameLength} {item.frameDesc.typeOfFrame}{' '}
              {item.qty} {item.price}
            </li>
          ))}
        </ul>
        <p>
          <b>Σύνολο Παραγγελίας : {this.state.total}</b>
        </p>
        <p>Παρατηρήσεις : {this.state.order.notes}</p>
      </>
    );
  }
}

export default withRouter(OrderDetails);
