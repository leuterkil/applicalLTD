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
        <h3 className="text-center mb-4">Στοιχεία Παραγγελίας</h3>
        <div className="border border-secondary px-5 py-3">
          <div className="d-flex">
            <p className="col-6 d-flex justify-content-start">
              <b>Ημερομηνία : </b> {this.state.dateOfOrder}
            </p>
            <p className="col-6 d-flex justify-content-start">
              <b>Τζάμι :</b> {this.state.windowOfFrame}
            </p>
          </div>
          <div className="d-flex">
            <p className="col-6 d-flex justify-content-start">
              <b>Πελάτης :</b> {this.state.customer.firstName}{' '}
              {this.state.customer.lastName}
            </p>
            <p className="col-6 d-flex justify-content-start">
              <b>Χρώμα :</b> {this.state.color}
            </p>
          </div>
          <div className="d-flex">
            <p className="col-6 d-flex justify-content-start">
              <b>Διεύθυνση :</b> {this.state.order.address}
            </p>
            <p className="col-6 d-flex justify-content-start">
              <b>Τύπος : </b> {this.state.typeFrame}
            </p>
          </div>
        </div>
        <h4 className="text-center my-3">Περιεχόμενο Παραγγελίας </h4>
        <div className="d-flex justify-content-center">
          <table className="text-center my-3">
            <tr>
              <th className="border border-secondary py-2 px-4">Α/Α</th>
              <th className="border border-secondary py-2 px-4">
                Διαστάσεις(Ύψος Χ Πλάτος)
              </th>
              <th className="border border-secondary py-2 px-4">
                Τύπος Κουφώματος
              </th>
              <th className="border border-secondary py-2 px-4">Ποσότητα</th>
              <th className="border border-secondary py-2 px-4">Τιμή</th>
            </tr>
            {this.state.content.map((item, index) => (
              <tr className="my-3" key={index}>
                <td className="border border-secondary">{index + 1}</td>
                <td className="border border-secondary">
                  {item.frameHeight} Χ {item.frameLength}
                </td>
                <td className="border border-secondary">
                  {item.frameDesc.typeOfFrame}
                </td>
                <td className="border border-secondary">{item.qty}</td>
                <td className="border border-secondary">{item.price} €</td>
              </tr>
            ))}
          </table>
        </div>
        <p>
          <h5 className="text-center">
            Σύνολο Παραγγελίας : {this.state.total} €
          </h5>
        </p>
        <p>
          <h6>Παρατηρήσεις </h6>{' '}
          <div className="border border-dark p-2">{this.state.order.notes}</div>
        </p>
      </>
    );
  }
}

export default withRouter(OrderDetails);
